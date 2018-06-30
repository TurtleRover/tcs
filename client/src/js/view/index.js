import { h } from 'hyperapp'
import { BootScreen } from './bootscreen'


const view = (state, actions) => (
    <main>
        <BootScreen state={state.showBootScreen}/>
        <div id="wrapper" class="wrapper"></div>
    </main>
)

export default view