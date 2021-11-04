import { Info, Preset, Root } from 'kustom';

export const DEFAULT_INFO: Info = {
  version: 11,
  title: '',
  description: '',
  author: '',
  email: '',
  width: 540,
  height: 1170,
  features: 'MUSIC',
  release: 357121814,
  locked: false,
  pflags: 0,
};

export const DEFAULT_ROOT: Root = {
  viewgroup_items: [],
  background_color: '#FF000000',
};

export const DEFAULT_PRESET: Preset = {
  preset_info: DEFAULT_INFO,
  preset_root: DEFAULT_ROOT,
};
