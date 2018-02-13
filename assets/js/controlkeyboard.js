var controlkeyboard = (function () {

    var interval;

    var movement = {
        type: "",
        speed: 0,
        interval: 0,
        direction: [0,0,0,0]
    };

    // FORWARD
    keyboardJS.bind('up', function (e) {
        e.preventRepeat();
        movement.speed = 1;
        console.log("Keyboard: UP");
        movement.type = "run";
        movement.direction = [0, 0, 0, 0];
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed++;
            movement.interval = interval;
        }, 50);
    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        amplify.publish("controlkeyboard->servercommunication", movement);
    });

    // BACKWARD
    keyboardJS.bind('down', function (e) {
        e.preventRepeat();
        movement.speed = 1;
        movement.type = "run";
        movement.direction = [1, 1, 1, 1];
        console.log("Keyboard: DOWN");
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            movement.speed++;
            movement.interval = interval;
        }, 50);

    }, function (e) {
        clearInterval(interval);
        movement.type = "stop";
        movement.speed = 0;
        amplify.publish("controlkeyboard->servercommunication", movement);
    });
})();

