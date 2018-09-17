import { h } from 'hyperapp'
import { ButtonHold } from '../elements/button-hold';
import { System } from '../../../core/system';


export const SettingsGeneral = ({actions}) =>
    <div class="settings_content">
        <ButtonHold text='SHUTDOWN' setValue={() => actions.system.shutdown()}></ButtonHold>
    </div>
