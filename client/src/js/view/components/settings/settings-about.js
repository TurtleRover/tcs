import { h } from 'hyperapp';

export const SettingsAbout = ({ state }) =>
    <div class="settings_content">
        <div>Turtle Control Software v{state.system_info.tcs_ver}</div>
        <div>Shield Firmware v{state.system_info.firmware_ver}</div>
        <div>External WiFi: {state.system_info.wifi_dongle}</div>
        <div>Video devices: {() => state.system_info.video_devices.toString()}</div>
    </div>;
