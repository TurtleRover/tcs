// TODO: make this like serviceworker ???

export const telemetry = function telemetry(actions, sockets) {
    sockets.io.on('telemetry', (data) => {
        actions.telemetry.setSignalLevel(data.signal);
        actions.telemetry.setTemperature(data.temperature);
        actions.telemetry.setBatteryLevel(data.battery * 0.1 + 7.6); // voltage divider
    });

    setInterval(() => {
        if (sockets.io.connected) {
            sockets.io.emit('telemetry');
        }
    }, 2000);
};
