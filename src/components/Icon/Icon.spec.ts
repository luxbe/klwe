import { render, RenderResult } from '@testing-library/svelte';
import Icon, { ICON_PATHS, IconType } from '.';

describe('Icon', () => {
  let renderedComponent: RenderResult;

  it('should render the correct icon', () => {
    const ICON: IconType = 'info';
    const PATH = ICON_PATHS[ICON];

    renderedComponent = render(Icon, {
      props: {
        icon: ICON,
      },
    });

    const svgEl = renderedComponent.container.querySelector('svg');
    expect(svgEl).toBeDefined();

    const pathEl = svgEl.querySelector('path');
    expect(pathEl).toBeDefined();
    expect(pathEl.getAttribute('d')).toEqual(PATH);
  });

  it('should change the icon correctly', async () => {
    const ICON_INFO: IconType = 'info';
    const PATH_INFO = ICON_PATHS[ICON_INFO];

    const ICON_GRID: IconType = 'grid';
    const PATH_GRID = ICON_PATHS[ICON_GRID];

    renderedComponent = render(Icon, {
      props: {
        icon: ICON_INFO,
      },
    });

    const pathEl = renderedComponent.container.querySelector('svg path');
    expect(pathEl.getAttribute('d')).toEqual(PATH_INFO);

    await renderedComponent.component.$set({
      icon: ICON_GRID,
    });
    expect(pathEl.getAttribute('d')).toEqual(PATH_GRID);
  });
});
