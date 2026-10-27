// Genera el sitio estático multilenguaje: index.html (es-CO), en/index.html, pt/index.html,
// sitemap.xml, robots.txt y llms.txt. Sin dependencias: `node build.mjs`.
// Editar textos en src/i18n/*.json, datos comerciales en src/config.json y el markup en src/template.html.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync } from 'node:fs';
import { createHash } from 'node:crypto';

const read = p => readFileSync(new URL(p, import.meta.url), 'utf8');
const write = (p, s) => { const u = new URL(p, import.meta.url); mkdirSync(new URL('.', u), { recursive: true }); writeFileSync(u, s); };

const CFG = JSON.parse(read('src/config.json'));
const TEMPLATE = read('src/template.html');
const GEO = JSON.parse(read('src/geo.json'));

// ---------- masterplan 3D: archivo aparte con hash (se cachea como inmutable en /a/) ----------
const mpSrc = read('src/masterplan.js').replace('__GEO__', JSON.stringify(GEO));
const mpName = `masterplan.${createHash('sha1').update(mpSrc).digest('hex').slice(0, 8)}.js`;
for (const f of readdirSync(new URL('a/', import.meta.url))) if (/^masterplan\.\w+\.js$/.test(f) && f !== mpName) unlinkSync(new URL('a/' + f, import.meta.url));
write('a/' + mpName, mpSrc);

// ---------- croquis del levantamiento (SVG estático, antes se dibujaba con JS) ----------
const surveySvg = (() => {
  const xs = GEO.site.map(p => p[0]), ys = GEO.site.map(p => p[1]);
  const pad = 40, minx = Math.min(...xs) - pad, maxx = Math.max(...xs) + pad, miny = Math.min(...ys) - pad, maxy = Math.max(...ys) + pad;
  const P = arr => arr.map(p => `${p[0]},${-p[1]}`).join(' ');
  const F = 'font-family="Instrument Sans, sans-serif"';
  let s = `viewBox="${minx} ${-maxy} ${maxx - minx} ${maxy - miny}" preserveAspectRatio="xMidYMid meet">`;
  s += `<polygon points="${P(GEO.site)}" fill="rgba(193,158,90,.10)" stroke="#c19e5a" stroke-width="1.6" stroke-linejoin="round" pathLength="1" class="sv-line"/>`;
  GEO.roads.forEach(r => s += `<polygon points="${P(r)}" fill="rgba(243,238,226,.25)"/>`);
  GEO.lots.forEach(l => s += `<polygon points="${P(l.poly)}" fill="none" stroke="rgba(226,204,149,.35)" stroke-width=".6"/>`);
  s += `<polygon points="${P(GEO.comun)}" fill="rgba(95,183,212,.35)"/>`;
  Object.entries(GEO.boundary).forEach(([k, p]) => s += `<circle cx="${p[0]}" cy="${-p[1]}" r="2.6" fill="#c19e5a"/><text x="${p[0] + (p[0] > 0 ? 6 : -6)}" y="${-p[1] + 3}" font-size="10" fill="#f3eee2" text-anchor="${p[0] > 0 ? 'start' : 'end'}" ${F}>${k}</text>`);
  s += `<g transform="translate(${maxx - 26},${-maxy + 34})"><path d="M0 -16 6 6 0 2 -6 6z" fill="#c19e5a"/><text y="-20" font-size="10" text-anchor="middle" fill="#c19e5a" ${F}>N</text></g>`;
  s += `<g transform="translate(${minx + 14},${-miny - 16})" fill="#bfc7b8" ${F} font-size="9"><path d="M0 -4V0H50V-4" fill="none" stroke="#bfc7b8" stroke-width="1"/><text x="0" y="11">0</text><text x="50" y="11" text-anchor="middle">50 m</text></g>`;
  return s;
})();

// h1 del hero: cada palabra en su máscara para la animación CSS (antes lo hacía JS)
const splitTitle = h => h.replace(/^([^<]*)/, txt => txt.trim().split(/\s+/).map((w, i) => `<span class="w"><span class="ch" style="--i:${i}">${w}</span></span>`).join(' ') + ' ');
const SITE = CFG.siteUrl.replace(/\/$/, '');
const PAGES = [
  { code: 'es', path: '/', dict: JSON.parse(read('src/i18n/es.json')) },
  { code: 'en', path: '/en/', dict: JSON.parse(read('src/i18n/en.json')) },
  { code: 'pt', path: '/pt/', dict: JSON.parse(read('src/i18n/pt.json')) }
];
// hreflang por página (es también cubre "es" genérico, pt cubre "pt")
const HREFLANG = { es: ['es-CO', 'es'], en: ['en'], pt: ['pt-BR', 'pt'] };
const ALL_LOTS = Array.from({ length: CFG.lotCount }, (_, i) => ({ id: i + 1, area: CFG.lots[i + 1] || CFG.lotArea }));
const statusOf = id => CFG.estados[id] || 'disponible';

// ---------- consistencia de claves entre idiomas ----------
const flatKeys = (o, pre = '') => Object.entries(o).flatMap(([k, v]) => v && typeof v === 'object' && !Array.isArray(v) ? flatKeys(v, pre + k + '.') : [pre + k]);
const ref = flatKeys(PAGES[0].dict).sort().join('\n');
for (const p of PAGES.slice(1)) {
  const keys = flatKeys(p.dict).sort().join('\n');
  if (keys !== ref) {
    const a = new Set(ref.split('\n')), b = new Set(keys.split('\n'));
    throw new Error(`Claves distintas en ${p.code}.json — faltan: ${[...a].filter(k => !b.has(k))} · sobran: ${[...b].filter(k => !a.has(k))}`);
  }
}

const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const strip = s => String(s).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const get = (o, path) => path.split('.').reduce((v, k) => (v == null ? v : v[k]), o);

// Pinyon Script solo se usa en los <span class="script">: se pide el subset con esos caracteres
const scriptChars = [...new Set(PAGES.flatMap(p => JSON.stringify(p.dict).match(/class=\\"script\\">([^<]*)</g) || [])
  .map(m => m.replace(/.*>/, '').replace(/</, '')).join(''))].sort().join('');
const FONTS = 'https://fonts.googleapis.com/css2?family=Marcellus&family=Instrument+Sans:wght@400;500;600&family=Montserrat:wght@600&display=swap';
const FONT_SCRIPT = `https://fonts.googleapis.com/css2?family=Pinyon+Script&display=swap&text=${encodeURIComponent(scriptChars)}`;

function render(page) {
  const { dict: t, code } = page;
  const L = t.meta.lang;
  const n = (v, o) => v.toLocaleString(L, o);
  const date = d => new Date(d + 'T12:00:00').toLocaleDateString(L, { day: 'numeric', month: 'short', year: 'numeric' });
  const priceLot = CFG.lotArea * CFG.precioM2;
  const url = SITE + page.path;
  const waText = text => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(text)}`;
  const phone = code === 'es' ? CFG.phoneLocal : CFG.phoneIntl;

  const vars = {
    priceM2: n(CFG.precioM2),
    priceLot: n(priceLot),
    usdM2: n(Math.round(CFG.precioM2 / CFG.fx.usd)),
    usdSqft: n(CFG.precioM2 / CFG.fx.usd / 10.7639, { maximumFractionDigits: 2, minimumFractionDigits: 2 }),
    usdLot: n(Math.round(priceLot / CFG.fx.usd / 100) * 100),
    fxRate: n(CFG.fx.usd),
    fxDate: date(CFG.fx.fecha),
    availDate: date(CFG.disponibilidadAl),
    phone,
    wa: CFG.whatsapp,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${CFG.maps.lat},${CFG.maps.lng}`
  };
  // primero se resuelven las variables dentro de los textos
  const fillVars = s => s.replace(/\{\{@(\w+)\}\}/g, (m, k) => { if (!(k in vars)) throw new Error(`Variable ${m} desconocida`); return vars[k]; });
  const T = JSON.parse(JSON.stringify(t), (k, v) => typeof v === 'string' ? fillVars(v) : v);
  T.hero.h1 = splitTitle(T.hero.h1);

  const alternates = PAGES.flatMap(p => HREFLANG[p.code].map(h => `<link rel="alternate" hreflang="${h}" href="${SITE + p.path}">`))
    .concat(`<link rel="alternate" hreflang="x-default" href="${SITE}/">`).join('\n');
  const ogImage = SITE + '/a/og-portal.jpg';
  const faq = T.faq.items;

  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': SITE + '/#website', url: SITE + '/', name: 'Portal de la Sierra', inLanguage: PAGES.map(p => p.dict.meta.lang), publisher: { '@id': SITE + '/#agent' } },
      { '@type': 'RealEstateAgent', '@id': SITE + '/#agent', name: 'Núñez Anaya Inmobiliaria', telephone: CFG.phoneIntl.replace(/ /g, '-'), url: SITE + '/', logo: SITE + '/a/logo-firma-440.webp', image: ogImage, sameAs: [CFG.instagram],
        address: { '@type': 'PostalAddress', addressLocality: 'Valledupar', addressRegion: 'Cesar', addressCountry: 'CO' }, areaServed: { '@type': 'City', name: 'Valledupar' } },
      { '@type': 'GatedResidenceCommunity', '@id': SITE + '/#place', name: 'Portal de la Sierra', description: strip(T.proj.facts), url,
        image: ['portal-dia-lg', 'club-lg', 'portal-tarde-lg', 'nocturna-lg', 'casa-lg'].map(i => `${SITE}/a/${i}.webp`),
        address: { '@type': 'PostalAddress', streetAddress: 'Vía Valledupar – Sabana Crespo', addressLocality: 'Valledupar', addressRegion: 'Cesar', addressCountry: 'CO' },
        geo: { '@type': 'GeoCoordinates', latitude: CFG.maps.lat, longitude: CFG.maps.lng },
        hasMap: vars.mapsUrl,
        containedInPlace: { '@type': 'City', name: 'Valledupar', containedInPlace: { '@type': 'Country', name: 'Colombia' } },
        amenityFeature: [T.gal.s2t, T.feat.f2t, T.offer.c3b].map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })) },
      { '@type': 'RealEstateListing', '@id': url + '#listing', url, name: T.meta.title, description: T.meta.description, inLanguage: L, datePosted: CFG.disponibilidadAl,
        isPartOf: { '@id': SITE + '/#website' }, about: { '@id': SITE + '/#place' }, primaryImageOfPage: ogImage,
        offers: { '@type': 'AggregateOffer', priceCurrency: 'COP', lowPrice: priceLot, highPrice: Math.max(...ALL_LOTS.map(l => l.area)) * CFG.precioM2,
          offerCount: ALL_LOTS.filter(l => statusOf(l.id) !== 'vendido').length, availability: 'https://schema.org/InStock', seller: { '@id': SITE + '/#agent' },
          itemOffered: { '@type': 'Product', name: `${T.js.lot} · ${CFG.lotArea} m² · Portal de la Sierra` },
          priceSpecification: { '@type': 'UnitPriceSpecification', price: CFG.precioM2, priceCurrency: 'COP', unitCode: 'MTK', unitText: 'm²' } } },
      { '@type': 'FAQPage', '@id': url + '#faq', inLanguage: L, mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: strip(q), acceptedAnswer: { '@type': 'Answer', text: strip(a) } })) }
    ]
  };

  const blocks = {
    head: `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(T.meta.title)}</title>
<meta name="description" content="${esc(T.meta.description)}">
<meta name="keywords" content="${esc(T.meta.keywords)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1">
<link rel="canonical" href="${url}">
${alternates}
<meta name="theme-color" content="#223626">
<link rel="icon" type="image/png" href="/a/favicon.png">
<link rel="apple-touch-icon" href="/a/favicon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Portal de la Sierra">
<meta property="og:title" content="${esc(T.meta.title)}">
<meta property="og:description" content="${esc(T.meta.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(T.meta.ogAlt)}">
<meta property="og:locale" content="${T.meta.ogLocale}">
${PAGES.filter(p => p !== page).map(p => `<meta property="og:locale:alternate" content="${p.dict.meta.ogLocale}">`).join('\n')}
<meta name="twitter:card" content="summary_large_image">
<meta name="geo.region" content="CO-CES">
<meta name="geo.placename" content="Valledupar">
<meta name="geo.position" content="${CFG.maps.lat};${CFG.maps.lng}">
<meta name="ICBM" content="${CFG.maps.lat}, ${CFG.maps.lng}">
<link rel="preload" as="image" href="/a/portal-dia-800.webp" imagesrcset="/a/portal-dia-480.webp 480w, /a/portal-dia-800.webp 800w, /a/portal-dia-1200.webp 1200w, /a/portal-dia-lg.webp 1536w" imagesizes="106vw" fetchpriority="high">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONTS}" onload="this.onload=null;this.rel='stylesheet'">
<link rel="preload" as="style" href="${esc(FONT_SCRIPT)}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${FONTS}"><link rel="stylesheet" href="${esc(FONT_SCRIPT)}"></noscript>
<script type="application/ld+json">${JSON.stringify(jsonld).replace(/</g, '\\u003c')}</script>`,
    langs: `<nav class="langs" aria-label="${esc(T.nav.langAria)}">${PAGES.map(p => `<a href="${p.path}" hreflang="${p.dict.meta.lang}" lang="${p.dict.meta.lang}" title="${esc(p.dict.langName)}"${p === page ? ' aria-current="page"' : ''}>${p.code.toUpperCase()}</a>`).join('')}</nav>`,
    faq: `<section class="sheet faq" id="faq" aria-label="${esc(T.faq.aria)}">
  <div class="wrap grid">
    <div><p class="eyebrow">${T.faq.eyebrow}</p><h2 style="margin-top:14px">${T.faq.h2}</h2></div>
    <div>
${faq.map(([q, a], i) => `      <details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`).join('\n')}
    </div>
  </div>
</section>`,
    coords: CFG.coords.map(r => `<tr><td>${r[0]}</td><td>${n(r[1], { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td><td>${n(r[2], { minimumFractionDigits: 3, maximumFractionDigits: 3 })}</td></tr>`).join(''),
    lotOptions: ALL_LOTS.map(l => `<option value="${l.id}"${statusOf(l.id) === 'vendido' ? ' disabled' : ''}>${T.js.lot} ${l.id} · ${n(l.area)} m² · ${T.js.status[statusOf(l.id)]}</option>`).join(''),
    lotStrip: ALL_LOTS.map(l => `<button type="button" data-id="${l.id}" class="${statusOf(l.id)}" aria-label="${T.js.lot} ${l.id}, ${T.js.status[statusOf(l.id)]}">${l.id}</button>`).join(''),
    config: JSON.stringify({ whatsapp: CFG.whatsapp, instagram: CFG.instagram, precioM2: CFG.precioM2, fx: { usd: CFG.fx.usd }, maps: CFG.maps, estados: CFG.estados }),
    i18n: JSON.stringify(T.js).replace(/</g, '\\u003c'),
    masterplanJs: '/a/' + mpName,
    surveySvg,
    waVisit: waText(T.wa.visitText),
    waInfo: waText(T.wa.infoText),
    mapsUrl: vars.mapsUrl,
    phone, wa: CFG.whatsapp
  };

  let html = TEMPLATE.replace(/\{\{(@?)([\w.]+)\}\}/g, (m, at, key) => {
    const v = at ? blocks[key] : get(T, key);
    if (v == null || typeof v === 'object') throw new Error(`[${code}] Marcador sin valor: ${m}`);
    return v;
  });
  if (/\{\{[@\w.]+\}\}/.test(html)) throw new Error(`[${code}] Quedaron marcadores sin reemplazar`);
  html = `<!-- Generado por build.mjs desde src/ — no editar a mano -->\n` + html;
  return { html, T };
}

const today = new Date().toISOString().slice(0, 10);
const out = PAGES.map(p => ({ ...p, ...render(p) }));
for (const p of out) write('.' + p.path + 'index.html', p.html);

// ---------- sitemap.xml con alternates ----------
const alt = PAGES.flatMap(p => HREFLANG[p.code].map(h => `    <xhtml:link rel="alternate" hreflang="${h}" href="${SITE + p.path}"/>`))
  .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`).join('\n');
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${PAGES.map(p => `  <url>
    <loc>${SITE + p.path}</loc>
    <lastmod>${today}</lastmod>
${alt}
    <image:image><image:loc>${SITE}/a/og-portal.jpg</image:loc></image:image>
  </url>`).join('\n')}
</urlset>
`);

// ---------- robots.txt: buscadores y motores de IA bienvenidos ----------
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot'];
write('robots.txt', `User-agent: *
Allow: /

${AI_BOTS.map(b => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE}/sitemap.xml
`);

// ---------- llms.txt (resumen para motores de IA) ----------
write('llms.txt', `# Portal de la Sierra

> ${strip(out[0].T.proj.facts)}

${out.map(p => `## ${p.dict.langName} — ${SITE + p.path}

${strip(p.T.proj.facts)}

${p.T.faq.items.map(([q, a]) => `- **${strip(q)}** ${strip(a)}`).join('\n')}`).join('\n\n')}

## Contacto
- WhatsApp: ${CFG.phoneIntl} (https://wa.me/${CFG.whatsapp})
- Instagram: ${CFG.instagram}
- Ubicación: ${CFG.maps.lat}, ${CFG.maps.lng} (vía Valledupar – Sabana Crespo, Cesar, Colombia)
`);

console.log(`OK · ${out.map(p => `${p.path} ${(p.html.length / 1024).toFixed(1)} KB`).join(' · ')}`);
