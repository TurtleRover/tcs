(function() {
    const frameBuilder = function() {
        this.motorsBuf = new ArrayBuffer(5);
        this.motorsArr = new Uint8Array(this.motorsBuf);

        this.gripperBuf = new ArrayBuffer(3);
        this.gripperArr = new Uint8Array(this.gripperBuf);
    };

    frameBuilder.prototype.motor = function(value) {
        // Multiplying by this value should make possible to write directly to PWM
        // Current range is 0 - 127 with first bit as direction
        let k = 1.27;
        return Math.round(Math.abs(value * k) | (value & 0x80));
    };

    frameBuilder.prototype.motors = function(motorsSpeed) {
        this.motorsArr[0] = 0x10;
        this.motorsArr[1] = this.motor(motorsSpeed.motor_1); //	Left front
        this.motorsArr[2] = this.motor(motorsSpeed.motor_2); //	Right front
        this.motorsArr[3] = this.motor(motorsSpeed.motor_3); //	Left rear
        this.motorsArr[4] = this.motor(motorsSpeed.motor_4); //	Right rear
        return this.motorsBuf;
    };

    // THIS IS NOT OK. TODO: MERGE THESE TWO MOTORS FUNCTIONS !!!
    // Probably canvas also should return array of directions, not minus value

    frameBuilder.prototype.motorKeyboard = function(value) {
        let k = 1.27;
        return Math.round(Math.abs(value.speed * k) | (value.direction[1] << 7));
    };

    frameBuilder.prototype.motorsKeyboard = function(mov) {
        this.motorsArr[0] = 0x10;
        console.log(mov);
        this.motorsArr[1] = this.motorKeyboard(mov); //	Left front
        this.motorsArr[2] = this.motorKeyboard(mov); //	Right front
        this.motorsArr[3] = this.motorKeyboard(mov); //	Left rear
        this.motorsArr[4] = this.motorKeyboard(mov); //	Right rear
        return this.motorsBuf;
    };

    frameBuilder.prototype.gripper = function(gripperPosition) {
        this.gripperArr[0] = 0x94;
        console.log("Gripper position: " + gripperPosition);
        this.gripperArr[1] = (gripperPosition >> 8) & 0xFF;
        this.gripperArr[2] = gripperPosition & 0xFF;
        return this.gripperBuf;
    };

    frameBuilder.prototype.manipulator = function(axis_1, axis_2) {
        this.motorsArr[0] = 0x84;
        console.log("Mani position: " + axis_1 + "\t" + axis_2);
        this.motorsArr[1] = (axis_1 >> 8) & 0xFF;
        this.motorsArr[2] = axis_1 & 0xFF;
        this.motorsArr[3] = (axis_2 >> 8) & 0xFF;
        this.motorsArr[4] = axis_2 & 0xFF;
        return this.motorsBuf;
    };

    window.turtle.frameBuilder = frameBuilder;
})();
