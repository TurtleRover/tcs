import { h } from 'hyperapp';
import { InputNumber } from '../elements/input-number';
import { Button } from '../elements/button';

export const SettingsManipulator = ({ state, actions }) =>
    <div class="settings_content">
        <p>
            Please refer to docs.turtlerover.com to find proper range values for your addon.
        </p>
        <InputNumber
            label='Axis 1 max value'
            value={state.manipulator.axis1.max}
            step={state.manipulator.axis1.step}
            inc={actions.manipulator.axis1.incMax}
            dec={actions.manipulator.axis1.decMax} />

        <InputNumber
            label='Axis 1 min value'
            value={state.manipulator.axis1.min}
            step={state.manipulator.axis1.step}
            inc={actions.manipulator.axis1.incMin}
            dec={actions.manipulator.axis1.decMin} />

        <InputNumber
            label='Axis 2 max value'
            value={state.manipulator.axis2.max}
            step={state.manipulator.axis2.step}
            inc={actions.manipulator.axis2.incMax}
            dec={actions.manipulator.axis2.decMax} />

        <InputNumber
            label='Axis 2 min value'
            value={state.manipulator.axis2.min}
            step={state.manipulator.axis2.step}
            inc={actions.manipulator.axis2.incMin}
            dec={actions.manipulator.axis2.decMin} />

        <InputNumber
            label='Gripper max value'
            value={state.manipulator.gripper.max}
            step={state.manipulator.gripper.step}
            inc={actions.manipulator.gripper.incMax}
            dec={actions.manipulator.gripper.decMax} />

        <InputNumber
            label='Gripper min value'
            value={state.manipulator.gripper.min}
            step={state.manipulator.gripper.step}
            inc={actions.manipulator.gripper.incMin}
            dec={actions.manipulator.gripper.decMin} />

        <Button text='Reset' value={state.default.manipulator} onclick={actions.manipulator.reset} />

    </div>;
