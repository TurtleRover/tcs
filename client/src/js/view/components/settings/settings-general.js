import { h } from 'hyperapp';
import { ButtonHold } from '../elements/button-hold';

export const SettingsGeneral = ({ actions }) =>
    <div class='settings__content'>
        <div class="settings__block">
            <div class='settings__subtitle'>system</div>
            <div class="settings__section">
                <ButtonHold text='SHUTDOWN' setValue={() => actions.system.shutdown()} />
            </div>
            <div class="settings__section">
                <ButtonHold text='REBOOT' setValue={() => actions.system.reboot()} />
            </div>
        </div>
        <div class="settings__block">
            <div class='settings__subtitle'>stream</div>
            <div class="settings__section">
                <ButtonHold text='Restart stream' setValue={() => actions.stream.start()} />
            </div>
        </div>
    </div>;
