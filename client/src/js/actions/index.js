import { forIn, startsWith, zipObjectDeep, merge } from 'lodash';

export const save = (prefix, state) => {
    const key = Object.keys(state);
    if (prefix) { prefix += '.'; }
    localStorage.setItem(prefix + key, JSON.stringify(state[key]));
    return state;
};

const actions = {
    restoreState: v => state => {
        const props = Object.keys(localStorage);
        props.forEach((prop) => {
            const zipped = zipObjectDeep([prop], [JSON.parse(localStorage[prop])]);
            merge(state, zipped);
            console.info('Restore', prop, zipped);
        });
        // console.log('State after restore', state);
    },

    setSystemInfo: value => state => ({ system_info: value }),

    setSplashScreenState: value => state => ({ showSplashScreen: value }),
    setMode: value => state => save('', { mode: value }),

    settings: {
        setVisibility: value => state => save('settings', { isVisible: !state.isVisible }),
        setVisibleCategory: value => state => save('settings', { category: value }),
    },

    telemetry: {
        setBatteryLevel: value => state => ({ batteryLevel: value }),
        setSignalLevel: value => state => ({ signalLevel: value }),
        setTemperature: value => state => ({ temperature: value }),
    },

    motors: null,
    joystick: null,
    stream: null,
    sockets: null,
    logs: null,
    manipulator: {
        m: null,
        axis1: {
            setValue: val => state => save('manipulator.axis1', { value: val }),
            incMax: step => state => save('manipulator.axis1', { max: state.max + state.step }),
            decMax: step => state => save('manipulator.axis1', { max: state.max - state.step }),
            incMin: step => state => save('manipulator.axis1', { min: state.min + state.step }),
            decMin: step => state => save('manipulator.axis1', { min: state.min - state.step }),
        },
        axis2: {
            setValue: val => state => save('manipulator.axis2', { value: val }),
            incMax: step => state => save('manipulator.axis2', { max: state.max + state.step }),
            decMax: step => state => save('manipulator.axis2', { max: state.max - state.step }),
            incMin: step => state => save('manipulator.axis2', { min: state.min + state.step }),
            decMin: step => state => save('manipulator.axis2', { min: state.min - state.step }),
        },
        gripper: {
            setValue: val => state => save('manipulator.gripper', { value: val }),
            incMax: step => state => save('manipulator.gripper', { max: state.max + state.step }),
            decMax: step => state => save('manipulator.gripper', { max: state.max - state.step }),
            incMin: step => state => save('manipulator.gripper', { min: state.min + state.step }),
            decMin: step => state => save('manipulator.gripper', { min: state.min - state.step }),
        },
        reset: (defaultState) => state => {
            forIn(window.localStorage, (value, objKey) => {
                if (true === startsWith(objKey, 'manipulator')) {
                    window.localStorage.removeItem(objKey);
                }
            });
            return defaultState;
        },
    },

    log: (value) => console.log(value),

    system: null,
    preprogram: {
        start1: ({ blocks, motors, preprogram }) => (state) => {
            const waitFor = (ms) => new Promise(r => {
                state.sid = setTimeout(r, ms);
                return state.sid;
            });
            const asyncForEach = async (array, callback) => {
                for (let index = 0; index < array.length; index++) {
                    // eslint-disable-next-line no-await-in-loop
                    await callback(array[index], index, array);
                }
            };
            const convertToArrOfDirections = (dir) => {
                switch (dir) {
                    case 'fw':
                        return motors.direction.forward;
                    case 'bw':
                        return motors.direction.backward;
                    case 'l':
                        return motors.direction.left;
                    case 'r':
                        return motors.direction.right;
                    default:
                        break;
                }
            };
            const run = async () => {
                await asyncForEach(blocks, async (block) => {
                    state.iid = setInterval(() => {
                        console.log('[pre-program]:', block.speed, motors);
                        motors.set(block.speed, convertToArrOfDirections(block.direction));
                    }, 100);
                    await waitFor(block.time * 1000);
                    clearInterval(state.iid);
                });
                preprogram.stop({ motors });
                console.log('[pre-program]: Done');
            };
            console.log(run());
            // return { running: !state.running };
        },

        stop: ({ motors }) => state => {
            motors.stop();
            clearInterval(state.iid);
            clearTimeout(state.sid);
            return { running: !state.running };
        },
        setRunningFlag: () => state => ({ running: !state.running }),

        add: () => state => ({ blocks: state.blocks.concat(state.next) }),

        remove: (index) => state => ({ blocks: state.blocks.filter(block => state.blocks.indexOf(block) !== index) }),
        next: {
            setDirection: dir => state => ({ direction: dir }),
            incSpeed: cb => state => {
                const nextSpeed = state.speed + state.step;
                if (nextSpeed <= 100) {
                    return { speed: nextSpeed };
                }
            },
            decSpeed: cb => state => {
                const nextSpeed = state.speed - state.step;
                if (nextSpeed >= 0) {
                    return { speed: nextSpeed };
                }
            },
            incTime: cb => state => {
                const nextTime = state.time + state.step;
                if (nextTime <= 60) {
                    return { time: nextTime };
                }
            },
            decTime: cb => state => {
                const nextTime = state.time - state.step;
                if (nextTime >= 0) {
                    return { time: nextTime };
                }
            },
        },
    },

    clupi: {
        c: null,
        setVisibility: value => state => save('clupi', { isVisible: value }),
        rotation: {
            inc: (cb) => state => {
                const nextAngle = state.angle + state.step;
                if (nextAngle <= state.maxAngle) {
                    cb(nextAngle);
                    return save('clupi.rotation', { angle: nextAngle });
                }
            },
            dec: (cb) => state => {
                const nextAngle = state.angle - state.step;
                if (nextAngle >= state.minAngle) {
                    cb(nextAngle);
                    return save('clupi.rotation', { angle: nextAngle });
                }
            },
            max: value => state => save('clupi.rotation', { angle: state.maxAngle }),
            min: value => state => save('clupi.rotation', { angle: state.minAngle }),
            mid: value => state => save('clupi.rotation', { angle: state.midAngle }),
        },
        translation: {
            up: (cb) => state => {
                if (state.valueUp <= state.maxUp) {
                    cb(state.valueUp);
                }
            },
            down: (cb) => state => {
                if (state.valueDown <= state.maxDown) {
                    cb(state.valueDown);
                }
            },
        },
    },
};

export default actions;
