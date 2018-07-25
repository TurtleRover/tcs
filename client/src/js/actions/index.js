import nipplejs from 'nipplejs'
import {throttle} from 'lodash'
import { Stream } from '../core/stream';

const actions = {
  setBootScreenState: value => state => ({ showBootScreen: value }),
  setMode: value => state => ({ mode: value }),

  settings: {
    setVisibility: value => state => ({ isVisible: !state.isVisible }),
    setVisibleCategory: value => state => ({ category: value })
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
    position: {left: '50%', top: '50%'},
    size: el.clientHeight,
    // dataOnly: true
    });
    
    manager.on('start', function (evt, nipple) {
        console.log(evt);
        nipple.on('move', (evt, data) => motorsThrottled(evt, data));
    });

    let motorsThrottled = throttle((evt, data) => {
        if (!data.hasOwnProperty('direction')) { return; }
        motors.set(treshold(data.force), convertToArrOfDirections(data.direction.angle));
        console.log(treshold(data.force), convertToArrOfDirections(data.direction.angle));        
    }, 100, { 'trailing': false });

    let treshold = (force) => force >= 1 ? 100 : (force * 100).toFixed(0);
    
    manager.on('end', function(evt, nipple) {   
        console.log(evt);
        // nipple.off('start move end dir plain');
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
      axis1: {
          setValue: val => state => ({value: val})
      },
      axis2: {
        setValue: val => state => ({value: val})
    },
  },


  log: (value) => console.log(value)
  
}

export default actions