import { afterEach, expect, it, vi } from 'vitest';
import { mount, tick, unmount } from 'svelte';
import Controls from './Controls.svelte';

let component: ReturnType<typeof mount>;
function render(props = {}) {
  component = mount(Controls, { target: document.body, props });
}
afterEach(() => unmount(component));

it('disables activation and shows pending content for busy buttons and links', () => {
  const onclick = vi.fn();
  render({ busy: true, onclick });
  const button = document.querySelector('button')!;
  const link = document.querySelector('a')!;
  expect(button.disabled).toBe(true);
  expect(button.textContent.trim()).toBe('Saving');
  expect(button.querySelector('svg')).toBeTruthy();
  expect(link.getAttribute('aria-disabled')).toBe('true');
  expect(link.hasAttribute('href')).toBe(false);
  expect(link.textContent.trim()).toBe('Details');
  button.click();
  link.click();
  expect(onclick).not.toHaveBeenCalled();
});

it('keeps a separately disabled button inactive and an idle link usable', () => {
  const onclick = vi.fn();
  render({ disabled: true, onclick });
  const button = document.querySelector('button')!;
  expect(button.disabled).toBe(true);
  expect(button.textContent.trim()).toBe('Save');
  button.click();
  const link = document.querySelector('a')!;
  expect(link.getAttribute('href')).toBe('#details');
  link.click();
  expect(onclick).toHaveBeenCalledOnce();
});

it('dismisses the default alert while preserving the persistent warning', async () => {
  render();
  const alert = document.querySelector('[role=alert]')!;
  alert.querySelector('button')!.click();
  await tick();
  expect(document.querySelector('[role=alert]')).toBeNull();
  const note = document.querySelector('[role=note]')!;
  expect(note.textContent.trim()).toBe('Unsaved changes');
  expect(note.querySelector('button')).toBeNull();
});
