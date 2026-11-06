export type Layout = 'wide' | 'stacked';

export interface Viewport {
  width: number;
  height: number;
}

export interface CollapseFrame {
  progress: number;
  boxHeight: number;
  imageWidth: number;
  imageX: number;
  imageY: number;
  imageScale: number;
  barOpacity: number;
  shadeOpacity: number;
  topFadeOpacity: number;
  bottomFadeHeight: number;
  copyOpacity: number;
}

const WIDE_FROM = 1024;
const WIDE_COLLAPSE_DISTANCE = 0.8;
const IMAGE_RATIO = 2080 / 1387;
const EYE = { x: 0.757, y: 0.16 };
const STACKED_IMAGE_FIT = 0.72;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export function layoutFor(width: number): Layout {
  return width >= WIDE_FROM ? 'wide' : 'stacked';
}

export function barHeightFor(layout: Layout): number {
  return layout === 'wide' ? 84 : 64;
}

/** Where the hero copy starts below 1024px. Must match `.hero` padding-top in sections.module.css. */
export function stackedCopyTop(viewport: Viewport): number {
  return Math.min(0.936 * viewport.width, 0.6 * viewport.height);
}

export function imageWidthFor(viewport: Viewport): number {
  return layoutFor(viewport.width) === 'wide'
    ? Math.min(0.75 * viewport.width, 1200)
    : stackedCopyTop(viewport) / STACKED_IMAGE_FIT;
}

export function collapseFrame(
  scrollY: number,
  viewport: Viewport,
  options: { reducedMotion?: boolean } = {},
): CollapseFrame {
  const layout = layoutFor(viewport.width);
  const wide = layout === 'wide';
  const barHeight = barHeightFor(layout);
  const imageWidth = imageWidthFor(viewport);
  const startHeight = wide ? viewport.height : stackedCopyTop(viewport);
  const distance = wide ? WIDE_COLLAPSE_DISTANCE * viewport.height : Math.max(startHeight - barHeight, 1);

  const progress = options.reducedMotion ? (scrollY > 0 ? 1 : 0) : clamp(scrollY / distance);

  const endScale = wide ? 0.78 : 0.62;
  const eyeTargetX = (wide ? 0.5 : 0.423) * imageWidth;
  const startX = (wide ? -0.0648 : -0.12) * imageWidth;
  const startY = (wide ? -0.0222 : -0.02) * imageWidth;
  const endX = eyeTargetX - endScale * imageWidth * EYE.x;
  const endY = barHeight / 2 - endScale * imageWidth * IMAGE_RATIO * EYE.y;
  const boxHeight = lerp(startHeight, barHeight, progress);

  return {
    progress,
    boxHeight,
    imageWidth,
    imageX: lerp(startX, endX, progress),
    imageY: lerp(startY, endY, progress),
    imageScale: lerp(1, endScale, progress),
    barOpacity: clamp((progress - 0.55) / 0.3),
    shadeOpacity: clamp((progress - 0.4) / 0.5),
    topFadeOpacity: 1 - progress,
    bottomFadeHeight: Math.min(0.4 * (boxHeight - barHeight), wide ? 260 : 120),
    copyOpacity: wide && !options.reducedMotion ? clamp(1 - 2.8 * progress) : 1,
  };
}
