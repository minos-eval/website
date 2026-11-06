'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './sections.module.css';

type Step = { title: string; body: string; human?: true };

/** The wheel needs room for a three-column row and is skipped for people who ask for less motion. Keep in sync with sections.module.css. */
const WHEEL_QUERY = '(min-width: 1100px) and (prefers-reduced-motion: no-preference)';
/** Scroll distance, in viewport heights, that moves the wheel by one step. */
const SCROLL_PER_STEP = 0.3;

/** Without JavaScript the rows cannot move, so the page keeps the plain list. */
const NO_SCRIPT_RULES = `@media (min-width:1100px){
#how{height:auto!important;padding-block:8rem!important;display:grid!important}
#how>div{position:static!important;display:contents!important;height:auto!important}
#how h2{position:sticky!important;top:8.5rem!important;max-width:none!important}
#how ol{position:static!important}
#how li{position:static!important;grid-template-columns:3.25rem minmax(0,1fr) minmax(0,25rem)!important;gap:.5rem!important;align-items:baseline!important;padding:1.5rem 0!important;border-top:1px solid #33241a!important;opacity:1!important;filter:none!important;transform:none!important}
#how li:last-child{border-bottom:1px solid #33241a!important}
#how li span:first-child{display:inline!important}
#how li strong{grid-column:auto!important;font-size:1.875rem!important;text-align:left!important}
#how li span:last-child{grid-column:auto!important;opacity:1!important}
#how p,#how [aria-hidden]{display:none!important}
}`;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Where a row sits, in rem, for its distance from the active step: near rows are spaced out, far ones tuck in. */
function offsetRem(distance: number) {
  const near = Math.min(Math.abs(distance), 1) * 6.5;
  const far = Math.max(Math.abs(distance) - 1, 0) * 4.2;
  return Math.sign(distance) * (near + far);
}

/** Rows keep a floor so heading text still clears the 3:1 contrast large text needs; the red row is darker, so its floor is higher. */
function rowOpacity(distance: number, human: boolean) {
  const away = Math.abs(distance);
  const floor = human ? 0.66 : 0.42;
  return Math.max(floor, away < 1 ? 1 - away * 0.55 : 0.5 - (away - 1) * 0.05);
}

/** Style variables of one row, `distance` steps away from the active step. */
function rowVars(distance: number, human = false): Record<string, string> {
  const away = Math.abs(distance);
  return {
    '--y': `${offsetRem(distance)}rem`,
    '--s': String(Math.max(0.62, 1 - away * 0.14)),
    '--o': String(rowOpacity(distance, human)),
    // Small text cannot sit half-faded without failing contrast, so only the active row shows its note, at full strength.
    '--b': away < 0.5 ? '1' : '0',
    '--blur': `${Math.min(away, 3) * 0.8}px`,
  };
}

export function HowFlow({ title, steps }: { title: string; steps: Step[] }) {
  const section = useRef<HTMLElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);
  const [wheel, setWheel] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const query = window.matchMedia(WHEEL_QUERY);
    const sync = () => setWheel(query.matches);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!wheel) return;
    let queued = false;

    const paint = () => {
      queued = false;
      const box = section.current;
      if (!box) return;
      const travel = box.offsetHeight - window.innerHeight;
      const progress = travel > 0 ? clamp(-box.getBoundingClientRect().top / travel, 0, 1) : 0;
      const position = progress * (steps.length - 1);
      rows.current.forEach((row, index) => {
        if (!row) return;
        for (const [name, value] of Object.entries(rowVars(index - position, steps[index].human === true))) row.style.setProperty(name, value);
      });
      setActive(Math.round(position));
    };

    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    paint();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
    };
  }, [wheel, steps.length]);

  const pad = (value: number) => String(value).padStart(2, '0');

  return (
    <section
      ref={section}
      className={styles.flow}
      id="how"
      style={{ '--steps': steps.length, '--per-step': `${SCROLL_PER_STEP * 100}svh` } as React.CSSProperties}
    >
      <noscript>
        <style>{NO_SCRIPT_RULES}</style>
      </noscript>
      <div className={styles.stage}>
        <h2>{title}</h2>
        <p className={styles.counter} aria-hidden="true">
          <b>{pad(active + 1)}</b> / {pad(steps.length)}
        </p>
        <span className={`${styles.rail} ${styles.railTop}`} aria-hidden="true" />
        <span className={`${styles.rail} ${styles.railBottom}`} aria-hidden="true" />
        <ol>
          {steps.map((step, index) => (
            <li
              key={step.title}
              ref={(node) => {
                rows.current[index] = node;
              }}
              className={step.human ? styles.human : undefined}
              style={rowVars(index, step.human === true) as React.CSSProperties}
            >
              <span className={styles.number}>{index + 1}</span>
              <strong>{step.title}</strong>
              <span className={styles.stepBody}>{step.body}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
