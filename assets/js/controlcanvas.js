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
        if (coordinates.clicked == true) {
            updateMotors(event);
        }
    });

    canvas.mousedown(function(event) {
        coordinates.clicked = true;
        updateMotors(event);
    });

    canvas.mouseout(function(event) {
        coordinates.clicked = false;
        stopMotors();
    });

    canvas.mouseup(function(event) {
        coordinates.clicked = false;
        stopMotors();
    });

    function updateMotors(event) {
        mousePosition = getMousePosition(canvas, event);

        /*
        *  declare constants used to control rover
        */
        var canvasDimensions = getCanvasDimensions(canvas);
        var circleRadius = canvasDimensions.height/2;
        var emptyZoneRadius = canvasDimensions.height/12;

        coordinates.x = mousePosition.x;
        coordinates.y = mousePosition.y;
        coordinates.module = Math.sqrt(coordinates.x * coordinates.x + coordinates.y * coordinates.y);
        coordinates.angle = Math.asin(coordinates.y / coordinates.module) * 180 / Math.PI;
        console.log("x: " + coordinates.x + " y: " + coordinates.y + " module: " + coordinates.module + " alpha: " + coordinates.angle);

        //  calculate motors values if the appropriate zone was clicked
        if (coordinates.module > emptyZoneRadius && coordinates.module <= circleRadius) {
            var a = coordinates.module / circleRadius * 100;
            var b = coordinates.module * (Math.sin((2 * coordinates.angle - 90) * Math.PI / 180)) / circleRadius * 100;

            var leftMotors = (coordinates.x >= 0) ? a : b;
            var rightMotors = (coordinates.x >= 0) ? b : a;

            motorsSpeed.motor_1 = Math.round(leftMotors);
            motorsSpeed.motor_3 = Math.round(leftMotors);
            motorsSpeed.motor_2 = Math.round(rightMotors);
            motorsSpeed.motor_4 = Math.round(rightMotors);
        }
        else {
            motorsSpeed.motor_1 = 0;
            motorsSpeed.motor_2 = 0;
            motorsSpeed.motor_3 = 0;
            motorsSpeed.motor_4 = 0;
        }

        updatePowerDisplay();
    };

    function stopMotors() {
        motorsSpeed.motor_1 = 0;
        motorsSpeed.motor_2 = 0;
        motorsSpeed.motor_3 = 0;
        motorsSpeed.motor_4 = 0;

        updatePowerDisplay();
    };

    function updatePowerDisplay() {
        $('#turtle-top-view-left-top-p').text(String(motorsSpeed.motor_1) + "%");
        $('#turtle-top-view-right-top-p').text(String(motorsSpeed.motor_2) + "%");
        $('#turtle-top-view-left-bottom-p').text(String(motorsSpeed.motor_3) + "%");
        $('#turtle-top-view-right-bottom-p').text(String(motorsSpeed.motor_4) + "%");
    };

    /*
	 * 																		PUBLIC area
	 */
})();