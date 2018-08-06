let state = {
    showBootScreen: true,
    mode: 'drive',
    manipulator: {
        axis1: {
            min: 2200,
            max: 5000,
            step: 10,
            value: 4600
        },
        axis2: {
            min: 2700,
            max: 5000,
            step: 10,
            value: 3400
        },
        gripper: {
            min: 2400,
            max: 3600,
            step: 10,
            value: 3000
        },
    },
    
    settings: {
        isVisible: true,
        category: 'manipulator'
    },
    telemetry: {
        batteryLevel: 0,
        signalLevel: 0,
        temperature: ""
    }
};

export default state;