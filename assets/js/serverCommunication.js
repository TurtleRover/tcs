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
    amplify.subscribe("controller->serverCommunication", controllerMessageCallback);

    function controllerMessageCallback(message) {
        if (DEBUG) console.log("controllerMessageCallback: " + message);
		if (DEBUG) amplify.publish("all->utests", message);

        switch (message) {
            case "start communication on port 80":
                connect80();
                break;
            default:
                console.log("unknown command: " + message);
        }
    };

    /*
     *  defines how often new information is sent
     */
    const INTERVAL = 100;

    /*
     *  class for every new socket communication
     */
    function socket(ref, open, process) {
        this.socket = ref;  //  reference to connection
        this.isOpen = open; //  indicates whether the connection is open or not
        this.pid = process; //  process identifier indicates identifier of Python application. Should be killed while page leaving
    };

    /*
     *  connects with port 80
     */
    function connect80() {
        console.log("Location hostname: " + location.hostname);

        //  for 3G used service ngrok
        if (location.host == "bentos.eu.ngrok.io")
            var socket80 = new socket(new WebSocket("ws://" + "bentossocket.eu.ngrok.io"), false, -1);
        else
            var socket80 = new socket(new WebSocket("ws://" + location.hostname + ":80"), false, -1);

        socket80.socket.binaryType = "arraybuffer";

        /*
         *                                                              EVENT functions for socket
         */

        socket80.socket.onopen = function() {
            console.log("Connected with port 80");
            socket80.isOpen = true;
        };

        socket80.socket.onmessage = function(e) {
            if (typeof e.data == "string") {
                //  string is only if CRC is NOK
                console.log("Wrong CRC of received message: " + e.data);
            }
            else {
                var arr = new Uint8Array(e.data);
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                console.log("Binary message received from Arduino: " + hex);
            }
        };

        socket80.socket.onclose = function(e) {
            console.log("Connection closed. Log: " + e.data);
            socket80.socket = null;
            socket80.isOpen = null;
        };

        /*
        *  set all motors values
        */
        function setMotors() {
            if (socket80.isOpen) {
                var buf = new ArrayBuffer(4);
                var arr = new Uint8Array(buf);
                /*	Multiplying by this value should make possible to write directly to PWM
                    Current range is -127 - 127	*/
                var k = 1.27;
                arr[0] = Math.round(motorsSpeed.motor_1 * k);	//	Left front
                arr[1] = Math.round(motorsSpeed.motor_2 * k);	//	Right front
                arr[2] = Math.round(motorsSpeed.motor_3 * k);	//	Left rear
                arr[3] = Math.round(motorsSpeed.motor_4 * k);	//	Right rear
                socket80.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
                } else {
                    console.log("Connection not opened.");
            }
        };

        /*
         *  stop all motors immediately
         */
        function stopMotors() {
            if (socket80.isOpen) {
                var buf = new ArrayBuffer(4);
                var arr = new Uint8Array(buf);
                arr[0] = 0;
                arr[1] = 0;
                arr[2] = 0;
                arr[3] = 0;
                socket80.socket.send(buf);
                
                // Convert to readable form
                var hex = '';
                for (var i = 0; i < arr.length; i++)
                    hex += ('00' + arr[i].toString(16)).substr(-2);
                    
                if(DEBUG) console.log("Binary message sent. " + hex);
                } else {
                    console.log("Connection not opened.");
            }
        };

        /*
         *  set interval to update motor values
         *  take care to not overload CPU
         */
        setInterval(function () {
            if(socket80.isOpen && controlCanvas.isCoordinatesClicked())
                setMotors();
        }, INTERVAL);
    };

    /*
	 * 																		PUBLIC area
	 */
})();