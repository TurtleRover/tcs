import { h} from 'hyperapp'

import { BootScreen } from './bootscreen'
import { TopBar } from './components/topbar'
import { Stream } from './components/stream'
import { Settings } from "./components/settings"
import { Manipulator } from "./components/manipulator";
import { Joystick } from "./components/joystick";
import { Gripper } from "./components/gripper";
import { ModeChooser } from "./components/modechooser";

const view = (state, actions) => (
    <main>
        <BootScreen state={state.showBootScreen}/>
        <div id="wrapper" class="wrapper">
            <TopBar state={state.telemetry} switchSettings={actions.settings.setVisibility}/>
            <Settings state={state} actions={actions}/>
            <div class="crosshair"></div>
            <div class="dots"></div>
            <div class="controls-box-right">
                <Manipulator mode={state.mode} state={state.manipulator} action={actions.manipulator}/>
                <Joystick mode={state.mode} joystick={actions.joystick} motors={actions.motors}/>
            </div>
            <div class="controls-box-left">
                <Gripper state={state.manipulator.gripper} action={actions.manipulator}/>
                <ModeChooser mode={state.mode} setMode={actions.setMode}/>
            </div>
            <Stream stream={actions.stream}/>
        </div>
    </main>
)

export default view