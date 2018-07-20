export const Stream = function() {
    this.protocol = location.protocol === "https:" ? "wss:" : "ws:";
    this.hostname = document.location.hostname;
    this.port = 8090;

    this.url = this.protocol + '//' + this.hostname + ":" + this.port + '/stream/webrtc';

    this.websocket = null;
    this.peerConnection = null;
    this.dataChannel = null;
};

Stream.prototype.start = function() {
    console.log('[stream] Starting on:', this.url);

    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = this.open();
    // this.websocket.onmessage = this.message(event);
    // this.websocket.onclose = this.close(event);
    // this.websocket.onerror = this.error(event);
}

Stream.prototype.createPeerConnection = function() {
    this.peerConnection = new window.RTCPeerConnection();

    this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            let candidate = JSON.stringify({
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            });
            let command = JSON.stringify({
                what: "addicecandidate",
                data: candidate
            });
            this.websocket.send(command);
        } else {
            console.log("[stream] End of candidates");
        }
    }

    this.peerConnection.ondatachannel = (event) => {
        this.dataChannel = event.channel;

        event.channel.onopen = () => console.log('[stream] data channel is open!')
        event.channel.onerror = (error) => console.error("[stream] data channel error:", error);
        event.channel.onmessage = (event) => console.log("[stream] got data channel msg:", event.data);
        event.channel.onclose = () => {
            this.dataChannel = null;
            console.log("The Data Channel is Closed");
        };
    }

    this.peerConnection.onaddstream = (event) => {
        console.log("[stream] remote stream added:", URL.createObjectURL(event.stream));
        // let remoteVideoElement = document.getElementById('camera-video-img');
        // remoteVideoElement.src = URL.createObjectURL(event.stream);
        // remoteVideoElement.play();
    }

    this.peerConnection.onremovestream = () => console.log('[stream] remove');

}

Stream.prototype.offer = function(stream) {
    this.createPeerConnection();
    if (stream) {
        console.log("stream already added");
        pc.addStream(stream);
    }

    var command;

    let testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|' + 'Opera Mini|IEMobile|Mobile', 'i');

    if (testExp.test(navigator.userAgent)) {
        command = {
            what: "call",
            options: {
                force_hw_vcodec: true,
                vformat: 30
            }
        };
    } else {
        command = {
            what: "call",
            options: {
                force_hw_vcodec: true,
                vformat: 25,
                trickle_ice: true
            }
        };
    }
    console.log(this.websocket.readyState);
    this.websocket.send(JSON.stringify(command));
    console.log("offer(), command=" + JSON.stringify(command));
}

Stream.prototype.open = function() {
    // audio_video_stream = null;
    // this.offer();
    console.log(this.websocket.readyState);
}

Stream.prototype.message = function(event) {
    var msg = JSON.parse(event.data);
    var what = msg.what;
    var data = msg.data;
    console.log("message =" + what);

    switch (what) {
        case "offer":
            pc.setRemoteDescription(new window.RTCSessionDescription(JSON.parse(data)),
                function onRemoteSdpSuccess() {
                    console.log('onRemoteSdpSucces()');
                    pc.createAnswer(function(sessionDescription) {
                        pc.setLocalDescription(sessionDescription);
                        var request = {
                            what: "answer",
                            data: JSON.stringify(sessionDescription)
                        };
                        ws.send(JSON.stringify(request));
                        console.log(request);

                    }, function(error) {
                        alert("Failed to createAnswer: " + error);

                    }, {
                        optional: [],
                        mandatory: {
                            OfferToReceiveAudio: true,
                            OfferToReceiveVideo: true
                        }
                    });
                },
                function onRemoteSdpError(event) {
                    alert('Failed to set remote description (unsupported codec on this browser?): ' + event);
                    stop();
                }
            );

            /*var request = {
                what: "generateIceCandidates"
            };
            console.log(request);
            ws.send(JSON.stringify(request));*/
            break;

        case "answer":
            break;

        case "message":
            alert(msg.data);
            break;

        case "iceCandidates":
            var candidates = JSON.parse(msg.data);
            for (var i = 0; candidates && i < candidates.length; i++) {
                var elt = candidates[i];
                let candidate = new window.RTCIceCandidate({
                    sdpMLineIndex: elt.sdpMLineIndex,
                    candidate: elt.candidate
                });
                pc.addIceCandidate(candidate,
                    function() {
                        console.log("IceCandidate added: " + JSON.stringify(candidate));
                    },
                    function(error) {
                        console.error("addIceCandidate error: " + error);
                    }
                );
            }
            document.documentElement.style.cursor = 'default';
            break;
    }
}

Stream.prototype.close = function(event) {
    if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
    }
}

Stream.prototype.error = function(event) {
    console.error('[stream] error', event);
    this.websocket.close();
}

Stream.prototype.stop = function() {
    // if (this.dataChannel) {
    //     console.log("closing data channels");
    //     this.dataChannel.close();
    //     this.dataChannel = null;
    //     document.getElementById('datachannels').disabled = true;
    // }
    // if (localdatachannel) {
    //     console.log("closing local data channels");
    //     localdatachannel.close();
    //     localdatachannel = null;
    // }
    // if (audio_video_stream) {
    //     try {
    //         audio_video_stream.stop();
    //     } catch (e) {
    //         for (var i = 0; i < audio_video_stream.getTracks().length; i++)
    //             audio_video_stream.getTracks()[i].stop();
    //     }
    //     audio_video_stream = null;
    // }
    // stop_record();
    // document.getElementById('remote-video').src = '';
    // if (pc) {
    //     pc.close();
    //     pc = null;
    // }
    // if (ws) {
    //     ws.close();
    //     ws = null;
    // }
    // document.documentElement.style.cursor = 'default';
}