import { h } from 'hyperapp'
import { RangeInput } from "./elements/range-input";
import {throttle} from 'lodash'

export const Manipulator = ({mode, state, action})  => 
    <div class={(mode==='grab') ? 'manipulatorControl' : 'manipulatorControl manipulatorControl-hide'}>
        <RangeInput 
            name='AXIS 1' 
            state={state.axis1} 
            oninput={(value) => setManipulator(value, state.axis2.value, action)} 
            onchange={action.axis1.setValue}/>

        <RangeInput 
            name='AXIS 2' 
            state={state.axis2} 
            oninput={(value) => setManipulator(state.axis2.value, value, action)} 
            onchange={action.axis2.setValue}/>
    </div>

const setManipulator = throttle((axis1, axis2, action) => action.m.setAxes(axis1, axis2), 100, { 'trailing': false });
