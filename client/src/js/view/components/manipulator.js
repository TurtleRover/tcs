import { h } from 'hyperapp'
import { RangeInput } from "./elements/range-input";

export const Manipulator = ({mode, state})  => 
    <div class={(mode==='grab') ? 'manipulatorControl' : 'manipulatorControl manipulatorControl-hide'}>
        <RangeInput name='AXIS 1' state={state.axis1}/>
        <RangeInput name='AXIS 2' state={state.axis2}/>
    </div>

