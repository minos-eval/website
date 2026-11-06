'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { SiteContent } from '@/content/site';
import { Logo } from './Logo';
import styles from './SiteHeader.module.css';

const NO_SCRIPT_RULES = `@media (max-width:1023.98px){
[data-header]{flex-wrap:wrap;height:auto;padding-block:.75rem}
[data-menu-button]{display:none!important}
[data-nav-links]{position:static!important;display:flex!important;flex-flow:row wrap!important;gap:.25rem 1rem!important;width:100%;max-height:none!important;padding:.5rem 0 0!important;border:0!important;background:none!important;font-size:1rem!important}
}`;

export function SiteHeader({ content }: { content: SiteContent }) {
  const { locale, nav, menu } = content;
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    header.current?.setAttribute('data-ready', '');
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')];
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setActive(sections.findLast((section) => inBand.has(section.id))?.id ?? null);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

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
    <>
      <noscript>
        <style>{NO_SCRIPT_RULES}</style>
      </noscript>
      <header ref={header} className={styles.header} data-header>
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
    </>
  );
}
