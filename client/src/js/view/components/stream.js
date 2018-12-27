import { h } from 'hyperapp';


export const Stream = ({ stream, mode }) =>
    <div class="stream-wrapper">
        <div class="crosshair" />
        <div class="dots" />
        {/* <img class={(mode === 'drive') ? 'stream stream--drive-mode' : 'stream stream--grab-mode'} src={stream.url_mjpeg} alt='' /> */}
        <video id="stream" class={(mode === 'drive') ? 'stream stream--drive-mode' : 'stream stream--grab-mode'} oncreate={(el) => stream.start(el)} />
    </div>;
