import io from "socket.io-client";

export const Sockets = function() { 
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

Sockets.prototype.sendMotors = function(data) {
    this.io.emit('motors', data);
};

Sockets.prototype.sendManipulator = function(data) {
    this.io.emit('manipulator', data);
};

Sockets.prototype.sendGripper = function(data) {
    this.io.emit('gripper', data);
};

