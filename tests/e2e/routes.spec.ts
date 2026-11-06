import { expect, test } from '@playwright/test';

test('root is english and uses lang=en', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('tr route uses lang=tr', async ({ page }) => {
  await page.goto('/tr');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('painting assets are served', async ({ request }) => {
  for (const path of ['/art/minos-clean.webp', '/art/minos-kumas.webp', '/art/og.jpg']) {
    expect((await request.get(path)).status()).toBe(200);
  }
});
