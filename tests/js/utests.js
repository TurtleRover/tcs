/*
 *	Tests is used for unit testing
*/

var utests = new function() {
	/*
	 * 																	VARIABLES
	 */
	this.lastMessage = "";
	this.messageArrived = false;
	
	/*
	 * 																	SUBSCRIBE
	 */
	amplify.subscribe("all->utests", testMessageCallback);
	
	/*
	 * 																	CALLBACKS
	 */
	function testMessageCallback(message) {
		this.lastMessage = message;
		this.messageArrived = true;
	};
	
	/*
	 * 																	RETURN functions
	 */
	this.getLastMessage = function () {
		return this.lastMessage;
		this.messageArrived = false;
	};
};