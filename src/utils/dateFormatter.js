/**
 * UTILITY FORMAT TANGGAL BAHASA INDONESIA
 * -------------------------------------------------------------
 * Menerima tanggal dalam format ISO (YYYY-MM-DD atau ISO 8601 lengkap)
 * dan mengembalikannya dalam format teks Bahasa Indonesia standar.
 */

const NAMA_HARI = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu'
];

const NAMA_BULAN = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

/**
 * Memformat string ISO (YYYY-MM-DD) menjadi teks tanggal bahasa Indonesia.
 * 
 * @param {string} rawDate - Tanggal format ISO (contoh: '2027-12-12' atau '2027-12-12T09:00:00')
 * @param {object} [options]
 * @param {boolean} [options.withDay=true] - Sertakan nama hari di depan (contoh: "Minggu, 12 Desember 2027")
 * @param {'full'|'dateOnly'|'dotted'|'short'} [options.format='full'] - Format khusus
 * @returns {string} Tanggal terformat bahasa Indonesia
 */
export function formatTanggal(rawDate, options = {}) {
  if (!rawDate || typeof rawDate !== 'string') {
    return '';
  }

  const trimmed = rawDate.trim();

  // Jika input bukan format ISO (misal sudah string khusus seperti "12 . 12 . 2027"), kembalikan as-is
  const isoMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!isoMatch) {
    return trimmed;
  }

  const year = parseInt(isoMatch[1], 10);
  const month = parseInt(isoMatch[2], 10);
  const day = parseInt(isoMatch[3], 10);

  // Buat objek tanggal lokal untuk menentukan nama hari (hindari pergeseran timezone UTC)
  const dateObj = new Date(year, month - 1, day);
  const dayName = NAMA_HARI[dateObj.getDay()];
  const monthName = NAMA_BULAN[month - 1] || '';

  const format = options.format || (options.withDay === false ? 'dateOnly' : 'full');

  if (format === 'dotted') {
    const padDay = String(day).padStart(2, '0');
    const padMonth = String(month).padStart(2, '0');
    return `${padDay} . ${padMonth} . ${year}`;
  }

  if (format === 'short') {
    const shortMonth = monthName.slice(0, 3);
    return `${day} ${shortMonth} ${year}`;
  }

  if (format === 'dateOnly' || options.withDay === false) {
    return `${day} ${monthName} ${year}`;
  }

  // Format default 'full': "Minggu, 12 Desember 2027"
  return `${dayName}, ${day} ${monthName} ${year}`;
}

export default formatTanggal;
