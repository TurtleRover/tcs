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
})();