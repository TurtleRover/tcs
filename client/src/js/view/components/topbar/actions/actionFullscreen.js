import { h } from 'hyperapp';
import FullscreenIcon from 'material-design-icons-svg-only/dist/navigation/fullscreen.svg';


export const ActionFullscreen = ({ action }) =>
    <FullscreenIcon class="topbar__action" onmouseup={(event) => action(event)} />;
