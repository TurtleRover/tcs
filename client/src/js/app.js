import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

import { hyperlog } from "./utils/logger";
import core from './core'

const wiredActions = hyperlog(app)(state, actions, view, document.body);

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        wiredActions.restoreState();
        wiredActions.setBootScreenState(false);
        console.log(wiredActions);
    }
};

core(wiredActions);

// This disables bouncing in iOS
// https://bugs.webkit.org/show_bug.cgi?id=182521
// https://stackoverflow.com/a/50856621/1589989
window.addEventListener("touchmove", (event) => event.preventDefault(), {passive: false} );