import { h } from 'hyperapp'
import nipplejs from 'nipplejs'

export const Joystick = ({mode}) => 
    <div class={(mode==='drive') ? 'joystick' : 'joystick joystick-hide'} oncreate={(element) => attach_joystick(element)}>
        <img class="joystick_image" src={require("../../../img/ui/right-krzyz.svg")}/>
    </div>


export const attach_joystick = function(element) {
    let manager = nipplejs.create({
        zone: element,
        mode: 'static',
        // color: 'rgba(0,0,0,0)',
        position: {left: '50%', top: '50%'},
        size: element.clientHeight
    });

      
    manager.on('start', function(evt, nipple) {
        console.log(evt);
        nipple.on('move', function(evt, data) {
            console.log(data);
            

        });
    }).on('end', function(evt, nipple) {   
        console.log(evt);
        // nipple.off('start move end dir plain');
    });
}



