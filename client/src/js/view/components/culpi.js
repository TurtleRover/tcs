import { h } from 'hyperapp';
import { InputNumber } from './elements/input-number';
import { Button } from './elements/button';


export const Culpi = ({ state, actions }) =>
    <div class="culpi">
        <InputNumber
            label='Translation'
            value=':)'
            inc={actions.culpi.translation.up}
            dec={actions.culpi.translation.down}
            onmousedown={(transl) => actions.culpi.c.set(state.culpi.rotation.angle, transl)}
        />

        <InputNumber
            label='Rotation'
            value={state.culpi.rotation.angle}
            step={state.culpi.rotation.step}
            inc={actions.culpi.rotation.inc}
            dec={actions.culpi.rotation.dec}
            onmousedown={(angle) => actions.culpi.c.set(angle, state.culpi.translation.minUp)}
        />

        <div class="culpi__left-group">
            <Button text='CENTER' value={state.culpi.rotation.midAngle} onclick={(angle) => setMidAngle(angle, state.culpi.translation.minUp, actions)} />
        </div>
        <div class="culpi__right-group">
            <Button text='MAX LEFT' value={state.culpi.rotation.maxAngle} onclick={(angle) => setMaxAngle(angle, state.culpi.translation.minUp, actions)} />
            <Button text='MAX RIGHT' value={state.culpi.rotation.minAngle} onclick={(angle) => setMinAngle(angle, state.culpi.translation.minUp, actions)} />
        </div>
    </div>;

const setMidAngle = (angle, transl, actions) => {
    actions.culpi.c.set(angle, transl);
    actions.culpi.rotation.mid();
};

const setMaxAngle = (angle, transl, actions) => {
    actions.culpi.c.set(angle, transl);
    actions.culpi.rotation.max();
};

const setMinAngle = (angle, transl, actions) => {
    actions.culpi.c.set(angle, transl);
    actions.culpi.rotation.min();
};
