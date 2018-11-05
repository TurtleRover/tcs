const preprogram = {
    add: (v) => state => ({
        next: {
            direction: 'fw',
            speed: 0,
            time: 0,
            step: 1,
        },
        blocks: state.blocks.concat(state.next),
    }),
    remove: (index) => state => ({ blocks: state.blocks.filter(block => state.blocks.indexOf(block) !== index) }),
    next: {
        incSpeed: step => state => {
            const nextSpeed = state.speed + step;
            if (nextSpeed <= 100) {
                return { speed: nextSpeed };
            }
        },
        decSpeed: step => state => {
            const nextSpeed = state.speed - step;
            if (nextSpeed >= 0) {
                return { speed: nextSpeed };
            }
        },
        incTime: step => state => {
            const nextTime = state.time + step;
            if (nextTime <= 60) {
                return { time: nextTime };
            }
        },
        decTime: step => state => {
            const nextTime = state.time - step;
            if (nextTime >= 0) {
                return { time: nextTime };
            }
        },
    },
};

export default preprogram;
