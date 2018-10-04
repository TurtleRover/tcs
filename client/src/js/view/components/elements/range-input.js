import { h } from 'hyperapp';

export const RangeInput = ({ state, name, labelMin, labelMax, setValue, oninput }) =>
    <div class="range">
        <RangeName name={name} />
        <RangeLabels labelMin={labelMin} labelMax={labelMax} />
        <input type="range"
            class="range_input"
            max={state.max}
            min={state.min}
            step={state.step}
            value={state.value}
            oninput={(event) => oninputFunc(oninput, setValue, event.target.value)}
        />
    </div>;

const oninputFunc = (cb, setValue, value) => {
    cb(value);
    setValue(value);
};

const RangeName = ({ name }) => {
    if (name) {
        return <span class="range_name">{name}</span>;
    }
    return <span class="range_name" />;
};

const RangeLabels = ({ labelMin, labelMax }) => {
    if (labelMin && labelMax) {
        return (
            <div class="range_labels">
                {labelMin}
                {labelMax}
            </div>
        );
    } else {
        return (
            <div class="range_labels">
                <span class="range_labelMin">0%</span>
                <span class="range_labelMax">100%</span>
            </div>
        );
    }
};
