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
        if (DEBUG) console.log("clinuxMessageCallback: " + message);
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
    const BAT_INTERVAL = 200000;

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
                    setNewServoPosition();
                    break;
                default:
                    console.log("unknown command: " + message);
            }
        };

        //  for 3G used service ngrok
        if (location.host == "bentos.eu.ngrok.io")
            var socket8080 = new socket(new WebSocket("ws://" + "bentossocket.eu.ngrok.io"), false, -1);
        else
            var socket8080 = new socket(new WebSocket("ws://" + location.hostname + ":8080"), false, -1);

        socket8080.socket.binaryType = "arraybuffer";

        /*
         *                                                              EVENT functions for socket
         */

        socket8080.socket.onopen = function() {
            console.log("Connected with port 8080");
            socket8080.isOpen = true;
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
                if (DEBUG) console.log("Binary message received from Arduino: " + hex);

                //  read battery voltage
                if (arr[0] == 0x31) {
                    var voltage = (arr[1] << 8) + arr[2];
                    voltage = voltage / 54.5 // voltage divider
                    var str_voltage = voltage.toString();
                    $("#battery-level-text").text(str_voltage.substr(0,4) + " V");
                }
                //  read signal strength
                else if (arr[0] == 0x41) {
                    var signal = arr[1];
                    $("#signal-strength-text").text(signal.toString() + " %");
                }
            }
        };

        socket8080.socket.onclose = function(e) {
            console.log("Connection closed. Log: " + e.data);
            socket8080.socket = null;
            socket8080.isOpen = null;
        };

        /*
         *  set new position of servo
         */
        function setNewServoPosition() {
            var newPosition = manipulator.getCurrentPosition();
            console.log("New servo positions: " + newPosition.alpha + "\t" + newPosition.beta);
            if (socket8080.isOpen) {
                var alphaValue = newPosition.alpha * 4;   //  in quarter of microseconds
                var betaValue = newPosition.beta * 4;
                var buf = new ArrayBuffer(4);
                var arr = new Uint8Array(buf);

                /*
                 *  command to send
                 *  https://www.pololu.com/docs/0J40/5.c
                 */
                arr[0] = 0x84;
                arr[1] = 0x00;

                arr[2] = alphaValue & 0x7F;
                arr[3] = (alphaValue >> 7) & 0x7F;
                socket8080.socket.send(buf);

                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                if(DEBUG) console.log("Binary message sent. " + hex);

                /*
                 *  command to send
                 *  https://www.pololu.com/docs/0J40/5.c
                 */
                arr[0] = 0x84;
                arr[1] = 0x01;

                arr[2] = betaValue & 0x7F;
                arr[3] = (betaValue >> 7) & 0x7F;
                socket8080.socket.send(buf);

                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
            }
        };

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
                    Current range is -127 - 127	*/
                var k = 1.27;
                arr[1] = Math.round(Math.abs(motorsSpeed.motor_1 * k) | (motorsSpeed.motor_1 & 0x80));	//	Left front
                arr[2] = Math.round(motorsSpeed.motor_2 * k);	//	Right front
                arr[3] = Math.round(motorsSpeed.motor_3 * k);	//	Left rear
                arr[4] = Math.round(motorsSpeed.motor_4 * k);	//	Right rear
                socket8080.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
               	
				if(DEBUG) console.log("motor 1: " + motorsSpeed.motor_1)
				if(DEBUG) console.log("sign: " + motorsSpeed.motor_1 & 0x80)
                if(DEBUG) console.log("Binary message sent. " + hex);
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
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
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
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
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
            }
        }, BAT_INTERVAL);
    };

    /*
	 * 																		PUBLIC area
	 */
})();
