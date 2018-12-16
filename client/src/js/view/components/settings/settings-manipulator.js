import { h } from 'hyperapp';
import { InputNumber } from '../elements/input-number';
import { Button } from '../elements/button';
import { Link } from '../elements/link';

export const SettingsManipulator = ({ state, actions }) =>
    <div class="settings__content">
        <div class='settings__block'>
            <div class='settings__subtitle'>Manipulator tweaks</div>
            <div class="settings__section">Please refer to&nbsp;<Link href='https://docs.turtlerover.com/' text='docs.turtlerover.com' />&nbsp;to find proper range values for your addon.</div>
            <div class="settings__section">
                <InputNumber
                    label='Axis 1 max value'
                    value={state.manipulator.axis1.max}
                    step={state.manipulator.axis1.step}
                    inc={actions.manipulator.axis1.incMax}
                    dec={actions.manipulator.axis1.decMax} />
            </div>
            <div class="settings__section">
                <InputNumber
                    label='Axis 1 min value'
                    value={state.manipulator.axis1.min}
                    step={state.manipulator.axis1.step}
                    inc={actions.manipulator.axis1.incMin}
                    dec={actions.manipulator.axis1.decMin} />
            </div>
            <div class="settings__section">
                <InputNumber
                    label='Axis 2 max value'
                    value={state.manipulator.axis2.max}
                    step={state.manipulator.axis2.step}
                    inc={actions.manipulator.axis2.incMax}
                    dec={actions.manipulator.axis2.decMax} />            
            </div>
            <div class="settings__section">
                <InputNumber
                    label='Axis 2 min value'
                    value={state.manipulator.axis2.min}
                    step={state.manipulator.axis2.step}
                    inc={actions.manipulator.axis2.incMin}
                    dec={actions.manipulator.axis2.decMin} />
            </div>
        </div>
        <div class='settings__block'>
            <div class='settings__subtitle'>Gripper tweaks</div>
            <div class="settings__section">
                <InputNumber
                    label='Gripper max value'
                    value={state.manipulator.gripper.max}
                    step={state.manipulator.gripper.step}
                    inc={actions.manipulator.gripper.incMax}
                    dec={actions.manipulator.gripper.decMax} />
            </div>
            <div class="settings__section">
                <InputNumber
                    label='Gripper min value'
                    value={state.manipulator.gripper.min}
                    step={state.manipulator.gripper.step}
                    inc={actions.manipulator.gripper.incMin}
                    dec={actions.manipulator.gripper.decMin} />
            </div>
            <div class="settings__section">
                <Button text='Reset' value={state.default.manipulator} onclick={actions.manipulator.reset} />
            </div>
        </div>
    </div>;
