import { h } from 'hyperapp'


export const BootScreen = ({state})  => 
    <section id="bootscreen" class={bootscreenClass(state)}>
        <div class="bootscreen_logo">
            <svg class="bootscreen_logo_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 439 138">
                <g fill="#FFF">
                    <path d="M249.743 82.91c-13.346 0-24.203-10.857-24.203-24.199v-4.427h22.869V42.843H225.54v-21h-11.439v36.869c0 19.649 15.986 35.641 35.643 35.641 20.158 0 30.67-15.432 33.589-23.97h-12.591c-2.796 4.867-9.083 12.527-20.999 12.527zM320.024 101.683h-11.672c1.857 14.013 13.85 24.819 28.355 24.819v-11.5c-8.14 0-14.958-5.695-16.683-13.319zM419.298 82.571c-7.391-23.043-29.005-39.728-54.512-39.728-25.5 0-47.113 16.685-54.506 39.728-1.188 3.697-2.01 7.557-2.422 11.534H421.72c-.41-3.978-1.233-7.837-2.422-11.534zm-96.84 0c6.875-16.605 23.239-28.29 42.328-28.29 19.092 0 35.455 11.684 42.328 28.29h-84.656zM155.19 58.709c0 13.343-10.854 24.199-24.197 24.199s-24.198-10.856-24.198-24.199V44.86h-11.44v13.849c0 19.651 15.985 35.64 35.638 35.64s35.64-15.989 35.64-35.64V44.86H155.19v13.849zM58.796 82.91c-13.347 0-24.203-10.857-24.203-24.199v-4.427h22.869V42.843H34.593v-21h-11.44v36.869c0 19.649 15.987 35.641 35.643 35.641 20.156 0 30.672-15.432 33.59-23.97H79.794C76.998 75.25 70.712 82.91 58.796 82.91zM171.888 76.857v16.877h11.44V76.857c0-11.712 9.396-23.188 23.189-23.188v-11.44c-17.315 0-34.629 13.689-34.629 34.628zM288.229 21.875h11.438v72.23h-11.438z"/>
                </g>
            </svg>
        </div>
        <div class="bootscreen_bootlog">
            <p class="bootscreen_bootlog_message">Starting Turtle...</p>
            <p class="bootscreen_bootlog_message">Establishing connection...</p>
            <p class="bootscreen_bootlog_message">Establishing video stream...</p>
            <p class="bootscreen_bootlog_message">Ready to boldly go where no man has gone before</p>

        </div>
    </section>

const bootscreenClass = (state) => {
    if (state === true) {      
        return 'bootscreen';
    } else {
        return 'bootscreen bootscreen-hide';
    }
}

