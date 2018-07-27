import { Frame } from './frame';
import { helper } from '../utils/helper';


export const Manipulator = function(sockets) { 
    this.sockets = sockets;
    this.frame = new Frame();
};

Manipulator.prototype.setAxes = function (axis1, axis2) {
    console.log('[Manipulator]', axis1, axis2);
    
    let frame = this.frame.manipulator(axis1, axis2);
    this.sockets.sendManipulator(frame);
}

Manipulator.prototype.gripper