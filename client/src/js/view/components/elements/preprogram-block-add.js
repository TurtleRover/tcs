import { h } from 'hyperapp';
import { InputNumber } from '../elements/input-number';


export const PreprogramBlockAdd = ({ state, actions }) =>
    <div class="preprogram-block">
        <div class="preprogram-block__direction">{state.direction}</div>
        <div class="preprogram-block__parameters">
            <InputNumber
                label='Speed %'
                value={state.speed}
                step={state.step}
                inc={actions.incSpeed}
                dec={actions.decSpeed}
            />
            <InputNumber
                label='Time s'
                value={state.time}
                step={state.step}
                inc={actions.incTime}
                dec={actions.decTime}
            />
        </div>
    </div>;
