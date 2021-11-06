import { HasParent, KLWE_ATTRIBUTE } from '@/interfaces';
import { DEFAULT_PRESET, kustomStore } from '@/stores';
import { Item, Overlap, Preset, Shape, Stack, Text } from 'kustom';
import { kustomService } from '.';

describe('kustomService', () => {
  const preset: Preset = DEFAULT_PRESET;

  let a: Overlap, b: Text, c: Stack, d: Shape, e: Shape, f: Text;

  beforeEach(() => {
    b = {
      internal_type: 'TextModule',
      internal_title: 'b',
    };

    d = {
      internal_type: 'ShapeModule',
      internal_title: 'd',
    };
    e = {
      internal_type: 'ShapeModule',
      internal_title: 'e',
    };
    f = {
      internal_type: 'TextModule',
      internal_title: 'f',
    };

    c = {
      internal_type: 'StackLayerModule',
      internal_title: 'c',
      viewgroup_items: [d],
    };

    a = {
      internal_type: 'OverlapLayerModule',
      internal_title: 'a',
      viewgroup_items: [b, c],
    };

    preset.preset_root.viewgroup_items = [a, e, f];

    kustomService.initPreset(preset);
  });

  function normalizeItem(item: Item): Item {
    const itemCopy = { ...item };
    delete itemCopy[KLWE_ATTRIBUTE];
    return itemCopy;
  }

  function checkItem(item: Item, expected: Item) {
    expect(normalizeItem(item)).toEqual(normalizeItem(expected));
  }

  function checkItems(items: Item[], expected: Item[]) {
    expect(items.map(normalizeItem)).toEqual(expected.map(normalizeItem));
  }

  it('moves f before e correctly', () => {
    kustomService.moveItem(f, e, 'before');
    checkItems(kustomStore.$preset.preset_root.viewgroup_items, [a, f, e]);
    expect(f[KLWE_ATTRIBUTE].parent).toBeUndefined();
    expect(e[KLWE_ATTRIBUTE].parent).toBeUndefined();

    // other items should be unchanged
    checkItems(a.viewgroup_items, [b, c]);
    checkItems(c.viewgroup_items, [d]);
  });

  it('moves e before a correctly', () => {
    kustomService.moveItem(e, a, 'before');
    expect(
      kustomStore.$preset.preset_root.viewgroup_items.map(
        (i) => i.internal_title,
      ),
    ).toEqual(['e', 'a', 'f']);
    expect(e[KLWE_ATTRIBUTE].parent).toBeUndefined();
    expect(a[KLWE_ATTRIBUTE].parent).toBeUndefined();

    // other items should be unchanged
    checkItems(a.viewgroup_items, [b, c]);
    checkItems(c.viewgroup_items, [d]);
  });

  it('moves e after f correctly', () => {
    kustomService.moveItem(e, f, 'after');
    checkItems(kustomStore.$preset.preset_root.viewgroup_items, [a, f, e]);

    expect(e[KLWE_ATTRIBUTE].parent).toBeUndefined();
    expect(f[KLWE_ATTRIBUTE].parent).toBeUndefined();

    // other items should be unchanged
    checkItems(a.viewgroup_items, [b, c]);
    checkItems(c.viewgroup_items, [d]);
  });

  it('moves a after e correctly', () => {
    kustomService.moveItem(a, e, 'after');
    checkItems(kustomStore.$preset.preset_root.viewgroup_items, [e, a, f]);

    expect(a[KLWE_ATTRIBUTE].parent).toBeUndefined();
    expect(e[KLWE_ATTRIBUTE].parent).toBeUndefined();

    // other items should be unchanged
    checkItems(a.viewgroup_items, [b, c]);
    checkItems(c.viewgroup_items, [d]);
  });

  it('moves e into a correctly', () => {
    kustomService.moveItem(e, a, 'into');
    const preset = kustomStore.$preset;
    checkItems(preset.preset_root.viewgroup_items, [a, f]);
    checkItems(a.viewgroup_items, [e, b, c]);
    checkItem(
      (a.viewgroup_items[0] as Item & HasParent)[KLWE_ATTRIBUTE].parent,
      a,
    );

    // other items should be unchanged
    checkItems(c.viewgroup_items, [d]);
  });

  it('moves e into c correctly', () => {
    kustomService.moveItem(e, c, 'into');
    checkItems(kustomStore.$preset.preset_root.viewgroup_items, [a, f]);
    checkItems(c.viewgroup_items, [e, d]);
    checkItem(
      (c.viewgroup_items[0] as Item & HasParent)[KLWE_ATTRIBUTE].parent,
      c,
    );

    // other items should be unchanged
    checkItems(a.viewgroup_items, [b, c]);
  });
});
