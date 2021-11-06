import { HasLevel, KLWE_ATTRIBUTE } from '@/interfaces';
import { kustomService } from '@/services';
import { storable } from '@/utils';
import { Item, Preset } from 'kustom';
import { derived, get, writable } from 'svelte/store';
import { DEFAULT_PRESET } from './defaults';

export const KLWE_STORAGE_KEY = 'klwe-preset';

class KustomStore {
  preset = storable<Preset>(KLWE_STORAGE_KEY, DEFAULT_PRESET, DEFAULT_PRESET);

  get $preset() {
    return get(this.preset);
  }

  selectedItem = writable<Item | undefined>();

  get $selectedItem() {
    return get(this.selectedItem);
  }

  flatItems = derived(this.preset, ($preset) => {
    const res: (Item & HasLevel)[] = [];

    $preset.preset_root.viewgroup_items.forEach((item: Item & HasLevel) => {
      item[KLWE_ATTRIBUTE].level = 0;

      res.push(item, ...kustomService.getFlatChildItems(item, 1));
    });

    return res;
  });

  get $flatItems() {
    return get(this.flatItems);
  }
}

export const kustomStore = new KustomStore();
export * from './defaults';
