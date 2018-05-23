/*
responsible for establishing video transmission using webrtc
*/

var webrtc = (function () {
    if(document.domain.includes("localhost")) {
        console.log("in localhost camera is disabled");
        setTimeout(function() {amplify.publish("webrtc->linux", "camera stream is ready")}, 1000);
    }

    else {
        /*
        * 																		SUBSCRIBE to all topics
        */
        amplify.subscribe("linux->webrtc", linuxMessageCallback);
        amplify.subscribe("ui->webrtc", uiMessageCallback);

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

        function uiMessageCallback(message) {
            if (DEBUG) console.log("uiMessageCallback: " + message);

            switch(message) {
                case "start stop recording":
                    start_stop_record();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        };

        var signalling_server_hostname = location.hostname || "192.168.10.1";
        var signalling_server_address = signalling_server_hostname + ':' + (location.port || (location.protocol === 'https:' ? 443 : 80));
        var isFirefox = typeof InstallTrigger !== 'undefined';// Firefox 1.0

        var vid;

        var ws = null;
        var pc;
        var gn;
        var datachannel, localdatachannel;
        var audio_video_stream;
        var recorder = null;
        var recordedBlobs;
        var mediaConstraints = {
            optional: [],
            mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
            }
        };
        var keys = [];

        //RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        //RTCSessionDescription = window.mozRTCSessionDescription || window.RTCSessionDescription;
        //RTCIceCandidate = window.mozRTCIceCandidate || window.RTCIceCandidate;
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia || navigator.msGetUserMedia;
        var URL =  window.URL || window.webkitURL;

        function createPeerConnection() {
            try {
                pc = new window.RTCPeerConnection();
                pc.onicecandidate = onIceCandidate;
                pc.onaddstream = onRemoteStreamAdded;
                pc.onremovestream = onRemoteStreamRemoved;
                pc.ondatachannel = onDataChannel;
                console.log("peer connection successfully created!");
            } catch (e) {
                console.log("createPeerConnection() failed " + e);
            }
        }

        function onDataChannel(event) {
            console.log("onDataChannel()");
            datachannel = event.channel;

            event.channel.onopen = function () {
                console.log("Data Channel is open!");
                //amplify.publish("webrtc->linux", "camera stream is ready");
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
            var remoteVideoElement = document.getElementById('remote-video');
            remoteVideoElement.src = URL.createObjectURL(event.stream);
            remoteVideoElement.play();
            amplify.publish("webrtc->linux", "camera stream is ready");
        }

        function onRemoteStreamRemoved(event) {
            var remoteVideoElement = document.getElementById('remote-video');
            remoteVideoElement.src = '';
        }

        function start() {
            if ("WebSocket" in window) {
                document.documentElement.style.cursor ='wait';

                var protocol = location.protocol === "https:" ? "wss:" : "ws:";
                ws = new WebSocket(protocol + '//' + document.location.hostname + ":8090" + '/stream/webrtc');

                function offer(stream) {
                    createPeerConnection();
                    if (stream) {
                        console.log("stream already added");
                        pc.addStream(stream);
                    }
                    var command;

                    testExp = new RegExp('Android|webOS|iPhone|iPad|' + 'BlackBerry|Windows Phone|' + 'Opera Mini|IEMobile|Mobile' ,'i');

                    if(testExp.test(navigator.userAgent)) {
                        command = {
                            command_id: "offer",
                            options: {
                                force_hw_vcodec: true,
                                vformat: 30
                            }
                        };
                    }
                    else {
                        command = {
                            command_id: "offer",
                            options: {
                                force_hw_vcodec: true,
                                vformat: 55
                            }
                        };
                    }
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
                    var what = msg.what;
                    var data = msg.data;
                    console.log("message =" + what);

                    switch (what) {
                        case "offer":
                            pc.setRemoteDescription(new window.RTCSessionDescription(JSON.parse(data)),
                                function onRemoteSdpSuccess() {
                                    console.log('onRemoteSdpSucces()');
                                    pc.createAnswer(function (sessionDescription) {
                                        pc.setLocalDescription(sessionDescription);
                                        var request = {
                                            what: "answer",
                                            data: JSON.stringify(sessionDescription)
                                        };
                                        ws.send(JSON.stringify(request));
                                        console.log(request);

                                    }, function (error) {
                                        alert("Failed to createAnswer: " + error);

                                    }, mediaConstraints);
                                },
                                function onRemoteSdpError(event) {
                                    alert('Failed to set remote description (unsupported codec on this browser?): ' + event);
                                    stop();
                                }
                            );

                            var request = {
                                what: "generateIceCandidates"
                            };
                            console.log(request);
                            ws.send(JSON.stringify(request));
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
                                let candidate = new window.RTCIceCandidate({sdpMLineIndex: elt.sdpMLineIndex, candidate: elt.candidate});
                                pc.addIceCandidate(candidate,
                                        function () {
                                            console.log("IceCandidate added: " + JSON.stringify(candidate));
                                        },
                                        function (error) {
                                            console.error("addIceCandidate error: " + error);
                                        }
                                );
                            }
                            document.documentElement.style.cursor = 'default';
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

        /*
         *  RECORDING
         */
        function start_stop_record() {
            if (pc && !recorder) {
                var streams = pc.getRemoteStreams();
                if (streams.length) {
                    console.log("starting recording");
                    startRecording(streams[0]);
                }
            } else {
                stop_record();
                setTimeout(function() { download(); }, 500);
            }
        }

        function startRecording(stream) {
            recordedBlobs = [];
            var options = {mimeType: 'video/webm;codecs=vp9'};
            if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                console.log(options.mimeType + ' is not Supported');
                options = {mimeType: 'video/webm;codecs=vp8'};
                if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                    console.log(options.mimeType + ' is not Supported');
                    options = {mimeType: 'video/webm;codecs=h264'};
                    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                        console.log(options.mimeType + ' is not Supported');
                        options = {mimeType: 'video/webm'};
                        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
                            console.log(options.mimeType + ' is not Supported');
                            options = {mimeType: ''};
                        }
                    }
                }
            }
            try {
                recorder = new MediaRecorder(stream, options);
            } catch (e) {
                console.error('Exception while creating MediaRecorder: ' + e);
                alert('Exception while creating MediaRecorder: ' + e + '. mimeType: ' + options.mimeType);
                return;
            }
            console.log('Created MediaRecorder', recorder, 'with options', options);

            recorder.onstop = handleStop;
            recorder.ondataavailable = handleDataAvailable;
            recorder.onwarning = function(e){
                console.log('Warning: ' + e);
            };
            recorder.start();
            console.log('MediaRecorder started', recorder);
        }

        function stop_record() {
            if (recorder) {
                recorder.stop();
                console.log("recording stopped");
            }
        }

        function handleDataAvailable(event) {
            if (event.data && event.data.size > 0) {
                recordedBlobs.push(event.data);
            }
        }

        function handleStop(event) {
            console.log('Recorder stopped: ', event);
            recorder = null;
            vid = document.createElement('video');
            //vid.style.display = 'none';

            var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
            vid.src = URL.createObjectURL(superBuffer);
            document.body.appendChild(vid);
        }

        function download() {
            if (recordedBlobs !== undefined) {
                var blob = new Blob(recordedBlobs, {type: 'video/webm'});
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'video.webm';
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(vid);
                    vid = null;
                }, 100);
            }
        }
    }
})();
