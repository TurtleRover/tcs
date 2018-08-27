import { h } from 'hyperapp'
import {SettingsGeneral} from './general'
import { SettingsNetwork } from "./network";
import { SettingsManipulator } from "./manipulator";
import { SettingsDebug } from "./debug";
import { SettingsAbout } from "./about";

export const Settings = ({state, actions})  => 
    <div class={(state.settings.isVisible===true) ? 'settings' : 'settings settings-hide'}>
        <ul class="settings_categories">
            <li class={categoryClass(state.settings.category, 'general')} onmousedown={() => actions.settings.setVisibleCategory('general')}>General</li>
            <li class={categoryClass(state.settings.category, 'network')} onmousedown={() => actions.settings.setVisibleCategory('network')}>Network</li>
            <li class={categoryClass(state.settings.category, 'manipulator')} onmousedown={() => actions.settings.setVisibleCategory('manipulator')}>Manipulator</li>
            <li class={categoryClass(state.settings.category, 'debug')} onmousedown={() => actions.settings.setVisibleCategory('debug')}>Debug</li>
            <li class={categoryClass(state.settings.category, 'about')} onmousedown={() => actions.settings.setVisibleCategory('about')}>About</li>
        </ul>
        <SettingsContent state={state} actions={actions}/>
    </div>


const SettingsContent = ({state, actions}) => {
    switch (state.settings.category) {
        case 'general':
            return <SettingsGeneral actions={actions}/>
        case 'network':
            return <SettingsNetwork/>
        case 'manipulator':
            return <SettingsManipulator state={state} actions={actions}/>
        case 'debug':
            return <SettingsDebug/>
        case 'about':
            return <SettingsAbout state={state}/>
        default:
            return <SettingsGeneral/>
    }
}

const categoryClass = (state, category) => {
    if (state === category){
        return 'settings_categories_category settings_categories_category-selected';
    }else {
        return 'settings_categories_category';
    }
}