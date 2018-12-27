import { h } from 'hyperapp';


export const Stream = ({ actions, state }) =>
    <div class="stream-wrapper" onclick={() => closeSettings({ actions, state })}>
        <div class="crosshair" />
        <div class="dots" />
        {/* <img class={(mode === 'drive') ? 'stream stream--drive-mode' : 'stream stream--grab-mode'} src={stream.url_mjpeg} alt='' /> */}
        <video id="stream" class={(state.mode === 'drive') ? 'stream stream--drive-mode' : 'stream stream--grab-mode'} oncreate={(el) => actions.stream.start(el)} />
    </div>;

const closeSettings = ({ actions, state }) => {
    if (state.settings.isVisible) {
        actions.settings.setVisibility();
    }
};
