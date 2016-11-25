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
	 * 																	RETURN functions
	 */
	this.getLastMessage = function () {
		this.messageArrived = false;
		return this.lastMessage;
	};
};

/*
 * 																		SUBSCRIBE
 */
amplify.subscribe("all->utests", testMessageCallback);

/*
 * 																		CALLBACKS
 */
function testMessageCallback(message) {
	utests.lastMessage = message;
	utests.messageArrived = true;
};