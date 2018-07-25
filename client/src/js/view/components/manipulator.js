import { h } from 'hyperapp'
import { RangeInput } from "./elements/range-input";

export const Manipulator = ({mode, state, manipulator})  => 
    <div class={(mode==='grab') ? 'manipulatorControl' : 'manipulatorControl manipulatorControl-hide'}>
        <RangeInput name='AXIS 1' state={state.axis1} setValue={manipulator.axis1.setValue}/>
        <RangeInput name='AXIS 2' state={state.axis2} setValue={manipulator.axis2.setValue}/>
    </div>

