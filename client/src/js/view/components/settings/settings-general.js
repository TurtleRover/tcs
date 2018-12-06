import { h } from 'hyperapp';
import { ButtonHold } from '../elements/button-hold';
import { Button } from '../elements/button';

export const SettingsGeneral = ({ actions }) =>
    <div class="settings_content">
        <ButtonHold text='SHUTDOWN' setValue={() => actions.system.shutdown()} />
        {/* <ButtonHold text='REBOOT' setValue={() => actions.system.reboot()} /> */}
        <ButtonHold text='Restart stream' setValue={() => actions.stream.start()} />
    </div>;
