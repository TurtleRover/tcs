/*
 * controlCanvas is used for controlling Turtle
 * It uses the Revealing Module Pattern
 * https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 * 
 */

var controlCanvas = (function () {
    /*
     * Subscribe to controller topic
     */
    amplify.subscribe("controller->controlCanvas", controllerMessageCallback);
    function controllerMessageCallback(message) {

    };

    amplify.subscribe("ui->controlCanvas", uiMessageCallback);
    function uiMessageCallback(message) {
        if (DEBUG)
            console.log("uiMessageCallback: " + message);
        if (DEBUG)
            amplify.publish("all->utests", message);

        switch (message) {
            case "set function to GRAB":
                grabOrDrive = "GRAB";
                $("slider-manipulator-axis-x").trigger('change');
                $("slider-manipulator-axis-y").trigger('change');
                break;
            case "set function to DRIVE":
                grabOrDrive = "DRIVE";
                break;
            default:
                console.log("unknown command: " + message);
        }
    };

    var canvas = $('#navigation-ring-canvas');

    /*
     * Information about mouse (touch) coordinates
     */
    var coordinates = {
        x: 0,
        y: 0,
        angle: 0,
        module: 0,
        clicked: false
    };

    /*
     * Calculated speeds (in %)
     * motor_1 - left front
     * motor_2 - right front
     * motor_3 - left rear
     * motor_4 - right rear
     *  
     */
    var motorsSpeed = {
        motor_1: 0,
        motor_2: 0,
        motor_3: 0,
        motor_4: 0
    };

    var maniDirection = "NONE";
    var maniTimerId = 0;

    var grabOrDrive = "DRIVE";

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

    function getCanvasDimensions(canvas) {
        var rect = canvas.get(0).getBoundingClientRect();
        return {
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
    }

    function move(event) {
        if (coordinates.clicked === true) {
            if (grabOrDrive === "DRIVE")
                updateMotors(event);
        }
    }

    function start(event) {
        coordinates.clicked = true;
        if (grabOrDrive === "DRIVE")
            updateMotors(event);
        else {
            clearInterval(maniTimerId);
            maniTimerId = setInterval(function () {
                setNewManiPosition(event);
            }, 100);
        }
    }

    function stop(event) {
        coordinates.clicked = false;
        if (grabOrDrive === "DRIVE")
            stopMotors();
        else {
            clearInterval(maniTimerId);
        }
    }

    /*
     * Motors
     */
    canvas.mousemove(function (event) {
        move(event);
    });
    canvas[0].addEventListener("touchmove", function (event) {
        event.preventDefault();
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas[0].dispatchEvent(mouseEvent);
    });

    canvas.mousedown(function (event) {
        start(event);
    });
    canvas[0].addEventListener("touchstart", function (event) {
        event.preventDefault();
        var touch = event.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas[0].dispatchEvent(mouseEvent);
    });

    canvas.mouseup(function (event) {
        stop(event);
    });
    
    canvas[0].addEventListener("touchend", function (event) {
        event.preventDefault();
        stop(event);
    });

    canvas.mouseout(function (event) {
        coordinates.clicked = false;
        if (grabOrDrive === "DRIVE")
            stopMotors();
        else {
            clearInterval(maniTimerId);
        }
    });

    function updateMotors(event) {
        mousePosition = getMousePosition(canvas, event);
        // console.log(mousePosition);

        var direction = 1;

        /*
         * Declare constants used to control rover
         */
        var canvasDimensions = getCanvasDimensions(canvas);
        var circleRadius = canvasDimensions.height / 2;
        var emptyZoneRadius = canvasDimensions.height / 10;
        var emptyZoneHeight = canvasDimensions.height / 12;

        // Alternative steering method
        emptyZoneHeight = 0;

        coordinates.x = mousePosition.x;
        coordinates.y = mousePosition.y;
        coordinates.module = Math.sqrt(coordinates.x * coordinates.x + coordinates.y * coordinates.y);
        coordinates.angle = Math.asin(coordinates.y / coordinates.module) * 180 / Math.PI;

        // Calculate motors values if the appropriate zone was 

        if (coordinates.module > emptyZoneRadius && coordinates.module <= circleRadius && Math.abs(coordinates.y) > emptyZoneHeight) {
            //  var a = coordinates.module / circleRadius * 100;
            //  var b = coordinates.module * (Math.sin((2 * coordinates.angle - 90) * Math.PI / 180)) / circleRadius * 100;

            //  Alternative steering method
            var leftMotors;
            var rightMotors;
            //  Forward
            if (Math.abs(coordinates.y) > Math.abs(coordinates.x)) {
                var a = coordinates.y / circleRadius * 100;
                leftMotors = a;
                rightMotors = a;
            }
            // Turn
            else {
                var a = -coordinates.x / circleRadius * 100;
                leftMotors = -a;
                rightMotors = a;
            }

            //  var leftMotors = (coordinates.x >= 0) ? a : b;
            //  var rightMotors = (coordinates.x >= 0) ? b : a;

            // Reverse if backward
            /*if (coordinates.y < 0) {
             leftMotors = -leftMotors;
             rightMotors = -rightMotors;
             }*/

            motorsSpeed.motor_1 = Math.round(Math.round(leftMotors) * direction * Number($("#slider-speed-fl").slider("value")));
            motorsSpeed.motor_3 = Math.round(Math.round(leftMotors) * direction * Number($("#slider-speed-rl").slider("value")));
            motorsSpeed.motor_2 = Math.round(Math.round(rightMotors) * direction * Number($("#slider-speed-fr").slider("value")));
            motorsSpeed.motor_4 = Math.round(Math.round(rightMotors) * direction * Number($("#slider-speed-rr").slider("value")));
        } else {
            motorsSpeed.motor_1 = 0;
            motorsSpeed.motor_2 = 0;
            motorsSpeed.motor_3 = 0;
            motorsSpeed.motor_4 = 0;
        }

        updatePowerDisplay();
    };

    function updateManipulator(event) {
        mousePosition = getMousePosition(canvas, event);

        if (Math.abs(mousePosition.x) > Math.abs(mousePosition.y)) {
            if (mousePosition.x > 0)
                maniDirection = "RIGHT";
            else
                maniDirection = "LEFT";
        } else {
            if (mousePosition.y > 0)
                maniDirection = "UP";
            else
                maniDirection = "DOWN";
        }
    };

    function setNewManiPosition(event) {
        updateManipulator(event);
        var change = 3;
        var minX = 0;
        var maxX = 249;
        var minY = 0;
        var maxY = 249;
        var oldX = parseInt($("#slider-manipulator-axis-x").slider("value"));
        var oldY = parseInt($("#slider-manipulator-axis-y").slider("value"));

        if (maniDirection === "RIGHT") {
            var newX = oldX - change;
            if (newX < minX)
                newX = minX;
            $("#slider-manipulator-axis-x").slider("value", newX);
            //$("slider-manipulator-axis-x").trigger("change");
        }

        if (maniDirection === "LEFT") {
            var newX = oldX + change;
            if (newX > maxX)
                newX = maxX;
            $("#slider-manipulator-axis-x").slider("value", newX);
            //$("slider-manipulator-axis-x").trigger("change");
        }

        if (maniDirection === "UP") {
            var newY = oldY + change;
            if (newY > maxY)
                newY = maxY;
            $("#slider-manipulator-axis-y").slider("value", newY);
            //$("slider-manipulator-axis-y").trigger("change");
        }

        if (maniDirection === "DOWN") {
            var newY = oldY - change;
            if (newY < minY)
                newY = minY;
            $("#slider-manipulator-axis-y").slider("value", newY);
            //$("slider-manipulator-axis-y").trigger("change");
        }
    };

    function stopMotors() {
        amplify.publish("controlCanvas->port8080", "stop all motors");
        motorsSpeed.motor_1 = 0;
        motorsSpeed.motor_2 = 0;
        motorsSpeed.motor_3 = 0;
        motorsSpeed.motor_4 = 0;

        updatePowerDisplay();
    };

    function updatePowerDisplay() {
        $('#turtle-top-view-left-top-div').text(String(motorsSpeed.motor_1) + "%");
        $('#turtle-top-view-right-top-div').text(String(motorsSpeed.motor_2) + "%");
        $('#turtle-top-view-left-bottom-div').text(String(motorsSpeed.motor_3) + "%");
        $('#turtle-top-view-right-bottom-div').text(String(motorsSpeed.motor_4) + "%");
    };

    /*
     * 	Revealed functions
     */

    function isCoordinatesClickedPriv() {
        return coordinates.clicked;
    };

    function getMotorsSpeedPriv() {
        return motorsSpeed;
    };

    /*
     * Public area
     */
    return {
        isCoordinatesClicked: isCoordinatesClickedPriv,
        getMotorsSpeed: getMotorsSpeedPriv,
        emergencyMotorsStop: stopMotors
    };
})();