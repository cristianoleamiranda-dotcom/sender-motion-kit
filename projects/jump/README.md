# JUMP — cinematic photo edit

A 16-second, 9:16 Remotion edit built from the seven approved original photographs. This is a separate production project inside `sender-motion-kit`; it does not touch Sender's website.

## Creative lock
- 384 frames / 16 seconds / 24 fps; 1080×1920 master, 720×1280 review render.
- Seven original photographs, one per lyric card; no face/body regeneration, replacement, liquify, beauty retouch, or generative fill.
- Subtle 2.5D camera drift (scale/position only), punchy beat cuts, brief whip/glitch/flash accents, bold kinetic captions.
- Teal/cyan + magenta grade, restrained grain and vignette.
- Exact Spanish copy is retained from the approved brief, including its original spelling/punctuation.
- No supplied song master is embedded. Add only audio you own or are licensed to use.

## Quick start
Requires Node 20+.

```bash
npm install
npm run assets
npm run preview
```

Render:
```bash
npm run render:review   # 720x1280 H.264
npm run render:master   # 1080x1920 H.264
```

The asset fetcher downloads the seven approved GitHub user-attachment originals into `public/images/`. Keep those originals unchanged. If GitHub returns 403/404, place the corresponding original file in `public/images/` using the exact filename in `src/assets.ts`, then run the render again.

## Shot order / on-screen copy
1. Maneja rapido, sacame de aqui.
2. La vida es genial cuando desapareces.
3. Esta vida intentara matatarte,
4. Pero no antes de que intenten venderte
5. Intentan quitarte tu locura y libertad
6. Y cuando lo hagan
7. Quieres escaparte conmigo?

## Quality gates
- Confirm all seven source files exist before rendering.
- Inspect face, hands, clothing, and architecture against the originals after render.
- Captions must remain inside 9:16 safe margins and readable on a phone.
- The first render is a review master, not a claim that a final video has already been exported.
