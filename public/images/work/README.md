# Work page covers

Caravan.json, TitanRoverCover.json, and Wordle.json are Lottie animation exports and are already wired in via `src/data/projects.js` — they autoplay/loop in the project cards and on the case-study page.

FullyHacks has no cover yet. Either:
- add `fullyhacks-cover.jpg` (static image, 4:5 portrait recommended) — it's already wired as the fallback in `src/data/projects.js`, or
- add a Lottie export named e.g. `Fullyhacks.json` and add a `lottie:` field for it in `src/data/projects.js`.

If you replace any of the existing Lottie files, keep the filenames the same (or update the paths in `src/data/projects.js`) — each `cover` image path is also kept as a static fallback in case the Lottie fails to load.
