import { h } from 'hyperapp';
import { setInterval } from 'core-js';

export const ButtonHold = ({ text, setValue }) =>
    <button
        type='button'
        class='button-hold'
        onmousedown={(event) => hold(event, setValue)}
        ontouchstart={(event) => hold(event, setValue)}
        onmouseup={(event) => clearTimers(event)}
        onmouseleave={(event) => clearTimers(event)}
        ontouchend={(event) => clearTimers(event)}
        ontouchcancel={(event) => clearTimers(event)}>
        <span class='button-hold__counter'>HOLD</span>
        {text}
    </button>;

let tid;
let iid;
const TIMEOUT = 4000;

const hold = (event, cb) => {
    const button = event.target;
    const buttonCounter = event.target.children[0];

    buttonCounter.textContent = TIMEOUT / 1000;

    countdown(buttonCounter);

    tid = setTimeout(() => {
        cb();
        disable(button);
        clearInterval(iid); 
    }, TIMEOUT);
}

const countdown = (buttonCounter) => {
    let counter = 1;
    iid = setInterval(() => {
        buttonCounter.textContent = TIMEOUT / 1000 - counter;
        counter += 1;
    }, 1000);
};

const clearTimers = (event) => {
    clearTimeout(tid);
    clearInterval(iid);
    event.target.children[0].textContent = 'HOLD';
};

const disable = (el) => {
    el.disabled = true;
    el.children[0].classList.add('button-hold__counter--disabled')
    el.style.background = 'black';
};
