import { h } from 'hyperapp'
import { setInterval } from 'core-js';

export const HoldButton = ({state, value, text, setValue})  => 
    <button 
        class='button button-hold'
        onmousedown={(event) => hold(event, setValue)}
        onmouseup={(event) => clearTimers(event)}
        onmouseleave={(event) => clearTimers(event)}>
        <span class='button-hold_counter'>HOLD</span>
        {text}
    </button>

var tid;
var iid;
var TIMEOUT = 4000;

const hold = (event, cb) => {
    event.target.children[0].textContent = TIMEOUT/1000;
    countdown(event.target.children[0]);
    tid = setTimeout(() => {
        cb();
        disable(event.target);
        clearInterval(iid); 
    }, TIMEOUT);
}

const countdown = (element) => {
    let counter = 1;
    iid = setInterval (()=> {
        element.textContent = TIMEOUT/1000 - counter;
        counter++;
    }, 1000);
}

const clearTimers = (event) => {   
    clearTimeout(tid);
    clearInterval(iid);
    event.target.children[0].textContent = 'HOLD';
}

const disable = (el) => {
    el.disabled = true;
    el.children[0].classList.add('button-hold_counter-disabled')
    el.style.background = 'black';
}
    