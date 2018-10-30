import { h } from 'hyperapp';
import { Button } from './button';

export const PreprogramBlock = ({ direction, speed, time, number, remove }) =>
    <div class="preprogram-block">
        <span class="preprogram-block__number">{number + 1}</span>
        <div class="preprogram-block__direction">{direction}</div>
        <div class="preprogram-block__parameters">
            <span class="preprogram-block__speed">Speed: {speed}%</span>
            <span class="preprogram-block__speed">Time: {time} s</span>
        </div>
        <div class="preprogram-block__remove">
            <Button text='X' setValue={() => remove(number)} />
        </div>
    </div>;
