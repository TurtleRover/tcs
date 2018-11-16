import { h } from 'hyperapp';

export const InputNumber = ({ label, value, step, inc, dec, onmousedown }) =>
    <div class="input-number">
        <span class="input-number__label" for="height">{label}</span>
        <input
            class="input-number__input"
            type="number"
            placeholder={value}
            value={value}
            step={step}
            min="0"
            max="9990"
        />

        <button
            type="button"
            onmousedown={(event) => continiuity(onmousedown, dec)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="input-number__dec">
            -{step}
        </button>

        <button
            type="button"
            onmousedown={(event) => continiuity(onmousedown, inc)}
            onmouseup={(event) => clearTimers()}
            onmouseleave={(event) => clearTimers()}
            class="input-number__inc">
            +{step}
        </button>

    </div>;

let timeout;
let interval;

const continiuity = (cb, operator) => {
    operator(cb);
    timeout = setTimeout(() => {
        interval = setInterval(() => {
            operator(cb);
        }, 100);
    }, 300);
};

const clearTimers = () => {
    clearTimeout(timeout);
    clearInterval(interval);
};
