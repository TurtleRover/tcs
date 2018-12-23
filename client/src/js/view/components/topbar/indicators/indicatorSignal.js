import { h } from 'hyperapp';

import SignalIcon0 from '../../../../../img/ui/signal-0.svg';
import SignalIcon1 from '../../../../../img/ui/signal-1.svg';
import SignalIcon2 from '../../../../../img/ui/signal-2.svg';
import SignalIcon3 from '../../../../../img/ui/signal-3.svg';
import SignalIcon4 from '../../../../../img/ui/signal-4.svg';

export const IndicatorSignal = ({ signalLevel }) => {
    if ((signalLevel >= 80) === (signalLevel < 85)) {
        return <SignalIcon1 class="topbar__indicator" />;
    } else if ((signalLevel >= 85) === (signalLevel < 90)) {
        return <SignalIcon2 class="topbar__indicator" />;
    } else if ((signalLevel >= 90) === (signalLevel < 95)) {
        return <SignalIcon3 class="topbar__indicator" />;
    } else if (signalLevel >= 95) {
        return <SignalIcon4 class="topbar__indicator" />;
    } else {
        return <SignalIcon0 class="topbar__indicator" />;
    }
};
