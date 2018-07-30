import { h } from 'hyperapp'
import {SettingsGeneral} from './general'
import { SettingsNetwork } from "./network";
import { SettingsManipulator } from "./manipulator";
import { SettingsDebug } from "./debug";
import { SettingsAbout } from "./about";

export const Settings = ({state, actions})  => 
    <div class={(state.isVisible===true) ? 'settings' : 'settings settings-hide'}>
        <ul class="settings_categories">
            <li class={categoryClass(state.category, 'general')} onmousedown={() => actions.setVisibleCategory('general')}>General</li>
            <li class={categoryClass(state.category, 'network')} onmousedown={() => actions.setVisibleCategory('network')}>Network</li>
            <li class={categoryClass(state.category, 'manipulator')} onmousedown={() => actions.setVisibleCategory('manipulator')}>Manipulator</li>
            <li class={categoryClass(state.category, 'debug')} onmousedown={() => actions.setVisibleCategory('debug')}>Debug</li>
            <li class={categoryClass(state.category, 'about')} onmousedown={() => actions.setVisibleCategory('about')}>About</li>
        </ul>
        <SettingsContent category={state.category}/>
    </div>


const SettingsContent = ({category}) => {
    switch (category) {
        case 'general':
            return <SettingsGeneral/>
        case 'network':
            return <SettingsNetwork/>
        case 'manipulator':
            return <SettingsManipulator/>
        case 'debug':
            return <SettingsDebug/>
        case 'about':
            return <SettingsAbout/>
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