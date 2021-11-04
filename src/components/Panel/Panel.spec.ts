import { render, RenderResult } from '@testing-library/svelte';
import Panel from './Panel.svelte';

/**
 * @jest-environment jsdom
 */
describe('Panel', () => {
  let renderedComponent: RenderResult;

  test('should render correctly', async () => {
    renderedComponent = render(Panel);

    expect(renderedComponent.container.classList.contains('panel'));
    expect(renderedComponent.container.classList.contains('panel--left'));
    expect(renderedComponent.container.classList.contains('open'));

    await renderedComponent.component.$set({
      open: false,
    });
    expect(!renderedComponent.container.classList.contains('open'));

    await renderedComponent.component.$set({
      side: 'right',
    });
    expect(!renderedComponent.container.classList.contains('panel--left'));
    expect(renderedComponent.container.classList.contains('panel--right'));
  });
});
