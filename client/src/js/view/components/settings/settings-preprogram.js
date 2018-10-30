import { h } from 'hyperapp';
import { Button } from '../elements/button';
import { PreprogramBlock } from '../elements/preprogram-block';
import { PreprogramBlockAdd } from '../elements/preprogram-block-add';

export const SettingsPreprogram = ({ actions, state }) =>
    <div class="settings_content">
        <div class="preprogram_content">
            <div>
                <Button text='Start' setValue={() => console.log("START PROGRAM")} />
            </div>
            <div class="preprogram_content__blocks">
                { state.preprogram.blocks.map(block => (
                    <PreprogramBlock
                        direction={block.direction}
                        speed={block.speed}
                        time={block.time} />))}
            </div>
            <div>
                <PreprogramBlockAdd
                    actions={actions.preprogram}
                    state={state.preprogram} />
            </div>

        </div>
    </div>;
