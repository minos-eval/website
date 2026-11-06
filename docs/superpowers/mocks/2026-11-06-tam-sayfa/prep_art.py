"""Produce the site's painting assets from the Wikimedia Commons photo.

usage: python3 -I prep_art.py <mural.jpg> <out-dir>

Writes minos-clean.jpg, minos-kumas.png and og.jpg. Damage holes are healed by cloning
neighbouring brushwork through a mask shaped like the hole, so no blurred patch is left.
"""
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src_path, out_dir = sys.argv[1], sys.argv[2]
image = Image.open(src_path).convert("RGB")
W, H = image.size

# centre x, centre y, search radius, clone offset x, clone offset y
HOLES = [
    (960, 495, 30, -26, 21),
    (676, 676, 24, 34, 12),
    (969, 1154, 24, 34, 10),
    (1105, 1274, 24, -34, 10),
]


def heal_hole(picture, cx, cy, radius, dx, dy):
    a = np.asarray(picture).astype(np.int16)
    y0, y1, x0, x1 = cy - radius, cy + radius, cx - radius, cx + radius
    window = a[y0:y1, x0:x1]
    local = np.median(window.reshape(-1, 3), axis=0)
    distance = np.abs(window - local).max(axis=2)
    hole = (window.min(axis=2) > 165) | (window.max(axis=2) < 62) | (distance > 105)
    mask = np.zeros(a.shape[:2], np.uint8)
    mask[y0:y1, x0:x1] = hole * 255
    soft = Image.fromarray(mask).filter(ImageFilter.MaxFilter(7)).filter(ImageFilter.GaussianBlur(1.6))
    shifted = Image.fromarray(np.roll(np.asarray(picture), shift=(-dy, -dx), axis=(0, 1)))
    return Image.composite(shifted, picture, soft)


def heal_specks(picture, threshold):
    median = picture.filter(ImageFilter.MedianFilter(size=11))
    a = np.asarray(picture).astype(np.int16)
    specks = Image.fromarray(((a.min(axis=2) > threshold) * 255).astype("uint8"))
    soft = specks.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1))
    return Image.composite(median, picture, soft)


def clean_spot(picture, cx, cy, radius, dx, dy):
    mask = Image.new("L", picture.size, 0)
    ImageDraw.Draw(mask).ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=255)
    shifted = Image.fromarray(np.roll(np.asarray(picture), shift=(-dy, -dx), axis=(0, 1)))
    return Image.composite(shifted, picture, mask.filter(ImageFilter.GaussianBlur(3)))


clean = heal_specks(image, 205)
for hole in HOLES:
    clean = heal_hole(clean, *hole)
clean.save(f"{out_dir}/minos-clean.jpg", quality=92, optimize=True)

# Red drapery, kept at native size. A colour matte follows the cloth's own top edge and drops the skin above it.
band = clean_spot(clean, 1309, 1983, 11, -30, 6).crop((265, 1640, W, H))
local = band.filter(ImageFilter.MedianFilter(size=15))
lift = np.asarray(band).astype(np.int16)[:, :, 1] - np.asarray(local).astype(np.int16)[:, :, 1]
pale = Image.fromarray(((lift > 22) * 255).astype("uint8")).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1))
band = Image.composite(local, band, pale)
pixels = np.asarray(band).astype(np.float32)
cloth = 1 - np.clip((pixels[:, :, 1] / (pixels[:, :, 0] + 1) - 0.36) / 0.09, 0, 1)
filled = Image.fromarray((cloth * 255).astype("uint8")).filter(ImageFilter.MaxFilter(41)).filter(ImageFilter.MinFilter(41))
cloth = np.asarray(filled).astype(np.float32) / 255
region = Image.new("L", band.size, 0)
ImageDraw.Draw(region).polygon(
    [(128, 440), (318, 250), (480, 196), (690, 122), (900, 40), (1122, -56), (1122, 440)], fill=255
)
region = np.asarray(region.filter(ImageFilter.GaussianBlur(5))).astype(np.float32) / 255
matte = Image.fromarray((cloth * region * 255).astype("uint8")).filter(ImageFilter.GaussianBlur(2))
drapery = band.convert("RGBA")
drapery.putalpha(matte)
drapery.save(f"{out_dir}/minos-kumas.png", optimize=True)

clean.crop((0, 0, W, 728)).resize((1200, 630), Image.LANCZOS).save(f"{out_dir}/og.jpg", quality=84, optimize=True)
print("clean", clean.size, "drapery", drapery.size)
