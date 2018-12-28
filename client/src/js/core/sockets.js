import io from 'socket.io-client';

export const Sockets = function Sockets(actions) {
    this.io = io.connect('http://' + document.domain + '/sockets', {
        transports: ['websocket'],
    });
    this.io.on('connect', () => {
        console.info('[sockets] Connection established via WebSockets');
    });
    this.io.on('connected', (msg) => {
        actions.setSystemInfo(msg);
    });
    this.io.on('response', (msg) => {
        console.info('[sockets] Response:', msg);
    });
    this.io.on('error', (error) => {
        console.error('[socketio]', error);
    });
    this.io.on('connect_error', (error) => {
        console.error('[socketio] connect error');
    });
    this.io.on('connect_timeout', (error) => {
        console.error('[socketio] connect timeout');
    });
    this.io.on('reconnect_error', (error) => {
        console.error('[socketio] reconnect error');
    });
    this.io.on('reconnect_failed', (error) => {
        console.error('[socketio] reconnect failed');
    });
      
      
};

Sockets.prototype.sendMotors = function sendMotors(data) {
    this.io.emit('motors', data);
};

Sockets.prototype.sendManipulator = function sendManipulator(data) {
    this.io.emit('manipulator', data);
};

Sockets.prototype.sendGripper = function sendGripper(data) {
    this.io.emit('gripper', data);
};
