import { describe, expect, test } from 'vitest';
import { content } from '@/content/site';

const locales = ['tr', 'en'] as const;

describe('site content', () => {
  test.each(locales)('%s has the fixed section shape', (locale) => {
    const c = content[locale];
    expect(c.nav.map((item) => item.id)).toEqual(['how', 'rule', 'minos', 'access', 'data']);
    expect(c.how.steps).toHaveLength(7);
    expect(c.how.steps.findIndex((step) => step.human)).toBe(4);
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

  test.each(locales)('%s problem has three points and the determinism line', (locale) => {
    const problem = content[locale].problem;
    expect(problem.items).toHaveLength(3);
    expect(problem.approach.toLowerCase()).toContain(locale === 'tr' ? 'deterministik' : 'deterministic');
  });

  test('en problem copy is the approved text', () => {
    const problem = content.en.problem;
    expect(problem.title).toBe('Conventional tests assume a stable right answer. LLM apps rarely have one.');
    expect(problem.items.map((item) => item.title)).toEqual([
      'Many valid answers',
      'Results change between runs',
      'Judges are not always right',
    ]);
  });

  test.each(locales)('%s avoids banned claims', (locale) => {
    const text = JSON.stringify(content[locale]).toLowerCase();
    for (const banned of ['black box', 'kara kutu', 'her llm', 'any llm', '0.7', '0,7', 'havayolu', 'airline', 'uçuş', 'flight']) {
      expect(text).not.toContain(banned);
    }
  });

  test.each(locales)('%s keeps product terms and labels the sample', (locale) => {
    const example = content[locale].rule.example;
    expect(example.verdict.value).toContain('needs_review');
    expect(['Örnek', 'Sample']).toContain(example.tag);
  });
});
