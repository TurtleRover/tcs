import { h } from 'hyperapp'


export const RadioButton = ({group, checked, value, text})  => 
    <label class="radio">
        <input type="radio" name={group} checked={checked} value={value}/>
        <span class="outer">
            <span class="inner"></span>
        </span>
        {text}
    </label>