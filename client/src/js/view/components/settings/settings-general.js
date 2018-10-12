import { h } from 'hyperapp';
import { ButtonHold } from '../elements/button-hold';

export const SettingsGeneral = ({ actions }) =>
    <div class="settings_content">
        <ButtonHold text='SHUTDOWN' setValue={() => actions.system.shutdown()} />
    </div>;
