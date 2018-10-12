import { Frame } from './frame';

export const Manipulator = function Manipulator(sockets) {
    this.sockets = sockets;
    this.frame = new Frame();
};

Manipulator.prototype.setAxes = function setAxes(axis1, axis2) {
    console.log('[manipulator]', axis1, axis2);

    const frame = this.frame.manipulator(axis1, axis2);
    this.sockets.sendManipulator(frame);
};

Manipulator.prototype.setGripper = function setGripper(value) {
    console.log('[manipulator][gripper]', value);

    const frame = this.frame.gripper(value);
    this.sockets.sendGripper(frame);
};
