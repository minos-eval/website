import { expect, test } from '@playwright/test';

test('tr root uses lang=tr', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('en route uses lang=en', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('painting assets are served', async ({ request }) => {
  for (const path of ['/art/minos-clean.webp', '/art/minos-kumas.webp', '/art/og.jpg']) {
    expect((await request.get(path)).status()).toBe(200);
  }
});
