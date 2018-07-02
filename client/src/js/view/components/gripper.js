import { h } from 'hyperapp'
import { RangeInput } from "./elements/range-input";


export const Gripper = ({state}) => 
    <div class="gripperControl">
        <RangeInput text='' state={state} labelMax={IconGripperOpen} labelMin={IconGripperClose}/>
    </div>

const IconGripperOpen = () =>
    <img src={require("../../../img/ui/gripper-opened.svg")} class="gripperControl_icons_icon"/>

const IconGripperClose = () =>
    <img src={require("../../../img/ui/gripper-closed.svg")} class="gripperControl_icons_icon"/>