(function() {
    var radios = document.getElementsByName('mode-switch');

    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener("click", switch_mode, false);
    }

    function switch_mode(event) {
        let joystick = document.querySelector('.joystick');
        if (event.target.value === 'drive') {
            console.log('DRIVE');
            joystick.classList.remove('joystick-hide');
        } else if (event.target.value === 'grab') {
            console.log('GRAB');
            joystick.classList.add('joystick-hide');
        }
    }
})();
