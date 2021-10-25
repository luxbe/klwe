import { get, Writable, writable } from 'svelte/store';
import { IconType } from '@/components/Icon';

const ALL_ACTIVITIES = ['EDITOR', 'INFO', 'SETTINGS'] as const;
export type ActivityType = typeof ALL_ACTIVITIES[number];

class ActivityStore {
    activities = ALL_ACTIVITIES;
    activityIcons: {
        [key in ActivityType]: IconType;
    } = {
        EDITOR: 'grid',
        INFO: 'info',
        SETTINGS: 'settings',
    };

    open = writable(true);
    activity: Writable<ActivityType> & {
        change(type: ActivityType): void;
    };

    constructor() {
        const { subscribe, update, set } = writable<ActivityType>('EDITOR');

        this.activity = {
            subscribe,
            set,
            update,
            change: (type) => {
                const old = get(this.activity);
                if (old === type) return this.open.set(!get(this.open));
                set(type);
            },
        };
    }
}

export const activityStore = new ActivityStore();
