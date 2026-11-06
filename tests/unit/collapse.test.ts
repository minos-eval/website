import { describe, expect, test } from 'vitest';
import { barHeightFor, collapseFrame, imageWidthFor, layoutFor } from '@/lib/collapse';

const desktop = { width: 1440, height: 900 };
const distance = 720;

describe('collapseFrame', () => {
  test('hero frame', () => {
    const frame = collapseFrame(0, desktop);
    expect(frame).toMatchObject({ progress: 0, boxHeight: 900, imageScale: 1, barOpacity: 0, shadeOpacity: 0, copyOpacity: 1 });
    expect(frame.imageWidth).toBe(1080);
    expect(frame.imageX).toBeCloseTo(-70, 0);
    expect(frame.imageY).toBeCloseTo(-24, 0);
  });

  test('bar frame at 0.8 of the viewport height', () => {
    const frame = collapseFrame(distance, desktop);
    expect(frame).toMatchObject({ progress: 1, boxHeight: 84, barOpacity: 1, shadeOpacity: 1, copyOpacity: 0 });
    expect(frame.imageScale).toBeCloseTo(0.78);
    expect(Math.abs(frame.imageX - -98)).toBeLessThan(1);
    expect(Math.abs(frame.imageY - -160)).toBeLessThan(1);
  });

  test('ramps match the spec', () => {
    expect(collapseFrame(distance * 0.55, desktop).barOpacity).toBeCloseTo(0);
    expect(collapseFrame(distance * 0.85, desktop).barOpacity).toBeCloseTo(1);
    expect(collapseFrame(distance * 0.4, desktop).shadeOpacity).toBeCloseTo(0);
    expect(collapseFrame(distance * 0.9, desktop).shadeOpacity).toBeCloseTo(1);
    expect(collapseFrame(distance * 0.36, desktop).copyOpacity).toBeLessThan(0.02);
  });

  test('progress does not run past either end', () => {
    expect(collapseFrame(-50, desktop).progress).toBe(0);
    expect(collapseFrame(99999, desktop).progress).toBe(1);
  });

  test('reduced motion has no in-between frames', () => {
    expect(collapseFrame(0, desktop, { reducedMotion: true }).progress).toBe(0);
    expect(collapseFrame(1, desktop, { reducedMotion: true }).progress).toBe(1);
  });

  test('stacked layout keeps the copy and uses the 64px bar', () => {
    const phone = { width: 390, height: 844 };
    expect(layoutFor(390)).toBe('stacked');
    expect(collapseFrame(0, phone).copyOpacity).toBe(1);
    expect(collapseFrame(9999, phone).copyOpacity).toBe(1);
    expect(collapseFrame(9999, phone).boxHeight).toBe(64);
  });

  test('layout switches at 1024', () => {
    expect(layoutFor(1023)).toBe('stacked');
    expect(layoutFor(1024)).toBe('wide');
    expect(barHeightFor('wide')).toBe(84);
    expect(barHeightFor('stacked')).toBe(64);
  });

  test('image stays near its source width on very wide screens', () => {
    expect(imageWidthFor({ width: 2560, height: 1440 })).toBe(1200);
  });
});
