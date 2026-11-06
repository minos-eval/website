import { expect, test, type Page } from '@playwright/test';
import { contrast, maxDistance, regionPixels, type Pixel } from './helpers';

const GROUND: Pixel = [20, 12, 7];
const TEXT: Pixel = [243, 233, 221];

const box = (page: Page) => page.locator('[data-painting]');
const scrollTo = (page: Page, top: number) => page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), top);
const rect = (page: Page, selector: string) =>
  page.locator(selector).first().evaluate((element) => {
    const { top, bottom, left, right, width, height } = element.getBoundingClientRect();
    return { top, bottom, left, right, width, height };
  });
const settled = (page: Page) => page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));

async function scrollPositions(page: Page, url: string) {
  await page.addInitScript(() => {
    const store = window as unknown as { positions: number[] };
    store.positions = [];
    const tick = () => {
      store.positions.push(window.scrollY);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  await page.goto(url);
  await page.waitForFunction(() => window.scrollY > 500);
  await page.waitForTimeout(400);
  return page.evaluate(() => (window as unknown as { positions: number[] }).positions);
}

test.describe('arriving at a section', () => {
  for (const url of ['/#access', '/tr#rule']) {
    test(`${url} does not glide through the hero`, async ({ page }) => {
      const positions = await scrollPositions(page, url);
      const target = positions[positions.length - 1];
      expect(positions.filter((y) => y > 0 && y < target - 1)).toEqual([]);
    });
  }

  test('tabs still scroll smoothly once the page has loaded', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
  });

  test('language switch lands with the section in view', async ({ page }) => {
    await page.goto('/#rule');
    await page.waitForFunction(() => window.scrollY > 500);
    await expect(page.getByRole('link', { name: 'Decision rule' })).toHaveAttribute('aria-current', 'true');
    await page.getByRole('link', { name: 'TR', exact: true }).click();
    await expect(page).toHaveURL(/\/tr#rule$/);
    await expect.poll(async () => (await rect(page, '#rule')).top).toBeLessThan(400);
  });

  for (const id of ['problem', 'modes']) {
    test(`language switch keeps ${id}, which has no tab`, async ({ page }) => {
      await page.goto(`/#${id}`);
      await page.waitForFunction(() => window.scrollY > 500);
      await settled(page);
      await page.getByRole('link', { name: 'TR', exact: true }).click();
      await expect(page).toHaveURL(new RegExp(`/tr#${id}$`));
    });
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('header and painting scroll away instead of covering text', async ({ page }) => {
    await page.goto('/');
    await scrollTo(page, 2000);
    expect((await rect(page, 'header')).bottom).toBeLessThanOrEqual(0);
    expect((await rect(page, '[data-painting]')).bottom).toBeLessThanOrEqual(0);
  });

  test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('every tab and the language link sit on screen', async ({ page }) => {
      await page.goto('/');
      const links = page.getByRole('navigation').getByRole('link');
      await expect(links).toHaveCount(7);
      for (const link of await links.all()) {
        await expect(link).toBeInViewport({ ratio: 1 });
      }
    });

    test('the brand stays on the left edge', async ({ page }) => {
      await page.goto('/');
      expect((await rect(page, 'header a')).left).toBeLessThan(30);
    });
  });
});

test.describe('the painting', () => {
  for (const size of [
    { width: 1440, height: 900 },
    { width: 2560, height: 1440 },
    { width: 390, height: 844 },
  ]) {
    test(`lower chest shows no paint at ${size.width}x${size.height}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await settled(page);
      await page.addStyleTag({ content: '[data-hero-copy],header{visibility:hidden}' });
      const image = await rect(page, '[data-painting] img');
      const row = Math.round(image.top + image.height * 0.54);
      const pixels = row < size.height
        ? await regionPixels(page, { x: 0, y: row, width: Math.min(image.right, size.width), height: 1 })
        : [GROUND];
      expect(maxDistance(pixels, GROUND)).toBeLessThanOrEqual(6);
    });
  }

  test('dissolves at its lower edge while collapsing', async ({ page }) => {
    await page.goto('/');
    await scrollTo(page, 320);
    await settled(page);
    await page.addStyleTag({ content: 'main,header{visibility:hidden}' });
    const { bottom } = await rect(page, '[data-painting]');
    const pixels = await regionPixels(page, { x: 0, y: Math.round(bottom) - 2, width: 760, height: 1 });
    expect(maxDistance(pixels, GROUND)).toBeLessThanOrEqual(14);
  });

  for (const size of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    test(`brand text clears AA over the bar at ${size.width}`, async ({ page }) => {
      await page.setViewportSize(size);
      await page.goto('/');
      await scrollTo(page, 3000);
      await settled(page);
      const clip = await page.locator('header a').first().evaluate((brand) => {
        const range = document.createRange();
        range.selectNode(brand.lastChild!);
        const { left, top, width, height } = range.getBoundingClientRect();
        return { x: Math.floor(left), y: Math.floor(top), width: Math.ceil(width), height: Math.ceil(height) };
      });
      await page.addStyleTag({ content: 'header a{color:transparent!important}' });
      const pixels = await regionPixels(page, clip);
      const ratios = pixels.map((pixel) => contrast(TEXT, pixel)).sort((a, b) => a - b);
      expect(ratios[Math.floor(ratios.length * 0.05)]).toBeGreaterThanOrEqual(4.5);
    });
  }
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('the eye strip keeps its colour in the bar', async ({ page }) => {
    await page.goto('/');
    await scrollTo(page, 3000);
    await settled(page);
    await page.addStyleTag({ content: 'header{visibility:hidden}' });
    const pixels = await regionPixels(page, { x: 200, y: 8, width: 80, height: 48 });
    const warmth = pixels.reduce((sum, [red, , blue]) => sum + red - blue, 0) / pixels.length;
    expect(warmth).toBeGreaterThan(90);
  });

  test('the title is never under the painting', async ({ page }) => {
    await page.goto('/');
    for (const top of [0, 100, 220, 300, 420]) {
      await scrollTo(page, top);
      await settled(page);
      const painting = await rect(page, '[data-painting]');
      const title = await rect(page, 'h1');
      expect(painting.bottom).toBeLessThanOrEqual(Math.max(title.top, 64) + 1);
    }
  });
});

for (const size of [
  { width: 844, height: 390 },
  { width: 1000, height: 600 },
]) {
  test(`short screens show the title on the first screen at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('/');
    await expect(page.locator('h1')).toBeInViewport();
  });
}

test('reduced motion keeps the first screen readable after a small scroll', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await scrollTo(page, 1);
  await settled(page);
  await expect(page.locator('[data-hero-copy]')).toHaveCSS('opacity', '1');
});

test('the mobile menu stays reachable on a very short screen', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const language = page.getByRole('link', { name: 'TR', exact: true });
  await language.scrollIntoViewIfNeeded();
  await expect(language).toBeInViewport({ ratio: 1 });
});

test('the footer stops growing with the rest of the page on very wide screens', async ({ page }) => {
  await page.setViewportSize({ width: 2560, height: 1440 });
  await page.goto('/');
  const footerText = await page.getByText('Contact us').evaluate((element) => element.getBoundingClientRect().right);
  expect(footerText).toBeLessThanOrEqual(2160);
});
