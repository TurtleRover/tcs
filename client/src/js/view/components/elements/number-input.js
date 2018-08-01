import { h } from 'hyperapp'

export const NumberInput = ({label, value, step, inc, dec})  => 
    <div class="numberInput">
        <label class="numberInput_label" for="height">{label}</label>
        <input 
            class="numberInput_input"
            type="number" 
            placeholder={value}
            step={step}
            />

        <button 
            onmousedown={(event) => continiuity(dec, step)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="numberInput_dec">-{step}</button>

        <button 
            onmousedown={(event) => continiuity(inc, step)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="numberInput_inc">+{step}</button>

    </div>

var timeout;
var interval;

const continiuity = (cb, step) => {
    cb(step);
    timeout = setTimeout(() => interval = setInterval(() => cb(step), 50), 300);
}

const clearTimers = () => {   
    clearTimeout(timeout);
    clearInterval(interval);
}