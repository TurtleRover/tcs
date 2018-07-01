import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

import { withLogger } from "@hyperapp/logger"

const main = withLogger(app)(state, actions, view, document.body)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        main.setBootScreenState(false);
    }
};