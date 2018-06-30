import { h } from 'hyperapp'
import { BootScreen } from './bootscreen'
import { StatusBar } from './components/statusbar'
import { Stream } from './components/stream'
import { Settings } from "./components/settings";

const view = (state, actions) => (
    <main>
        <BootScreen state={state.showBootScreen}/>
        <div id="wrapper" class="wrapper">
            <StatusBar/>
            <div class="crosshair"></div>
            <div class="dots"></div>
            <Settings/>
            <Stream/>
        </div>
    </main>
)

export default view