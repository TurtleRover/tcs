import { h } from 'hyperapp';

import { Rotate } from './rotate';
import { SplashScreen } from './splashscreen';
import { TopBar } from './components/topbar';
import { Stream } from './components/stream';
import { Settings } from './components/settings';
import { Manipulator } from './components/manipulator';
import { Joystick } from './components/joystick';
import { Gripper } from './components/gripper';
import { ModeChooser } from './components/modechooser';
import { Clupi } from './components/clupi';
import { Logs } from './components/logs';

const view = (state, actions) => (
    <main>
        <Rotate />
        <SplashScreen state={state.showSplashScreen} />
        <div id="wrapper" class="wrapper">
            <TopBar state={state.telemetry} switchSettings={actions.settings.setVisibility} />
            <Logs actions={actions} />
            <Settings state={state} actions={actions} />
            <div class="controls-box-right">
                <Manipulator mode={state.mode} state={state.manipulator} action={actions.manipulator} />
                <Joystick mode={state.mode} joystick={actions.joystick} motors={actions.motors} />
            </div>

            <div class="controls-box-left">
                <Clupi state={state} actions={actions} />
                <Gripper mode={state.mode} state={state.manipulator.gripper} action={actions.manipulator} />
                <ModeChooser mode={state.mode} setMode={actions.setMode} />
            </div>
            <Stream actions={actions} state={state} />
        </div>
    </main>
);

export default view;
