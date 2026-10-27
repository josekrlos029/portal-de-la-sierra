# Portal de la Sierra

Sitio estático multilenguaje (ES · EN · PT-BR) desplegado en Vercel: https://www.portaldelasierra.com

## Cómo editar
- **Textos**: `src/i18n/es.json`, `en.json`, `pt.json` (mismas claves en los tres; el build falla si falta alguna).
- **Precio, WhatsApp, tasa de cambio, estado de los lotes**: `src/config.json`.
- **Markup, CSS y JS de la página**: `src/template.html`. **Modelo 3D**: `src/masterplan.js` + `src/geo.json`.
- **Imágenes**: los originales van en `src/img/`; las variantes se generan con `bash scripts/images.sh`.

Después de editar, ejecuta:

```bash
node build.mjs   # genera index.html, en/, pt/, sitemap.xml, robots.txt, llms.txt y a/masterplan.<hash>.js
```

Los archivos generados se versionan en el repo y Vercel los sirve tal cual, sin paso de build. No edites `index.html` a mano.
