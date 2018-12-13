import { h } from 'hyperapp';
import { SettingsGeneral } from './settings-general';
import { SettingsNetwork } from './settings-network';
import { SettingsManipulator } from './settings-manipulator';
import { SettingsDebug } from './settings-debug';
import { SettingsPreprogram } from './settings-preprogram';
import { SettingsClupi } from './settings-clupi';
import { SettingsAbout } from './settings-about';

// export const Settings = ({ state, actions }) =>
//     <div class={(state.settings.isVisible === true) ? 'settings' : 'settings settings-hide'}>
//         <div class="settings_categories">
//             <div role='button' class={categoryClass(state.settings.category, 'general')} onmousedown={() => actions.settings.setVisibleCategory('general')}>General</div>
//             <li class={categoryClass(state.settings.category, 'network')} onmousedown={() => actions.settings.setVisibleCategory('network')}>Network</li>
//             <div role='button' class={categoryClass(state.settings.category, 'manipulator')} onmousedown={() => actions.settings.setVisibleCategory('manipulator')}>Manipulator</div>
//             <div role='button' class={categoryClass(state.settings.category, 'preprogram')} onmousedown={() => actions.settings.setVisibleCategory('preprogram')}>Pre-program</div>
//             <li class={categoryClass(state.settings.category, 'debug')} onmousedown={() => actions.settings.setVisibleCategory('debug')}>Debug</li>
//             <div role='button' class={categoryClass(state.settings.category, 'clupi')} onmousedown={() => actions.settings.setVisibleCategory('clupi')}>Experimental</div>
//             <div role='button' class={categoryClass(state.settings.category, 'about')} onmousedown={() => actions.settings.setVisibleCategory('about')}>About</div>
//         </div>
//         <SettingsContent state={state} actions={actions} />
//     </div>;


const SettingContent = ({ state, actions }) => {
    switch (state.settings.category) {
        case 'general':
            return <SettingsGeneral actions={actions} />;
        case 'network':
            return <SettingsNetwork />;
        case 'manipulator':
            return <SettingsManipulator state={state} actions={actions} />;
        case 'debug':
            return <SettingsDebug />;
        case 'preprogram':
            return <SettingsPreprogram state={state} actions={actions} />;
        case 'clupi':
            return <SettingsClupi state={state} actions={actions} />;
        case 'about':
            return <SettingsAbout state={state} />;
        default:
            return <SettingsGeneral />;
    }
}

const selectedClass = (isSelected) => (isSelected ? ' settings__settingButton--selected' : '');

const SettingButton = ({ state, actions, name }) =>
    <div
        role='button'
        class={'settings__settingButton' + selectedClass(state.settings.category === name)}
        onmousedown={() => actions.settings.setVisibleCategory(name)}>
        {name.toUpperCase()}
    </div>;

export const Settings = ({ state, actions }) =>
    <div class={(state.settings.isVisible === true) ? 'settings' : 'settings settings-hide'}>
        <div class="settings__sidebar">
            <SettingButton state={state} actions={actions} name='general' />
            <SettingButton state={state} actions={actions} name='manipulator' />
            <SettingButton state={state} actions={actions} name='preprogram' />
            <SettingButton state={state} actions={actions} name='clupi' />
            <SettingButton state={state} actions={actions} name='about' />
        </div>
        <SettingContent state={state} actions={actions} />
    </div>;
