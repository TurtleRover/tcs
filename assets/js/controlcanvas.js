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
            y: rect.bottom - event.clientY - (rect.bottom - rect.top) / 2,
        };
    }

    function getCanvasDimensions(canvas) {
        var rect = canvas.get(0).getBoundingClientRect();
        return {
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
    }

    /*
	 * 																		EVENTS area
	 */
    canvas.mousemove(function(event) {
        mousePosition = getMousePosition(canvas, event);

        /*
        *  declare constants used to control rover
        */
        var canvasDimensions = getCanvasDimensions(canvas);
        var circleRadius = canvasDimensions.height/2;
        var emptyZoneRadius = canvasDimensions.height/12;
        console.log("width: " + canvasDimensions.width + " height: " + canvasDimensions.height);

        coordinates.x = mousePosition.x;
        coordinates.y = mousePosition.y;
        coordinates.module = Math.round(Math.sqrt(coordinates.x * coordinates.x + coordinates.y * coordinates.y));
        coordinates.angle = Math.round(Math.asin(coordinates.y / coordinates.module) * 180 / Math.PI);
        console.log("x: " + coordinates.x + " y: " + coordinates.y + " module: " + coordinates.module + " alpha: " + coordinates.angle);

        var motors = {
            mot1: 0,
            mot2: 0,
            mot3: 0,
            mot4: 0
        }

        //  calculate motors values if the appropriate zone was clicked
        if (coordinates.module > emptyZoneRadius && coordinates.module <= circleRadius) {
            var a = coordinates.module / circleRadius * 100;
            var b = coordinates.module * (Math.sin((2 * coordinates.angle - 90) * Math.PI / 180)) / circleRadius * 100;

            var leftMotors = (coordinates.x >= 0) ? a : b;
            var rightMotors = (coordinates.x >= 0) ? b : a;

            motors.mot1 = Math.round(leftMotors);
            motors.mot3 = Math.round(leftMotors);
            motors.mot2 = Math.round(rightMotors);
            motors.mot4 = Math.round(rightMotors);

            $('#turtle-top-view-left-top-p').text(String(motors.mot1) + "%");
            $('#turtle-top-view-right-top-p').text(String(motors.mot2) + "%");
            $('#turtle-top-view-left-bottom-p').text(String(motors.mot3) + "%");
            $('#turtle-top-view-right-bottom-p').text(String(motors.mot4) + "%");
        }
    });

    /*
	 * 																		PUBLIC area
	 */
})();