import { h } from 'hyperapp'
import { RadioButton } from "./elements/radio-button";

export const ModeChooser = ({mode})  => 
    <div class="mode-switcher">
        <RadioButton group='mode-switch' checked='false' value='grab' text='GRAB'/>
        <RadioButton group='mode-switch' checked='true' value='drive' text='DRIVE'/>
    </div>