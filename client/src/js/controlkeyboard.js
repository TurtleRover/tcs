
import keyboardJS from 'keyboardjs';

export const keyboard = function (motors) {

    var intervalUp,
        intervalDown,
        intervalLeft,
        intervalRight;
    const UPDATE_INTERVAL = 100;
    const INC = 10;

    var movement = {
        type: "",
        speed: 0,
        interval: 0,
        direction: [0,0,0,0]
    };

    // FORWARD
    keyboardJS.bind('w', function (e) {
        e.preventRepeat();
        console.log("Keyboard: UP");
        movement.type = "run";
        movement.direction = [0, 0, 0, 0];
        intervalUp = setInterval(function () {
            motors.setFromKeyboard(movement);
            movement.speed = movement.speed + INC;
            movement.interval = intervalUp;
        }, UPDATE_INTERVAL);
    }, function (e) {
        clearInterval(intervalUp);
        movement.type = "stop";
        movement.speed = 0;
        motors.stop();
    });

    // BACKWARD
    keyboardJS.bind('s', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [1, 1, 1, 1];
        console.log("Keyboard: DOWN");
        intervalDown = setInterval(function () {
            motors.setFromKeyboard(movement);
            movement.speed = movement.speed + INC;
            movement.interval = intervalDown;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalDown);
        movement.type = "stop";
        movement.speed = 0;
        motors.stop();
    });

    // LEFT
    keyboardJS.bind('a', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [1, 0, 1, 0];
        console.log("Keyboard: LEFT");
        intervalLeft = setInterval(function () {
            motors.setFromKeyboard(movement);
            movement.speed = movement.speed + INC;
            movement.interval = intervalLeft;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalLeft);
        movement.type = "stop";
        movement.speed = 0;
        motors.stop();
    });

    // RIGHT
    keyboardJS.bind('d', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [0, 1, 0, 1];
        console.log("Keyboard: RIGHT");
        intervalRight = setInterval(function () {
            motors.setFromKeyboard(movement);
            movement.speed = movement.speed + INC;
            movement.interval = intervalRight;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(intervalRight);
        movement.type = "stop";
        movement.speed = 0;
        motors.stop();
    });
};
