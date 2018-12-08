export const Stream = function Stream() {
    this.protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    this.hostname = document.location.hostname;
    this.port = 8090;

    this.url = this.protocol + '//' + this.hostname + ':' + this.port + '/stream/webrtc';
    this.url_mjpeg = 'http://' + this.hostname + ':' + this.port + '/stream/video.mjpeg';

    this.websocket = null;
    this.peerConnection = null;
    this.dataChannel = null;
    this.remoteDesc = false;

    this.iceCandidates = [];
};

Stream.prototype.start = function start() {
    console.log('[stream] Starting on:', this.url);

    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = () => this.open();
    this.websocket.onmessage = (event) => this.message(event);
    this.websocket.onclose = (event) => this.close(event);
    this.websocket.onerror = (event) => this.error(event);
};

Stream.prototype.createPeerConnection = function createPeerConnection() {
    const peerConnectionConf = {
        iceServers: [{
            urls: ['stun:' + this.hostname + ':3478'],
        }],
    };

    this.peerConnection = new window.RTCPeerConnection(peerConnectionConf);

    this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            const candidate = JSON.stringify({
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate,
            });
            const command = JSON.stringify({
                what: 'addicecandidate',
                data: candidate,
            });
            this.websocket.send(command);
        } else {
            console.log('[stream] End of candidates');
        }
    };


    this.peerConnection.ontrack = (event) => {
        console.log('[stream] remote stream added:', event.streams[0]);
        const remoteVideoElement = document.getElementById('stream');
        // remoteVideoElement.srcObject = event.streams[0];
        [remoteVideoElement.srcObject] = event.streams;
        remoteVideoElement.play();
    };

    this.peerConnection.onremovestream = () => console.log('[stream] remove');
};

Stream.prototype.offer = function offer() {
    this.createPeerConnection();
    this.iceCandidates = [];
    this.remoteDesc = false;
    const command = {
        what: 'call',
        options: {
            force_hw_vcodec: true,
            vformat: 25,
            trickle_ice: true,
        },
    };
    this.websocket.send(JSON.stringify(command));
    console.log('[stream] offer(), command=' + JSON.stringify(command));
};

Stream.prototype.open = function open() {
    this.offer();
    console.log('[stream] state:', this.websocket.readyState);
};

Stream.prototype.addIceCandidates = function addIceCandidates() {
    this.iceCandidates.forEach((candidate) => {
        this.peerConnection.addIceCandidate(candidate,
            () => {
                console.log('[stream] IceCandidate added: ' + JSON.stringify(candidate));
            },
            (error) => {
                console.error('[stream] addIceCandidate error: ' + error);
            });
    });
    this.iceCandidates = [];
};

Stream.prototype.message = function message(event) {
    const msg = JSON.parse(event.data);
    const { what } = msg;
    const { data } = msg;
    console.log('[stream] message =' + what);

    switch (what) {
        case 'offer':
            this.peerConnection.setRemoteDescription(
                new window.RTCSessionDescription(JSON.parse(data)),
                () => this._onRemoteSdpSuccess(),
                () => this._onRemoteSdpError(),
            );
            break;

        case 'answer':
            break;

        case 'message':
            console.error('[stream]', msg.data);
            break;

        case 'iceCandidate': { // when trickle is enabled
            if (!msg.data) {
                console.log('[stream] Ice Gathering Complete');
                break;
            }
            const elt = JSON.parse(msg.data);
            const candidate = new RTCIceCandidate({
                sdpMLineIndex: elt.sdpMLineIndex,
                candidate: elt.candidate,
            });
            this.iceCandidates.push(candidate);
            if (this.remoteDesc) {
                this.addIceCandidates();
            }
            break;
        }

        case 'iceCandidates': {
            const candidates = JSON.parse(msg.data);
            for (let i = 0; candidates && i < candidates.length; i++) {
                const elt = candidates[i];
                const candidate = new window.RTCIceCandidate({
                    sdpMLineIndex: elt.sdpMLineIndex,
                    candidate: elt.candidate,
                });
                this.addIceCandidates();
            }
            if (this.remoteDesc) {
                this.addIceCandidates();
            }
            break;
        }

        default:
            break;
    }
};

Stream.prototype._onRemoteSdpSuccess = function _onRemoteSdpSuccess() {
    console.log('[stream] onRemoteSdpSucces()');
    this.remoteDesc = true;
    this.peerConnection.createAnswer((sessionDescription) => {
        this.peerConnection.setLocalDescription(sessionDescription);
        const request = JSON.stringify({
            what: 'answer',
            data: JSON.stringify(sessionDescription),
        });
        console.log('[stream] sdp success', request);

        this.websocket.send(request);
    },
    (error) => console.error(error), {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true,
        },
    });
};

Stream.prototype._onRemoteSdpError = function _onRemoteSdpError(event) {
    console.error('[stream] Failed to set remote description (unsupported codec on this browser?):', event);
    this.stop();
}

Stream.prototype.close = function close(event) {
    if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
    }
};

Stream.prototype.error = function error(event) {
    console.error('[stream] error', event);
    this.websocket.close();
}

Stream.prototype.stop = function stop() {
    // stop_record();
    this.close();
    if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
    }
    console.info('[stream] Stop.')
};
