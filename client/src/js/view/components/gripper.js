import { h } from 'hyperapp'
import { RangeInput } from "./elements/range-input";


export const Gripper = ({state, action}) => 
    <div class="gripperControl">
        <RangeInput 
            name=''
            state={state} 
            labelMax={IconGripperOpen} 
            labelMin={IconGripperClose}
            oninput={(value) => action.m.setGripper(value)} 
            onchange={action.gripper.setValue}/>

    </div>

const IconGripperOpen = () =>
    <img src={require("../../../img/ui/gripper-opened.svg")} class="gripperControl_icons_icon"/>

const IconGripperClose = () =>
    <img src={require("../../../img/ui/gripper-closed.svg")} class="gripperControl_icons_icon"/>