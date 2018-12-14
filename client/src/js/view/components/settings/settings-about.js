import { h } from 'hyperapp';
import { Link } from '../elements/link';

export const SettingsAbout = ({ state }) =>
    <div class='settings__block'>
        <div class='settings__subtitle'>system info</div>
        <div class="settings__section">Turtle Control Software v{state.system_info.tcs_ver}</div>
        <div class="settings__section">Shield Firmware v{state.system_info.firmware_ver}</div>
        <div class="settings__section">External WiFi: {state.system_info.wifi_dongle}</div>
        <div class="settings__section">{state.system_info.video_devices.map(device => (<VideoDevice device={device} />))}</div>

        <div class='settings__subtitle'>Documentation</div>
        <div class="settings__section">
            Please refer to &nbsp;<Link href='https://docs.turtlerover.com/' text='docs.turtlerover.com' /> &nbsp;to know more about the control options and the Rover maintenance.
        </div>

        <div class='settings__subtitle'>A word from a team</div>
        <div class="settings__section">
            Feel free to contact us if you have any issue. We're constantly improving the UI, but it's still a long way to go.<br />
            We'd love to have you participate in the project and get any feedback!
        </div>
        <div class="settings__section"><Link href='mailto:contact@turtlerover.com' text='contact@turtlerover.com' /></div>
        <div class="settings__section"><Link href='www.turtlerover.com' text='www.turtlerover.com' /></div>
    </div>;


    //     <p>
    //         
    //         Feel free to contact us if you have any issue. We're constantly improving the UI, but it's still a long way to go.
    //         We'd love to have you participate in the project and get any feedback!
    //     </p>
    //     <span>Turtle Team</span>
    //     <span>contact@turtlerover.com</span>
    //     <span>www.turtlerover.com</span>
    // </div>;

const VideoDevice = ({ device }) =>
    <span>Video device: {device.model} at {device.device}</span>;
