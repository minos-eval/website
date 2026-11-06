import type { Page } from '@playwright/test';

export type Pixel = [number, number, number];
type Clip = { x: number; y: number; width: number; height: number };

/** Reads what is really on screen in a region, so tests judge pixels rather than stylesheet values. */
export async function regionPixels(page: Page, clip: Clip): Promise<Pixel[]> {
  const png = (await page.screenshot({ clip })).toString('base64');
  return page.evaluate(async (data) => {
    const image = new Image();
    image.src = `data:image/png;base64,${data}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d')!;
    context.drawImage(image, 0, 0);
    const { data: bytes } = context.getImageData(0, 0, canvas.width, canvas.height);
    const pixels: [number, number, number][] = [];
    for (let index = 0; index < bytes.length; index += 4) {
      pixels.push([bytes[index], bytes[index + 1], bytes[index + 2]]);
    }
    return pixels;
  }, png);
}

const channel = (value: number) => {
  const scaled = value / 255;
  return scaled <= 0.03928 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
};

const luminance = ([red, green, blue]: Pixel) => 0.2126 * channel(red) + 0.7152 * channel(green) + 0.0722 * channel(blue);

export function contrast(first: Pixel, second: Pixel): number {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

/** Largest per-channel distance from a colour across a set of pixels. */
export function maxDistance(pixels: Pixel[], colour: Pixel): number {
  return Math.max(...pixels.map((pixel) => Math.max(...pixel.map((value, index) => Math.abs(value - colour[index])))));
}
