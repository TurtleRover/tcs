var controlkeyboard = (function () {
    // FORWARD
    keyboardJS.bind('up', function (e) {
        // e.preventRepeat();
        console.log("Keyboard: UP");
        amplify.publish("controlkeyboard->servercommunication", "forward");
    }, function (e) {
        // steerage.softStop(socket, dutycycles);
    });

    // BACKWARD
    keyboardJS.bind('down', function (e) {
        console.log("Keyboard: DOWN");
        amplify.publish("controlkeyboard->servercommunication", "backward");

    }, function (e) {
        // steerage.softStop(socket);
    });
})();

