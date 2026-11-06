import { expect, test, type Page } from '@playwright/test';

const box = (page: Page) => page.locator('[data-painting]');
const boxHeight = (page: Page) => box(page).evaluate((element) => Math.round(element.getBoundingClientRect().height));
const scrollTo = (page: Page, top: number) => page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);

test('collapses into the bar on scroll', async ({ page }) => {
  await page.goto('/');
  await scrollTo(page, 720);
  await expect.poll(() => boxHeight(page)).toBe(84);
  await expect(box(page)).toHaveCSS('position', 'fixed');
});

test('grows back when scrolling up', async ({ page }) => {
  await page.goto('/');
  await scrollTo(page, 720);
  await expect.poll(() => boxHeight(page)).toBe(84);
  await scrollTo(page, 0);
  await expect.poll(() => boxHeight(page)).toBe(900);
});

test('hero copy fades out as the painting leaves', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '1');
  await scrollTo(page, 720);
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '0');
});

test('deep link opens in bar state', async ({ page }) => {
  await page.goto('/#data');
  await expect.poll(() => boxHeight(page)).toBe(84);
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '0');
});

test('resize recalculates across the layout boundary', async ({ page }) => {
  await page.goto('/');
  await scrollTo(page, 2000);
  await expect.poll(() => boxHeight(page)).toBe(84);
  await page.setViewportSize({ width: 800, height: 900 });
  await expect.poll(() => boxHeight(page)).toBe(64);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect.poll(() => boxHeight(page)).toBe(84);
});

test('reduced motion skips the in-between frames', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await scrollTo(page, 200);
  await expect.poll(() => boxHeight(page)).toBe(84);
});
