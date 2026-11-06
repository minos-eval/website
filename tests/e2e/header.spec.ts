import { expect, test, type Page } from '@playwright/test';

const tabs = ['Sorun', 'Nasıl çalışır', 'Karar kuralı', 'Neden Minos', 'Erişim', 'Veri güvenliği'];
const nav = (page: Page) => page.getByRole('navigation', { name: 'Sayfa bölümleri' });
const centerSection = (page: Page, id: string) =>
  page.evaluate((target) => {
    const section = document.getElementById(target)!;
    const top = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top - window.innerHeight * 0.3, behavior: 'instant' });
  }, id);

test('six tabs in order', async ({ page }) => {
  await page.goto('/');
  const labels = await nav(page).locator('a[href^="#"]').allInnerTexts();
  expect(labels).toEqual(tabs);
});

test('clicking a tab keeps the heading below the bar', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await nav(page).getByRole('link', { name: 'Erişim' }).click();
  await expect.poll(() => page.evaluate(() => document.querySelector('#access h2')!.getBoundingClientRect().top)).toBeGreaterThan(84);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(1000);
});

test('no tab is active at the top of the page', async ({ page }) => {
  await page.goto('/');
  await expect(nav(page).locator('[aria-current="true"]')).toHaveCount(0);
});

test('active tab follows the section', async ({ page }) => {
  await page.goto('/');
  await centerSection(page, 'rule');
  const tab = nav(page).getByRole('link', { name: 'Karar kuralı' });
  await expect(tab).toHaveAttribute('aria-current', 'true');
  await expect(tab).toHaveCSS('border-bottom-color', 'rgb(255, 95, 109)');
});

test('language switch keeps the section', async ({ page }) => {
  await page.goto('/');
  await centerSection(page, 'rule');
  await expect(nav(page).getByRole('link', { name: 'Karar kuralı' })).toHaveAttribute('aria-current', 'true');
  await nav(page).getByRole('link', { name: 'EN', exact: true }).click();
  await expect(page).toHaveURL(/\/en#rule$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('english page links back to turkish', async ({ page }) => {
  await page.goto('/en');
  await page.getByRole('navigation', { name: 'Page sections' }).getByRole('link', { name: 'TR', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});

test('keyboard reaches the brand, tabs and language', async ({ page }) => {
  await page.goto('/');
  const reached: string[] = [];
  for (let press = 0; press < tabs.length + 2; press += 1) {
    await page.keyboard.press('Tab');
    reached.push(await page.evaluate(() => (document.activeElement as HTMLElement).innerText.trim()));
  }
  expect(reached).toEqual(['MINOS', ...tabs, 'EN']);
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('menu opens, closes with Escape and returns focus', async ({ page }) => {
    await page.goto('/');
    const button = page.getByRole('button', { name: 'Menüyü aç' });
    await expect(nav(page).getByRole('link', { name: 'Erişim' })).toBeHidden();
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await button.click();
    const close = page.getByRole('button', { name: 'Menüyü kapat' });
    await expect(close).toHaveAttribute('aria-expanded', 'true');
    await expect(nav(page).getByRole('link', { name: 'Erişim' })).toBeVisible();
    await expect(nav(page).getByRole('link', { name: 'EN', exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(nav(page).getByRole('link', { name: 'Erişim' })).toBeHidden();
    await expect(page.getByRole('button', { name: 'Menüyü aç' })).toBeFocused();
  });

  test('choosing a tab closes the menu and goes to the section', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: 'Menüyü aç' }).click();
    await nav(page).getByRole('link', { name: 'Erişim' }).click();
    await expect(nav(page).getByRole('link', { name: 'Erişim' })).toBeHidden();
    await expect(page).toHaveURL(/#access$/);
  });

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test('tabs stay reachable', async ({ page }) => {
      await page.goto('/');
      await expect(nav(page).getByRole('link', { name: 'Erişim' })).toBeVisible();
    });
  });
});
