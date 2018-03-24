(function() {
    const sockets = function() {
        this.io = io.connect('http://' + document.domain + ':' + 5000, {
            transports: ['websocket']
        });
        this.io.on('connect', function() {
            console.info("[sockets] Connection established via WebSockets");
        });
    };

    sockets.prototype.sendMotors = function (data) {
         this.io.emit('motors', data);
    };
    
    window.turtle.sockets = sockets;
})();
