# TRACEABILITY — Qué se pidió → qué se hizo → con qué → dónde

Leyenda: SS = sender-site · SL = sender-site-lab · KIT = sender-motion-kit.
Evidencia = marcador verificado en producción con curl (selector/asset/byte-range).

| R | Pedido del usuario (resumen fiel) | Entregado | Herramientas | Repo | Commit | Evidencia |
|---|---|---|---|---|---|---|
| 2 | Paleta oficial + info real; rechaza tema oscuro/amber e imágenes AI | Rebuild con paleta #fff/#1e73be/#494949/#0085b2 y datos sender.cl | web_search (datos sender.cl), vite | SS | v2 | copy real en prod |
| 3 | WhatsApp CTA estético; bilingüe ES/EN; fondo globo+arcos+partículas | FAB glass marca; switch nav; bg3d three.js | three.js, gsap | SS | v3 | #bg3d en DOM |
| 4-5 | Más editorial; catálogo completo; CTAs pro; "yo hago los videos" | Capa editorial, cat-table 15 familias, dossier posterior; `docs/video-prompts.md` | gsap SplitWords manual | SS+KIT | v4-v5 | i18n 198 |
| 9-10 | SEO/a11y; llenar TODO slot con badge ▸PROVISORIO | meta/og/alt/skip-link; sistema ph-badge + Ken Burns placeholders | ffmpeg-static | SS | v9-v10 | badges en HTML |
| 13 | Hero SIN caja; GoPro como animación general; productos Apple-keynote | Desarme full-bleed scrub; P14 keynote; shot-stage | gsap ScrollTrigger | SS | v13 | stage sin marco desktop |
| 14 | Contraste con mis videos; criterios Awwwards; SOP YouTube; multi-repo "si se puede hazlo" | scorecard, youtube-sop, kit + submodule + checkout recursivo | GH API (repos/pages) | KIT+SS | 9486315 | submodule activo |
| 15-16 | Hero full-bleed real; usabilidad completa | grid static; offscreen-pause, focus-trap, loader wave, 404 marca | — | SS | f2ce8b3/0b4b884 | 404.html 200 |
| 16.5-17 | Rediseño creativo en proyecto aparte; "B me gusta más"; botones transparentes; ¿1 página? | Lab film-backbone; compara.html A/B; merge B; decisión 1 página justificada | GH Pages sin XFO (iframes) | SL→SS | a026692→6b4d1c0 | film-layer en prod |
| 18 | Tarjetas transparentes; agrupar minimal; efectos YT/repos; criterios Awwwards+3D | Hairlines/paneles únicos; line-mask; parallax depth; tilt titular | gsap, kit P05/P06 | SS | d503d02 | css v18 en prod |
| 19 | "Siguen tarjetas en blanco" (capturas móvil) | Causa raíz: IDs legacy blancos > especificidad; nav dark; fuentes cargadas; grado film | grep diagnóstico, ffmpeg | SS | 6fe3baf | `#capacidades{background:transparent` |
| 20 | Tipografía moderna; video fondo calidad | Self-host 14 woff2; remaster cine 640→1080 CRF18; REC monitores; grado por capítulo | gstatic, ffmpeg-static | SS | 3ed95ec | woff2 200 en prod |
| 21 | Lag, no fluido, espacios vacíos, dimensiones | Low-power touch; throttle scrub; -g8 keyframes; prod/espectro sin pin móvil; stage full-bleed; type-ring fuera | ffmpeg -g 8 | SS | e125b61 | `pointer:coarse` en prod |
| 22 | (Capturas 18:00) modo "sitio de escritorio" en móvil | Breakpoint 1100 espejo + low-power por ancho | diagnóstico nav-links visibles | SS | 616f3c2 | `max-width:1100px` |
| 23 | Web: hero/video desalineados; caps sobrecargadas; bloque sólido | Hero centrado + veil ligero; hojas fantasma; caps fila duotono sin REC | — | SS | 545f073 | `min-width:1101px`→v25 761 |
| 23.1 | Auditoría técnica + herramientas gratis + skill departamento | audit.yml (LHCI+html-validate+budget); three.js diferido 708→178 kB; SKILL.md | LHCI runners GH | SS+KIT | 04fd4b7 | audit verde + reportes |
| 24 | "Usa imágenes y videos proporcionados, publica" | 10 fotos reales en slots; GoPro 11 Mini = capítulo 2 backbone (concat 12.9 s); Ken Burns desde fotos reales; badges caps fuera; OG logo tormenta | ffmpeg concat/zoompan, read_file imágenes | SS | 593bb5c | fotos 206, badges caps 0 |
| 29 | "Dame la web final con los criterios... porque haces algo y dejas de hacer otras" | Auditoria de coherencia post-v28: detectada repeticion de fotos entre stacks de productos (v28.1 reuso cap-transmission/proj-stl/cap-antennas) → generadas 16 vistas UNICAS stack-{prod}-v{1-4}.jpg (recortes+grados ffmpeg de fotos reales, 682 KB total), BUILD v29 | ffmpeg crop/eq, GH API, curl verify | SS+KIT | fddc92f | tag v29=1, 16 refs unicas, assets 200, deploy success |
| 28 | "Completa hasta obtener web entera con criterios, recursos, optimizaciones y skills" | Cierre completo: fotos comprimidas 1600px q5 (-30%), tx-hero/p-*/renders fuera del repo, stacks de productos con fotos reales (cero placeholders), scope rAF sólo visible (IO), content-visibility en secciones sin pin, GoPro fuera del backbone (v27), repo sender-fx-lab con 5 demos Pages | ffmpeg, IntersectionObserver, content-visibility, GH API | SS+KIT+FX | v27 3bffab2 / v28 2edb47b / v28.1 f55f0bb | tag v28=1, p-*=0, audit verde, bundle 179.963 B |
| 26 | "Ajusta para cumplir TODOS los criterios, usa todos los recursos, aplica el flujo" | Gates G0-G7 completos: knob de sintonía firma (drag+teclado, sincroniza scroll/espectro/film); CERO placeholders (prop Ken Burns foto real, badges+leyenda fuera, mon-frame retirado); preloads poster+fonts; dossier con logo tormenta; caps 260-380px; loader 1.5s; backbone 4.1MB | ffmpeg zoompan, gsap, LHCI CI | SS+KIT | 3913462/2bcc0bb | knob html/css/js 1, badges 0, preloads 3, audit verde |
| 25 | Checklist + registro + workflow + "no se refleja lo pedido"; diseño primero | CHECKLIST/TRACEABILITY/WORKFLOW en kit; BUILD tag visible; caps fila desde 761px; loader con logo de marca | — | KIT+SS | (este) | `BUILD v25` en HTML |

## Herramientas totales del departamento
Arena.ai workspace (bash/python/ffmpeg/builds) · vite · gsap 3.15 · three.js · ffmpeg-static ·
GitHub API (repos, Pages, Actions, logs) · GitHub Actions (deploy + audit) · LHCI + html-validate ·
woff2 gstatic self-host · web_search/fetch_page (jurado 2026, referentes) · read_file (inspección de
assets del usuario) · catbox/litterbox (puente de video) · Pages como host sin XFO (compara.html).

## Pendientes del usuario (bloquean ❌ de checklist F-slots)
1. Videos finales prod-{am,fm,nx,tw} y prop-rapanui (guía: kit `docs/video-prompts.md`).
2. Confirmación visual v25 con tag BUILD visible (captura o grabación litterbox).
