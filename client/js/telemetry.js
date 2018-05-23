(function() {
    // TODO: make this like serviceworker ???
    let sockets = window.turtle.sockets;

    let telemetry_state = {
        battery: 0,
        signal: 0,
        temperature: ""
    };

    sockets.io.on('battery', function(voltage) {
        voltage = voltage * 0.1 + 7.6; // voltage divider
        telemetry_state.battery = voltage;

        if (voltage > 24) amplify.publish("all->ui", "set battery level to full");
        else if (voltage > 23) amplify.publish("all->ui", "set battery level to 3");
        else if (voltage > 21.5) amplify.publish("all->ui", "set battery level to 2");
        else if (voltage > 19.5) amplify.publish("all->ui", "set battery level to 1");
        else amplify.publish("all->ui", "set battery level to 0");
    });

    sockets.io.on('temperature', function(temperature) {
        telemetry_state.temperature = temperature;
    });

    sockets.io.on('signal', function(signal) {
        telemetry_state.signal = signal;

        /*
         *  set icon according to signal strength
         */
        if (signal > 95) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-4.svg");
        else if (signal > 90) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-3.svg");
        else if (signal > 85) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-2.svg");
        else if (signal > 80) $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-1.svg");
        else $("#signal-level-indicator-img").attr("src", "assets/img/ui/icon-zasieg-0.svg");
    });

    setInterval(function() {
        console.log(telemetry_state);
        if (sockets.io.connected) {
            sockets.sendBattery();
            setTimeout(function() {
                sockets.sendSignal();
            }, 500);
            setTimeout(function() {
                sockets.sendTemperature();
            }, 1000);
        }
    }, 1000);
})();
