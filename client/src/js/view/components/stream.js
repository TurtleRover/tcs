import { h } from 'hyperapp';


export const Stream = ({ stream, mode }) =>
    <div class="stream-wrapper">
        <video id="stream" class={(mode === 'drive') ? 'stream stream--drive-mode' : 'stream stream--grab-mode'} oncreate={(el) => stream.start(el)} />
    </div>;
