import { h } from 'hyperapp'
import nipplejs from 'nipplejs'


export const Joystick = ({mode, motors}) =>
    <div class={(mode==='drive') ? 'joystick' : 'joystick joystick-hide'} oncreate={(el) => joystick(el, motors)}>
        <img class="joystick_image" src={require("../../../img/ui/right-krzyz.svg")}/>
    </div>


const joystick = (element, motors) => {
    let manager = nipplejs.create({
    zone: element,
    mode: 'static',
    position: {left: '50%', top: '50%'},
    size: element.clientHeight,
    dataOnly: true
    });
    
    manager.on('start', function(evt, nipple) {
      console.log(evt);
      nipple.on('move', function(evt, data) {

          motors.set(Math.round(data.distance), convertToArrOfDirections(data.direction));
          console.log(Math.round(data.distance), convertToArrOfDirections(data.direction));
          

      });
    }).on('end', function(evt, nipple) {   
        console.log(evt);
        // nipple.off('start move end dir plain');
    });

    const convertToArrOfDirections = (direction) => {
      if (typeof direction !== "undefined" ) {
        if (direction.angle === "up") {
          return [0, 0, 0, 0];
        } else if (direction.angle === "down") {
          return [1, 1, 1, 1];
        } else if (direction.angle === "left") {
          return [1, 0, 1, 0];
        } else if (direction.angle === "right") {
          return [0, 1, 0, 1];
        }
      } else {
        return [0, 0, 0, 0];
      }
    }

  }