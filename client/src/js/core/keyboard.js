import keyboardJS from 'keyboardjs';

export const keyboard = function(motors) {

    var intervalUp,
        intervalDown,
        intervalLeft,
        intervalRight;

    const UPDATE_INTERVAL = 100;
    const SPEED_STEP = 10;
    const SPEED_MAX = 100;
    const SPEED_MIN = 10;

    var speed = SPEED_MIN;

    // FORWARD
    keyboardJS.bind('w', function(e) {
        e.preventRepeat();
        console.log("[keyboard] UP");
        intervalUp = setInterval(function() {
            if (speed < SPEED_MAX) {
                console.log('[keyboard]', speed);
                speed = speed + SPEED_STEP;
            }
            motors.set(speed, motors.direction.forward);

        }, UPDATE_INTERVAL);
    }, function(e) {
        clearInterval(intervalUp);
        speed = SPEED_MIN;
        motors.stop();
    });

    // BACKWARD
    keyboardJS.bind('s', function (e) {
        e.preventRepeat();
        console.log("[keyboard] DOWN");
        intervalDown = setInterval(function () {
            if (speed < SPEED_MAX) {
                console.log('[keyboard]', speed);
                speed = speed + SPEED_STEP;
            }
            motors.set(speed, motors.direction.backward);

        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalDown);
        speed = SPEED_MIN;
        motors.stop();
    });

    // LEFT
    keyboardJS.bind('a', function (e) {
        e.preventRepeat();
        console.log("[keyboard] LEFT");
        intervalLeft = setInterval(function () {
            if (speed < SPEED_MAX) {
                console.log('[keyboard]', speed);
                speed = speed + SPEED_STEP;
            }
            motors.set(speed, motors.direction.left);

        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalLeft);
        speed = SPEED_MIN;
        motors.stop();
    });

    // RIGHT
    keyboardJS.bind('d', function (e) {
        e.preventRepeat();
        console.log("[keyboard] RIGHT");
        intervalRight = setInterval(function () {
            if (speed < SPEED_MAX) {
                console.log('[keyboard]', speed);
                speed = speed + SPEED_STEP;
            }
            motors.set(speed, motors.direction.right);

        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalRight);
        speed = SPEED_MIN;
        motors.stop();
    });
};