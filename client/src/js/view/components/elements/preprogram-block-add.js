import { h } from 'hyperapp';
import { InputNumber } from '../elements/input-number';
import { Button } from './button';

export const PreprogramBlockAdd = ({ state, actions }) =>
    <div class="preprogram-block-add">
        <div class="preprogram-block-add__direction">
        {/* {state.next.direction} */}
            <select
                id="pet-select"
                onchange={(event) => actions.next.setDirection(event.target.value)}>
                <option value="fw">FW</option>
                <option value="bw">BW</option>
                <option value="l">L</option>
                <option value="r">R</option>
            </select>
        </div>

        <div class="preprogram-block-add__parameters">
            <InputNumber
                label='Speed %'
                value={state.next.speed}
                step={state.next.step}
                inc={actions.next.incSpeed}
                dec={actions.next.decSpeed}
            />
            <InputNumber
                label='Time s'
                value={state.next.time}
                step={state.next.step}
                inc={actions.next.incTime}
                dec={actions.next.decTime}
            />
        </div>
        <Button text='Add' setValue={() => actions.add()} />
    </div>;
