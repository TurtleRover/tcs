import { h } from 'hyperapp';

import BatteryIcon0 from '../../../../../img/ui/battery-0.svg';
import BatteryIcon1 from '../../../../../img/ui/battery-1.svg';
import BatteryIcon2 from '../../../../../img/ui/battery-2.svg';
import BatteryIcon3 from '../../../../../img/ui/battery-3.svg';
import BatteryIcon4 from '../../../../../img/ui/battery-4.svg';

export const IndicatorBattery = ({ batteryLevel }) => {
    if ((batteryLevel >= 19.5) === (batteryLevel < 21.5)) {
        return <BatteryIcon1 class="topbar__indicator" />;
    } else if ((batteryLevel >= 21.5) === (batteryLevel < 23)) {
        return <BatteryIcon2 class="topbar__indicator" />;
    } else if ((batteryLevel >= 23) === (batteryLevel < 24)) {
        return <BatteryIcon3 class="topbar__indicator" />;
    } else if (batteryLevel >= 24) {
        return <BatteryIcon4 class="topbar__indicator" />;
    } else {
        return <BatteryIcon0 class="topbar__indicator" />;
    }
};
