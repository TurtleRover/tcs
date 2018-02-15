var controlkeyboard = (function () {

    var interval;
    const UPDATE_INTERVAL = 100;
    const INC = 10;

    var movement = {
        type: "",
        speed: 0,
        interval: 0,
        direction: [0,0,0,0]
    };

    // FORWARD
    keyboardJS.bind('up', function (e) {
        e.preventRepeat();
        console.log("Keyboard: UP");
        movement.type = "run";
        movement.direction = [0, 0, 0, 0];
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed = movement.speed + INC;  
            movement.interval = interval;
        }, UPDATE_INTERVAL);
    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        movement.speed = 0;
        amplify.publish("controlkeyboard->servercommunication", movement);
    });

    // BACKWARD
    keyboardJS.bind('down', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [1, 1, 1, 1];
        console.log("Keyboard: DOWN");
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed = movement.speed + INC;  
            movement.interval = interval;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        movement.speed = 0;
        amplify.publish("controlkeyboard->servercommunication", movement);
    });

    // LEFT
    keyboardJS.bind('left', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [1, 0, 1, 0];
        console.log("Keyboard: LEFT");
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed = movement.speed + INC;  
            movement.interval = interval;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        movement.speed = 0;
        amplify.publish("controlkeyboard->servercommunication", movement);
    });

    // RIGHT
    keyboardJS.bind('right', function (e) {
        e.preventRepeat();
        movement.type = "run";
        movement.direction = [0, 1, 0, 1];
        console.log("Keyboard: RIGHT");
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed = movement.speed + INC;  
            movement.interval = interval;
        }, UPDATE_INTERVAL);

    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        movement.speed = 0;
        amplify.publish("controlkeyboard->servercommunication", movement);
    });
})();

