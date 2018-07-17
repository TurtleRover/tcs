import { h } from 'hyperapp'
import nipplejs from 'nipplejs'
import {throttle} from 'lodash'

export const Joystick = ({mode, motors}) =>
    <div class={(mode==='drive') ? 'joystick' : 'joystick joystick-hide'} oncreate={(el) => joystick(el, motors)}>
        <img class='joystick_image' src={require('../../../img/ui/right-krzyz.svg')}/>
    </div>


const joystick = (element, motors) => {
    let manager = nipplejs.create({
    zone: element,
    mode: 'static',
    position: {left: '50%', top: '50%'},
    size: element.clientHeight,
    dataOnly: true
    });
    
    manager.on('start', function (evt, nipple) {
        console.log(evt);
        nipple.on('move', (evt, data) => motorsThrottled(evt, data));
    });

    let motorsThrottled = throttle((evt, data) => {
        if (!data.hasOwnProperty('direction')) { return; }
        motors.set(treshold(data.force), convertToArrOfDirections(data.direction.angle));
        console.log(Math.round(data.force*100), convertToArrOfDirections(data.direction.angle));        
    }, 100, { 'trailing': false });

    let treshold = (force) => force >= 1 ? 100 : (force * 100).toFixed(0);
    
    manager.on('end', function(evt, nipple) {   
        console.log(evt);
        // nipple.off('start move end dir plain');
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

  }