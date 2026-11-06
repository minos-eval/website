"""Clean small damage specks in the mural photo and cut a fresco-fragment matte."""
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

src_path, out_dir = sys.argv[1], sys.argv[2]
im = Image.open(src_path).convert("RGB")
W, H = im.size

# 1) Remove the bright/dark holes that read as glitches at hero size.
median = im.filter(ImageFilter.MedianFilter(size=31))
a = np.asarray(im).astype(np.int16)
bright = (a.min(axis=2) > 190)
bright_img = Image.fromarray((bright * 255).astype("uint8")).filter(ImageFilter.MaxFilter(9))
heal = Image.new("L", im.size, 0)
heal.paste(bright_img)
d = ImageDraw.Draw(heal)
for x, y, r in [(959, 493, 20), (676, 676, 17), (969, 1154, 17), (1105, 1274, 17)]:
    d.ellipse((x - r, y - r, x + r, y + r), fill=255)
heal = heal.filter(ImageFilter.GaussianBlur(2.2))
clean = Image.composite(median, im, heal)
clean.save(f"{out_dir}/minos-clean.jpg", quality=90, optimize=True)
print("healed px share", round(float(np.asarray(heal).mean()) / 255, 4))

# 2) Fragment matte: broken-plaster edge driven by multi-octave noise.
CH = 1250
crop = clean.crop((0, 0, W, CH))
shape = Image.new("L", (W + 400, CH + 400), 0)
pts = [(0, 0), (1520, 0), (1490, 250), (1535, 480), (1495, 740), (1320, 920),
       (980, 1020), (620, 1055), (330, 1000), (0, 1110)]
ImageDraw.Draw(shape).polygon(pts, fill=255)
shape = shape.filter(ImageFilter.GaussianBlur(46)).crop((200, 200, W + 200, CH + 200))
base = np.asarray(shape).astype(np.float32) / 255

rng = np.random.default_rng(7)
noise = np.zeros((CH, W), np.float32)
for cells, amp in [(5, 1.0), (11, .62), (24, .36), (56, .2), (130, .12)]:
    g = rng.random((cells, int(cells * W / CH) + 1)).astype(np.float32)
    layer = Image.fromarray((g * 255).astype("uint8")).resize((W, CH), Image.BICUBIC)
    noise += (np.asarray(layer).astype(np.float32) / 255 - .5) * amp
matte = ((base + noise * .36) > .5).astype(np.uint8) * 255
alpha = Image.fromarray(matte).filter(ImageFilter.GaussianBlur(.9))
frag = crop.convert("RGBA")
frag.putalpha(alpha)
frag.save(f"{out_dir}/minos-parca.png", optimize=True)
print("fragment", frag.size, "opaque share", round(float((matte > 0).mean()), 3))
