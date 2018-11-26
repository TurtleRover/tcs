import { h } from 'hyperapp';
import { RadioButton } from '../elements/radio-button';

export const SettingsClupi = ({ state, actions }) =>
    <div class="settings_content">
        <RadioButton group='clupi-switch' state={state.clupi.isVisible} value={true} text='Enable CLUPI' setValue={actions.clupi.setVisibility} />
        <RadioButton group='clupi-switch' state={state.clupi.isVisible} value={false} text='Disable CLUPI' setValue={actions.clupi.setVisibility} />
    </div>;
