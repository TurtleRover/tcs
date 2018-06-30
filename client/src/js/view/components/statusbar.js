import { h } from 'hyperapp'


export const StatusBar = ()  => 
    <section id="statusbar" class="statusbar">
        <img class="statusbar_logo" src={require("../../../img/ui/turtle-logo.svg")}/>
        <div class="statusbar_indicators">
            <IndicatorBattery/>
            <IndicatorSignal/>
        </div>
        <div id="statusbar_actions" class="statusbar_actions">
            <img class="statusbar_actions_action" id="button-screenrecord" src={require("../../../img/ui/nav-bar-rec.svg")}/>
                <a id="snap-download-a"> 
            <img class="statusbar_actions_action" id="button-screenshot" src={require("../../../img/ui/nav-bar-snap.svg")}/>
                </a> 
            <img class="statusbar_actions_action" id="button-fullscreen" src={require("../../../img/ui/nav-bar-fullscreen.svg")}/>
        </div>

        <div class="statusbar_menu">
            <div class="statusbar_menu_bar"></div>
        </div>
    </section>

const IndicatorBattery = () => 
    <img id="indicator-battery" class="statusbar_indicators_indicator" src={require("../../../img/ui/battery-0.svg")}/>

const IndicatorSignal = () =>
    <img id="indicator-signal" class="statusbar_indicators_indicator" src={require("../../../img/ui/signal-0.svg")}/>
