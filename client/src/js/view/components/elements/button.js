import { h } from 'hyperapp';

export const Button = ({ text, onclick, value = null }) =>
    <button
        type='button'
        class='button'
        value={value}
        onclick={(event) => onclick(value)}>
        {text}
    </button>;
