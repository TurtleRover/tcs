/*
responsible for establishing video transmission using webrtc
*/

var webrtc = (function () {
    /*
	 * 																		SUBSCRIBE to all topics
	 */
	amplify.subscribe("linux->webrtc", linuxMessageCallback);

    /*
	 * 																		CALLBACK functions
	 */
	function linuxMessageCallback(message) {
		if (DEBUG) console.log("linuxMessageCallback: " + message);

		switch(message) {
            case "start webrtc stream":
                start();
                break;
			default:
				console.log("unknown command: " + message);
		}
	};

    var signalling_server_hostname = location.hostname || "192.168.10.1";
    var signalling_server_address = signalling_server_hostname + ':' + (location.port || (location.protocol === 'https:' ? 443 : 80));
    var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0

    var ws = null;
    var pc;
    var gn;
    var datachannel, localdatachannel;
    var audio_video_stream;
    var recorder = null;
    var recordedBlobs;
    var pcConfig = {"iceServers": [
            {"urls": ["stun:stun.l.google.com:19302", "stun:" + signalling_server_hostname + ":3478"]}
        ]};
    var pcOptions = {
        optional: [
            // Deprecated:
            //{RtpDataChannels: false},
            //{DtlsSrtpKeyAgreement: true}
        ]
    };
    var mediaConstraints = {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        }
    };
    var keys = [];

    RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
    RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
    navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
    var URL =  window.URL || window.webkitURL;

    function createPeerConnection() {
        try {
            var pcConfig_ = pcConfig;
            console.log(JSON.stringify(pcConfig_));
            pc = new RTCPeerConnection(pcConfig_, pcOptions);
            pc.onicecandidate = onIceCandidate;
            pc.onaddstream = onRemoteStreamAdded;
            pc.onremovestream = onRemoteStreamRemoved;
            pc.ondatachannel = onDataChannel;
            console.log("peer connection successfully created!");
        } catch (e) {
            console.log("createPeerConnection() failed");
        }
    }

    function onDataChannel(event) {
        console.log("onDataChannel()");
        datachannel = event.channel;

        event.channel.onopen = function () {
            console.log("Data Channel is open!");
            amplify.publish("webrtc->linux", "camera stream is ready");
        };

        event.channel.onerror = function (error) {
            console.log("Data Channel Error:", error);
        };

        event.channel.onmessage = function (event) {
            console.log("Got Data Channel Message:", event.data);
        };

        event.channel.onclose = function () {
            datachannel = null;
            console.log("The Data Channel is Closed");
        };
    }

    function onIceCandidate(event) {
        if (event.candidate) {
            var candidate = {
                sdpMLineIndex: event.candidate.sdpMLineIndex,
                sdpMid: event.candidate.sdpMid,
                candidate: event.candidate.candidate
            };
            var command = {
                command_id: "addicecandidate",
                data: JSON.stringify(candidate)
            };
            ws.send(JSON.stringify(command));
        } else {
            console.log("End of candidates.");
        }
    }

    function onRemoteStreamAdded(event) {
        console.log("Remote stream added:", URL.createObjectURL(event.stream));
        var remoteVideoElement = document.getElementById('camera-video-img');
        remoteVideoElement.src = URL.createObjectURL(event.stream);
        remoteVideoElement.play();
    }

    function onRemoteStreamRemoved(event) {
        var remoteVideoElement = document.getElementById('camera-video-img');
        remoteVideoElement.src = '';
    }

    function start() {
        if ("WebSocket" in window) {
            document.documentElement.style.cursor ='wait';

            var protocol = location.protocol === "https:" ? "wss:" : "ws:";
            ws = new WebSocket(protocol + '//' + "192.168.10.1:9090" + '/stream/webrtc');

            function offer(stream) {
                createPeerConnection();
                if (stream) {
                    pc.addStream(stream);
                }
                var command = {
                    command_id: "offer",
                    options: {
                        force_hw_vcodec: true,
                        vformat: 55
                    }
                };
                ws.send(JSON.stringify(command));
                console.log("offer(), command=" + JSON.stringify(command));
            }

            ws.onopen = function () {
                console.log("onopen()");

                audio_video_stream = null;

                var localConstraints = {};
                
                offer();
            };

            ws.onmessage = function (evt) {
                var msg = JSON.parse(evt.data);
                //console.log("message=" + msg);
                console.log("type=" + msg.type);

                switch (msg.type) {
                    case "offer":
                        pc.setRemoteDescription(new RTCSessionDescription(msg),
                            function onRemoteSdpSuccess() {
                                console.log('onRemoteSdpSucces()');
                                pc.createAnswer(function (sessionDescription) {
                                    pc.setLocalDescription(sessionDescription);
                                    var command = {
                                        command_id: "answer",
                                        data: JSON.stringify(sessionDescription)
                                    };
                                    ws.send(JSON.stringify(command));
                                    console.log(command);

                                }, function (error) {
                                    alert("Failed to createAnswer: " + error);

                                }, mediaConstraints);
                            },
                            function onRemoteSdpError(event) {
                                alert('Failed to set remote description (unsupported codec on this browser?): ' + event);
                                stop();
                            }
                        );

                        var command = {
                            command_id: "geticecandidate"
                        };
                        console.log(command);
                        ws.send(JSON.stringify(command));
                        break;

                    case "answer":
                        break;

                    case "message":
                        alert(msg.data);
                        break;

                    case "geticecandidate":
                        var candidates = JSON.parse(msg.data);
                        for (var i = 0; candidates && i < candidates.length; i++) {
                            var elt = candidates[i];
                            let candidate = new RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                            pc.addIceCandidate(candidate,
                                function () {
                                    console.log("IceCandidate added: " + JSON.stringify(candidate));
                                },
                                function (error) {
                                    console.log("addIceCandidate error: " + error);
                                }
                            );
                        }
                        document.documentElement.style.cursor ='default';
                        break;
                }
            };

            ws.onclose = function (evt) {
                if (pc) {
                    pc.close();
                    pc = null;
                }
                document.documentElement.style.cursor ='default';
            };

            ws.onerror = function (evt) {
                alert("An error has occurred!");
                ws.close();
            };

        } else {
            alert("Sorry, this browser does not support WebSockets.");
        }
    }

    function stop() {
        if (datachannel) {
            console.log("closing data channels");
            datachannel.close();
            datachannel = null;
            document.getElementById('datachannels').disabled = true;
        }
        if (localdatachannel) {
            console.log("closing local data channels");
            localdatachannel.close();
            localdatachannel = null;
        }
        if (audio_video_stream) {
            try {
                audio_video_stream.stop();
            } catch (e) {
                for (var i = 0; i < audio_video_stream.getTracks().length; i++)
                    audio_video_stream.getTracks()[i].stop();
            }
            audio_video_stream = null;
        }
        stop_record();
        document.getElementById('remote-video').src = '';
        if (pc) {
            pc.close();
            pc = null;
        }
        if (ws) {
            ws.close();
            ws = null;
        }
        document.documentElement.style.cursor ='default';
    }
})();