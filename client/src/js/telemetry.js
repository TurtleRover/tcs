// TODO: make this like serviceworker ???
import { Sockets } from './sockets';

export const telemetry = function(actions) {
    let sockets = new Sockets();

    sockets.io.on('battery', function(voltage) {
        voltage = voltage * 0.1 + 7.6; // voltage divider
        actions.telemetry.setBatteryLevel(voltage);
    });

    sockets.io.on('temperature', function(temperature) {
        actions.telemetry.setTemperature(temperature);
    });

    sockets.io.on('signal', function(signal) {
        actions.telemetry.setSignalLevel(signal);
    });

    setInterval(function() {
        if (sockets.io.connected) {
            sockets.io.emit('battery');
            sockets.io.emit('signal');
            sockets.io.emit('temperature');
        }
    }, 2000);
}