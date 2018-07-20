import { Sockets } from './sockets';
import { keyboard } from './keyboard';
import { Motors } from './motors';
import { telemetry } from './telemetry';
import { Stream } from './stream'

const core = (actions) => {
    let sockets = new Sockets();
    let stream = new Stream();
    actions.motors = new Motors(sockets);
    keyboard(actions.motors);

    stream.start();
    // telemetry(main, sockets);
}

export default core;