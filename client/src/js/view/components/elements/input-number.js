import { h } from 'hyperapp'

export const InputNumber = ({label, value, step, inc, dec})  => 
    <div class="input-number">
        <label class="input-number__label" for="height">{label}</label>
        <input 
            class="input-number__input"
            type="number" 
            placeholder={value}
            step={step}
            min="0"
            max="999"
            />

        <button 
            onmousedown={(event) => continiuity(dec, step)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="input-number__dec">
            -{step}
        </button>

        <button 
            onmousedown={(event) => continiuity(inc, step)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="input-number__inc">
            +{step}
        </button>

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