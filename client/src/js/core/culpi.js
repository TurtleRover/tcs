export const Culpi = function Culpi(sockets) {
    this.sockets = sockets;
};

Culpi.prototype.setRotationAngle = function setRotationAngle(angle) {
    console.log('Culpi.prototype.setRotationAngle', angle);
    this.sockets.io.emit('culpi', { angle, speed: 0 });
};
