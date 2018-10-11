import { app } from 'hyperapp';
import { cloneDeep } from 'lodash';
import actions from './actions';
import state from './state';
import view from './view';

import { hyperlog } from './utils/logger';
import core from './core';

const defaultState = cloneDeep(state);
delete defaultState.default;
state.default = defaultState;

const wiredActions = hyperlog(app)(state, actions, view, document.body);

document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
        wiredActions.restoreState();
        wiredActions.setSplashScreenState(false);
        console.log(wiredActions);
    }
};

core(wiredActions);

// This disables bouncing in iOS
// https://bugs.webkit.org/show_bug.cgi?id=182521
// https://stackoverflow.com/a/50856621/1589989
// this is commented out since its prevents from moving thumb on mobile devices
// window.addEventListener("touchmove", (event) => event.preventDefault(), {passive: false} );

window.oncontextmenu = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
