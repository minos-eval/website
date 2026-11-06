'use client';

import Image from 'next/image';
import { useLayoutEffect, useRef } from 'react';
import { collapseFrame } from '@/lib/collapse';
import styles from './Painting.module.css';

export function Painting() {
  const box = useRef<HTMLDivElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const topFade = useRef<HTMLDivElement>(null);
  const bottomFade = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let queued = false;

    const paint = () => {
      queued = false;
      const frame = collapseFrame(
        window.scrollY,
        // innerWidth includes a classic scrollbar, the same width CSS media queries use.
        { width: window.innerWidth, height: window.innerHeight },
        { reducedMotion: motion.matches },
      );
      if (!box.current || !image.current || !shade.current || !topFade.current || !bottomFade.current || !edge.current) return;
      box.current.style.height = `${frame.boxHeight}px`;
      box.current.style.backgroundColor = `rgb(20 12 7 / ${frame.barOpacity})`;
      image.current.style.width = `${frame.imageWidth}px`;
      image.current.style.transform = `translate(${frame.imageX}px, ${frame.imageY}px) scale(${frame.imageScale})`;
      shade.current.style.opacity = String(frame.shadeOpacity);
      topFade.current.style.opacity = String(frame.topFadeOpacity);
      bottomFade.current.style.height = `${frame.bottomFadeHeight}px`;
      edge.current.style.opacity = frame.progress === 1 ? '1' : '0';
      root.style.setProperty('--hero-copy-opacity', String(frame.copyOpacity));
    };

    const queue = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(paint);
    };

    // Smooth scrolling starts after load, so it cannot animate the browser's own jump to a #section.
    const enableSmoothScroll = () => root.setAttribute('data-smooth', '');
    if (document.readyState === 'complete') enableSmoothScroll();
    else window.addEventListener('load', enableSmoothScroll, { once: true });

    box.current?.setAttribute('data-ready', '');
    paint();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    motion.addEventListener('change', queue);

    return () => {
      window.removeEventListener('load', enableSmoothScroll);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      motion.removeEventListener('change', queue);
    };
  }, []);

  return (
    <div ref={box} className={styles.box} data-painting aria-hidden="true">
      <Image
        ref={image}
        className={styles.image}
        src="/art/minos-clean.webp"
        alt=""
        width={1387}
        height={2080}
        priority
        unoptimized
      />
      <div ref={topFade} className={styles.topFade} />
      <div ref={shade} className={styles.shade} />
      <div ref={bottomFade} className={styles.bottomFade} />
      <div ref={edge} className={styles.edge} />
    </div>
  );
}
