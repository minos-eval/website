'use client';

import { useEffect, useRef, useState } from 'react';
import type { SectionId, SiteContent } from '@/content/site';
import { Logo } from './Logo';
import styles from './SiteHeader.module.css';

const NO_SCRIPT_RULES = '[data-nav-links]{display:flex!important;position:static!important}[data-menu-button]{display:none!important}';

export function SiteHeader({ content }: { content: SiteContent }) {
  const { locale, nav, menu } = content;
  const [active, setActive] = useState<SectionId | null>(null);
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          setActive((current) => (entry.isIntersecting ? id : current === id ? null : current));
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const item of nav) {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [nav]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const hash = active ? `#${active}` : '';
  const otherLocaleHref = `${locale === 'tr' ? '/en' : '/'}${hash}`;

  return (
    <header className={styles.header}>
      <noscript>
        <style>{NO_SCRIPT_RULES}</style>
      </noscript>
      <a className={styles.brand} href="#top">
        <span className={styles.tile}>
          <Logo className={styles.logo} />
        </span>
        MINOS Evals
      </a>
      <button
        ref={button}
        type="button"
        className={styles.menuButton}
        data-menu-button
        aria-expanded={open}
        aria-label={open ? menu.close : menu.open}
        onClick={() => setOpen((current) => !current)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 8h16M4 16h16'} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <nav className={styles.links} data-nav-links data-open={open || undefined} aria-label={menu.sections}>
        {nav.map((item) => (
          <a
            key={item.id}
            className={styles.tab}
            href={`#${item.id}`}
            aria-current={active === item.id ? 'true' : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <span className={styles.language} role="group" aria-label={menu.language}>
          {locale === 'tr' ? (
            <>
              <span>TR</span> / <a href={otherLocaleHref} lang="en">EN</a>
            </>
          ) : (
            <>
              <a href={otherLocaleHref} lang="tr">TR</a> / <span>EN</span>
            </>
          )}
        </span>
      </nav>
    </header>
  );
}
