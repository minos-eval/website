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
  await page.goto('/#access');
  await expect.poll(() => boxHeight(page)).toBe(84);
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '0');
});

for (const size of [
  { width: 1440, height: 900 },
  { width: 1280, height: 600 },
  { width: 2560, height: 1440 },
  { width: 390, height: 844 },
]) {
  test(`lower chest is masked by image-relative stops at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('/');
    const mask = await box(page)
      .locator('img')
      .evaluate((image) => {
        const style = getComputedStyle(image);
        return style.maskImage || style.webkitMaskImage;
      });
    expect(mask).toContain('51%');
  });
}

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

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('painting scrolls away instead of covering content', async ({ page }) => {
    await page.goto('/');
    await expect(box(page)).toHaveCSS('position', 'absolute');
  });
});
