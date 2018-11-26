export const Clupi = function Clupi(sockets) {
    this.sockets = sockets;
};

Clupi.prototype.set = function set(angle, transl) {
    console.log('Clupi.prototype.set', angle, transl);
    this.sockets.io.emit('clupi', { angle, transl });
};
