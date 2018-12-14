import { h } from 'hyperapp';

export const Link = ({ href, text }) =>
    <a href={href}
        target="_blank"
        rel="noopener noreferrer"
        class="link">
        {text}
    </a>;
