import { h } from 'hyperapp'
import { BootScreen } from './bootscreen'
import { StatusBar } from './components/statusbar'

const view = (state, actions) => (
    <main>
        <BootScreen state={state.showBootScreen}/>
        <div id="wrapper" class="wrapper">
            <StatusBar/>
            <div class="crosshair"></div>
            <div class="dots"></div>
        </div>
    </main>
)

export default view