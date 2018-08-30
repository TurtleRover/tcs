import { h } from 'hyperapp'
import { HoldButton } from '../elements/hold-button';
import { System } from '../../../core/system';


export const SettingsGeneral = ({actions}) =>
    <div class="settings_content">
        <HoldButton text='SHUTDOWN' setValue={() => actions.system.shutdown()}></HoldButton>
    </div>

const lol = (a) => {
    console.log('-----------',a);
    a.shutdown();
    
}