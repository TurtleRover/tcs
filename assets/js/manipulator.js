/*
 *  this file contains functions which support manipulator control functionality
 * 
 *  It uses the Revealing Module Pattern
 *  https://addyosmani.com/resources/essentialjsdesignpatterns/book/#revealingmodulepatternjavascript
 */

var manipulator = ( function () {
    /*
     *                                                                      PRIVATE area
     */

    const INTERVAL = 20;    //  20 ms is the period of servo timing. It is used in this approach to change speed of servo mechanisms

    /*
     *  X0 and Y0 are the resting place coordinates (stow)
     */
    const X0 = 5;
    const Y5 = 5;

    //  object constructor for the array elements
    function position(servo_1, servo_2) {
        this.servo1 = servo_1;
        this.servo2 = servo_2;
    }

    //  contains coordinates for the anglesArray
    var currentPosition = {
        x: 0,
        y: 0,
        checkDimensions: function () {
            if (x >= anglesArray.length) this.x = anglesArray.length;
            else if (x < 0) this.x = 0;

            if (y >= anglesArray[0].length) this.y = anglesArray[0].length;
            else if (x < 0) this.y = 0;
        }
    }

    //  generated values for servo and different angles
    var anglesArray = [
        [new position(1200, 1200),      new position(1500, 1500),       new position(1800, 1800)],
        [new position(1300, 1300),      new position(1600, 1600),       new position(1900, 1900)],
        [new position(1400, 1400),      new position(1700, 1700),       new position(2000, 2000)]
    ];

    /*
	 * 																		SUBSCRIBE to all topics
	 */
    amplify.subscribe("controlCanvas->manipulator", controlCanvasCallback);

    /*
     *                                                                      CALLBACKS
     */
    function controlCanvasCallback(message) {
        if (DEBUG) console.log("controlCanvasCallback: " + message);
		if (DEBUG) amplify.publish("all->utests", message);

        switch (message) {
            case "move":
                break;
            case "stow":
                break;
            case "stop":
                break;
            default:
                console.log("unknown command: " + message);
        }
    };

    /*
     *                                                                      MOVE functionality
     */

    var moveInterval;
    /*
     *  move in the desired direction
     */
    function move() {
        var manipulatorMove = controlCanvas.getManipulatorMove();

        moveInterval = setInterval(nextStep, INTERVAL, manipulatorMove);
    };

    function stop(){
        clearInterval(moveInterval);
    };

    /*
     *  execute next step in intervals
     */
    function nextStep(manipulatorMove) {
        var newStep = currentPosition;

        switch(manipulatorMove.direction) {
            case "up":
                newStep.y++;
                break;
            case "down":
                newStep.y--;
                break;
            case "right":
                newStep.x++;
                break;
            case "left":
                newStep.x--;
                break;
            default:
                console.log("wrong direction");
        }

        //  to nearest if outside range
        newStep.checkDimensions();
    };

    /*
     *                                                                      PUBLIC area
     */
    return {
        getCurrentPosition : getCurrentPositionPriv,
        setPosition : setPositionPriv
    };
})();

