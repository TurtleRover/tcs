import { h } from 'hyperapp'
import { fullscreen } from 'fullscreen-polyfill'

export const TopBar = ({state, switchSettings})  => 
    <section id="topbar" class="topbar">
        <img class="topbar_logo" src={require("../../../img/ui/turtle-logo.svg")}/>
        <div class="topbar_indicators">
            <IndicatorBattery batteryLevel={state.batteryLevel}/>
            <IndicatorSignal signalLevel={state.signalLevel}/>
        </div>
        <div id="topbar_actions" class="topbar_actions">
            {/* <img class="topbar_actions_action" id="button-screenrecord" src={require("../../../img/ui/nav-bar-rec.svg")}/> */}
                {/* <a id="snap-download-a">  */}
            {/* <img class="topbar_actions_action" id="button-screenshot" src={require("../../../img/ui/nav-bar-snap.svg")}/> */}
                {/* </a>  */}
            <ActionFullscreen/>
        </div>

        <div class="topbar_menu" onmousedown={() => switchSettings()}>
            <div class="topbar_menu_bar"></div>
        </div>
    </section>

const IndicatorBattery = ({batteryLevel}) => 
    <img id="indicator-battery" class="topbar_indicators_indicator" src={batteryLevelIcon(batteryLevel)}/>

const IndicatorSignal = ({signalLevel}) =>
    <img id="indicator-signal" class="topbar_indicators_indicator" src={signalLevelIcon(signalLevel)}/>


const batteryLevelIcon = (batteryLevel) => {
    if (19.5 <= batteryLevel==batteryLevel < 21.5) {
        return require("../../../img/ui/battery-1.svg")
    } else if (21.5 <= batteryLevel==batteryLevel < 23) {
        return require("../../../img/ui/battery-2.svg")
    } else if (23 <= batteryLevel==batteryLevel < 24) {
        return require("../../../img/ui/battery-3.svg")
    } else if (batteryLevel >= 24) {
        return require("../../../img/ui/battery-4.svg")
    } else {
        return require("../../../img/ui/battery-0.svg")
    }
}

const signalLevelIcon = (signalLevel) => {
    if (80 <= signalLevel==signalLevel < 85) {
        return require("../../../img/ui/signal-1.svg")
    } else if (85 <= signalLevel==signalLevel < 90) {
        return require("../../../img/ui/signal-2.svg")
    } else if (90 <= signalLevel==signalLevel < 95) {
        return require("../../../img/ui/signal-3.svg")
    } else if (signalLevel >= 95) {
        return require("../../../img/ui/signal-4.svg")
    } else {
        return require("../../../img/ui/signal-0.svg")
    }
}
    
const ActionFullscreen = () => {
    return <img 
                class="topbar_actions_action"
                id="button-fullscreen" 
                src={require("../../../img/ui/nav-bar-fullscreen.svg")}
                onmouseup={(el) => toggleFullscreen(el.target)}
                />

}

const toggleFullscreen = (el) => {
    let main = document.documentElement; 
    if (!document.fullscreenElement) {
        if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen();
        } else {
            main.webkitRequestFullScreen();
        }
      } else {
        if(document.exitFullscreen) {
            document.exitFullscreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
      }
}