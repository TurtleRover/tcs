import { h } from 'hyperapp'


export const Joystick = ({mode}) => 
    <div class={(mode==='drive') ? 'joystick' : 'joystick joystick-hide'}>
        <canvas id="navigation-ring-canvas"></canvas>
        <img class="joystick_image" src={require("../../../img/ui/right-krzyz.svg")}/>
    </div>
