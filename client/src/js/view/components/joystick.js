import { h } from 'hyperapp';

export const Joystick = ({ mode, joystick, motors }) =>
    <div class={(mode === 'drive') ? 'joystick' : 'joystick joystick--hide'} oncreate={(el) => joystick({ el, motors })}>
        <img alt="" class='joystick__image' src={require('../../../img/ui/joystick.svg')} />
    </div>;
