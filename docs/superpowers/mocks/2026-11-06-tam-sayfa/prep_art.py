"""Produce the site's painting assets from the Wikimedia Commons photo.

usage: python3 -I prep_art.py <mural.jpg> <out-dir>

Writes minos-clean.jpg, minos-kumas.jpg and og.jpg. Damage holes are healed by cloning
neighbouring brushwork through a mask shaped like the hole, so no blurred patch is left.
"""
import sys

import numpy as np
from PIL import Image, ImageFilter

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


clean = heal_specks(image, 205)
for hole in HOLES:
    clean = heal_hole(clean, *hole)
clean.save(f"{out_dir}/minos-clean.jpg", quality=92, optimize=True)

drapery = clean.crop((640, 1890, W, H))
local = np.asarray(drapery.filter(ImageFilter.MedianFilter(size=15))).astype(np.int16)
lift = np.asarray(drapery).astype(np.int16)[:, :, 1] - local[:, :, 1]
pale = Image.fromarray(((lift > 22) * 255).astype("uint8")).filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.GaussianBlur(1))
drapery = Image.composite(drapery.filter(ImageFilter.MedianFilter(size=15)), drapery, pale)
drapery = drapery.resize((1920, round(1920 * drapery.height / drapery.width)), Image.LANCZOS)
drapery = drapery.filter(ImageFilter.UnsharpMask(radius=3, percent=70, threshold=2))
drapery.save(f"{out_dir}/minos-kumas.jpg", quality=92, optimize=True)

clean.crop((0, 0, W, 728)).resize((1200, 630), Image.LANCZOS).save(f"{out_dir}/og.jpg", quality=84, optimize=True)
print("clean", clean.size, "drapery", drapery.size)
