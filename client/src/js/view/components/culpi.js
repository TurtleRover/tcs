import { h } from 'hyperapp';
import { InputNumber } from './elements/input-number';
import { Button } from './elements/button';


export const Culpi = ({ state, actions }) =>
    <div class="culpi">
        <InputNumber
            label='ytransl.'
            value="-"
            step="10" />

        <InputNumber
            label='Rotation'
            value={state.culpi.rotation.angle}
            step={state.culpi.rotation.step}
            inc={incRotAngle(state.culpi, actions.culpi)}
            dec={decRotAngle(state.culpi, actions.culpi)}
        />

        <div class="culpi__left-group">
            <Button text='CENTER' setValue={() => console.log("RESET ROTATION")} />
        </div>
        <div class="culpi__right-group">
            <Button text='MAX LEFT' value={state.culpi.rotation.maxAngle} setValue={maxAngle(state.culpi, actions.culpi)} />
            <Button text='MAX RIGHT' value={state.culpi.rotation.minAngle} setValue={minAngle(state.culpi, actions.culpi)} />
        </div>
    </div>;

const incRotAngle = (culpiState, culpiActions) => {
    culpiActions.c.setRotationAngle(culpiState.rotation.angle, 123);
    return culpiActions.rotation.inc;
};

const decRotAngle = (culpiState, culpiActions) => {
    culpiActions.c.setRotationAngle(culpiState.rotation.angle, 123);
    return culpiActions.rotation.dec;
};

const maxAngle = (culpiState, culpiActions) => {
    // culpiActions.c.setRotationAngle(180, 123);
    return culpiActions.rotation.max;
};

const minAngle = (culpiState, culpiActions) => {
    // culpiActions.c.setRotationAngle(0, 123);
    return culpiActions.rotation.min;
};
