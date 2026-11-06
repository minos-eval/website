import type { CSSProperties, ReactNode } from 'react';
import { withBase } from '@/lib/base-path';
import { CONTACT_EMAIL, type SiteContent } from '@/content/site';
import { HowFlow } from './HowFlow';
import styles from './sections.module.css';

const PHOTO_URL =
  'https://commons.wikimedia.org/wiki/File:Mural_of_Minos_at_the_National_And_Kapodistrian_University_of_Athens_on_May_22,_2022.jpg';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/4.0/';

function inline(text: string): ReactNode[] {
  return text.split(/(needs review|Gorgias)/).map((part, index) => {
    if (part === 'needs review') return <em key={index}>{part}</em>;
    if (part === 'Gorgias') return <i key={index}>{part}</i>;
    return part;
  });
}

type SectionProps = { c: SiteContent };

export function Hero({ c }: SectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroCopy} data-hero-copy>
        <h1>{c.hero.title}</h1>
        <p className={styles.lead}>{c.hero.lead}</p>
      </div>
    </section>
  );
}

export function Problem({ c }: SectionProps) {
  const { label, title, items, today } = c.problem;
  return (
    <section className={styles.problem} id="problem" aria-label={label}>
      <p className={styles.eyebrow}>{label}</p>
      <h2>{title}</h2>
      <div className={styles.columns}>
        {items.map((item, index) => (
          <div key={item.title}>
            <span className={styles.itemNumber}>{String(index + 1).padStart(2, '0')}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
      <p className={styles.approach}>{today}</p>
    </section>
  );
}

export function How({ c }: SectionProps) {
  return <HowFlow title={c.how.title} steps={c.how.steps} />;
}

export function Rule({ c }: SectionProps) {
  const { title, statements, example } = c.rule;
  return (
    <section className={styles.rule} id="rule">
      <h2>{title}</h2>
      <div className={styles.ruleGrid}>
        <div className={styles.statements}>
          {statements.map((statement) => (
            <p key={statement}>{inline(statement)}</p>
          ))}
        </div>
        <div className={styles.example}>
          <span className={styles.tag}>{example.tag}</span>
          <dl>
            {example.rows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
            <div>
              <dt>{example.verdict.label}</dt>
              <dd className={styles.verdict}>{example.verdict.value}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export function Myth({ c }: SectionProps) {
  return (
    <section className={styles.myth} id="minos">
      <div className={styles.greek} aria-hidden="true">
        ΜΙΝΩΣ
      </div>
      <div className={styles.tale}>
        <h2>{c.myth.title}</h2>
        <p>{inline(c.myth.body)}</p>
      </div>
    </section>
  );
}

export function Modes({ c }: SectionProps) {
  return (
    <section className={styles.modes} id="modes">
      <h2>{c.modes.title}</h2>
      <div className={styles.modeGrid}>
        {c.modes.items.map((item) => (
          <div key={item.name}>
            <h3>{item.name}</h3>
            <p>{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Data({ c }: SectionProps) {
  return (
    <section className={styles.data} id="data">
      <h2>{c.data.title}</h2>
      <p>{c.data.body}</p>
    </section>
  );
}

export function Close({ c }: SectionProps) {
  return (
    <footer className={styles.footer} style={{ '--kumas': `url(${withBase('/art/minos-kumas.webp')})` } as CSSProperties}>
      <div className={styles.close}>
        <p className={styles.closeTitle}>{c.close.title}</p>
        {CONTACT_EMAIL && (
          <a className={styles.contact} href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        )}
      </div>
      <p className={styles.credit}>
        {c.credit.photoLabel} <a href={PHOTO_URL}>George E. Koronaios</a>, <a href={LICENSE_URL}>CC BY-SA 4.0</a>,{' '}
        {c.credit.edits} {c.credit.mural}
      </p>
    </footer>
  );
}
