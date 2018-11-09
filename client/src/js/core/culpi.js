export const Culpi = function Culpi(sockets) {
    this.sockets = sockets;
};

Culpi.prototype.setRotationAngle = function setRotationAngle(angle, speed) {
    console.log('Culpi.prototype.setRotationAngle', angle, speed);
    this.sockets.io.emit('culpi_rotation', { angle, speed });
};
