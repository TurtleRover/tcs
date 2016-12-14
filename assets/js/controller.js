/*
 *	Controller is a master module in an application.
 *	It uses the Revealing Module Pattern
 *	https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
*/

const DEBUG = true;

var controller = (function () {
	/*
	 * 																		PRIVATE area
	 */

	/*
	 *	called when main page is loaded and camera video should be displayed
	 */ 
	function mainPageLoaded() {
		amplify.publish("controller->ui", "hide welcome screen");
		amplify.publish("controller->ui", "display camera video");
	};

	/*
	 * 																		EVENTS triggers
	 */
	$(window).unload(closePage());
	
	/*
	 * 																		SUBSCRIBE to all topics
	 */
	amplify.subscribe("ui->controller", uiMessageCallback);
	amplify.subscribe("linux->controller", linuxMessageCallback);
	
	/*
	 * 																		CALLBACK functions
	 */
	function uiMessageCallback(message) {
		if (DEBUG) console.log("uiMessageCallback: " + message);
		if (DEBUG) amplify.publish("all->utests", message);

		switch(message) {
			case "ui is ready for operation":
				documentReadyCallback();
				break;
			default:
				console.log("unknown command: " + message);
		}
	};

	function linuxMessageCallback(message) {
		if (DEBUG) console.log("linuxMessageCallback: " + message);

		switch(message) {
			case "communication established":
				mainPageLoaded();
				break;
			default:
				console.log("unknown command: " + message);
		}
	};

	/*
	 *	called when ui send ready message
	 */ 
	function documentReadyCallback() {
		if (DEBUG) console.log("document ready callback");

		//	initialize multiple languages
    	amplify.publish("controller->ui", "initialize multilanguage");

		//	start python server
		amplify.publish("controller->linux", "start python server");
	};

	/*
	 *	called when page is unloaded
	 */
	function closePage() {
		amplify.publish("controller->linux", "stop python server");	
	};
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
	};
})();