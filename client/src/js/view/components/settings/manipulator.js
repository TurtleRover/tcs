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
    </div>

