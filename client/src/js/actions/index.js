import nipplejs from 'nipplejs'
import {throttle, zipObjectDeep, merge} from 'lodash'

let save = (prefix, state) => {
    let key = Object.keys(state);    
    if (prefix) { prefix = prefix + '.'; }
    localStorage.setItem(prefix + key, JSON.stringify(state[key]));
    return state;
}

const actions = {
    restoreState: v => state => {
        let props = Object.keys(localStorage);
        props.forEach((prop) => {
            let zipped = zipObjectDeep([prop], [JSON.parse(localStorage[prop])]);
            merge(state, zipped);
            console.log('Restore', prop, zipped);
        });
        console.log('State after restore', state);
    },

    setSystemInfo: value => state => ({system_info: value}),

    setBootScreenState: value => state => ({ showBootScreen: value }),
    setMode: value => state => save('', { mode: value }),

    settings: {
        setVisibility: value => state => save('settings', { isVisible: !state.isVisible }),
        setVisibleCategory: value => state => save('settings', {category: value }),
    },

    telemetry: {
        setBatteryLevel: value => state => ({ batteryLevel: value }),
        setSignalLevel: value => state => ({ signalLevel: value }),
        setTemperature: value => state => ({ temperature: value }),
    },

    motors: null,
  

    joystick: ({el, motors}) => {
        
        let manager = nipplejs.create({
            zone: el,
            mode: 'static',
            position: {right: '55%', bottom: '55%'},
            size: el.clientHeight,
            // dataOnly: true
        });

        var force = 0;
        var angle = "up";
        var interval;
        
        manager.on('start', function (evt, nipple) {
            // console.log(evt);
            nipple.on('move', (evt, data) => getDataFromJoystick(evt, data, force, angle));

            interval = setInterval( () => motors.set(force, angle), 100);

        });

        let getDataFromJoystick = (evt, data) => {
            if (!data.hasOwnProperty('direction')) { return; }
            force = treshold(data.force);
            angle = convertToArrOfDirections(data.direction.angle);
            console.log('[joystick]', treshold(data.force), convertToArrOfDirections(data.direction.angle));        
        };

        let treshold = (force) => force >= 1 ? 100 : (force * 100).toFixed(0);
        
        manager.on('end', function(evt, nipple) { 
            clearInterval(interval);
            console.log("[joystick interval]", interval);
            force = 0;
            console.log(evt);
            motors.stop();
        });

        const convertToArrOfDirections = (angle) => {
            switch (angle) {
                case 'up':
                    return motors.direction.forward;
                case 'down':
                    return motors.direction.backward;
                case 'left':
                    return motors.direction.left;
                case 'right':
                    return motors.direction.right;
                default:
                    break;
            }
        }
    },

    stream: null,
    manipulator: {
        m: null,
        axis1: {
            setValue: val => state =>  save('manipulator.axis1',{value: val}),
            incMax: step => state => save('manipulator.axis1', {max: state.max + step}),
            decMax: step => state => save('manipulator.axis1', {max: state.max - step}),
            incMin: step => state => save('manipulator.axis1', {min: state.min + step}),
            decMin: step => state => save('manipulator.axis1', {min: state.min - step})
        },
        axis2: {
            setValue: val => state => save('manipulator.axis2', {value: val}),
            incMax: step => state => save('manipulator.axis2', {max: state.max + step}),
            decMax: step => state => save('manipulator.axis2', {max: state.max - step}),
            incMin: step => state => save('manipulator.axis2', {min: state.min + step}),
            decMin: step => state => save('manipulator.axis2', {min: state.min - step})
        },
        gripper: {
            setValue: val => state => save('manipulator.gripper', {value: val}),
            incMax: step => state => save('manipulator.gripper', {max: state.max + step}),
            decMax: step => state => save('manipulator.gripper', {max: state.max - step}),
            incMin: step => state => save('manipulator.gripper', {min: state.min + step}),
            decMin: step => state => save('manipulator.gripper', {min: state.min - step})
        }
    },

    log: (value) => console.log(value),
    
    system: null
  
}

export default actions