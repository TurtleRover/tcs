import { h } from 'hyperapp'
import { HoldButton } from '../elements/hold-button';


export const SettingsGeneral = ({actions}) =>
    <div class="settings_content">
        <HoldButton text='SHUTDOWN' setValue={actions.system.shutdown}></HoldButton>
    </div>

