import { h } from 'hyperapp';


export const Stream = ({ stream }) =>
    <div class="stream-wrapper">
        <video id="stream" class="stream" oncreate={(el) => stream.start(el)} />
    </div>;
