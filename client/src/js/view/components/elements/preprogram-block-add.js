import { h } from 'hyperapp';
import { InputNumber } from '../elements/input-number';


export const PreprogramBlockAdd = ({ direction, speed, time }) =>
    <div class="preprogram-block">
        <div class="preprogram-block__direction">{direction}</div>
        <div class="preprogram-block__parameters">
            <InputNumber
                label='Speed %'
                value={speed}
                step='1'
            />
            <InputNumber
                label='Time s'
                value={time}
                step='1'
            />
        </div>
    </div>;
