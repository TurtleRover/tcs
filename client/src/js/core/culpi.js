export const Culpi = function Culpi(sockets) {
    this.sockets = sockets;
};

Culpi.prototype.set = function set(angle, transl) {
    console.log('Culpi.prototype.set', angle, transl);
    this.sockets.io.emit('culpi', { angle, transl });
};
