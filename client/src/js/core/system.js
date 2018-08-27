export const System = function(sockets) { 
    this.sockets = sockets;
    console.log('SYSTEM');
    
};

System.prototype.shutdown = function () {
    if (this.sockets.io.connected) {
        this.sockets.io.emit('shutdown');
    }
};