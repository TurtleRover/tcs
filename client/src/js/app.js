import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

import { hyperlog } from "./utils/logger";
import core from './core'

const main = hyperlog(app)(state, actions, view, document.body)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        main.setBootScreenState(false);
        console.log(main);
    }
};

core(main);
