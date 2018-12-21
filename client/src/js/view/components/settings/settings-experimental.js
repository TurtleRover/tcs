import { h } from 'hyperapp';
import { RadioButton } from '../elements/radio-button';

export const SettingsExperimental = ({ state, actions }) =>
    <div class='settings__content'>
        <div class="settings__block">
            <div class='settings__subtitle'>Close-Up Imager</div>
            <RadioButton group='clupi-switch' state={state.clupi.isVisible} value={true} text='Enable CLUPI' setValue={actions.clupi.setVisibility} />
            <RadioButton group='clupi-switch' state={state.clupi.isVisible} value={false} text='Disable CLUPI' setValue={actions.clupi.setVisibility} />
        </div>
    </div>;
