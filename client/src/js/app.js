import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

import withLogger from "./utils/logger";
import { telemetry } from './telemetry';

import { Sockets } from './sockets';
import { keyboard } from './controlkeyboard';
import { Motors } from './core/motors';


const main = withLogger(app)(state, actions, view, document.body)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        main.setBootScreenState(false);
        console.log(main);
    }
};


let sockets = new Sockets();

// telemetry(main, sockets);

main.motors =  new Motors(sockets);
keyboard(main.motors);


