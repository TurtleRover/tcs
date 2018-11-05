import { h } from 'hyperapp';
import { InputNumber } from './elements/input-number';
import { Button } from './elements/button';


export const Culpi = ({ state, actions }) =>
    <div class="culpi">
        <InputNumber
            label='ytransl.'
            value="124"
            step="10" />

        <InputNumber
            label='Rotation'
            value='123'
            step='10' />

        <div class="culpi__left-group">
            <Button text='RESET' setValue={() => console.log("RESET ROTATION")} />
        </div>
        <div class="culpi__right-group">
            <Button text='MAX LEFT' setValue={() => console.log("MAX LEFT")} />
            <Button text='MAX RIGHT' setValue={() => console.log("MAX RIGHT")} />
        </div>



    </div>;
