/**
 * LAPISAN PENGAMBILAN DATA (DATA ACCESS LAYER)
 * -------------------------------------------------------------
 * Memisahkan logika pengambilan data klien dari komponen tampilan.
 * Saat ini mengambil data dari registry lokal statis, dan di masa depan
 * dapat dialihkan ke API / CMS / Database tanpa mengubah kode komponen.
 */

import { getClientConfig, DEFAULT_CLIENT_SLUG } from '../data/clientRegistry.js';

/**
 * Mendeteksi slug klien dari URL saat ini.
 * Prioritas deteksi:
 * 1. Query parameter: `?client=slug` atau `?slug=slug`
 * 2. Pathname URL: misal `/arjuna-srikandi`
 * 3. Default fallback jika diatur
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

  // Cek apakah halaman generator link
  if (isGeneratorQuery || pathParts[0] === 'generator' || pathParts[1] === 'generator') {
    const activeSlug = querySlug || (pathParts[0] !== 'generator' ? pathParts[0] : DEFAULT_CLIENT_SLUG);
    return {
      slug: activeSlug,
      isGenerator: true,
      isRoot: false
    };
  }

  // Jika terdapat slug di query parameter
  if (querySlug) {
    return {
      slug: querySlug,
      isGenerator: false,
      isRoot: false
    };
  }

  // Jika pathname kosong (root URL: /)
  if (pathParts.length === 0) {
    return {
      slug: null, // Menandakan halaman root / landing
      isGenerator: false,
      isRoot: true
    };
  }

  // Ambil slug dari path pertama (misal /arjuna-srikandi)
  const pathSlug = pathParts[0];

  return {
    slug: pathSlug,
    isGenerator: false,
    isRoot: false
  };
}

/**
 * Mengambil data klien berdasarkan slug (Async-ready abstraction)
 * @param {string} slug 
 * @returns {Promise<object|null>}
 */
export async function fetchClientData(slug) {
  // Simulasi async untuk kesiapan arsitektur API / CMS di masa mendatang
  return getClientConfig(slug);
}

/**
 * Mengambil data klien secara sinkron
 * @param {string} slug 
 * @returns {object|null}
 */
export function getClientData(slug) {
  return getClientConfig(slug);
}
