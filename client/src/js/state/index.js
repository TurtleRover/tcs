// import localforage from "localforage";

// localforage.config({
//     name: 'TCS',
//     storeName: 'state'
// });


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

// localforage.setItem('global', state).then(function (value) {
//     // Do other things once the value has been saved.
//     console.log('LocalForage SET', value);
// }).catch(function(err) {
//     // This code runs if there were any errors
//     console.error(err);
// });

export default state;