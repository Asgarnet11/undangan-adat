/**
 * LAPISAN PENGAMBILAN DATA (DATA ACCESS LAYER)
 * -------------------------------------------------------------
 * Memisahkan logika pengambilan data klien dari komponen tampilan.
 * Mendukung lazy-loading asynchronous per slug untuk isolasi keamanan chunk di produksi.
 */

import { loadClientConfigAsync, getClientConfig, DEFAULT_CLIENT_SLUG } from '../data/clientRegistry.js';

/**
 * Mendeteksi slug klien dari URL saat ini.
 * Mendukung:
 * 1. URL /{slug}/generator (Generator terproteksi token admin)
 * 2. URL /{slug} (Undangan mempelai)
 * 3. URL root / (Landing)
 * 4. Query parameter (?client=slug atau ?slug=slug)
 * @returns {{ slug: string|null, isGenerator: boolean, isRoot: boolean }}
 */
export function resolveCurrentRoute() {
  if (typeof window === 'undefined') {
    return { slug: DEFAULT_CLIENT_SLUG, isGenerator: false, isRoot: false };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const querySlug = searchParams.get('client') || searchParams.get('slug');
  const isGeneratorQuery = searchParams.get('page') === 'generator' || searchParams.has('generator');

  // Bersihkan pathname
  const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
  const pathParts = cleanPath.split('/').filter(Boolean);

  // 1. Format /{slug}/generator (Format utama generator per klien)
  if (pathParts.length >= 2 && pathParts[1] === 'generator') {
    return {
      slug: pathParts[0].toLowerCase(),
      isGenerator: true,
      isRoot: false
    };
  }

  // 2. Format /generator?client={slug} atau ?page=generator
  if (isGeneratorQuery || pathParts[0] === 'generator') {
    const activeSlug = querySlug || (pathParts[1] ? pathParts[1] : DEFAULT_CLIENT_SLUG);
    return {
      slug: activeSlug.toLowerCase(),
      isGenerator: true,
      isRoot: false
    };
  }

  // 3. Jika terdapat slug di query parameter (?client=slug)
  if (querySlug) {
    return {
      slug: querySlug.toLowerCase(),
      isGenerator: false,
      isRoot: false
    };
  }

  // 4. Jika pathname kosong (root URL: /)
  if (pathParts.length === 0) {
    return {
      slug: null, // Menandakan halaman root / landing
      isGenerator: false,
      isRoot: true
    };
  }

  // 5. Ambil slug dari path pertama (misal /arjuna-srikandi)
  const pathSlug = pathParts[0].toLowerCase();

  return {
    slug: pathSlug,
    isGenerator: false,
    isRoot: false
  };
}

/**
 * Mengambil data klien berdasarkan slug secara asinkron (Lazy-load chunk)
 * @param {string} slug 
 * @returns {Promise<object|null>}
 */
export async function fetchClientData(slug) {
  return loadClientConfigAsync(slug);
}

/**
 * Mengambil data klien secara sinkron bila sudah tersedia di cache
 * @param {string} slug 
 * @returns {object|null}
 */
export function getClientData(slug) {
  return getClientConfig(slug);
}
