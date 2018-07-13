import { FrameBuilder } from './frameBuilder';
import { Helper } from './utils/helper';


export const Motors = function(sockets) { 
    this.sockets = sockets;
    this.frameBuilder = new FrameBuilder();
    this.helper = new Helper();
};


Motors.prototype.stop = function() {
    if (this.sockets.io.connected) {
        var buf = new ArrayBuffer(4);
        var arr = new Uint8Array(buf);

        //  command to send
        arr[0] = 0;
        arr[1] = 0;
        arr[2] = 0;
        arr[3] = 0;
        console.log("Halt!", buf);
        this.sockets.sendMotors(buf);
    } else console.log("Connection not opened.");
};

Motors.prototype.setFromKeyboard = function(movement) {
    if (this.sockets.io.connected) {
        if (movement.type == "run") {
            if (movement.speed <= 100 && movement.speed >= -100) {
                let frame = this.frameBuilder.motorsKeyboard(movement);
                this.sockets.sendMotors(frame);
                // Convert to readable form
                console.log(this.helper.arrayToHex(this.frameBuilder.motorsArr));
            } else {
                clearInterval(movement.interval);
            }

        } else if (movement.type == "stop") {
            clearInterval(movement.interval);
            this.stop();
        }
    } else {
        console.log("Connection not opened.");
    }
}