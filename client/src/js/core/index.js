import { Sockets } from './sockets';
import { keyboard } from './keyboard';
import { Motors } from './motors';
import { Manipulator } from './manipulator';
import { telemetry } from './telemetry';
import { Stream } from './stream'


const core = (actions) => {
    let sockets = new Sockets();

    actions.motors = new Motors(sockets);
    actions.stream = new Stream();
    actions.manipulator.m = new Manipulator(sockets);

    keyboard(actions.motors);

    // telemetry(actions, sockets);
}

export default core;