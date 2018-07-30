import { h } from 'hyperapp'
import { RadioButton } from "./elements/radio-button";

export const ModeChooser = ({mode, setMode})  => 
    <div class="mode-chooser">
        <RadioButton group='mode-switch' state={mode} value='grab' text='GRAB' setValue={setMode}/>
        <RadioButton group='mode-switch' state={mode} value='drive' text='DRIVE' setValue={setMode}/>
    </div>
