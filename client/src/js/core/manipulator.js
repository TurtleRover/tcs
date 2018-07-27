import { Frame } from './frame';
import { helper } from '../utils/helper';


export const Manipulator = function(sockets) { 
    this.sockets = sockets;
    this.frame = new Frame();
};

Manipulator.prototype.setAxes = function (axis1, axis2) {
    console.log('[manipulator]', axis1, axis2);
    
    let frame = this.frame.manipulator(axis1, axis2);
    this.sockets.sendManipulator(frame);
}

Manipulator.prototype.setGripper = function (value) {
    console.log("[manipulator][gripper]",value);

    let frame = this.frame.gripper(value);
    this.sockets.sendGripper(frame);
    
}