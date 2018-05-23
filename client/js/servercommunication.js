/*
 * controlCanvas is used for controlling Turtle
 * It uses the Revealing Module Pattern
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 *
 * For drawing and touch applications it uses CREATEJS set of libraries
 *  + EaselJS
 *  + TweenJS
 *  + SoundJS
 *  + PreloadJS
 * http://www.createjs.com/docs
 */

var serverCommunication = (function() {
    /*
     * 																		PRIVATE area
     */
    let sockets = window.turtle.sockets;
    let utils = new window.turtle.utils();
    let frameBuilder = new window.turtle.frameBuilder();
    /*
     * 																		SUBSCRIBE to all topics
     */
    amplify.subscribe("linux->serverCommunication", linuxMessageCallback);

    function linuxMessageCallback(message) {
        if (DEBUG) console.log("linuxMessageCallback: " + message);
        if (DEBUG) amplify.publish("all->utests", message);

        switch (message) {
            case "start communication on port 8080":
                connect8080();
                break;
            default:
                console.log("unknown command: " + message);
        }
    }

    /*
     *  defines how often new information is sent
     */
    const INTERVAL = 100;
    const BAT_INTERVAL = 2000;

    /*
     *  class for every new socket communication
     */
    // function socket(ref, open, process) {
    //     this.socket = ref;  //  reference to connection
    //     this.isOpen = open; //  indicates whether the connection is open or not
    //     this.pid = process; //  process identifier indicates identifier of Python application. Should be killed while page leaving
    // }

    /*
     *  connects with port 8080
     */
    function connect8080() {
        console.log("Location hostname: " + location.hostname);

        /*
         *  subscribe to canvas topic
         */
        amplify.subscribe("controlCanvas->port8080", canvasMessageCallback);

        function canvasMessageCallback(message) {
            if (DEBUG) console.log("canvasMessageCallback: " + message);
            if (DEBUG) amplify.publish("all->utests", message);

            switch (message) {
                case "stop all motors":
                    stopMotors();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        };

        amplify.subscribe("manipulator->port8080", manipulatorMessageCallback);

        function manipulatorMessageCallback(message) {
            if (DEBUG) console.log("manipulatorMessageCallback: " + message);
            if (DEBUG) amplify.publish("all->utests", message);

            switch (message) {
                case "set new servo position":
                    setNewManiPosition();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        };

        amplify.subscribe("ui->port8080", uiMessageCallback);

        function uiMessageCallback(message) {
            if (DEBUG) console.log("uiMessageCallback: " + message);
            if (DEBUG) amplify.publish("all->utests", message);

            switch (message) {
                case "update camera settings":
                    updateCameraSettings();
                    break;
                case "set new gripper position":
                    setNewGripperPosition();
                    break;
                case "set new axis1 position":
                case "set new axis2 position":
                    updateAxisPositions();
                    break;
                case "set new camera position":
                    setNewCameraPosition();
                    break;
                case "set new mani position":
                    setNewManiPosition();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        }

        //  for 3G used service ngrok
        // if (location.host == "bentos.eu.ngrok.io")
        //     var socket8080 = new socket(new WebSocket("ws://" + "bentossocket.eu.ngrok.io"), false, -1);
        // else {
        //     var socket8080 = new socket(new WebSocket("ws://" + location.hostname + ":8080"), false, -1);
        // }
        //
        // socket8080.socket.binaryType = "arraybuffer";

        /*
         *                                                              EVENT functions for socket
         */
        if (sockets.io.connected) {
            console.log("Connected with port 8080");
            amplify.publish("all->ui", "set last status done");
            amplify.publish("all->ui", "initialize camera...");
        }

        function updateAxisPositions() {
            $("#mani-axis-1").val($("#axis1-slider-input").val());
            $("#mani-axis-2").val($("#axis2-slider-input").val());
            setNewManiPosition();
        }
        /*
         *  set new position of servo
         */
        function setNewManiPosition() {
            //var newPosition = manipulator.getCurrentPosition();
            if (sockets.io.connected) {
                /*var alphaValue = newPosition.alpha * 4;   //  in quarter of microseconds
                var betaValue = newPosition.beta * 4;*/

                var axis_1 = document.getElementById('axis1-slider-input').value;
                var axis_2 = document.getElementById('axis2-slider-input').value;


                let frame = frameBuilder.manipulator(axis_1, axis_2);
                console.log(utils.arrayToHex(frameBuilder.motorsArr));
                sockets.sendManipulator(frame);
            }
        }

        function setNewGripperPosition() {
            //var gripperPosition = manipulator.getGripperPosition();
            var gripperPosition = $("#gripper-slider-input").val();
            if (sockets.io.connected) {
                let frame = frameBuilder.gripper(gripperPosition);
                console.log(utils.arrayToHex(frameBuilder.gripperArr));
                sockets.sendGripper(frame);
            }
        }

        function setNewCameraPosition() {
            var cameraPosition = $("#camera-slider-input").val();
            console.log("New camera position: " + cameraPosition);
            if (sockets.io.connected) {
                var buf = new ArrayBuffer(3);
                var arr = new Uint8Array(buf);

                arr[0] = 0xA4;
                arr[1] = (cameraPosition >> 8) & 0xFF;
                arr[2] = cameraPosition & 0xFF;

                // socket8080.socket.send(buf);
            }
        }

        /*
         *  set all motors values
         */
        function setMotors() {
            if (sockets.io.connected) {
                var motorsSpeed = controlCanvas.getMotorsSpeed();
                let frame = frameBuilder.motors(motorsSpeed);
                console.log(utils.arrayToHex(frameBuilder.motorsArr));
                sockets.sendMotors(frame);
            } else {
                console.log("Connection not opened.");
            }
        }

        amplify.subscribe("controlkeyboard->servercommunication", setMotorKeyboard);

        function setMotorKeyboard(movement) {
            if (sockets.io.connected) {
                if (movement.type == "run") {
                    if (movement.speed <= 100 && movement.speed >= -100) {
                        let frame = frameBuilder.motorsKeyboard(movement);
                        sockets.sendMotors(frame);
                        // Convert to readable form
                        console.log(utils.arrayToHex(frameBuilder.motorsArr));
                    } else {
                        clearInterval(movement.interval);
                    }

                } else if (movement.type == "stop") {
                    clearInterval(movement.interval);
                    stopMotors();
                }
            } else {
                console.log("Connection not opened.");
            }
        }

        /*
         *  stop all motors immediately
         */
        function stopMotors() {
            if (sockets.io.connected) {
                var buf = new ArrayBuffer(4);
                var arr = new Uint8Array(buf);

                //  command to send
                arr[0] = 0;
                arr[1] = 0;
                arr[2] = 0;
                arr[3] = 0;
                console.log("Halt!", buf);
                sockets.sendMotors(buf);
            } else console.log("Connection not opened.");
        }


        /*
         *  update all camera settings
         */
        function updateCameraSettings() {
            if (sockets.io.connected) {
                var buf = new ArrayBuffer(9);
                var arr = new Uint8Array(buf);
                arr[0] = 0x50;
                arr[1] = $("#brightness-slider-input").val();
                arr[2] = $("#contrast-slider-input").val();
                arr[3] = $("#saturation-slider-input").val();
                arr[4] = $("#hue-slider-input").val();
                arr[5] = ($("#gamma-slider-input").val() & 0xFF00) >> 8;
                arr[6] = $("#gamma-slider-input").val() & 0x00FF;
                arr[7] = $("#gain-slider-input").val();
                arr[8] = $("#sharpness-slider-input").val();

                // socket8080.socket.send(buf);

                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);

                if (DEBUG) console.log("Binary message sent. " + hex);
            } else console.log("Connection not opened.");
        }

        /*
         *  set interval to update motor values
         *  take care to not overload CPU
         */
        setInterval(function() {
            if (sockets.io.connected && controlCanvas.isCoordinatesClicked())
                setMotors();
        }, INTERVAL);


    }
})();
