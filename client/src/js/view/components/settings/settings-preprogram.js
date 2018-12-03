import { h } from 'hyperapp';
import { Button } from '../elements/button';
import { PreprogramBlock } from '../elements/preprogram-block';
import { PreprogramBlockAdd } from '../elements/preprogram-block-add';

export const SettingsPreprogram = ({ actions, state }) =>
    <div class="settings_content">
        <div class="preprogram_content">
            <div>
                <StartStopButton state={state} actions={actions} />
            </div>
            <div class="preprogram_content__blocks">
                {
                    state.preprogram.blocks.map((block, index) => (
                        <PreprogramBlock
                            direction={block.direction}
                            speed={block.speed}
                            time={block.time}
                            number={index}
                            remove={actions.preprogram.remove} />))
                }
            </div>
            <div>
                <PreprogramBlockAdd
                    actions={actions.preprogram}
                    state={state.preprogram} />
            </div>

        </div>
    </div>;

const startMotors = function startMotors(state, actions) {
    const blocks = state.preprogram.blocks;
    const motors = actions.motors;
    const preprogram = actions.preprogram;
    actions.preprogram.setRunningFlag();
    actions.preprogram.start1({ blocks, motors, preprogram });
};

const stopMotors = function stopMotors(state, actions) {
    const motors = actions.motors;
    actions.preprogram.stop({ motors });
};

const StartStopButton = ({ state, actions }) => {
    console.log('ssb', state.preprogram.running );

    if (state.preprogram.running) {
        return <Button text='Stop' onclick={() => stopMotors(state, actions)} />;
    } else {
        return <Button text='Start' onclick={() => startMotors(state, actions)} />;
    }
};
