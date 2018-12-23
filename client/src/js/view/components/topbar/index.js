import { h } from 'hyperapp';
import LogotypeIcon from '../../../../img/ui/turtle-logo.svg';

import { ActionFullscreen } from './actions/actionFullscreen';
import { ActionSettings } from './actions/actionSettings';

import { IndicatorBattery } from './indicators/indicatorBattery';
import { IndicatorSignal } from './indicators/indicatorSignal';

const Logotype = () =>
    <LogotypeIcon class='topbar__logo' />;

export const TopBar = ({ state, switchSettings }) =>
    <section id="topbar" class="topbar">
        <Logotype />
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
