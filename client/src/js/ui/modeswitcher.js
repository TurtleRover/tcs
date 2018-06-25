(function() {
    var radios = document.getElementsByName('mode-switch');

    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click", switch_mode, false);
    }

    function switch_mode(event) {
        let joystick = document.querySelector('.joystick');
        let mani_control = document.querySelector('.manipulatorControl');
        if (event.target.value === 'drive') {
            mani_control.classList.add('manipulatorControl-hide');
            joystick.classList.remove('joystick-hide');
        } else if (event.target.value === 'grab') {
            joystick.classList.add('joystick-hide');
            mani_control.classList.remove('manipulatorControl-hide');
        }
    }
})();
