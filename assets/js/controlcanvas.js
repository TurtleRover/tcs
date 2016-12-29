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

var controlCanvas = (function () {
    /*
	 * 																		SUBSCRIBE to controller topic
	 */
    amplify.subscribe("controller->controlCanvas", controllerMessageCallback);
    function controllerMessageCallback(message) {

    };

    /*
	 * 																		PRIVATE area
	 */
    var canvas = $('#navigation-ring-canvas');

    /*
     *  information about mouse (touch) coordinates
     */
    var coordinates = {
        x: 0,
        y: 0,
        angle: 0,
        module: 0,
        clicked: false
    };

    /*
     *  calculated speeds (in %)
     *  motor_1 - left front
     *  motor_2 - right front
     *  motor_3 - left rear
     *  motor_4 - right rear
     */
    var motorsSpeed = {
        motor_1: 0,
        motor_2: 0,
        motor_3: 0,
        motor_4: 0
    }

    /*
     *  returns touch position
     */
    function getMousePosition(canvas, event) {
        var rect = canvas.get(0).getBoundingClientRect();
        return {
            x: event.clientX - rect.left - (rect.right - rect.left) / 2,
            y: rect.bottom - event.clientY - (rect.bottom - rect.top) / 2
        };
    }

    /*
	 * 																		EVENTS area
	 */
    canvas.mousemove(function(event) {
        mousePosition = getMousePosition(canvas, event);
        console.log("x: " + mousePosition.x + " y: " + mousePosition.y);
    });

    /*
	 * 																		PUBLIC area
	 */
})();