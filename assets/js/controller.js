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
	 * 																		SUBSCRIBE to all topics
	 */
	amplify.subscribe("ui->controller", uiMessageCallback);
	
	/*
	 * 																		CALLBACK functions
	 */
	function uiMessageCallback(message) {
		if (DEBUG) console.log("uiMessageCallback: " + message);
		if (DEBUG) amplify.publish("all->utests", message);
	};
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
		publicMainPageLoaded:	mainPageLoaded
	};
})();