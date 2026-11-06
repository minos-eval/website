import { expect, test } from '@playwright/test';

const ids = ['how', 'rule', 'minos', 'access', 'data'];

test('sections render in order', async ({ page }) => {
  await page.goto('/');
  const found = await page.locator('main section[id]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(found).toEqual(ids);
});

test('problem shows its points and the determinism line', async ({ page }) => {
  await page.goto('/');
  const problem = page.getByRole('region', { name: 'Sorun' });
  await expect(problem.getByRole('heading', { level: 2 })).toBeVisible();
  for (const title of ['Birden çok geçerli cevap', 'Sonuçlar koşudan koşuya değişir', 'Judge her zaman haklı değildir']) {
    await expect(problem.getByText(title)).toBeVisible();
  }
  await expect(problem.getByText('deterministik hâle getirmeye')).toBeVisible();
  const firstText = await problem.evaluate((section) => section.firstElementChild?.tagName);
  expect(firstText).toBe('H2');
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

test('contact stays plain until an email exists', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.getByText('E-posta adresi yakında')).toBeVisible();
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
    expect(source).toMatch(/\/art\/minos-/);
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
