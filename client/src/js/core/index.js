import { Sockets } from './sockets';
import { keyboard } from './keyboard';
import { Motors } from './motors';
import { telemetry } from './telemetry';

const core = (actions) => {
    let sockets = new Sockets();
    actions.motors = new Motors(sockets);
    keyboard(actions.motors);

    // telemetry(main, sockets);
}

export default core;