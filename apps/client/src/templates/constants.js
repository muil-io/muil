import MobileIcon from 'shared/assets/icons/mobile.svg';
import MonitorIcon from 'shared/assets/icons/monitor.svg';
import TabletIcon from 'shared/assets/icons/tablet.svg';

export const SCREEN_SIZES = {
	small: { size: '360px', icon: MobileIcon },
	medium: { size: '640px', icon: TabletIcon },
	full: { size: 'calc(100% - 160px)', icon: MonitorIcon },
};
