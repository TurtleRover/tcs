import keyboardJS from 'keyboardjs';

export const keyboard = function(motors) {

    var intervalUp,
        intervalDown,
        intervalLeft,
        intervalRight;

    const UPDATE_INTERVAL = 100;
    const INC = 10;
    const SPEED_LIMIT = 100;

    var speed = 0;

    // FORWARD
    keyboardJS.bind('w', function(e) {
        e.preventRepeat();
        console.log("[keyboard] UP");
        intervalUp = setInterval(function() {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, motors.direction.forward);
                console.log('[keyboard]', speed);
                speed = speed + INC;
            }
        }, UPDATE_INTERVAL);
    }, function(e) {
        clearInterval(intervalUp);
        speed = 0;
        motors.stop();
    });

    // BACKWARD
    keyboardJS.bind('s', function (e) {
        e.preventRepeat();
        console.log("[keyboard] DOWN");
        intervalDown = setInterval(function () {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, motors.direction.backward);
                console.log('[keyboard]', speed);
                speed = speed + INC;
            }
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalDown);
        speed = 0;
        motors.stop();
    });

    // LEFT
    keyboardJS.bind('a', function (e) {
        e.preventRepeat();
        console.log("[keyboard] LEFT");
        intervalLeft = setInterval(function () {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, motors.direction.left);
                console.log('[keyboard]', speed);
                speed = speed + INC;
            }
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalLeft);
        speed = 0;
        motors.stop();
    });

    // RIGHT
    keyboardJS.bind('d', function (e) {
        e.preventRepeat();
        console.log("[keyboard] RIGHT");
        intervalRight = setInterval(function () {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, motors.direction.right);
                console.log('[keyboard]', speed);
                speed = speed + INC;
            }
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalRight);
        speed = 0;
        motors.stop();
    });
};