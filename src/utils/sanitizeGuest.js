/**
 * UTILITY SANITASI NAMA TAMU UNDANGAN
 * -------------------------------------------------------------
 * Membaca parameter query `?to=Nama`, melakukan decoding yang aman,
 * membersihkan karakter berbahaya (XSS-safe), membatasi panjang,
 * dan mengembalikan 'Tamu Undangan' bila parameter kosong.
 */

const MAX_GUEST_NAME_LENGTH = 60;
const DEFAULT_GUEST_NAME = 'Tamu Undangan';

/**
 * Membersihkan string dari potensi injeksi script atau tag HTML
 * @param {string} rawString 
 * @returns {string}
 */
export function sanitizeText(rawString) {
  if (!rawString || typeof rawString !== 'string') return '';
  
  return rawString
    // Hapus tag HTML
    .replace(/<[^>]*>/g, '')
    // Ganti entitas berisiko
    .replace(/[<>"'&]/g, (char) => {
      const map = {
        '<': '',
        '>': '',
        '"': '',
        "'": '',
        '&': '&amp;'
      };
      return map[char] || '';
    })
    // Bersihkan karakter kontrol
    /* eslint-disable-next-line no-control-regex */
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    .trim();
}

/**
 * Membersihkan nama tamu langsung dari teks input.
 * @param {string} rawName
 * @returns {string}
 */
export function sanitizeGuestName(rawName) {
  if (!rawName || typeof rawName !== 'string') return DEFAULT_GUEST_NAME;

  let decoded = rawName;
  try {
    decoded = decodeURIComponent(rawName.replace(/\+/g, ' '));
  } catch {
    decoded = rawName.replace(/\+/g, ' ');
  }

  const cleaned = sanitizeText(decoded);
  if (!cleaned) return DEFAULT_GUEST_NAME;

  if (cleaned.length > MAX_GUEST_NAME_LENGTH) {
    return cleaned.slice(0, MAX_GUEST_NAME_LENGTH).trim();
  }

  return cleaned;
}

/**
 * Mendapatkan nama tamu dari URL query (?to=Nama atau ?u=Nama)
 * @param {string} [searchString] Query string opsional (default: window.location.search)
 * @returns {string} Nama tamu yang aman dan bersih
 */
export function getGuestName(searchString) {
  if (typeof window === 'undefined' && !searchString) {
    return DEFAULT_GUEST_NAME;
  }

  const query = searchString !== undefined 
    ? searchString 
    : (typeof window !== 'undefined' ? window.location.search : '');

  try {
    const params = new URLSearchParams(query);
    const rawName = params.get('to') || params.get('u') || params.get('guest');

    if (!rawName) {
      return DEFAULT_GUEST_NAME;
    }

    return sanitizeGuestName(rawName);
  } catch (error) {
    console.warn('[GuestSanitizer] Gagal mengurai nama tamu:', error);
    return DEFAULT_GUEST_NAME;
  }
}

/**
 * Membuat tautan undangan untuk nama tamu tertentu.
 * @param {string} slug
 * @param {string} guestName
 * @param {string} [baseUrl]
 * @returns {string}
 */
export function generateGuestInvitationLink(slug, guestName, baseUrl) {
  const origin = baseUrl || (typeof window !== 'undefined' ? window.location.origin : '');
  const encodedName = encodeURIComponent(guestName.trim());
  return `${origin}/${slug}?to=${encodedName}`;
}
