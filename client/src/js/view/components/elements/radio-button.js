import { h } from 'hyperapp'


export const RadioButton = ({group, state, value, text, setValue})  => 
    <label class="radio" onmousedown={() => setValue(value)}>
        <input type="radio" name={group} checked={state === value} value={value}/>
        <span class="outer">
            <span class="inner"></span>
        </span>
        {text}
    </label>