(function() {
    const sockets = function() {
        this.io = io.connect('http://' + document.domain + ':' + 5000, {
            transports: ['websocket']
        });
        this.io.on('connect', function() {
            console.info("[sockets] Connection established via WebSockets");
        });
        this.io.on('response', function(msg) {
            console.info("[sockets] Response:", msg);
        });
    };

    sockets.prototype.sendMotors = function (data) {
         this.io.emit('motors', data);
    };
    sockets.prototype.sendManipulator = function (data) {
         this.io.emit('manipulator', data);
    };
    sockets.prototype.sendGripper = function (data) {
         this.io.emit('gripper', data);
    };
    sockets.prototype.sendBattery = function () {
         this.io.emit('battery');
    };
    sockets.prototype.sendSignal = function () {
         this.io.emit('signal');
    };
    sockets.prototype.sendTemperature = function () {
         this.io.emit('temperature');
    };

    window.turtle.sockets = new sockets();
})();
