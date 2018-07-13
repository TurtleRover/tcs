// TODO: make this like serviceworker ???
import { Sockets } from './sockets';

export const telemetry = function(actions) {
    let sockets = new Sockets();

    let telemetry_state = {
        battery: 0,
        signal: 0,
        temperature: ""
    };

    sockets.io.on('battery', function(voltage) {
        voltage = voltage * 0.1 + 7.6; // voltage divider
        telemetry_state.battery = voltage;

        actions.telemetry.setBatteryLevel(voltage);
    });

    sockets.io.on('temperature', function(temperature) {
        telemetry_state.temperature = temperature;
        actions.telemetry.setTemperature(temperature);
    });

    sockets.io.on('signal', function(signal) {
        telemetry_state.signal = signal;
        actions.telemetry.setSignalLevel(signal);
    });
    setInterval(function() {
        if (sockets.io.connected) {
            console.log(telemetry_state);
            sockets.sendBattery();
            setTimeout(function() {
                sockets.sendSignal();
            }, 500);
            setTimeout(function() {
                sockets.sendTemperature();
            }, 1000);
        }
    }, 1000);
}