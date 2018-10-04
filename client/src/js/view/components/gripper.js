import { h } from 'hyperapp';
import { throttle } from 'lodash';
import { RangeInput } from './elements/range-input';


export const Gripper = ({ state, action }) =>
    <div class="gripperControl">
        <RangeInput
            name=''
            state={state}
            labelMax={IconGripperOpen}
            labelMin={IconGripperClose}
            oninput={(value) => setGripperThrottled(value, action)}
            setValue={action.gripper.setValue}
        />

    </div>;

const IconGripperOpen = () =>
    <img alt="" src={require('../../../img/ui/gripper-opened.svg')} class="gripperControl_icons_icon" />;

const IconGripperClose = () =>
    <img alt="" src={require('../../../img/ui/gripper-closed.svg')} class="gripperControl_icons_icon" />;

const setGripperThrottled = throttle((value, action) => action.m.setGripper(value), 100, { trailing: false });
