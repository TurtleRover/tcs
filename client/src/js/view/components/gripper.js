import { h } from 'hyperapp'


export const Gripper = () => 
    <div class="gripperControl">

        <div class="gripperControl_icons">
            <img src={require("../../../img/ui/gripper-opened.svg")} class="gripperControl_icons_icon"/>
            <img src={require("../../../img/ui/gripper-closed.svg")} class="gripperControl_icons_icon"/>
        </div>

        <div class="range" id="gripper-slider">
                <input type="range" class="range_input" id="gripper-slider-input" max="3600" min="2400" step="10" value="3000" />
        </div>

    </div>