import { render, RenderResult } from '@testing-library/svelte';
import Activitybar from './Activitybar.svelte';
import { activityStore } from '@/stores';

/**
 * @jest-environment jsdom
 */
describe('Activitybar', () => {
  let renderedComponent: RenderResult;

  beforeAll(() => {
    activityStore.activity.set('INFO');
  });

  beforeEach(() => {
    renderedComponent = render(Activitybar);
  });

  it('should show all buttons', () => {
    const buttons = renderedComponent.container.querySelectorAll('button');
    expect(buttons.length).toBe(3);
  });

  it('should show the correct button as active', () => {
    const activeButtons = renderedComponent.container.querySelectorAll(
      'button.active',
    );

    expect(activeButtons.length).toBe(1);
    expect(activeButtons[0].getAttribute('aria-label')).toBe('INFO');
  });
});
