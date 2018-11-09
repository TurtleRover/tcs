import { h } from 'hyperapp';

export const Button = ({ text, setValue, value = null }) =>
    <button
        type='button'
        class='button'
        value={value}
        onclick={(event) => setValue(value)}>
        {text}
    </button>;
