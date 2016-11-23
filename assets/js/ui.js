/*
 * UI is responsible for all interactions User <-> Application
 * It uses the Revealing Module Pattern
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
*/

var ui = (function () {
	/*
	 * 																		PRIVATE area
	 */
	
	/*
	 * send any type of data to the controller module
	 */
	function sendMessageToController(message) {
		amplify.publish("ui->controller", message);
	}
	
	/*
	 * 																		TEST functions
	 */
	$("#myButton").click(function(){
		sendMessageToController("dupa");
		});
	
	/*
	 * 																		PUBLIC area
	 * Reveal public pointers to private functions and properties.
	 */
	return {
		sendMessageToController: sendMessageToController
	};
})();