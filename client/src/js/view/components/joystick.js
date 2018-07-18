import { h } from 'hyperapp'

export const Joystick = ({mode, joystick, motors}) =>
    <div class={(mode==='drive') ? 'joystick' : 'joystick joystick-hide'} oncreate={(element) => joystick({element, motors})}>
        <img class='joystick_image' src={require('../../../img/ui/right-krzyz.svg')}/>
    </div>
