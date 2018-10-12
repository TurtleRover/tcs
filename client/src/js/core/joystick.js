import nipplejs from 'nipplejs';
import { throttle } from 'lodash';

export const joystick = function joystick({ el, motors }) {
    const manager = nipplejs.create({
        zone: el,
        mode: 'static',
        position: { right: '55%', bottom: '55%' },
        size: el.clientHeight,
        // dataOnly: true
    });

    let speed = 0;
    let direction = motors.direction.forward;
    let interval;

    manager.on('start', (eventStart, nipple) => {
        // console.log(evt);
        nipple.on('move', (eventMove, data) => throttledGetDataFromJoystick(eventMove, data));

        interval = setInterval(() => motors.set(speed, direction), 100);
    });

    const getDataFromJoystick = (eventMove, data) => {
        if (!Object.prototype.hasOwnProperty.call(data, 'direction')) { return; }
        speed = treshold(data.force);
        direction = convertToArrOfDirections(data.direction.angle);
        console.log('[joystick]', speed, direction);
    };

    let throttledGetDataFromJoystick = throttle((eventMove, data) => getDataFromJoystick(eventMove, data), 100, { trailing: false });

    let treshold = (force) => (force >= 1 ? 100 : (force * 100).toFixed(0));

    manager.on('end', (eventEnd) => {
        clearInterval(interval);
        console.log('[joystick interval]', interval);
        speed = 0;
        console.log(eventEnd);
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
    };
};
