import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

import { withLogger } from "@hyperapp/logger"
import { telemetry } from './telemetry';

const main = withLogger(app)(state, actions, view, document.body)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        main.setBootScreenState(false);
        console.log(main);
    }
};

telemetry(main);
