import { h } from 'hyperapp';

export const PreprogramBlock = ({ direction, speed, time }) =>
    <div class="preprogram-block">
        <div class="preprogram-block__direction">{direction}</div>
        <div class="preprogram-block__parameters">
            <span class="preprogram-block__speed">Speed {speed}%</span>
            <span class="preprogram-block__speed">Time {time}s</span>
        </div>
    </div>;
