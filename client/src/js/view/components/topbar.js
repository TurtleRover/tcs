import { h } from 'hyperapp';
import SettingsIcon from 'material-design-icons-svg-only/dist/action/settings.svg';
import FullscreenIcon from 'material-design-icons-svg-only/dist/navigation/fullscreen.svg';

const ActionFullscreen = ({ action }) =>
    <FullscreenIcon class="topbar__action" onmouseup={(event) => action(event)} />;

const ActionSettings = ({ action }) =>
    <SettingsIcon class="topbar__action topbar__settings" onmousedown={() => action()} />;

export const TopBar = ({ state, switchSettings }) =>
    <section id="topbar" class="topbar">
        <img alt="" class="topbar__logo" src={require('../../../img/ui/turtle-logo.svg')} />
        <div class="topbar__indicators">
            <IndicatorBattery batteryLevel={state.batteryLevel} />
            <IndicatorSignal signalLevel={state.signalLevel} />
        </div>
        <div id="topbar__actions" class="topbar__actions">
            {/* <img class="topbar_actions_action" id="button-screenrecord" src={require("../../../img/ui/nav-bar-rec.svg")}/> */}
            {/* <a id="snap-download-a">  */}
            {/* <img class="topbar_actions_action" id="button-screenshot" src={require("../../../img/ui/nav-bar-snap.svg")}/> */}
            {/* </a>  */}
            <ActionFullscreen action={toggleFullscreen} />
            <ActionSettings action={switchSettings} />
        </div>

    </section>;

const IndicatorBattery = ({ batteryLevel }) =>
    <img alt="" id="indicator-battery" class="topbar__indicator" src={batteryLevelIcon(batteryLevel)} />;

const IndicatorSignal = ({ signalLevel }) =>
    <img alt="" id="indicator-signal" class="topbar__indicator" src={signalLevelIcon(signalLevel)} />;


const batteryLevelIcon = (batteryLevel) => {
    if ((batteryLevel >= 19.5) === (batteryLevel < 21.5)) {
        return require('../../../img/ui/battery-1.svg');
    } else if ((batteryLevel >= 21.5) === (batteryLevel < 23)) {
        return require('../../../img/ui/battery-2.svg');
    } else if ((batteryLevel >= 23) === (batteryLevel < 24)) {
        return require('../../../img/ui/battery-3.svg');
    } else if (batteryLevel >= 24) {
        return require('../../../img/ui/battery-4.svg');
    } else {
        return require('../../../img/ui/battery-0.svg');
    }
};

const signalLevelIcon = (signalLevel) => {
    if ((signalLevel >= 80) === (signalLevel < 85)) {
        return require('../../../img/ui/signal-1.svg');
    } else if ((signalLevel >= 85) === (signalLevel < 90)) {
        return require('../../../img/ui/signal-2.svg');
    } else if ((signalLevel >= 90) === (signalLevel < 95)) {
        return require('../../../img/ui/signal-3.svg');
    } else if (signalLevel >= 95) {
        return require('../../../img/ui/signal-4.svg');
    } else {
        return require('../../../img/ui/signal-0.svg');
    }
};

// https://gist.github.com/demonixis/5188326
const toggleFullscreen = (event) => {
    let element = document.body;
    if (event instanceof window.HTMLElement) {
        element = event;
    }

    const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen = element.requestFullScreen
        || element.webkitRequestFullScreen
        || element.mozRequestFullScreen
        || function a() { return false; };
    document.cancelFullScreen = document.cancelFullScreen
        || document.webkitCancelFullScreen
        || document.mozCancelFullScreen
        || function a() { return false; };

    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
};
