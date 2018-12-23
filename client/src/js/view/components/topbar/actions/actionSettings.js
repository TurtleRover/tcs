import { h } from 'hyperapp';
import SettingsIcon from 'material-design-icons-svg-only/dist/action/settings.svg';

export const ActionSettings = ({ action }) =>
    <SettingsIcon class="topbar__action topbar__settings" onmousedown={() => action()} />;
