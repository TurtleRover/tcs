export const Frame = function() {
    this.motorsBuf = new ArrayBuffer(4);
    this.motorsArr = new Uint8Array(this.motorsBuf);

    this.gripperBuf = new ArrayBuffer(2);
    this.gripperArr = new Uint8Array(this.gripperBuf);

    this.batteryBuf = new ArrayBuffer(1);
    this.batteryArr = new Uint8Array(this.gripperBuf);
};

Frame.prototype.motor = function(value) {
    // Multiplying by this value should make possible to write directly to PWM
    // Current range is 0 - 127 with first bit as direction
    // Gets 0-100 
    let k = 1.27;
    return Math.round(Math.abs(value * k) | (value & 0x80));
};

Frame.prototype.motors = function(speed, directions) {   
    this.motorsArr.forEach ((motor, index) => {
        this.motorsArr[index] = Math.abs(speed * 1.27) | (directions[index] << 7);
    });
    return this.motorsBuf;
};

Frame.prototype.gripper = function(gripperPosition) {
    console.log("Gripper position: " + gripperPosition);
    this.gripperArr[0] = (gripperPosition >> 8) & 0xFF;
    this.gripperArr[1] = gripperPosition & 0xFF;
    return this.gripperBuf;
};

Frame.prototype.manipulator = function(axis_1, axis_2) {
    console.log("Mani position: " + axis_1 + "\t" + axis_2);
    this.motorsArr[0] = (axis_1 >> 8) & 0xFF;
    this.motorsArr[1] = axis_1 & 0xFF;
    this.motorsArr[2] = (axis_2 >> 8) & 0xFF;
    this.motorsArr[3] = axis_2 & 0xFF;
    return this.motorsBuf;
};

Frame.prototype.battery = function(axis_1, axis_2) {
    console.log("Mani position: " + axis_1 + "\t" + axis_2);
    this.motorsArr[0] = (axis_1 >> 8) & 0xFF;
    this.motorsArr[1] = axis_1 & 0xFF;
    this.motorsArr[2] = (axis_2 >> 8) & 0xFF;
    this.motorsArr[3] = axis_2 & 0xFF;
    return this.motorsBuf;
};