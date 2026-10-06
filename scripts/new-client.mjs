#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Ambil argumen slug dari CLI
const rawSlug = process.argv[2];

if (!rawSlug) {
  console.log(`
\x1b[33m═══════════════════════════════════════════════════════════════\x1b[0m
\x1b[1m\x1b[32m Generator Klien Baru - Undangan Pernikahan Digital \x1b[0m
\x1b[33m═══════════════════════════════════════════════════════════════\x1b[0m

\x1b[1mPenggunaan:\x1b[0m
  npm run new-client -- <nama-slug>

\x1b[1mContoh:\x1b[0m
  npm run new-client -- rama-shinta
  npm run new-client -- bagas-laksmi

\x1b[36mAturan slug:\x1b[0m
  - Hanya huruf kecil, angka, dan tanda hubung (-)
  - Contoh yang valid: raden-anindita, dimas-ayu-2027
`);
  process.exit(1);
}

const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('\x1b[31mError: Slug tidak valid. Gunakan huruf kecil, angka, dan tanda hubung saja.\x1b[0m');
  process.exit(1);
}

// Path target
const clientConfigPath = path.join(rootDir, 'src', 'data', 'clients', `${slug}.js`);
const clientPublicDir = path.join(rootDir, 'public', 'clients', slug);
const templateConfigPath = path.join(rootDir, 'src', 'data', 'clients', 'client-template.js');
const templatePublicDir = path.join(rootDir, 'public', 'clients', 'template');

// Cek apakah file konfigurasi sudah ada
if (fs.existsSync(clientConfigPath)) {
  console.error(`\x1b[31mError: Klien dengan slug '${slug}' sudah ada!\x1b[0m`);
  console.error(`Lokasi: ${clientConfigPath}`);
  console.error('Silakan gunakan slug lain atau edit file tersebut secara langsung.');
  process.exit(1);
}

console.log(`\x1b[36mMembuat klien baru: \x1b[1m${slug}\x1b[0m...`);

// 1. Buat folder aset publik
if (!fs.existsSync(clientPublicDir)) {
  fs.mkdirSync(clientPublicDir, { recursive: true });
}

// Salin file template aset jika tersedia
if (fs.existsSync(templatePublicDir)) {
  const files = fs.readdirSync(templatePublicDir);
  for (const file of files) {
    const src = path.join(templatePublicDir, file);
    const dest = path.join(clientPublicDir, file);
    fs.copyFileSync(src, dest);
  }
  console.log(`\x1b[32m✔ Folder aset publik berhasil disalin:\x1b[0m public/clients/${slug}/`);
} else {
  console.log(`\x1b[33m⚠ Folder template publik tidak ditemukan. Folder kosong dibuat di:\x1b[0m public/clients/${slug}/`);
}

// 2. Buat file konfigurasi data klien dari client-template.js
if (!fs.existsSync(templateConfigPath)) {
  console.error(`\x1b[31mError: File template tidak ditemukan di: ${templateConfigPath}\x1b[0m`);
  process.exit(1);
}

let templateContent = fs.readFileSync(templateConfigPath, 'utf8');

// Nama variabel camelCase
const camelCaseName = slug
  .split('-')
  .map((part, index) => index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
  .join('');

// Ganti placeholder nama-klien dengan slug baru
templateContent = templateContent
  .replace(/slug:\s*["']nama-klien["']/g, `slug: "${slug}"`)
  .replace(/\/clients\/nama-klien\//g, `/clients/${slug}/`)
  .replace(/export const clientTemplate =/g, `export const ${camelCaseName}Config =`);

// Tambahkan default export di akhir
templateContent += `\nexport default ${camelCaseName}Config;\n`;

fs.writeFileSync(clientConfigPath, templateContent, 'utf8');
console.log(`\x1b[32m✔ File konfigurasi berhasil dibuat:\x1b[0m src/data/clients/${slug}.js`);

console.log(`
\x1b[32m═══════════════════════════════════════════════════════════════\x1b[0m
\x1b[1m\x1b[32m SUKSES! Klien '${slug}' siap digunakan. \x1b[0m
\x1b[32m═══════════════════════════════════════════════════════════════\x1b[0m

\x1b[1mLangkah Selanjutnya:\x1b[0m
1. Edit data mempelai & acara di:
   \x1b[36msrc/data/clients/${slug}.js\x1b[0m

2. Letakkan foto asli & musik di:
   \x1b[36mpublic/clients/${slug}/\x1b[0m (groom.jpg, bride.jpg, couple.jpg, song.mp3)

3. Lihat undangan di browser:
   \x1b[33mhttp://localhost:5173/${slug}\x1b[0m

4. Generate link WhatsApp tamu:
   \x1b[33mhttp://localhost:5173/generator?client=${slug}\x1b[0m
`);
