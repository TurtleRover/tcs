import { h } from 'hyperapp';
import { throttle } from 'lodash';
import { RangeInput } from './elements/range-input';

export const Manipulator = ({ mode, state, action }) =>
    <div class={(mode === 'grab') ? 'manipulatorControl' : 'manipulatorControl manipulatorControl-hide'}>
        <RangeInput
            name='AXIS 1'
            state={state.axis1}
            oninput={(value) => setManipulatorThrottled(value, state.axis2.value, action)}
            setValue={action.axis1.setValue}
        />

        <RangeInput
            name='AXIS 2'
            state={state.axis2}
            oninput={(value) => setManipulatorThrottled(state.axis1.value, value, action)}
            setValue={action.axis2.setValue}
        />
    </div>;

const setManipulatorThrottled = throttle((axis1, axis2, action) => action.m.setAxes(axis1, axis2), 100, { trailing: false });
