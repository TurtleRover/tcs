/*
 *	Linux class is responsible for all interaction between website and (linux) server itself
 *	It uses the Revealing Module Pattern
 *	https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
*/

var linux = (function () {
    /*
	 * 																		PRIVATE area
	 */
    var isCameraAvailable = false;
    var serverProcessPID = -1;
    var mjpegStreamPID = -1;

    /*
     *  start python server
     *  python server is responsible for all communication on the server side
     */
    function startPythonServer() {
        $.get("assets/python/server/run_server.php", function(data) {
            if (DEBUG) console.log("AJAX connection established");
            data = data.split("\r\n");

            serverProcessPID = data[0];
            mjpegStreamPID = data[1];
            //  if the returned value is numeric (pid of the process) continue with camera
            if ($.isNumeric(serverProcessPID)) {
                isCameraAvailable = true; 

                if (DEBUG) console.log("serverProcessPID: " + serverProcessPID);
                if (DEBUG) console.log("mjpegStreamPID: " + mjpegStreamPID);
            }
            //  otherwise display a notice and work with static image
            else {
                if (DEBUG) console.log("couldn't initialize python server");
                isCameraAvailable = false;
                serverProcessPID = -1;
                mjpegStreamPID = -1;
                amplify.publish("all->ui", "notifications.server-connection-error");
            }

            amplify.publish("linux->controller", "communication established");
        });
    };

    /*
     *  stop python server when page is unloaded (controller.js -> closePage)
     */
    function stopPythonServer() {
        $.get("assets/python/server/close_server.php?pid=" + serverProcessPID);
    };

    function retIsCameraAvailable() {return isCameraAvailable;};
    function retServerProcessPID() {return serverProcessPID;};

    /*
	 * 																		SUBSCRIBE to all topics
	 */
	amplify.subscribe("controller->linux", controllerMessageCallback);

    /*
	 * 																		CALLBACK functions
	 */
	function controllerMessageCallback(message) {
		if (DEBUG) console.log("controllerMessageCallback: " + message);

		switch(message) {
			case "start python server":
                startPythonServer();
				break;
            case "stop python server":
                stopPythonServer();
                break;
			default:
				console.log("unknown command: " + message);
		}
	};

    /*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
        getIsCameraAvailable : retIsCameraAvailable,
        getServerProcessPID : retServerProcessPID
	};
})();