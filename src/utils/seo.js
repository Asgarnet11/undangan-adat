/**
 * UTILITY SEO & ROBOTS META
 * -------------------------------------------------------------
 * Menyediakan fungsi untuk mengatur instruksi perayap mesin pencari (crawlers)
 * seperti menambahkan noindex pada halaman sensitif/admin/generator.
 */

/**
 * Menambahkan atau memperbarui tag meta robots menjadi "noindex, nofollow"
 */
export function setRobotsNoIndex() {
  if (typeof document === 'undefined') return;

  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', 'noindex, nofollow');
}

/**
 * Mengembalikan tag meta robots ke status default (index, follow)
 */
export function resetRobotsIndex() {
  if (typeof document === 'undefined') return;

  const metaRobots = document.querySelector('meta[name="robots"]');
  if (metaRobots) {
    metaRobots.setAttribute('content', 'index, follow');
  }
}
