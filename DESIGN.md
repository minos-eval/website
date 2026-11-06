---
name: MINOS Evals
description: A real mural of Minos dissolving into a warm near-black ground, set in one flared type family, ruled with hairlines, and marked by a single coral accent.
colors:
  red: "#ff5f6d"
  greek: "#8f5c39"
  tile: "#ffffff"
  logo-black: "#1b1714"
  logo-red: "#8f2a22"
  ground: "#140c07"
  text: "#f3e9dd"
  soft: "#cbbcaa"
  dim: "#a08f7e"
  line: "#33241a"
  line-strong: "#4a3a2e"
typography:
  display-greek:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 17.2vw, 15.5rem)"
    fontWeight: 520
    lineHeight: 1
    letterSpacing: "0.01em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  display:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 4.3vw, 4.25rem)"
    fontWeight: 560
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  headline-lg:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 540
    lineHeight: 1.06
    letterSpacing: "-0.02em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  headline:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.4vw, 3rem)"
    fontWeight: 540
    lineHeight: 1.1
    letterSpacing: "-0.02em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  title-lg:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 530
    lineHeight: 1.15
    letterSpacing: "-0.012em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  title:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 530
    lineHeight: 1.15
    letterSpacing: "-0.012em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  title-sm:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 540
    lineHeight: 1.2
    letterSpacing: "-0.012em"
    fontVariation: "'FLAR' 100, 'VOLM' 0"
  statement:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 420
    lineHeight: 1.34
  lead:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 420
    lineHeight: 1.5
  body:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 420
    lineHeight: 1.55
  body-sm:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 420
    lineHeight: 1.55
  brand:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 650
  nav:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 520
  label:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 550
  caption:
    fontFamily: "Commissioner, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 420
    lineHeight: 1.5
rounded:
  focus: "2px"
  tag: "0.3rem"
  tile: "0.45rem"
spacing:
  gutter: "clamp(1.25rem, 3.34vw, 3rem)"
  section: "8rem"
  section-stacked: "5rem"
  column-gap: "3rem"
  rule-inset: "1.25rem"
  row: "1.5rem"
components:
  menu-bar:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.nav}"
    height: "84px"
  menu-bar-stacked:
    backgroundColor: "{colors.ground}"
    textColor: "{colors.text}"
    typography: "{typography.nav}"
    height: "64px"
  tab:
    textColor: "{colors.text}"
    typography: "{typography.nav}"
    padding: "0.4rem 0"
  brand-tile:
    backgroundColor: "{colors.tile}"
    rounded: "{rounded.tile}"
    size: "2.25rem"
  menu-button:
    textColor: "{colors.text}"
    size: "2.75rem"
  ruled-column:
    textColor: "{colors.soft}"
    padding: "1.25rem 0 0"
  flow-step:
    textColor: "{colors.text}"
    typography: "{typography.title}"
    padding: "1.5rem 0"
  flow-step-human:
    textColor: "{colors.red}"
    typography: "{typography.title}"
    padding: "1.5rem 0"
  sample-tag:
    textColor: "{colors.soft}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "0.05rem 0.5rem"
  ledger-row:
    textColor: "{colors.text}"
    typography: "{typography.body-sm}"
    padding: "0.8rem 0"
  ledger-verdict:
    textColor: "{colors.red}"
    typography: "{typography.body-sm}"
    padding: "0.8rem 0"
---

# Design System: MINOS Evals

## Overview

**Creative North Star: "The Figure Out of the Dark"**

One real painting carries the identity. A 19th-century mural of Minos comes out of a warm near-black ground that was sampled from its own shadows, and every other element keeps quiet so the painting keeps its weight. There is no invented ornament: the ground, the cream text, and the dissolves all belong to the picture, and the only other image is a crop of its red drapery.

Everything that is not the painting is typography and hairlines. One variable family does all the work, flared for titles and plain for reading. Density is low: sections sit 8rem apart, copy runs in short measures, and structure comes from 1px rules on the ground. Nothing is boxed, lifted, or animated in, apart from the one scroll-bound move in which the painting shrinks into the menu bar and leaves the eye looking toward the content.

Colour is rationed the same way. Coral appears only where it carries meaning, so a reader can scan a whole page and find the human moment by colour alone.

**Key Characteristics:**
- The real painting and its drapery are the only images, and both dissolve into the ground.
- A warm near-black ground, never a neutral black or grey.
- One family, Commissioner, with the FLAR axis at 100 on titles only.
- 1px hairlines instead of cards, panels, or shadows.
- One coral accent, spent only on meaning.
- One signature motion, bound directly to scroll.

## Colors

A monochrome warm-dark palette taken from the painting's shadows, with one coral accent held in reserve.

### Primary
- **Verdict Coral** (`red`): The only interface accent. It marks the step where a human enters, the term needs_review and its verdict line, the underline of the current tab, the keyboard focus ring, and text selection (with the ground as selection text).

### Secondary
- **Mural Sienna** (`greek`): The giant ΜΙΝΩΣ wordmark only. At 3.46:1 on the ground it is legible at display size and nowhere else, and the wordmark is hidden from screen readers.

### Tertiary
- **Tile White** (`tile`): The tile the logo sits on, because the logo is never placed directly on a dark ground.
- **Labrys Black** (`logo-black`) and **Labrys Red** (`logo-red`): Fixed logo colours, never recoloured and never used for interface elements.

### Neutral
- **Mural Shadow** (`ground`): The page, the opaque menu bar, the mobile menu, and every scrim, which use this colour with alpha as `rgb(20 12 7 / a)`.
- **Limewash Cream** (`text`): Titles, primary reading text, tabs, and links (16.1:1).
- **Worn Plaster** (`soft`): Supporting paragraphs, column body text, step bodies, the sample tag, the inactive language, and the tab hover underline (10.4:1).
- **Dust Taupe** (`dim`): Step numbers and ledger terms, the quietest text on the page (6.2:1).
- **Umber Hairline** (`line`): All 1px structural rules. It is deliberately faint (1.3:1) and never the only carrier of information.
- **Umber Rule** (`line-strong`): The sample tag outline and the scrollbar thumb, one step stronger than a hairline.

Two local tints stay outside the token set and belong to one element each: the hero lead (#e4d7c8) and the credit line over the drapery (#f0dcc9). Do not reuse them elsewhere.

### Named Rules
**The Earned Coral Rule.** Coral means a human decides, needs_review, you are here, or keyboard focus. It never decorates a title, a link, or a section. The red in the painting and drapery is picture, not accent, and does not count against this rule.

**The Sampled Ground Rule.** Every dark on the page is the ground or the ground with alpha. No neutral black, no neutral grey, and no scrim in any other colour.

## Typography

**Display Font:** Commissioner (with system-ui, sans-serif)
**Body Font:** Commissioner (with system-ui, sans-serif)

**Character:** A humanist sans whose FLAR axis gives titles a carved, inscriptional flare at full value, while the same family stays plain for reading. The flare ties the type to an inscription on a wall without adding a second face. It loads with Latin, Latin Extended, and Greek subsets, so Turkish and ΜΙΝΩΣ come from one source.

### Hierarchy
- **Display Greek** (520, 3.5rem to 15.5rem at 17.2vw, line-height 1): The ΜΙΝΩΣ wordmark, one use per page, set in `greek` with no wrap.
- **Display** (560, 2.5rem to 4.25rem at 4.3vw, line-height 1.04): The page title, beside the painting's gaze.
- **Headline Large** (540, 2.5rem to 4.5rem at 5vw, line-height 1.06): Section statements that stand alone as full sentences.
- **Headline** (540, 2rem to 3rem at 3.4vw, line-height 1.1): Section titles that lead a list or grid, and the closing line.
- **Title Large** (530, 2.25rem, line-height 1.15): Names in a set of equal options, and short section titles beside body text.
- **Title** (530, 1.875rem, line-height 1.15): Step names in a sequence, 1.5rem below 1024px.
- **Title Small** (540, 1.5rem, line-height 1.2): Column headings over short body text.
- **Statement** (420, 1.5rem, line-height 1.34): Large unflared reading sentences that carry an argument.
- **Lead** (420, 1.25rem, line-height 1.5): The opening paragraph, 31rem measure.
- **Body** (420, 1.1875rem, line-height 1.55): Default reading text, 30 to 34rem measure.
- **Body Small** (420, 1.0625rem, line-height 1.55): Column, step, and ledger text. This is the small end of reading text.
- **Brand** (650, 1rem): The product name beside the tile.
- **Nav** (520, 0.9375rem): Tabs and the language switch, 1.25rem in the mobile menu.
- **Label** (550, 0.875rem): The sample tag only, in sentence case.
- **Caption** (420, 0.8125rem, line-height 1.5): Image credit only.

Titles balance their line breaks and reading sentences use pretty wrapping. Sequence numbers use tabular figures.

### Named Rules
**The Flare Rule.** `'FLAR' 100, 'VOLM' 0` goes on titles and the Greek wordmark. Body, lead, statement, nav, and label text stay unflared. If a line is read rather than seen, it is plain.

**The One Family Rule.** Commissioner is the only family, and hierarchy comes from size, weight, and flare. Weights are finely tuned between 520 and 560 for titles and sit at 420 for reading.

## Layout

The page is one long column of full-width sections with a 110rem maximum, centred, using a fluid gutter. Sections are spaced by `section` padding, dropping to `section-stacked` below 1024px. Anchored sections stop 6rem below the top, so a title never hides under the menu bar. The opening section is full height, and the painting occupies min(75vw, 125rem) from the left edge, with the copy to its right at gaze height.

Three grids recur. Equal thirds with a 3rem gap hold parallel ideas. A narrow sticky title column (22rem, 15rem below 1280px) beside a flowing list holds sequences. Equal halves with a 7rem gap pair an argument with its worked example. Access levels use stepped indents of 7rem and 14rem (3rem and 6rem below 1280px, 1.5rem and 3rem below 1024px), so the list itself draws a staircase.

Below 1024px every grid collapses to one column, offset copy returns to the left edge, the painting moves above the copy at min(93.6vw, 60svh) tall, and the tabs fold into a menu. Body text stays at its desktop size.

### Named Rules
**The Gaze Column Rule.** Supporting copy sits at 63.7% of the section width, the same line the hero copy starts on, so the page keeps reading in the direction Minos looks. Large titles start at the left edge and their supporting text answers from the gaze column.

## Elevation & Depth

The system is flat. There is no `box-shadow`, `text-shadow`, or `backdrop-filter` anywhere in the build. All depth comes from the painting dissolving into the ground and from simple stacking: painting, then hero copy, then header.

### Dissolve Vocabulary
- **Painting edge** (`linear-gradient(90deg, #000 80%, transparent 100%)` intersected with `linear-gradient(180deg, #000 34%, transparent 51%)`, as a mask): The painting melts right and down. The stops are tied to the image's proportions, so short screens still hide the lower chest.
- **Top fade** (`linear-gradient(180deg, rgb(20 12 7 / 0.7), transparent)`, 7.5rem tall): Keeps the header legible over the painting and fades out as the painting collapses.
- **Bar shade** (`linear-gradient(90deg, rgb(20 12 7 / 0.82) 0, rgb(20 12 7 / 0.78) 12.5rem, rgb(20 12 7 / 0.14) 19rem, rgb(20 12 7 / 0.14) 100%)`; below 1024px `linear-gradient(90deg, rgb(20 12 7 / 0.62) 0, rgb(20 12 7 / 0.55) 10.75rem, rgb(20 12 7 / 0.08) 12.5rem, rgb(20 12 7 / 0.08) 100%)`): Darkens the strip behind the brand once the painting becomes the bar, lighter on stacked layouts so the eye strip keeps its colour.
- **Drapery scrim** (`linear-gradient(0deg, rgb(20 12 7 / 0.5), rgb(20 12 7 / 0.1) 70%)`, masked by `linear-gradient(0deg, #000 58%, transparent 100%)`): Holds cream text over the drapery and melts its top into the ground. The drapery image carries its own matte along the cloth's edge, anchored right and bottom.

### Named Rules
**The Dissolve Rule.** Imagery has no frame inside the page. It melts into the ground, and gradients exist only for this job, in the ground colour.

**The Hairline Rule.** Structure is drawn with one 1px rule on the ground, never with a filled panel or a shadow.

## Shapes

The form language is square and linear: rows, rules, and text edges. Rounding appears in only three small places: the logo tile (`tile`), the sample tag (`tag`), and the focus ring (`focus`). Two-pixel underlines mark tab state. The drawn strokes in the menu control use round caps.

## Components

The component set is small and quiet, and every part is type on a rule. The site has no filled button and no form inputs, so none are defined here. Interaction states change instantly: there are no CSS transitions in the build.

### Navigation
- **Style:** A fixed bar (84px, 64px below 1024px) with the brand left and tabs right, transparent over the hero and painted by the collapsed painting when scrolled.
- **Tabs:** Cream Nav type with a 2px transparent bottom border. Hover turns the border `soft`, and the current section turns it `red`.
- **Language switch:** EN first (the default, served at `/`), then TR (served at `/tr`), separated by a slash. The current language is cream plain text with a 2px cream bottom border, the same geometry as a tab. The other is a `soft` link with no underline; hover turns it cream with a `soft` border, like a tab.
- **Mobile:** A 2.75rem menu button opens a full-width list on the ground with a bottom hairline and 1.25rem type. Escape closes it and returns focus. Without JavaScript the links wrap under the brand.
- **Focus:** Everything focusable takes a 2px `red` outline at a 3px offset.

### Brand Lockup
A 2.25rem white tile with `tile` rounding, holding a 1.625rem logo, beside the name in Brand type with a 0.75rem gap. The tile is a brand commitment. The current logo drawing is a stand-in until the real SVG arrives, so treat the tile as durable and the drawing as provisional.

### Ruled Columns
Equal columns, each opened by a top hairline with 1.25rem of inset. A flared title sits over `soft` body text. No background, border box, or icon.

### Flow Steps
A numbered list of rows split by hairlines, with a closing rule under the last row. Each row holds a `dim` tabular number, a flared step name, and a `soft` description. The number stays because order is the content. A step where a human acts turns its name `red`, and no other step does.

### Sample Ledger
A worked example, marked as a sample by a small outlined tag, then a definition list of hairline rows with `dim` terms and cream values. The verdict row sets its value in `red` at weight 560. The tag exists to mark illustrative data as illustrative, and it never sits over a section title.

### Painting Bar
The signature component. The real painting sits fixed behind the header and collapses as a direct function of scroll, with no timing of its own. It stops when the reader stops and reverses when they scroll back.

- **Travel:** Complete at 0.8 of the viewport height, or when the painting's height has shrunk to the bar on stacked layouts.
- **End state:** Scale 0.78 (0.62 stacked), with the eye held on the bar's midline and a 1px bottom edge once fully docked.
- **Fades:** The hero copy fades out by about 36% of travel (wide layouts only), the bar shade fades in from 40% to 90%, and the bar ground fades in from 55% to 85%.
- **Reduced motion:** No intermediate frames. The page shows the hero at the top and the docked bar otherwise, and smooth anchor scrolling is off.

### Named Rules
**The One Motion Rule.** The painting's collapse is the only animation on the page. Sections do not fade or slide in, and anything added moves with scroll or not at all.

## Do's and Don'ts

### Do:
- **Do** let the real painting or its drapery be the only imagery, and let it dissolve into `ground`.
- **Do** keep the crop to head, shoulders, and upper chest when the painting is shown large.
- **Do** spend `red` only on a human step, needs_review, the current tab, focus, and selection.
- **Do** draw structure with a 1px `line` rule and leave the rest to spacing.
- **Do** apply `'FLAR' 100, 'VOLM' 0` to every title and to nothing that is read as text.
- **Do** keep text at WCAG AA against the ground, at least 4.5:1 for reading sizes.
- **Do** place supporting copy on the gaze column at 63.7% on wide layouts.
- **Do** hold the logo on its white tile with its colours unchanged.
- **Do** give every moving state a reduced-motion equivalent with no intermediate frames.

### Don't:
- **Don't** use cards, filled panels, or boxed feature grids.
- **Don't** use decorative icons. The drawn menu control is functional and is the only icon in the system.
- **Don't** put small labels or eyebrows above section titles.
- **Don't** add `box-shadow`, glow, or any lifted surface.
- **Don't** use gradients as decoration or in any colour but the ground. Dissolves and scrims are the only gradients.
- **Don't** add scroll reveals, entrance animations, or timed motion.
- **Don't** add a second type family, or use `greek` for anything but the display wordmark.
- **Don't** imitate a fresco with drawn or generated artwork, or add mythological ornament.
- **Don't** imitate the product's interface or use product screenshots.
- **Don't** use neutral black or grey. Darks come from `ground`.
