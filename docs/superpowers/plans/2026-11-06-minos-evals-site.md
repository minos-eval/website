# MINOS Evals tanıtım sitesi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Onaylanan tasarımı Türkçe ve İngilizce statik bir Next.js sitesi olarak kurmak.

**Architecture:** İki dil, ortak bir `MinosPage` bileşenini kendi içerik nesnesiyle render eden iki ayrı kök layout'tur. Sitenin tek hareketi, saf bir fonksiyonun (`collapseFrame`) hesapladığı değerleri tablo kabına uygulayan küçük bir istemci bileşenidir. Çıktı tamamen statiktir (`output: 'export'`), sunucu kodu yoktur.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5.9, düz CSS, `next/font/google` (Commissioner), Vitest, Playwright, axe.

**Spec:** [`docs/superpowers/specs/2026-11-06-minos-evals-site-design.md`](../specs/2026-11-06-minos-evals-site-design.md). Görünüm, hareket ve Türkçe metnin kaynağı: [`docs/superpowers/mocks/2026-11-06-tam-sayfa/index.html`](../mocks/2026-11-06-tam-sayfa/index.html). Denemenin kodu kopyalanmaz, değerleri ve metni alınır.

## Global Constraints

- Node 22, Next `^16.4.5`, React `^19.3.1`, TypeScript `~5.9` (7.x değil).
- Sunucu kodu, CMS, analitik, çerez ve üçüncü taraf betik yok. Font siteden sunulur.
- Müşteri ve asistan adları, sektörü ele veren ayrıntılar hiçbir yerde geçmez.
- Yasak ifadeler: "black box", "kara kutu", "her LLM", "any LLM", `0.7`, `0,7`. Fiyat, lisans, müşteri, benchmark iddiası yok.
- Üründen ekran görüntüsü ya da arayüz taklidi yok. Bölüm başlıklarının üstünde küçük etiket yok.
- Tek font ailesi: Commissioner. Başlıklarda `FLAR` 100, gövdede kullanılmaz.
- Renkler: zemin `#140c07`, metin `#f3e9dd`, ikincil `#cbbcaa`, sönük `#a08f7e`, çizgi `#33241a`, vurgu `#ff5f6d`, `ΜΙΝΩΣ` `#8f5c39`. Kırmızı yalnızca insanın adımı, `needs_review` ve aktif sekmede kullanılır.
- Logo beyaz karo üstünde durur, rengi değiştirilmez: `#1B1714`, `#8F2A22`.
- Tek hareket tablonun menü barına çekilmesidir. Başka kaydırma animasyonu yok.
- WCAG AA. Gövde metni 16 px'in altına inmez. Hiçbir genişlikte yatay kaydırma olmaz.
- Bölüm kimlikleri iki dilde aynıdır: `how`, `rule`, `minos`, `access`, `data`.
- Her commit `feat/site` dalına yapılır, `main`'e değil. Commit mesajları şu satırla biter: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## Review Focus

- **Derin bağlantı ya da sayfa ortasında yenileme:** `/#access` açılınca sayfa doğrudan menü barı durumunda gelir, hero bir an üstte görünmez. (Task 4)
- **Kısa ve çok geniş ekranlar:** 1280×600 ya da 2560×1440'ta göğsün alt kısmı açığa çıkmaz, tablo 1387 px'i belirgin aşmaz. (Task 4)
- **JavaScript kapalı:** Tüm metin okunur, tablo içeriğin üstüne binmez, sekmeler çalışır. (Task 3)
- **Sayfa ortasında pencereyi boyutlandırma ya da telefonu çevirme:** 1024 sınırı geçilse bile bar yüksekliği ve düzen doğru kalır. (Task 4)
- **320 px genişlik ve uzun İngilizce metin:** Yatay kaydırma oluşmaz, `ΜΙΝΩΣ` taşmaz. (Task 6)

---

## Dosya yapısı

```
package.json  tsconfig.json  next.config.ts  vitest.config.ts  playwright.config.ts  .gitignore
public/art/minos-clean.webp  minos-kumas.webp  og.jpg
src/app/globals.css                   tokenlar, temel stiller
src/app/icon.svg                      geçici logo
src/app/(tr)/layout.tsx, page.tsx     Türkçe, /
src/app/(en)/en/layout.tsx, page.tsx  İngilizce, /en
src/lib/font.ts                       Commissioner
src/lib/collapse.ts                   hareket hesabı (saf fonksiyonlar)
src/content/site.ts                   iki dilin bütün metni
src/components/RootDocument.tsx       <html lang> ve <body>
src/components/MinosPage.tsx          sayfayı kurar
src/components/sections.tsx           bölüm bileşenleri
src/components/sections.module.css
src/components/Painting.tsx           tablo ve hareket (istemci)
src/components/Painting.module.css
src/components/SiteHeader.tsx         menü, aktif sekme, dil, mobil menü (istemci)
src/components/SiteHeader.module.css
src/components/Logo.tsx               geçici logo
tests/unit/*.test.ts  tests/e2e/*.spec.ts
```

---

### Task 1: Proje iskeleti ve iki dilli rotalar

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `.gitignore`, `src/lib/font.ts`, `src/app/globals.css`, `src/app/icon.svg`, `src/components/RootDocument.tsx`, `src/components/Logo.tsx`, `src/app/(tr)/layout.tsx`, `src/app/(tr)/page.tsx`, `src/app/(en)/en/layout.tsx`, `src/app/(en)/en/page.tsx`, `public/art/*`
- Modify: `PRODUCT.md`
- Test: `tests/e2e/routes.spec.ts`

**Interfaces:**
- Produces: `RootDocument({ locale: 'tr' | 'en', children })`, `commissioner` (`src/lib/font.ts`), `Logo()`, `/art/minos-clean.webp`, `/art/minos-kumas.webp`, `/art/og.jpg`, npm betikleri `build`, `typecheck`, `test:unit`, `test:e2e`.

- [ ] **Step 1: Dalı aç ve araçları kur**

```bash
git switch -c feat/site
```

`package.json` betikleri: `dev: next dev`, `build: next build`, `typecheck: tsc --noEmit`, `test:unit: vitest run`, `test:e2e: playwright test`. Bağımlılıklar: `next`, `react`, `react-dom`. Geliştirme: `typescript@~5.9`, `@types/react`, `@types/react-dom`, `@types/node@^22`, `vitest`, `@playwright/test`, `@axe-core/playwright`, `serve`.

`.gitignore`: `node_modules`, `.next`, `out`, `playwright-report`, `test-results`, `*.tsbuildinfo`, `next-env.d.ts`, `.DS_Store`, `.superpowers/`, `.agent/`, `.agents/`, `.claude/`, `.codex/`, `.cursor/`, `.gemini/`, `options/`, `options2/`, `.impeccable/questions/`, `.impeccable/mocks/`, `.impeccable/review/`, `.impeccable/config.local.json`, `.impeccable/hook.cache.json`.

Run: `npm install && npx playwright install chromium`
Expected: Hata olmadan biter.

- [ ] **Step 2: Failing test yaz**

`tests/e2e/routes.spec.ts`:

```ts
test('tr root uses lang=tr', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'tr');
});
test('en route uses lang=en', async ({ page }) => {
  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});
test('painting assets are served', async ({ request }) => {
  for (const p of ['/art/minos-clean.webp', '/art/minos-kumas.webp', '/art/og.jpg']) {
    expect((await request.get(p)).status()).toBe(200);
  }
});
```

`playwright.config.ts`: `webServer: { command: 'npm run build && npx serve out -l 4173', url: 'http://localhost:4173', reuseExistingServer: true }`, `baseURL` aynı adres, varsayılan viewport 1440×900, yalnızca Chromium.

- [ ] **Step 3: Testin başarısız olduğunu gör**

Run: `npm run test:e2e -- routes`
Expected: FAIL, derleme ya da rota bulunamadı.

- [ ] **Step 4: İskeleti kur**

- `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`.
- `src/lib/font.ts`: `Commissioner({ subsets: ['latin', 'latin-ext', 'greek'], axes: ['FLAR', 'VOLM'], display: 'swap', variable: '--font-commissioner' })`.
- `globals.css`: Global Constraints'teki renkler `:root` tokenı olur. `::selection`, `:focus-visible`, `scrollbar-color` denemeden alınır. `scroll-behavior: smooth` yalnızca hareket azaltma tercihi yokken uygulanır.
- Kök layout'lar `RootDocument` kullanır, iki tane `<html>` yazılmaz. Sayfalar şimdilik boş `<main />` döndürür.
- `Logo.tsx` ve `icon.svg`: denemedeki `#logo` sembolü.
- Görseller, mock klasöründen: `cwebp -q 82 minos-clean.jpg -o public/art/minos-clean.webp`, aynısı kumaş için. `og.jpg`: `minos-clean.jpg` üstünden `(0,0,1387,728)` kırpılıp 1200×630 yapılır, `prep_mural.py` gibi Pillow ile.
- `PRODUCT.md`: "Binding visual constraint (user volunteered): an old-school feel." satırı silinir. "Evidence on Hand" bölümündeki örnek veri cümlesi yazılı örnek vaka ile sınırlanır. Hero ve üründen ekran kararı için spec'e bağlantı eklenir.

- [ ] **Step 5: Testi ve tip kontrolünü çalıştır**

Run: `npm run typecheck && npm run test:e2e -- routes`
Expected: PASS, 3 test.

- [ ] **Step 6: Commit**

```bash
git add .gitignore package.json package-lock.json tsconfig.json next.config.ts vitest.config.ts playwright.config.ts src public tests PRODUCT.md BRIEF.md docs
git commit -m "feat: scaffold static bilingual Next.js site"
```

---

### Task 2: İçerik modeli ve iki dilin metni

**Files:**
- Create: `src/content/site.ts`
- Test: `tests/unit/content.test.ts`

**Interfaces:**
- Produces:

```ts
export type Locale = 'tr' | 'en';
export type SectionId = 'how' | 'rule' | 'minos' | 'access' | 'data';
export const CONTACT_EMAIL: string | null = null;
export interface SiteContent {
  locale: Locale;
  meta: { title: string; description: string };
  nav: { id: SectionId; label: string }[];
  menu: { open: string; close: string; language: string; sections: string };
  hero: { title: string; lead: string };
  problem: { label: string; title: string; intro: string; items: { title: string; body: string }[]; today: string; approach: string };
  how: { title: string; steps: { title: string; body: string; human?: true }[] };
  rule: { title: string; statements: string[]; example: { tag: string; rows: { label: string; value: string }[]; verdict: { label: string; value: string } } };
  myth: { title: string; body: string };
  modes: { title: string; items: { name: string; body: string }[] };
  access: { title: string; steps: string[]; note: string };
  data: { title: string; body: string };
  close: { title: string; contactPlaceholder: string };
  credit: { photoLabel: string; edits: string; mural: string };
}
export const content: Record<Locale, SiteContent>;
```

- [ ] **Step 1: Failing test yaz**

`tests/unit/content.test.ts`:

```ts
test.each(['tr', 'en'] as const)('%s has the fixed section shape', (l) => {
  const c = content[l];
  expect(c.nav.map((n) => n.id)).toEqual(['how', 'rule', 'minos', 'access', 'data']);
  expect(c.how.steps).toHaveLength(7);
  expect(c.how.steps.findIndex((s) => s.human)).toBe(4);
  expect(c.rule.statements).toHaveLength(4);
  expect(c.modes.items).toHaveLength(3);
  expect(c.access.steps).toHaveLength(3);
});
test('tr hero copy is the approved line', () => {
  expect(content.tr.hero.title).toBe('İki yargıç kararsız kalırsa, son söz sizin.');
});
test('en hero copy is the approved line', () => {
  expect(content.en.hero.title).toBe("When two judges can't decide, the last word is yours.");
});
test.each(['tr', 'en'] as const)('%s problem has three points and the determinism line', (l) => {
  const p = content[l].problem;
  expect(p.items).toHaveLength(3);
  expect(p.approach.toLowerCase()).toContain(l === 'tr' ? 'deterministik' : 'deterministic');
});
test('en problem copy is the approved text', () => {
  const p = content.en.problem;
  expect(p.title).toBe('Conventional tests assume a stable right answer. LLM apps rarely have one.');
  expect(p.items.map((i) => i.title)).toEqual(['Many valid answers', 'Results change between runs', 'Judges are not always right']);
});
test.each(['tr', 'en'] as const)('%s avoids banned claims', (l) => {
  const text = JSON.stringify(content[l]).toLowerCase();
  for (const bad of ['black box', 'kara kutu', 'her llm', 'any llm', '0.7', '0,7', 'havayolu', 'airline', 'uçuş', 'flight']) {
    expect(text).not.toContain(bad);
  }
});
test.each(['tr', 'en'] as const)('%s keeps product terms and labels the sample', (l) => {
  const c = content[l];
  expect(c.rule.example.verdict.value).toContain('needs_review');
  expect(['Örnek', 'Sample']).toContain(c.rule.example.tag);
});
```

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `npm run test:unit -- content`
Expected: FAIL, modül bulunamadı.

- [ ] **Step 3: `src/content/site.ts` yaz**

Sorun bölümü hariç Türkçe metin denemeden aynen alınır. İngilizce aynı düz dille çevrilir, "you" hitabı kullanılır, `needs_review`, `judge`, `baseline` çevrilmez. `CONTACT_EMAIL` `null` kalır.

Sorun bölümünün metni aşağıdaki gibidir. Denemedeki eski metin kullanılmaz. İngilizce metin kullanıcıdan geldi, aynen kullanılır (`today` ve `approach` hariç).

| Alan | EN | TR |
|---|---|---|
| `label` | The problem | Sorun |
| `title` | Conventional tests assume a stable right answer. LLM apps rarely have one. | Klasik testler sabit bir doğru cevap varsayar. LLM uygulamalarında bu nadiren vardır. |
| `intro` | Chatbots, code-review bots and test generators are now part of everyday software. Evaluating them breaks the assumptions that ordinary software testing relies on. | Sohbet botları, kod inceleme botları ve test üreticileri artık günlük yazılımın parçası. Bunları değerlendirmek, sıradan yazılım testinin dayandığı varsayımları bozuyor. |
| `items[0]` | **Many valid answers.** Outputs are open-ended. Two different responses can both be correct, so exact-match checks miss real failures or flag good answers. | **Birden çok geçerli cevap.** Çıktılar açık uçludur. İki farklı cevap da doğru olabilir, bu yüzden birebir eşleştirme gerçek hataları kaçırır ya da iyi cevapları yanlış işaretler. |
| `items[1]` | **Results change between runs.** The same input can produce a different answer, and a different verdict from the evaluator, every time it runs. One run is not evidence. | **Sonuçlar koşudan koşuya değişir.** Aynı girdi her çalıştığında farklı bir cevap ve değerlendiriciden farklı bir karar üretebilir. Tek koşu kanıt değildir. |
| `items[2]` | **Judges are not always right.** LLM-as-a-judge scales review, but its decisions do not always agree with human experts. A judge that is never checked becomes a hidden risk. | **Judge her zaman haklı değildir.** LLM-as-a-judge incelemeyi ölçekler, ama kararları insan uzmanlarla her zaman örtüşmez. Hiç denetlenmeyen bir judge gizli bir risktir. |
| `today` | Today, test teams still ask the questions by hand and grade the answers by hand. | Bugün test ekipleri soruları hâlâ elle soruyor, cevapları elle notluyor. |
| `approach` | MINOS Evals works to make this problem as deterministic as it can. Cases are fixed revisions, code checks run the same way every time, and the final verdict comes from a deterministic rule, not a model's impression. | MINOS Evals bu sorunu olabildiğince deterministik hâle getirmeye çalışır. Vakalar değişmez revizyonlardır, kod kontrolleri her seferinde aynı çalışır, nihai kararı bir modelin izlenimi değil deterministik bir kural verir. |

Her `items` öğesinde kalın kısım `title`, gerisi `body` olur.

- [ ] **Step 4: Testi çalıştır**

Run: `npm run test:unit -- content`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/content tests/unit/content.test.ts
git commit -m "feat: add bilingual site content"
```

---

### Task 3: Bölümler ve statik sayfa

**Files:**
- Create: `src/components/MinosPage.tsx`, `src/components/sections.tsx`, `src/components/sections.module.css`
- Modify: `src/app/(tr)/page.tsx`, `src/app/(en)/en/page.tsx`
- Test: `tests/e2e/page.spec.ts`

**Interfaces:**
- Consumes: `content`, `CONTACT_EMAIL`, `SiteContent`, `SectionId`.
- Produces: `MinosPage({ content: SiteContent })`. Hero metni `data-hero-copy` taşır ve `opacity: var(--hero-copy-opacity, 1)` kullanır (Task 4). Bölümlerin `id` değerleri `SectionId` ile aynıdır. `MinosPage`, Task 4 ve 5'te `<Painting />` ve `<SiteHeader />` ekleneceği yere sahiptir.

- [ ] **Step 1: Failing test yaz**

`tests/e2e/page.spec.ts`:

- `sections render in order`: `main section[id]` kimlikleri `['how','rule','minos','access','data']` sırasındadır.
- `problem shows its points and the determinism line`: `page.getByRole('region', { name: 'Sorun' })` içinde `h2`, üç madde başlığı ve `deterministik` kelimesi görünür. Bölümün ilk metin öğesi `h2`'dir, üstünde etiket yoktur.
- `human step is highlighted`: 5. adım başlığının rengi `rgb(255, 95, 109)`.
- `greek word is hidden from screen readers`: `ΜΙΝΩΣ` öğesi `aria-hidden="true"`.
- `contact stays plain until an email exists`: `footer a[href^="mailto:"]` sayısı 0, `E-posta adresi yakında` görünür.
- `credit is the last line and links out`: `footer` içindeki son metin öğesi `Koronaios` ve `CC BY-SA 4.0` içerir. `commons.wikimedia.org` ve `creativecommons.org/licenses/by-sa/4.0` bağlantıları vardır.
- `no product screenshots`: sayfadaki görseller yalnızca tablo ve kumaştan oluşur.
- `readable without JavaScript` (`test.use({ javaScriptEnabled: false })`): hero başlığı ve beş bölüm başlığı görünür, `opacity` 1'dir.

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `npm run test:e2e -- page`
Expected: FAIL.

- [ ] **Step 3: Bileşenleri yaz**

`sections.tsx`: `Hero`, `Problem`, `How`, `Rule`, `Myth`, `Modes`, `Access`, `Data`, `Close`, hepsi `{ c: SiteContent }` alır. Küçük yardımcı `inline(text: string)`: `needs_review` kelimesini `<em>`, `Gorgias` kelimesini `<i>` ile sarar. Kapanış zemini `url(/art/minos-kumas.webp)` ve denemedeki gradyandır.

`Problem` denemeden farklıdır: `<section aria-label={c.problem.label}>`, `label` ekranda gösterilmez. Sıra: büyük `h2`, sağ sütunda `intro`, üç eşit metin sütunu (üstte ince çizgi, ikon ve kart yok, madde başlıkları `1.5rem` ve `FLAR` 100), en altta sağ sütunda tek paragraf olarak `today` ve `approach`, `1.5rem`. 1024 px altında tek sütuna iner.

Stiller denemeden alınır, şu dönüşümlerle:
- `html` font boyutu 16 px sabittir, denemedeki `100vw / 90` kuralı alınmaz.
- Hero sağ sütunu ve `margin-left: 56.5rem` değerleri `62.8vw` olur.
- Büyük başlıklar akışkandır: `h1` `clamp(2.5rem, 4.3vw, 4.25rem)`, 4.5rem başlıklar `clamp(2.5rem, 5vw, 4.5rem)`, veri başlığı `clamp(2.5rem, 5.6vw, 5rem)`, `ΜΙΝΩΣ` `clamp(3.5rem, 17.2vw, 15.5rem)`.
- İçerik genişliği `max-width: 110rem` ile ortalanır.
- 1024 px altında: yan yana düzenler tek sütuna iner, `.flow` başlığı sabit kalmaz, merdiven girintileri `1.5rem` adımla azalır.

- [ ] **Step 4: Testi çalıştır**

Run: `npm run test:e2e -- page`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src tests/e2e/page.spec.ts
git commit -m "feat: build page sections from content"
```

---

### Task 4: Tablo ve menü barına çekilme hareketi

**Files:**
- Create: `src/lib/collapse.ts`, `src/components/Painting.tsx`, `src/components/Painting.module.css`
- Modify: `src/components/MinosPage.tsx`
- Test: `tests/unit/collapse.test.ts`, `tests/e2e/painting.spec.ts`

**Interfaces:**
- Produces:

```ts
export type Layout = 'wide' | 'stacked';
export interface Viewport { width: number; height: number }
export interface CollapseFrame {
  progress: number; boxHeight: number;
  imageWidth: number; imageX: number; imageY: number; imageScale: number;
  barOpacity: number; shadeOpacity: number; topFadeOpacity: number; copyOpacity: number;
}
export function layoutFor(width: number): Layout;          // >= 1024 'wide'
export function barHeightFor(layout: Layout): number;      // wide 84, stacked 64
export function imageWidthFor(v: Viewport): number;        // wide min(.75*width, 1200), stacked 1.3*width
export function collapseFrame(scrollY: number, v: Viewport, opts?: { reducedMotion?: boolean }): CollapseFrame;
```

- `Painting()`: `document.documentElement` üstüne `--hero-copy-opacity` yazar. Tablo kabı `data-painting` taşır.

- [ ] **Step 1: Failing unit test yaz**

`tests/unit/collapse.test.ts`, spec'in 1440×900 değerleriyle:

```ts
const v = { width: 1440, height: 900 };
test('hero frame', () => {
  const f = collapseFrame(0, v);
  expect(f).toMatchObject({ progress: 0, boxHeight: 900, imageScale: 1, barOpacity: 0, shadeOpacity: 0, copyOpacity: 1 });
  expect(f.imageWidth).toBe(1080);
  expect(f.imageX).toBeCloseTo(-70, 0);
  expect(f.imageY).toBeCloseTo(-24, 0);
});
test('bar frame at 0.8 of the viewport height', () => {
  const f = collapseFrame(720, v);
  expect(f).toMatchObject({ progress: 1, boxHeight: 84, barOpacity: 1, shadeOpacity: 1, copyOpacity: 0 });
  expect(f.imageScale).toBeCloseTo(0.78);
  expect(Math.abs(f.imageX - -98)).toBeLessThan(1);
  expect(Math.abs(f.imageY - -160)).toBeLessThan(1);
});
test('ramps match the spec', () => {
  expect(collapseFrame(720 * 0.55, v).barOpacity).toBeCloseTo(0);
  expect(collapseFrame(720 * 0.85, v).barOpacity).toBeCloseTo(1);
  expect(collapseFrame(720 * 0.4, v).shadeOpacity).toBeCloseTo(0);
  expect(collapseFrame(720 * 0.9, v).shadeOpacity).toBeCloseTo(1);
  expect(collapseFrame(720 * 0.36, v).copyOpacity).toBeLessThan(0.02);
});
test('reduced motion has no in-between frames', () => {
  expect(collapseFrame(0, v, { reducedMotion: true }).progress).toBe(0);
  expect(collapseFrame(1, v, { reducedMotion: true }).progress).toBe(1);
});
test('stacked layout keeps the copy and uses the 64px bar', () => {
  const m = { width: 390, height: 844 };
  expect(layoutFor(390)).toBe('stacked');
  expect(collapseFrame(0, m).copyOpacity).toBe(1);
  expect(collapseFrame(9999, m).copyOpacity).toBe(1);
  expect(collapseFrame(9999, m).boxHeight).toBe(64);
});
test('image stays near its source width on very wide screens', () => {
  expect(imageWidthFor({ width: 2560, height: 1440 })).toBe(1200);
});
```

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `npm run test:unit -- collapse`
Expected: FAIL, modül bulunamadı.

- [ ] **Step 3: `src/lib/collapse.ts` yaz**

`progress = clamp(scrollY / (0.8 * height), 0, 1)`, hareket azaltmada `scrollY > 0 ? 1 : 0`. Her değer `progress` ile doğrusal değişir. Sabitler:

| | wide | stacked |
|---|---|---|
| başlangıç `x`, `y` | `-0.0648W`, `-0.0222W` | `-0.12W`, `-0.02W` |
| son ölçek | `0.78` | `0.62` |
| gözün son `x` konumu | `0.5W` | `0.55 * width` |
| `copyOpacity` | `clamp(1 - 2.8p, 0, 1)` | `1` |

`W` görüntü genişliğidir. Gözün resimdeki yeri `{ x: 0.757, y: 0.16 }`, resim oranı `2080 / 1387`. Son konum, gözü `gözün son x` noktasına ve bar yüksekliğinin ortasına getirecek şekilde hesaplanır. `barOpacity = clamp((p - .55) / .3)`, `shadeOpacity = clamp((p - .4) / .5)`, `topFadeOpacity = 1 - p`.

- [ ] **Step 4: Unit testi çalıştır**

Run: `npm run test:unit -- collapse`
Expected: PASS.

- [ ] **Step 5: Failing e2e test yaz**

`tests/e2e/painting.spec.ts`, kutu `page.locator('[data-painting]')`:

- `collapses into the bar on scroll`: `scrollTo(0, 720)` sonrası kutu yüksekliği 84, `position` `fixed`.
- `grows back when scrolling up`: tekrar `scrollTo(0, 0)` sonrası yükseklik 900.
- `deep link opens in bar state`: `/#access` açılır, ilk boyamadan sonra yükseklik 84, hero metni görünmez.
- `lower chest is masked by image-relative stops`: 1440×900, 1280×600 ve 2560×1440'ta görselin hesaplanan `mask-image` değeri `51%` içerir. Göğsün alt kısmı resmin `%54` satırından başladığı için bu oran her ekranda onu gizler.
- `resize recalculates`: 1440'ta `scrollTo(0, 2000)`, sonra 800×900'e geçilir, yükseklik 64. Tekrar 1440'a geçilir, yükseklik 84.
- `reduced motion`: `page.emulateMedia({ reducedMotion: 'reduce' })`, `scrollTo(0, 200)`, yükseklik 84.
- `painting does not cover content without JavaScript`: `javaScriptEnabled: false`, kutunun `position` değeri `absolute`.

- [ ] **Step 6: Testin başarısız olduğunu gör**

Run: `npm run test:e2e -- painting`
Expected: FAIL.

- [ ] **Step 7: `Painting.tsx` ve stilini yaz**

Görsel: `next/image`, `src="/art/minos-clean.webp"`, `width={1387}`, `height={2080}`, `alt=""`, `priority`, `unoptimized`. Kap `aria-hidden`, `pointer-events: none`, `z-index: 5`.

Maske tam olarak: `linear-gradient(90deg,#000 80%,transparent 100%),linear-gradient(180deg,#000 34%,transparent 51%)`, kesişim olarak (`mask-composite: intersect` ve `-webkit-mask-composite: source-in`).

Varsayılan CSS `position: absolute; height: 100vh`. Bileşen yüklenince kaba `data-ready` ekler ve `position: fixed` olur, böylece JavaScript yokken tablo içeriğin üstüne binmez. Kaydırma ve `resize` olayları `requestAnimationFrame` ile tek bir boyamaya indirilir. `useLayoutEffect` ile ilk boyamadan önce bir kez çalışır. `prefers-reduced-motion` değişimi dinlenir.

`stacked` düzende hero metni tablonun altına gelir: `margin-top: 93.6vw`, `z-index: 4`. `wide` düzende `z-index: 6`.

- [ ] **Step 8: Testleri çalıştır**

Run: `npm run test:unit && npm run test:e2e -- painting`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src tests
git commit -m "feat: collapse the painting into the menu bar on scroll"
```

---

### Task 5: Menü barı, aktif sekme, dil ve mobil menü

**Files:**
- Create: `src/components/SiteHeader.tsx`, `src/components/SiteHeader.module.css`
- Modify: `src/components/MinosPage.tsx`
- Test: `tests/e2e/header.spec.ts`

**Interfaces:**
- Consumes: `SiteContent`, `SectionId`, `Logo`, `barHeightFor`.
- Produces: `SiteHeader({ content: SiteContent })`.

- [ ] **Step 1: Failing test yaz**

`tests/e2e/header.spec.ts`:

- `five tabs in order`: `nav a` metinleri `content.tr.nav` sırasındadır.
- `clicking a tab keeps the heading below the bar`: "Erişim" tıklanır, `#access h2` üst sınırı 84 px'ten büyüktür.
- `active tab follows the section`: `#rule` ortaya kaydırılır, "Karar kuralı" sekmesinde `aria-current="true"` vardır, alt çizgi rengi `rgb(255, 95, 109)`.
- `language switch keeps the section`: `#rule` görünürken EN'e basılır, adres `/en#rule` olur.
- `mobile menu` (390×844): sekmeler gizlidir, menü düğmesi `aria-expanded="false"`. Tıklanınca `true` ve sekmeler ile dil seçici görünür. `Escape` kapatır ve odak düğmeye döner. Bir sekmeye basınca liste kapanır ve bölüme gidilir.
- `keyboard`: `Tab` ile marka, beş sekme ve dil seçiciye ulaşılır.

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `npm run test:e2e -- header`
Expected: FAIL.

- [ ] **Step 3: `SiteHeader.tsx` yaz**

Sabit bar, `z-index: 7`, geniş düzende 84 px, dar düzende 64 px. Aktif bölüm için `IntersectionObserver`, `rootMargin: '-40% 0px -55% 0px'`. Aktif sekmede `aria-current="true"`. Dil bağlantısı diğer dilin köküne aktif bölümün `#id` değerini ekler. Sekme ve dil değerleri `content` nesnesinden gelir. Bölümlerin `scroll-margin-top` değeri `6rem`.

- [ ] **Step 4: Testi çalıştır**

Run: `npm run test:e2e -- header`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src tests/e2e/header.spec.ts
git commit -m "feat: add sticky tabs, language switch and mobile menu"
```

---

### Task 6: Meta veriler, erişilebilirlik ve ekran taraması

**Files:**
- Modify: `src/app/(tr)/layout.tsx`, `src/app/(en)/en/layout.tsx`, gerekirse stil dosyaları
- Test: `tests/e2e/quality.spec.ts`

**Interfaces:**
- Consumes: `content[locale].meta`, `/art/og.jpg`.

- [ ] **Step 1: Failing test yaz**

`tests/e2e/quality.spec.ts`:

- `metadata per language`: her dilde `title` ve `description` `content` ile aynıdır. `og:image` `/art/og.jpg` ile biter. `link[hreflang="tr"]` ve `link[hreflang="en"]` vardır.
- `no third-party requests`: sayfa yüklenirken localhost dışına istek gitmez.
- `no horizontal scroll`: `/` ve `/en`, 320, 390, 768, 1024, 1440, 1920 genişliklerinde `document.documentElement.scrollWidth <= innerWidth`.
- `body text floor`: 320 genişliğinde `p` öğelerinin yazı boyutu en az 16 px'tir, kaynak satırı hariç.
- `axe is clean`: `/` ve `/en`, 1440 ve 390'da üstte ve menü barı durumunda `AxeBuilder` ihlali 0.

- [ ] **Step 2: Testin başarısız olduğunu gör**

Run: `npm run test:e2e -- quality`
Expected: FAIL, meta veriler eksik.

- [ ] **Step 3: Eksikleri tamamla**

Her iki layout `metadata` dışa aktarır: `title`, `description`, `openGraph.images`, `alternates.languages`. `metadataBase` değeri `process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.invalid'` olur, alan adı seçilince ortam değişkeni verilir. Taramanın bulduğu taşma ve kontrast sorunları stil dosyalarında giderilir.

- [ ] **Step 4: Tüm testleri çalıştır**

Run: `npm run typecheck && npm run test:unit && npm run test:e2e`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src tests/e2e/quality.spec.ts
git commit -m "feat: add metadata and quality checks"
```

---

### Task 7: Tasarım kontrolü ve belgeleme

**Files:**
- Create: `.impeccable/` altındaki yüzey özeti, `DESIGN.md`, `.impeccable/design.json`
- Modify: inceleme sonucuna göre stil dosyaları

- [ ] **Step 1: Yön sözleşmesini kaydet**

`impeccable` skill'indeki altı bloğu (THESIS, OWN-WORLD, STORY, FIRST VIEWPORT, FORM, FINISH) spec'ten yaz. FORM bloğunda `seed: none (unavailable)` kullanılır, çünkü yönü kullanıcı belirledi.

Run: `.claude/skills/impeccable/scripts/impeccable surface-brief write "src/app/(tr)/page.tsx" <body-file>`
Expected: Dosya yazılır, `surface-brief read` altı bloğu gösterir.

- [ ] **Step 2: Görsel kaynaklarını ve dedektörü çalıştır**

Run: `.claude/skills/impeccable/scripts/impeccable embed-prompt --scan public/art`, ardından `.claude/skills/impeccable/scripts/impeccable detect --json src`
Expected: Kaynağı eksik görsel kalmaz. Dedektör bulguları düzeltilir ya da gerekçesiyle kaydedilir.

- [ ] **Step 3: Ekran görüntülerini al**

Hareket durmuşken `.impeccable/review/desktop.png` (1440, tam sayfa) ve `.impeccable/review/mobile.png` (390, tam sayfa). Ek olarak menü barı durumunun 1440×900 görüntüsü. Dosyaları açıp doğru durumu gösterdiklerini kontrol et.

- [ ] **Step 4: Bitiş incelemesini çalıştır**

`impeccable-finish-reviewer`'a özgün isteği, spec'i, ekran görüntülerini, yön sözleşmesini ve `reference/craft-floor.md` yolunu ver. Karşılaştırma için mock'u `docs/superpowers/mocks/2026-11-06-tam-sayfa/index.html` olarak belirt. Dönen karara göre davran (`ship`, `fix`, `rebuild`, `recapture`).

- [ ] **Step 5: Tasarım sistemini belgele**

`impeccable-documenter` ile `DESIGN.md` ve `.impeccable/design.json` üretilir.

Run: `npm run typecheck && npm run test:unit && npm run test:e2e`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add DESIGN.md .impeccable src
git commit -m "docs: record the design system and finish review"
```

---

## Bu planın dışında kalanlar

Spec'teki "Yayından önce kapanması gerekenler" listesi bu planla kapanmaz: metinlerin ürün koduyla doğrulanması, gerçek logo, e-posta, İngilizce metnin gözden geçirilmesi, gerçek örnek vaka, alan adı ve yayın yeri. Site bunlar için yer tutucuyla hazır olur. Yayın ayrı bir iştir.
