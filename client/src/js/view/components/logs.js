import { h } from 'hyperapp';

export const Logs = ({ state, actions }) =>
    <div id="console-log-div" class='logs' oncreate={(el) => actions.logs(el)} />;
