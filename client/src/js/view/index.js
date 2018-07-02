import { h} from 'hyperapp'

import { BootScreen } from './bootscreen'
import { StatusBar } from './components/statusbar'
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
            <StatusBar/>
            <div class="crosshair"></div>
            <div class="dots"></div>
            <div class="controls-box-right">
                <Manipulator mode={state.mode} state={state.manipulator}/>
                <Joystick mode={state.mode}/>
            </div>
            <div class="controls-box-left">
                <Gripper state={state.gripper}/>
                <ModeChooser mode={state.mode} setMode={actions.setMode}/>
            </div>
            <Settings/>
            <Stream/>
        </div>
    </main>
)

export default view