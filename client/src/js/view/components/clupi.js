import { h } from 'hyperapp';
import { InputNumber } from './elements/input-number';
import { Button } from './elements/button';


export const Clupi = ({ state, actions }) =>
    <div class={(state.clupi.isVisible === true) ? 'clupi' : 'clupi clupi--hide'}>
        <InputNumber
            label='Translation'
            value=':)'
            inc={actions.clupi.translation.up}
            dec={actions.clupi.translation.down}
            onmousedown={(transl) => actions.clupi.c.set(state.clupi.rotation.angle, transl)}
        />

        <InputNumber
            label='Rotation'
            value={state.clupi.rotation.angle}
            step={state.clupi.rotation.step}
            inc={actions.clupi.rotation.inc}
            dec={actions.clupi.rotation.dec}
            onmousedown={(angle) => actions.clupi.c.set(angle, state.clupi.translation.minUp)}
        />

        <div class="clupi__left-group">
            <Button text='CENTER' value={state.clupi.rotation.midAngle} onclick={(angle) => setMidAngle(angle, state.clupi.translation.minUp, actions)} />
        </div>
        <div class="clupi__right-group">
            <Button text='MAX LEFT' value={state.clupi.rotation.maxAngle} onclick={(angle) => setMaxAngle(angle, state.clupi.translation.minUp, actions)} />
            <Button text='MAX RIGHT' value={state.clupi.rotation.minAngle} onclick={(angle) => setMinAngle(angle, state.clupi.translation.minUp, actions)} />
        </div>
    </div>;

const setMidAngle = (angle, transl, actions) => {
    actions.clupi.c.set(angle, transl);
    actions.clupi.rotation.mid();
};

const setMaxAngle = (angle, transl, actions) => {
    actions.clupi.c.set(angle, transl);
    actions.clupi.rotation.max();
};

const setMinAngle = (angle, transl, actions) => {
    actions.clupi.c.set(angle, transl);
    actions.clupi.rotation.min();
};
