import { h } from 'hyperapp'
import { NumberInput } from '../elements/number-input';

export const SettingsManipulator = ({state, actions}) =>
    <div class="settings_content">
        <NumberInput 
            label={'Axis 1 max value'} 
            value={state.manipulator.axis1.max} 
            step={state.manipulator.axis1.step}
            inc={actions.manipulator.axis1.incMax}
            dec={actions.manipulator.axis1.decMax}/>

        <NumberInput 
            label={'Axis 1 min value'} 
            value={state.manipulator.axis1.min} 
            step={state.manipulator.axis1.step}
            inc={actions.manipulator.axis1.incMin}
            dec={actions.manipulator.axis1.decMin}/>

        <NumberInput 
            label={'Axis 2 max value'} 
            value={state.manipulator.axis2.max} 
            step={state.manipulator.axis2.step}
            inc={actions.manipulator.axis2.incMax}
            dec={actions.manipulator.axis2.decMax}/>

        <NumberInput 
            label={'Axis 2 min value'} 
            value={state.manipulator.axis2.min} 
            step={state.manipulator.axis2.step}
            inc={actions.manipulator.axis2.incMin}
            dec={actions.manipulator.axis2.decMin}/>
    </div>

