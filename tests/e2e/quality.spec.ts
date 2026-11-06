import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { content } from '../../src/content/site';

const pages = [
  { path: '/', locale: 'tr' },
  { path: '/en', locale: 'en' },
] as const;

for (const { path, locale } of pages) {
  test(`metadata on ${path}`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(content[locale].meta.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', content[locale].meta.description);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /\/art\/og\.jpg$/);
    await expect(page.locator('link[rel="alternate"][hreflang="tr"]')).toHaveCount(1);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveCount(1);
  });

  test(`no third-party requests on ${path}`, async ({ page }) => {
    const hosts = new Set<string>();
    page.on('request', (request) => hosts.add(new URL(request.url()).hostname));
    await page.goto(path, { waitUntil: 'networkidle' });
    expect([...hosts].filter((host) => host !== 'localhost' && host !== '')).toEqual([]);
  });

  for (const width of [320, 390, 768, 1024, 1440, 1920]) {
    test(`no horizontal scroll on ${path} at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(path);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test(`greek word fits on ${path} at 320`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    const fits = await page.locator('#minos [aria-hidden="true"]').evaluate((element) => {
      const range = document.createRange();
      range.selectNodeContents(element);
      return range.getBoundingClientRect().right <= window.innerWidth;
    });
    expect(fits).toBe(true);
  });

  test(`body text stays at 16px or more on ${path} at 320`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto(path);
    const sizes = await page
      .locator('main p, main li, main dd, main dt')
      .evaluateAll((elements) => elements.map((element) => parseFloat(getComputedStyle(element).fontSize)));
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(16);
  });

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    for (const scrollTop of [0, 3000]) {
      test(`axe is clean on ${path} at ${viewport.width}, scrolled ${scrollTop}`, async ({ page }) => {
        await page.setViewportSize(viewport);
        await page.goto(path);
        await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), scrollTop);
        const results = await new AxeBuilder({ page }).analyze();
        expect(results.violations.map((violation) => violation.id)).toEqual([]);
      });
    }
  }
}
