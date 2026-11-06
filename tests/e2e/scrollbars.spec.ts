import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 1030, height: 800 }, launchOptions: { ignoreDefaultArgs: ['--hide-scrollbars'] } });

test('script and stylesheet agree on the layout just above 1024', async ({ page }) => {
  await page.goto('/');
  await page.addStyleTag({ content: 'html{scrollbar-color:auto!important}::-webkit-scrollbar{width:15px}' });
  await page.evaluate(() => window.dispatchEvent(new Event('resize')));
  await expect.poll(() => page.evaluate(() => window.innerWidth - document.documentElement.clientWidth)).toBeGreaterThan(0);
  await expect.poll(() => page.locator('[data-painting] img').evaluate((image) => Math.round(image.getBoundingClientRect().width))).toBe(773);
  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'instant' }));
  await expect.poll(() => page.locator('[data-painting]').evaluate((box) => Math.round(box.getBoundingClientRect().height))).toBe(84);
  expect(await page.locator('header').evaluate((header) => Math.round(header.getBoundingClientRect().height))).toBe(84);
});
