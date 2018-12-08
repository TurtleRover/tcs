const state = {
    system_info: {
        tcs_ver: 'N/A',
        firmware_ver: 'N/A',
        wifi_dongle: 'N/A',
        video_devices: [],
    },

    stream: {
        isFallback: false,
    },

    showSplashScreen: true,
    mode: 'drive',
    manipulator: {
        axis1: {
            min: 2800,
            max: 4850,
            step: 10,
            value: 3300,
        },
        axis2: {
            min: 2700,
            max: 4450,
            step: 10,
            value: 3300,
        },
        gripper: {
            min: 2400,
            max: 3600,
            step: 10,
            value: 3300,
        },
    },

    settings: {
        isVisible: false,
        category: 'manipulator',
    },
    telemetry: {
        batteryLevel: 0,
        signalLevel: 0,
        temperature: '',
    },

    default: {},
    preprogram: {
        running: false,
        iid: 0,
        sid: 0,
        blocks: [{
            direction: 'fw',
            speed: 1,
            time: 1,
        }],
        next: {
            direction: 'fw',
            speed: 0,
            time: 0,
            step: 1,
        },
    },

    clupi: {
        isVisible: false,
        rotation: {
            angle: 0,
            maxAngle: 1023,
            minAngle: 0,
            midAngle: 512,
            step: 1,
        },
        translation: {
            valueUp: 127,
            valueDown: 255,
            maxUp: 127,
            minUp: 0,
            maxDown: 255,
            minDown: 128,
        },
    },
};

export default state;
