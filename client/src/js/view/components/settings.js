import { h } from 'hyperapp'


export const Settings = ({state, actions})  => 
    <div class={(state.isVisible===true) ? 'settings' : 'settings settings-hide'}>
        <ul class="settings_categories">
            <li class="settings_categories_category" onmousedown={() => actions.setVisibleCategory('general')}>General</li>
            <li class="settings_categories_category" onmousedown={() => actions.setVisibleCategory('network')}>Network</li>
            <li class="settings_categories_category" onmousedown={() => actions.setVisibleCategory('manipulator')}>Manipulator</li>
            <li class="settings_categories_category" onmousedown={() => actions.setVisibleCategory('debug')}>Debug</li>
            <li class="settings_categories_category" onmousedown={() => actions.setVisibleCategory('about')}>About</li>
        </ul>
        <SettingsContent category={state.category}/>
    </div>


const SettingsGeneral = () =>
    <div class="settings_content">General settings</div>

const SettingsNetwork = () =>
    <div class="settings_content">Network settings</div>

const SettingsManipulator = () =>
    <div class="settings_content">Manipulator settings</div>

const SettingsDebug = () =>
    <div class="settings_content">Debug settings</div>

const SettingsAbout = () =>
    <div class="settings_content">About settings</div>

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