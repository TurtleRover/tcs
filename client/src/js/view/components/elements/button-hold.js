import { h } from 'hyperapp'
import { setInterval } from 'core-js';

export const ButtonHold = ({state, value, text, setValue})  => 
    <button 
        class='button-hold'
        onmousedown={(event) => hold(event, setValue)}
        onmouseup={(event) => clearTimers(event)}
        onmouseleave={(event) => clearTimers(event)}>
        <span class='button-hold__counter'>HOLD</span>
        {text}
    </button>

var tid;
var iid;
var TIMEOUT = 4000;

const hold = (event, cb) => {
    let button = event.target;
    let button_counter = event.target.children[0];

    button_counter.textContent = to_secs(TIMEOUT);

    countdown(button_counter);

    tid = setTimeout(() => {
        cb();
        disable(button);
        clearInterval(iid); 
    }, TIMEOUT);
}

const countdown = (button_counter) => {
    let counter = 1;
    iid = setInterval (()=> {
        button_counter.textContent = to_secs(TIMEOUT) - counter;
        counter++;
    }, 1000);
}

const to_secs = (t) => t/1000;

const clearTimers = (event) => {   
    clearTimeout(tid);
    clearInterval(iid);
    event.target.children[0].textContent = 'HOLD';
}

const disable = (el) => {
    el.disabled = true;
    el.children[0].classList.add('button-hold__counter--disabled')
    el.style.background = 'black';
}
    