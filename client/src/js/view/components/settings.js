import { h } from 'hyperapp'


export const Settings = ({state})  => 
    <div class={(state.isVisible===true) ? 'settings' : 'settings settings-hide'}>
        <ul class="settings_categories">
            <li class="settings_categories_category">General</li>
            <li class="settings_categories_category">Network</li>
            <li class="settings_categories_category">Manipulator</li>
            <li class="settings_categories_category">Debug</li>
            <li class="settings_categories_category">About</li>
        </ul>
        <div class="settings_content"></div>
    </div>