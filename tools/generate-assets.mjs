// Regenerates the profile artwork: bun tools/generate-assets.mjs
// Source logo: profile/gonexa-logo-white.svg (official logo from https://gonexa.io).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../profile', import.meta.url)).replaceAll('\\', '/');
mkdirSync(`${root}/assets/cards`, { recursive: true });

const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ---------- Banner ---------- */
const logo = readFileSync(`${root}/gonexa-logo-white.svg`, 'utf8');
const logoDefs = logo.match(/<defs>([\s\S]*?)<\/defs>/)[1];
const logoBody = logo.slice(logo.indexOf('</defs>') + '</defs>'.length, logo.lastIndexOf('</svg>'));

const lines = [
  'M-40 250 C 180 90, 380 330, 620 190 S 1040 40, 1320 170',
  'M-40 285 C 200 130, 420 350, 650 215 S 1060 70, 1320 200',
  'M-40 215 C 160 60, 360 300, 600 165 S 1020 10, 1320 140',
];

const banner = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1280" height="320" viewBox="0 0 1280 320" role="img" aria-label="Gonexa">
  <title>Gonexa</title>
  <defs>
    <style>
      .flow { stroke-dasharray: 2 12; }
      @media (prefers-reduced-motion: no-preference) {
        .flow { animation: flow 24s linear infinite; }
        .flow.slow { animation-duration: 38s; }
      }
      @keyframes flow { to { stroke-dashoffset: -560; } }
    </style>
    <clipPath id="frame"><rect width="1280" height="320" rx="28"/></clipPath>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3123c1" stop-opacity="0"/>
      <stop offset=".3" stop-color="#4f44ca"/>
      <stop offset=".7" stop-color="#3ef75c"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f44ca" stop-opacity=".9"/>
      <stop offset=".55" stop-color="#1809ba" stop-opacity=".25"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity=".8"/>
    </linearGradient>
    <radialGradient id="glowPurple" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#3123c1" stop-opacity=".7"/>
      <stop offset="1" stop-color="#3123c1" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowGreen" cx=".5" cy=".5" r=".5">
      <stop offset="0" stop-color="#3ef75c" stop-opacity=".3"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="#ffffff" fill-opacity=".09"/>
    </pattern>
    <radialGradient id="dotFade" cx=".5" cy=".5" r=".75">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </radialGradient>
    <mask id="dotMask"><rect width="1280" height="320" fill="url(#dotFade)"/></mask>
    ${logoDefs}
  </defs>
  <g clip-path="url(#frame)">
    <rect width="1280" height="320" fill="#0A0A1C"/>
    <circle cx="220" cy="30" r="400" fill="url(#glowPurple)"/>
    <circle cx="1120" cy="330" r="360" fill="url(#glowGreen)"/>
    <rect width="1280" height="320" fill="url(#dots)" mask="url(#dotMask)"/>
    ${lines.map((d, i) => `<path class="flow${i === 1 ? ' slow' : ''}" d="${d}" fill="none" stroke="url(#line)" stroke-width="${i === 0 ? 2.4 : 1.6}" stroke-linecap="round" stroke-opacity="${i === 0 ? 0.9 : 0.5}"/>`).join('\n    ')}
    <svg x="380" y="80" width="520" height="160.8" viewBox="185 400 718 222">${logoBody}</svg>
  </g>
  <rect x=".75" y=".75" width="1278.5" height="318.5" rx="27.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
</svg>
`;
writeFileSync(`${root}/assets/banner.svg`, banner);

/* ---------- Divider ---------- */
writeFileSync(`${root}/assets/divider.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="16" viewBox="0 0 1280 16" role="presentation" aria-hidden="true">
  <defs>
    <linearGradient id="d" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3123c1" stop-opacity="0"/>
      <stop offset=".22" stop-color="#4f44ca"/>
      <stop offset=".78" stop-color="#3ef75c"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect x="0" y="7" width="1280" height="2" rx="1" fill="url(#d)"/>
  <circle cx="640" cy="8" r="8" fill="#3ef75c" fill-opacity=".18"/>
  <circle cx="640" cy="8" r="4" fill="#3ef75c"/>
</svg>
`);

/* ---------- Product cards ---------- */
const glyphs = {
  calendar: `<rect x="16" y="18" width="32" height="30" rx="5"/><path d="M16 28h32M24 13v9M40 13v9"/><circle cx="26" cy="38" r="2.6" fill="#3ef75c" stroke="none"/><circle cx="38" cy="38" r="2.6" fill="#fff" stroke="none"/>`,
  building: `<rect x="20" y="14" width="24" height="36" rx="3"/><path d="M26 22h4M34 22h4M26 30h4M34 30h4"/><rect x="29" y="40" width="6" height="10" rx="1" stroke="#3ef75c"/>`,
  document: `<path d="M22 14h14l8 8v26a2 2 0 0 1-2 2H22a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2z"/><path d="M36 14v8h8M26 30h12M26 36h12"/><path d="M26 42h6" stroke="#3ef75c"/>`,
  seal: `<circle cx="32" cy="29" r="12"/><path d="M26 29l4 4 8-8" stroke="#3ef75c"/><path d="M26 40l-3 11 9-4 9 4-3-11"/>`,
  api: `<path d="M24 22L14 32l10 10M40 22l10 10-10 10"/><path d="M35 20l-6 24" stroke="#3ef75c"/>`,
  card: `<rect x="13" y="19" width="38" height="26" rx="4"/><path d="M13 28h38"/><path d="M20 38h10" stroke="#3ef75c"/>`,
};

const cards = [
  { file: 'impulsa', glyph: 'calendar', name: 'Impulsa', pill: 'En producción', lines: ['SaaS multi-tenant para gestionar un negocio:', 'agenda, inventario, facturación y más.'] },
  { file: 'portal', glyph: 'building', name: 'Portal de Proveedores', pill: 'En producción', lines: ['Plataforma B2B para proveedores corporativos:', 'homologación, licitaciones y evaluación.'] },
  { file: 'emite', glyph: 'document', name: 'Emite', pill: 'En producción', lines: ['Facturación electrónica ante SUNAT:', 'XML UBL 2.1, firma y envío de comprobantes.'] },
  { file: 'sella', glyph: 'seal', name: 'Sella', pill: 'En producción', lines: ['Firma digital XAdES y certificados X.509', 'para documentos electrónicos peruanos.'] },
  { file: 'apis', glyph: 'api', name: 'APIs SUNAT/RENIEC y Ubigeo', pill: 'En producción', lines: ['Consulta de DNI, RUC y datos fiscales, y datos', 'geográficos de Perú, listos para integrar.'] },
  { file: 'izipay-sdk', glyph: 'card', name: 'izipay_sdk', pill: 'pub.dev', lines: ['Plugin de Flutter para integrar pagos con', 'Izipay, publicado en pub.dev.'] },
];

for (const c of cards) {
  const pillW = c.pill.length * 7.4 + 36;
  writeFileSync(`${root}/assets/cards/${c.file}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="156" viewBox="0 0 400 156" role="img" aria-label="${c.name}">
  <title>${c.name}</title>
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f44ca"/>
      <stop offset="1" stop-color="#1809ba"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f44ca" stop-opacity=".85"/>
      <stop offset=".6" stop-color="#2a2d4a" stop-opacity=".9"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity=".6"/>
    </linearGradient>
    <radialGradient id="glow" cx="1" cy="0" r="1">
      <stop offset="0" stop-color="#3123c1" stop-opacity=".45"/>
      <stop offset="1" stop-color="#3123c1" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip"><rect width="400" height="156" rx="18"/></clipPath>
  </defs>
  <g clip-path="url(#clip)">
    <rect width="400" height="156" fill="#0F1020"/>
    <rect width="400" height="156" fill="url(#glow)"/>
  </g>
  <rect x=".75" y=".75" width="398.5" height="154.5" rx="17.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
  <g transform="translate(26 26) scale(.875)">
    <rect width="64" height="64" rx="16" fill="url(#tile)"/>
    <g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${glyphs[c.glyph]}</g>
  </g>
  <text x="98" y="52" font-family="${FONT}" font-size="${c.name.length > 20 ? 18 : 20}" font-weight="700" fill="#FFFFFF">${c.name}</text>
  <g transform="translate(98 62)">
    <rect width="${pillW}" height="22" rx="11" fill="#3ef75c" fill-opacity=".12" stroke="#3ef75c" stroke-opacity=".4"/>
    <circle cx="13" cy="11" r="3" fill="#3ef75c"/>
    <text x="23" y="15.4" font-family="${FONT}" font-size="11.5" font-weight="600" fill="#8DF9A2">${c.pill}</text>
  </g>
  <text font-family="${FONT}" font-size="14" fill="#A9B1C6"><tspan x="26" y="118">${c.lines[0]}</tspan><tspan x="26" y="138">${c.lines[1]}</tspan></text>
</svg>
`);
}
/* ---------- Process timeline ---------- */
const steps = [
  ['Descubrimiento', 'Entender el problema'],
  ['Diseño', 'Conceptos primero'],
  ['Desarrollo', 'Fundaciones sólidas'],
  ['Despliegue', 'Producción real'],
  ['Soporte', 'Monitoreo y evolución'],
];
const colW = 172;
const nodes = steps.map(([title, sub], i) => {
  const x = colW / 2 + colW * i;
  return `<circle cx="${x}" cy="48" r="13" fill="#0F1020" stroke="url(#node${i})" stroke-width="3"/>
  <circle cx="${x}" cy="48" r="5" fill="url(#node${i})"/>
  <text x="${x}" y="95" text-anchor="middle" font-family="${FONT}" font-size="17" font-weight="700" fill="#FFFFFF">${title}</text>
  <text x="${x}" y="117" text-anchor="middle" font-family="${FONT}" font-size="13" fill="#A9B1C6">${sub}</text>`;
}).join('\n  ');
const nodeGradients = steps.map((_, i) => {
  const t = i / (steps.length - 1);
  const mix = (a, b) => Math.round(a + (b - a) * t).toString(16).padStart(2, '0');
  return `<linearGradient id="node${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#${mix(0x4f, 0x3e)}${mix(0x44, 0xf7)}${mix(0xca, 0x5c)}"/><stop offset="1" stop-color="#${mix(0x31, 0x3e)}${mix(0x23, 0xf7)}${mix(0xc1, 0x5c)}"/></linearGradient>`;
}).join('\n    ');
writeFileSync(`${root}/assets/process.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="860" height="150" viewBox="0 0 860 150" role="img" aria-label="Cómo trabajamos: descubrimiento, diseño, desarrollo, despliegue y soporte">
  <title>Cómo trabajamos</title>
  <defs>
    <linearGradient id="rail" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#4f44ca"/>
      <stop offset="1" stop-color="#3ef75c"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f44ca" stop-opacity=".85"/>
      <stop offset=".6" stop-color="#2a2d4a" stop-opacity=".9"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity=".6"/>
    </linearGradient>
    ${nodeGradients}
  </defs>
  <rect width="860" height="150" rx="18" fill="#0F1020"/>
  <rect x=".75" y=".75" width="858.5" height="148.5" rx="17.25" fill="none" stroke="url(#edge)" stroke-width="1.5"/>
  <rect x="${colW / 2}" y="46.5" width="${colW * (steps.length - 1)}" height="3" rx="1.5" fill="url(#rail)" fill-opacity=".7"/>
  ${nodes}
</svg>
`);

/* ---------- Technology panel ---------- */
// An SVG loaded through <img> cannot reference external images, so every icon is embedded.
// Icons live in profile/tech/<id>.svg (skillicons.dev tiles plus four generated tiles) and are
// downloaded once when missing.
async function iconSource(id) {
  const file = `${root}/tech/${id}.svg`;
  if (!existsSync(file)) {
    const response = await fetch(`https://skillicons.dev/icons?i=${id}`);
    if (!response.ok) throw new Error(`Icon ${id}: HTTP ${response.status}`);
    writeFileSync(file, await response.text());
  }
  return readFileSync(file, 'utf8');
}

// Nests an icon and prefixes its ids so several icons can share one document.
function embedIcon(source, prefix, x, y, size) {
  const match = source.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>\s*$/);
  if (!match) throw new Error(`Unrecognised icon markup for ${prefix}`);
  const viewBox = match[1].match(/viewBox="([^"]+)"/)?.[1] ?? '0 0 48 48';
  let body = match[2];
  for (const id of new Set([...body.matchAll(/\sid="([^"]+)"/g)].map(found => found[1]))) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    body = body
      .replace(new RegExp(`\\sid="${escaped}"`, 'g'), ` id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${escaped}\\)`, 'g'), `url(#${prefix}-${id})`)
      .replace(new RegExp(`(xlink:)?href="#${escaped}"`, 'g'), (_, ns) => `${ns ?? ''}href="#${prefix}-${id}"`);
  }
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" fill="none">${body}</svg>`;
}

const groups = [
  { title: 'Móvil y web', note: ['Apps nativas y multiplataforma', 'para iOS y Android, y web moderna.'], full: true,
    items: [['flutter', 'Flutter'], ['kotlin', 'Kotlin'], ['swift', 'Swift'], ['react', 'React'], ['angular', 'Angular'], ['nextjs', 'Next.js'], ['ts', 'TypeScript'], ['tailwind', 'Tailwind']] },
  { title: 'Backend',
    items: [['nestjs', 'NestJS'], ['nodejs', 'Node.js'], ['dotnet', '.NET'], ['laravel', 'Laravel'], ['java', 'Java'], ['spring', 'Spring']] },
  { title: 'Datos',
    items: [['postgres', 'PostgreSQL'], ['mysql', 'MySQL'], ['mongodb', 'MongoDB'], ['redis', 'Redis'], ['firebase', 'Firebase'], ['supabase', 'Supabase']] },
  { title: 'Nube y DevOps',
    items: [['docker', 'Docker'], ['aws', 'AWS'], ['azure', 'Azure'], ['nginx', 'Nginx'], ['githubactions', 'Actions']] },
  { title: 'Diseño, IA e integraciones',
    items: [['figma', 'Figma'], ['n8n', 'n8n'], ['claude', 'Claude'], ['openai', 'OpenAI'], ['sap', 'SAP']] },
];

const cardH = 150, rowGap = 16, halfW = 422;
let techCards = '';
let row = 0, column = 0;
for (const [g, group] of groups.entries()) {
  const full = Boolean(group.full);
  const x = full ? 0 : column * (halfW + 16);
  const y = row * (cardH + rowGap);
  const w = full ? 860 : halfW;
  let icons = '';
  for (const [i, [id, label]] of group.items.entries()) {
    const ix = 24 + i * 64;
    icons += embedIcon(await iconSource(id), `${id}`, ix, 58, 44)
      + `<text x="${ix + 22}" y="122" text-anchor="middle" font-family="${FONT}" font-size="10.5" fill="#A9B1C6">${label}</text>`;
  }
  const note = group.note
    ? `<text font-family="${FONT}" font-size="13" fill="#A9B1C6"><tspan x="556" y="76">${group.note[0]}</tspan><tspan x="556" y="96">${group.note[1]}</tspan></text>`
    : '';
  techCards += `
  <g transform="translate(${x} ${y})">
    <rect width="${w}" height="${cardH}" rx="18" fill="#0F1020"/>
    <rect width="${w}" height="${cardH}" rx="18" fill="url(#techGlow)"/>
    <rect x=".75" y=".75" width="${w - 1.5}" height="${cardH - 1.5}" rx="17.25" fill="none" stroke="url(#techEdge)" stroke-width="1.5"/>
    <rect x="24" y="22" width="4" height="18" rx="2" fill="url(#techAccent)"/>
    <text x="38" y="37" font-family="${FONT}" font-size="15" font-weight="700" fill="#FFFFFF">${group.title}</text>
    ${icons}
    ${note}
  </g>`;
  if (full) { row += 1; column = 0; } else if (column === 1) { row += 1; column = 0; } else { column = 1; }
}
const techRows = row;
const techH = techRows * cardH + (techRows - 1) * rowGap;
writeFileSync(`${root}/assets/tech.svg`, `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="860" height="${techH}" viewBox="0 0 860 ${techH}" role="img" aria-label="Tecnologías con las que trabajamos">
  <title>Tecnologías con las que trabajamos</title>
  <defs>
    <linearGradient id="techEdge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#4f44ca" stop-opacity=".85"/>
      <stop offset=".6" stop-color="#2a2d4a" stop-opacity=".9"/>
      <stop offset="1" stop-color="#3ef75c" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="techAccent" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#4f44ca"/>
      <stop offset="1" stop-color="#3ef75c"/>
    </linearGradient>
    <radialGradient id="techGlow" cx="1" cy="0" r="1">
      <stop offset="0" stop-color="#3123c1" stop-opacity=".4"/>
      <stop offset="1" stop-color="#3123c1" stop-opacity="0"/>
    </radialGradient>
  </defs>${techCards}
</svg>
`);

console.log('assets written');
