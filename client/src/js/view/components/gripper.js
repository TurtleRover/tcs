import { h } from 'hyperapp';
import { throttle } from 'lodash';
import { RangeInput } from './elements/range-input';


export const Gripper = ({ mode, state, action }) =>
    <div class={(mode === 'grab') ? 'gripperControl' : 'gripperControl gripperControl--hide'}>
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
    <img alt="" src={require('../../../img/ui/gripper-opened.svg')} class="gripperControl__icons__icon" />;

const IconGripperClose = () =>
    <img alt="" src={require('../../../img/ui/gripper-closed.svg')} class="gripperControl__icons__icon" />;

const setGripperThrottled = throttle((value, action) => action.m.setGripper(value), 100, { trailing: false });
