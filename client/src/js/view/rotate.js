import { h } from 'hyperapp';


export const Rotate = () =>
    <section id="rotate" class={rotateClass()}>
        <div class="rotate__inducement">
            <svg class="rotate__svg" xmlns="http://www.w3.org/2000/svg" height="128.536" width="128"><path d="M87.833 13.39c17.673 8.033 29.991 25.17 32.134 45.522H128C124.787 25.707 97.473 0 63.732 0h-3.749l20.352 20.351zM54.092 9.104c-3.213-3.214-8.033-3.214-11.247 0L8.57 43.38c-3.213 3.213-3.213 8.033 0 11.247l64.268 64.267c3.213 3.214 8.033 3.214 11.247 0L118.36 84.62c3.213-3.213 3.213-8.033 0-11.247zM78.728 113.54L14.46 49.272l34.276-34.276 64.268 64.268zm-39.096 1.606C21.958 107.113 9.64 89.975 7.498 69.623H0c2.678 33.205 29.992 58.913 63.732 58.913h3.75L47.13 108.184z" fill="#fff" fill-rule="evenodd" /></svg>
            <h1 class="rotate__text">Rotate your device</h1>
        </div>
    </section>;

const rotateClass = () => {
    if (window.innerHeight < window.innerWidth) {
        return 'rotate rotate--hide';
    }
    return 'rotate';
};
