import { h } from 'hyperapp'

export const HoldButton = ({state, value, text, setValue})  => 
    <button 
        class='button button-hold'
        onmousedown={(event) => hold(setValue)}
        onmouseup={(event) => clearTimeout(tid)}
        onmouseleave={(event) => clearTimeout(tid)}>
        {text}
    </button>

var tid;

const hold = (cb) => {
    tid = setTimeout(() => cb(), 200);   
}