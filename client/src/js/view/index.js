import { h } from 'hyperapp'
import { BootScreen } from './bootscreen'
import { StatusBar } from './components/statusbar'
import { Stream } from './components/stream'
import { Settings } from "./components/settings"
import { Manipulator } from "./components/manipulator";

const view = (state, actions) => (
    <main>
        <BootScreen state={state.showBootScreen}/>
        <div id="wrapper" class="wrapper">
            <StatusBar/>
            <div class="crosshair"></div>
            <div class="dots"></div>
            <div class="controls-box-right">
                <Manipulator/>
            </div>
            <div class="controls-box-left">

            </div>
            <Settings/>
            <Stream/>
        </div>
    </main>
)

export default view