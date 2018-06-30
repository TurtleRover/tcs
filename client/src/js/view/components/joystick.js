import { h } from 'hyperapp'


export const Joystick = () => 
    <div class="joystick">
        <canvas id="navigation-ring-canvas"></canvas>
        <img class="joystick_image" src={require("../../../img/ui/right-krzyz.svg")}/>
    </div>
