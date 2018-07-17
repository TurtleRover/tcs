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
    var directions = [0, 0, 0, 0];

    // FORWARD
    keyboardJS.bind('w', function(e) {
        e.preventRepeat();
        console.log("[keyboard] UP");
        directions = [0, 0, 0, 0];
        intervalUp = setInterval(function() {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, directions);
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
        directions = [1, 1, 1, 1];
        console.log("[keyboard] DOWN");
        intervalDown = setInterval(function () {
            if (speed <= SPEED_LIMIT) {

                motors.set(speed, directions);
                console.log('[keyboard]', speed);
                speed = speed + INC;
            }
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalDown);
        speed = 0;
        motors.stop();
    });

    // // LEFT
    // keyboardJS.bind('a', function (e) {
    //     e.preventRepeat();
    //     movement.type = "run";
    //     movement.direction = [1, 0, 1, 0];
    //     console.log("Keyboard: LEFT");
    //     intervalLeft = setInterval(function () {
    //         motors.setFromKeyboard(movement);
    //         movement.speed = movement.speed + INC;
    //         movement.interval = intervalLeft;
    //     }, UPDATE_INTERVAL);

    // }, function (e) {
    //     clearInterval(intervalLeft);
    //     movement.type = "stop";
    //     movement.speed = 0;
    //     motors.stop();
    // });

    // // RIGHT
    // keyboardJS.bind('d', function (e) {
    //     e.preventRepeat();
    //     movement.type = "run";
    //     movement.direction = [0, 1, 0, 1];
    //     console.log("Keyboard: RIGHT");
    //     intervalRight = setInterval(function () {
    //         motors.setFromKeyboard(movement);
    //         movement.speed = movement.speed + INC;
    //         movement.interval = intervalRight;
    //     }, UPDATE_INTERVAL);

    // }, function (e) {
    //     clearInterval(intervalRight);
    //     movement.type = "stop";
    //     movement.speed = 0;
    //     motors.stop();
    // });
};