import { h } from 'hyperapp';
import { ButtonHold } from '../elements/button-hold';

export const SettingsGeneral = ({ actions }) =>
    <div class="settings_content">
        <ButtonHold text='SHUTDOWN' setValue={() => actions.system.shutdown()} /> 
        <br></br>
        <ButtonHold text='REBOOT' setValue={() => actions.system.reboot()} />
        <br></br>
        <ButtonHold text='Restart stream' setValue={() => actions.stream.start()} />
    </div>;
