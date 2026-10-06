/**
 * REGISTRY KLIEN & VALIDATOR KONFIGURASI
 * -------------------------------------------------------------
 * Menyimpan daftar klien aktif, routing slug, validasi integritas data,
 * serta lazy-load chunk per klien untuk isolasi privasi & keamanan data di produksi.
 */

// Klien bawaan bila slug tidak ditentukan di URL
export const DEFAULT_CLIENT_SLUG = 'arjuna-srikandi';

// Lazy chunk loaders via Vite import.meta.glob (tanpa eager)
// Vite / Rollup memecah tiap file ./clients/*.js menjadi file .js terpisah di dist/
let clientLoaders = {};
try {
  clientLoaders = import.meta.glob(['./clients/*.js', '!./clients/client-template.js']);
} catch {
  // Lingkungan non-Vite
}

// In-memory cache agar chunk yang sudah di-load tidak di-fetch ulang
const clientConfigCache = {};

/**
 * Validasi konfigurasi klien saat runtime.
 * Menampilkan peringatan informatif di browser console bila ada field penting yang kosong.
 * @param {object} config 
 */
export function validateClientConfig(config) {
  if (!config) {
    console.error('[ConfigValidator] Data klien kosong atau bernilai null/undefined.');
    return false;
  }

  const warnings = [];

  // Pengecekan Field Utama
  if (!config.slug) warnings.push('Field `slug` belum didefinisikan.');
  if (!config.adminKey) warnings.push('Field `adminKey` belum diset (generator link tamu tidak akan bisa diakses).');
  if (!config.meta?.title) warnings.push('Field `meta.title` kosong.');
  if (!config.couple?.groom?.name) warnings.push('Field `couple.groom.name` kosong.');
  if (!config.couple?.bride?.name) warnings.push('Field `couple.bride.name` kosong.');
  
  if (!Array.isArray(config.events) || config.events.length === 0) {
    warnings.push('Array `events` minimal harus memiliki 1 acara.');
  }

  if (!config.music?.src && !config.music?.file && !config.audio) {
    warnings.push('Field `music.src` belum ditentukan.');
  }

  // Pengecekan Foto Mempelai
  if (!config.couple?.groom?.photo) {
    warnings.push('Foto mempelai pria `couple.groom.photo` belum diisi.');
  }
  if (!config.couple?.bride?.photo) {
    warnings.push('Foto mempelai wanita `couple.bride.photo` belum diisi.');
  }

  if (warnings.length > 0) {
    console.group(`%c[ConfigValidator] Peringatan Konfigurasi Klien: ${config.slug || 'Unknown'}`, 'color: #d4af37; font-weight: bold;');
    warnings.forEach((msg) => console.warn(`⚠ ${msg}`));
    console.groupEnd();
  }

  return warnings.length === 0;
}

/**
 * Memuat konfigurasi klien secara lazy-load (asinkron).
 * Memastikan data klien lain TIDAK ikut ter-bundle ke chunk halaman klien aktif.
 * @param {string} slug 
 * @returns {Promise<object|null>}
 */
export async function loadClientConfigAsync(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();

  if (clientConfigCache[normalized]) {
    return clientConfigCache[normalized];
  }

  // Cari di dynamic chunk loaders Vite
  const loaderKey = `./clients/${normalized}.js`;
  if (clientLoaders && clientLoaders[loaderKey]) {
    try {
      const mod = await clientLoaders[loaderKey]();
      const config = mod.default || Object.values(mod).find((val) => val && typeof val === 'object' && val.slug);
      if (config) {
        validateClientConfig(config);
        clientConfigCache[normalized] = config;
        return config;
      }
    } catch (err) {
      console.warn(`[ClientRegistry] Gagal memuat chunk untuk slug '${slug}':`, err);
    }
  }

  return null;
}

/**
 * Mendapatkan konfigurasi klien secara sinkron bila sudah tersedia di cache
 * @param {string} slug 
 * @returns {object|null}
 */
export function getClientConfig(slug) {
  if (!slug) return null;
  const normalized = String(slug).toLowerCase().trim();
  return clientConfigCache[normalized] || null;
}

/**
 * Mendapatkan daftar slug klien yang tersedia.
 * Di mode produksi, mengembalikan array kosong demi privasi data klien.
 * @returns {Array<{slug: string, title: string, names: string, date: string, adminKey?: string}>}
 */
export function getAvailableClients() {
  const isDev = Boolean(import.meta.env && import.meta.env.DEV);
  
  // Sembunyikan daftar klien di mode produksi (Requirement 1)
  if (!isDev) {
    return [];
  }

  return Object.keys(clientLoaders)
    .filter((k) => !k.includes('client-template'))
    .map((k) => {
      const slug = k.replace(/^\.\/clients\//, '').replace(/\.js$/, '');
      const cached = clientConfigCache[slug];
      return {
        slug,
        title: cached?.meta?.title || slug,
        names: cached?.couple ? `${cached.couple.groom?.shortName || ''} & ${cached.couple.bride?.shortName || ''}` : slug,
        date: cached?.hero?.date || cached?.events?.[0]?.date || '',
        adminKey: cached?.adminKey || ''
      };
    });
}
