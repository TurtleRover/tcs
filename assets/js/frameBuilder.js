(function() {
    const frameBuilder = function() {
        this.motorsBuf = new ArrayBuffer(5);
        this.motorsArr = new Uint8Array(this.motorsBuf);
    };

    frameBuilder.prototype.motor = function (value) {
        // Multiplying by this value should make possible to write directly to PWM
        // Current range is 0 - 127 with first bit as direction
        let k = 1.27;
        return Math.round(Math.abs(value * k) | (value & 0x80));
    };

    frameBuilder.prototype.motors = function (motorsSpeed) {
        this.motorsArr[0] = 0x10;
        this.motorsArr[1] = this.motor(motorsSpeed.motor_1); //	Left front
        this.motorsArr[2] = this.motor(motorsSpeed.motor_2); //	Right front
        this.motorsArr[3] = this.motor(motorsSpeed.motor_3); //	Left rear
        this.motorsArr[4] = this.motor(motorsSpeed.motor_4); //	Right rear
        return this.motorsBuf;
    };

    window.turtle.frameBuilder = frameBuilder;
})();
