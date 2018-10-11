import { h } from 'hyperapp';

export const Button = ({ state, text, setValue }) =>
    <button
        type='button'
        class='button'
        onmouseup={(event) => setValue(event)}
        ontouchend={(event) => setValue(event)}>
        {text}
    </button>;
