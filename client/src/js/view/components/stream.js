import { h } from 'hyperapp'


export const Stream = ({stream})  => 
    <div id="camera-video" class="videoWrapper">
        <video id="remote-video" class="video" oncreate={(el) => stream.start(el)}></video>
    </div>
