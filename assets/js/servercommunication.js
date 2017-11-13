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

var serverCommunication = (function () {
    /*
	 * 																		PRIVATE area
	 */

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
    };

    /*
     *  defines how often new information is sent
     */
    const INTERVAL = 100;
    const BAT_INTERVAL = 2000;

    /*
     *  class for every new socket communication
     */
    function socket(ref, open, process) {
        this.socket = ref;  //  reference to connection
        this.isOpen = open; //  indicates whether the connection is open or not
        this.pid = process; //  process identifier indicates identifier of Python application. Should be killed while page leaving
    };

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
                case "set new camera position":
                    setNewCameraPosition();
                    break;
                case "set new mani position":
                    setNewManiPosition();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        };

        //  for 3G used service ngrok
        if (location.host == "bentos.eu.ngrok.io")
            var socket8080 = new socket(new WebSocket("ws://" + "bentossocket.eu.ngrok.io"), false, -1);
        else {
            var socket8080 = new socket(new WebSocket("ws://" + location.hostname + ":8080"), false, -1);
        }

        socket8080.socket.binaryType = "arraybuffer";

        /*
         *                                                              EVENT functions for socket
         */

        socket8080.socket.onopen = function() {
            console.log("Connected with port 8080");
            socket8080.isOpen = true;
            amplify.publish("all->ui", "set last status done");
            amplify.publish("all->ui", "initialize camera...");
        };

        socket8080.socket.onmessage = function(e) {
            if (typeof e.data == "string") {
                //  string is only if CRC is NOK
                console.log("Wrong CRC of received message: " + e.data);
            }
            else {
                var arr = new Uint8Array(e.data);
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);

                //  read battery voltage
                if (arr[0] == 0x31) {
                    var voltage = arr[1];
                    voltage = voltage / 14 + 0.3 // voltage divider
                    var str_voltage = voltage.toString();
                    $("#battery-level-text").text("battery voltage: " + str_voltage.substr(0,4) + " V");
                }
                //  read signal strength
                else if (arr[0] == 0x41) {
                    var signal = parseInt(arr[1]);
                    // $("#signal-strength-text").text("signal strength: -" + signal.toString() + " dBm");
                    console.log("signal" + signal);

                    /*
                     *  set icon according to signal strength
                     */
                    if (signal > 95) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-4.svg");
                    else if (signal > 90) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-3.svg");
                    else if (signal > 85) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-2.svg");
                    else if (signal > 80) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-1.svg");
                    else $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-0.svg");
                }
                //  read processor temperature
                else if (arr[0] == 0x61) {
                    var temperature = arr[1];
                    $("#processor-temperature-text").text("processor temp.: " + temperature.toString() + " °C");
                }
            }
        };

        socket8080.socket.onclose = function(e) {
            console.log("Connection closed. Log: " + e.data);
            socket8080.socket = null;
            socket8080.isOpen = null;

            amplify.publish("all->ui", "set last status error");

            setTimeout(function(){connect8080()}, 1000);
        };

        /*
         *  set new position of servo
         */
        function setNewManiPosition() {
            //var newPosition = manipulator.getCurrentPosition();
            if (socket8080.isOpen) {
                /*var alphaValue = newPosition.alpha * 4;   //  in quarter of microseconds
                var betaValue = newPosition.beta * 4;*/
                var buf = new ArrayBuffer(5);
                var arr = new Uint8Array(buf);

                var axis_1 = $("#mani-axis-1").val();
                var axis_2 = $("#mani-axis-2").val();

                console.log("New mani position: " + axis_1 + "\t" + axis_2);

                arr[0] = 0x84;
                arr[1] = (axis_1 >> 8) & 0xFF;
                arr[2] = axis_1 & 0xFF;
                arr[3] = (axis_2 >> 8) & 0xFF;
                arr[4] = axis_2 & 0xFF;

                socket8080.socket.send(buf);
            }
        };

        function setNewGripperPosition() {
            //var gripperPosition = manipulator.getGripperPosition();
            var gripperPosition = $("#gripper-slider-input").val();
            console.log("New gripper position: "+ gripperPosition);
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(3);
                var arr = new Uint8Array(buf);

                arr[0] = 0x94;
                arr[1] = (gripperPosition >> 8) & 0xFF;
                arr[2] = gripperPosition & 0xFF;

                socket8080.socket.send(buf);
            }
        }

        function setNewCameraPosition() {
            var cameraPosition = $("#camera-slider-input").val();
            console.log("New camera position: " + cameraPosition);
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(3);
                var arr = new Uint8Array(buf);

                arr[0] = 0xA4;
                arr[1] = (cameraPosition >> 8) & 0xFF;
                arr[2] = cameraPosition & 0xFF;

                socket8080.socket.send(buf);
            }
        }

        /*
        *  set all motors values
        */
        function setMotors() {
            if (socket8080.isOpen) {
                var motorsSpeed = controlCanvas.getMotorsSpeed();
                var buf = new ArrayBuffer(5);
                var arr = new Uint8Array(buf);

                //  command to send
                arr[0] = 0x10;
                /*	Multiplying by this value should make possible to write directly to PWM
                    Current range is 0 - 127 with first bit as direction	*/
                var k = 1.27;
                arr[1] = Math.round(Math.abs(motorsSpeed.motor_1 * k) | (motorsSpeed.motor_1 & 0x80));	//	Left front
                arr[2] = Math.round(Math.abs(motorsSpeed.motor_2 * k) | (motorsSpeed.motor_2 & 0x80));	//	Right front
                arr[3] = Math.round(Math.abs(motorsSpeed.motor_3 * k) | (motorsSpeed.motor_3 & 0x80));	//	Left rear
                arr[4] = Math.round(Math.abs(motorsSpeed.motor_4 * k) | (motorsSpeed.motor_4 & 0x80));	//	Right rear
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
               	
                // if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else {
                console.log("Connection not opened.");
            }
        };

        /*
         *  stop all motors immediately
         */
        function stopMotors() {
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(5);
                var arr = new Uint8Array(buf);

                //  command to send
                arr[0] = 0x10;

                arr[1] = 0;
                arr[2] = 0;
                arr[3] = 0;
                arr[4] = 0;
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                // if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else console.log("Connection not opened.");
        };

        /*
         *  get battery level
         */
        function getBatteryLevel() {
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(1);
                var arr = new Uint8Array(buf);
                arr[0] = 0x30;
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                // if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else console.log("Connection not opened.");
        };

        /*
         *  get signal level
         */
        function getSignalLevel() {
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(1);
                var arr = new Uint8Array(buf);
                arr[0] = 0x40;
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                // if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else console.log("Connection not opened.");
        };

        /*
         *  get processor temperature
         */
        function getProcessorTemperature() {
            if (socket8080.isOpen) {
                var buf = new ArrayBuffer(1);
                var arr = new Uint8Array(buf);
                arr[0] = 0x60;
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                // if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else console.log("Connection not opened.");
        };

        /*
         *  update all camera settings
         */
        function updateCameraSettings() {
            if (socket8080.isOpen) {
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

                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
            }
            else console.log("Connection not opened.");
        };

        /*
         *  set interval to update motor values
         *  take care to not overload CPU
         */
        setInterval(function () {
            if(socket8080.isOpen && controlCanvas.isCoordinatesClicked())
                setMotors();
        }, INTERVAL);

        /*
         *  read battery value
         */
        setInterval(function () {
            if(socket8080.isOpen) {
                getBatteryLevel();
                getSignalLevel();
                getProcessorTemperature();
            }
        }, BAT_INTERVAL);
    };

    /*
	 * 																		PUBLIC area
	 */
})();
