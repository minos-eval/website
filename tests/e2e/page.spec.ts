import { expect, test } from '@playwright/test';

const ids = ['problem', 'how', 'rule', 'minos', 'modes', 'access', 'data'];

test('sections render in order', async ({ page }) => {
  await page.goto('/');
  const found = await page.locator('main section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(found).toEqual(ids);
});

test('problem shows its points and closes on the manual-testing line', async ({ page }) => {
  await page.goto('/');
  const problem = page.getByRole('region', { name: 'The problem' });
  await expect(problem.getByRole('heading', { level: 2 })).toBeVisible();
  for (const title of ['Many valid answers', 'Results change between runs', 'Judges are not always right']) {
    await expect(problem.getByText(title)).toBeVisible();
  }
  await expect(problem.getByText('Today, test teams still ask the questions manually and grade the answers by hand.', { exact: true })).toBeVisible();
  const order = await problem.evaluate((section) =>
    Array.from(section.children)
      .slice(0, 2)
      .map((child) => child.tagName),
  );
  expect(order).toEqual(['P', 'H2']);
});

test('human step is highlighted', async ({ page }) => {
  await page.goto('/');
  const step = page.locator('#how li').nth(4).locator('strong');
  await expect(step).toHaveCSS('color', 'rgb(255, 95, 109)');
});

test('greek word is hidden from screen readers', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#minos [aria-hidden="true"]')).toHaveText('ΜΙΝΩΣ');
});

test('contact shows no placeholder until an email exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.getByText('Contact us')).toBeVisible();
  await expect(page.getByText('Email address coming soon')).toHaveCount(0);
});

test('credit is the last line and links out', async ({ page }) => {
  await page.goto('/');
  const last = page.locator('footer > *').last();
  await expect(last).toContainText('Koronaios');
  await expect(last).toContainText('CC BY-SA 4.0');
  await expect(last.locator('a[href*="commons.wikimedia.org"]')).toHaveCount(1);
  await expect(last.locator('a[href*="creativecommons.org/licenses/by-sa/4.0"]')).toHaveCount(1);
});

test('no product screenshots', async ({ page }) => {
  await page.goto('/');
  const sources = await page.locator('img').evaluateAll((images) => images.map((image) => (image as HTMLImageElement).src));
  for (const source of sources) {
    expect(source).toMatch(/\/art\/minos-|\/logo\.png$/);
  }
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('text stays readable', async ({ page }) => {
    await page.goto('/');
    const title = page.getByRole('heading', { level: 1 });
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('opacity', '1');
    for (const id of ids) {
      await expect(page.locator(`#${id} h2`)).toBeVisible();
    }
  });
});
