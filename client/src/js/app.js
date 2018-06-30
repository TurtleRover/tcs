import { app } from 'hyperapp'
import actions from './actions'
import state from './state'
import view from './view'

const main = app(state, actions, view, document.body)

document.onreadystatechange = function() {
    if (document.readyState === "complete") {
        main.setBootScreenState(false);
        console.log(main);

    }
};