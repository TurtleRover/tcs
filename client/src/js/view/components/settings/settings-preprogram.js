import { h } from 'hyperapp';
import { Button } from '../elements/button';
import { PreprogramBlock } from '../elements/preprogram-block';
import { PreprogramBlockAdd } from '../elements/preprogram-block-add';

export const SettingsPreprogram = ({ actions, state }) =>
    <div class="settings_content">
        <div class="preprogram_content">
            <Button text='Start' setValue={() => console.log("START PROGRAM")} />
            <div class="preprogram_content__blocks" id="preprogram_blocks">
                { state.preprogram.blocks.map(block => (<PreprogramBlock direction={block.direction} speed={block.speed} time={block.time} />)) }
            </div>
            <PreprogramBlockAdd />
        </div>
    </div>;

const addBlock = () => {
    console.log('add block');
    const blocksContainer = document.getElementById('preprogram_blocks');
    blocksContainer.appendChild(PreprogramBlock);
};
