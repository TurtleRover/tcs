var controlkeyboard = (function () {

    var interval;

    var movement = {
        type: "",
        speed: 0,
        interval: 0
    };

    // FORWARD
    keyboardJS.bind('up', function (e) {
        e.preventRepeat();
        movement.speed = 1;
        console.log("Keyboard: UP");
        movement.type = "forward";
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", movement);
            console.log("intervalForward", movement.speed);
            movement.speed++;
            movement.interval = interval;
        }, 50);
    }, function (e) {
        clearInterval(interval);
        amplify.publish("controlkeyboard->servercommunication", "stop");
    });

    // BACKWARD
    keyboardJS.bind('down', function (e) {
        console.log("Keyboard: DOWN");
        interval = setInterval(function () {
            amplify.publish("controlkeyboard->servercommunication", "backward");
            console.log("intervalForward", t);
            t++;
        }, 50);

    }, function (e) {
        clearInterval(interval);
        amplify.publish("controlkeyboard->servercommunication", "stop");
    });
})();

