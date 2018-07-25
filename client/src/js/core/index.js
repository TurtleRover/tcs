import { Sockets } from './sockets';
import { keyboard } from './keyboard';
import { Motors } from './motors';
import { telemetry } from './telemetry';
import { Stream } from './stream'


const core = (actions) => {
    let sockets = new Sockets();
    let stream = 
    actions.motors = new Motors(sockets);
    actions.stream = new Stream();
    keyboard(actions.motors);

    // telemetry(main, sockets);
}

export default core;