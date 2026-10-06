/**
 * ============================================================================
 * TEMPLATE KONFIGURASI KLIEN UNDANGAN PERNIKAHAN DIGITAL
 * ============================================================================
 * Petunjuk Pengisian:
 * 1. Salin file ini menjadi: /src/data/clients/{nama-slug}.js
 * 2. Siapkan folder aset di: /public/clients/{nama-slug}/
 *    - Letakkan file foto mempelai pria (groom.jpg)
 *    - Letakkan file foto mempelai wanita (bride.jpg)
 *    - Letakkan file foto bersama (couple.jpg)
 *    - Letakkan file musik latar (song.mp3)
 * 3. Daftarkan slug klien ini di /src/data/clientRegistry.js
 * ============================================================================
 */

export const clientTemplate = {
  // [WAJIB] Slug unik untuk URL (huruf kecil, gunakan tanda hubung, contoh: 'budi-ani')
  slug: "nama-klien",

  // [WAJIB] Token rahasia admin untuk akses Generator Link Tamu (minimal 16 karakter acak)
  // Digunakan untuk URL: /{slug}/generator?key=TOKEN
  adminKey: "TOKEN_ADMIN_ACAK_MINIMAL_16_KARAKTER",

  // [WAJIB] Metadata Halaman (SEO, tab peramban, dan pratinjau media sosial WhatsApp/Instagram)
  meta: {
    // Judul pada tab browser & preview share
    title: "The Wedding of [Nama Pria] & [Nama Wanita]",
    // Deskripsi singkat undangan untuk pencarian & preview WhatsApp
    description: "Undangan Pernikahan Tradisional [Nama Lengkap Pria] & [Nama Lengkap Wanita]",
    // Gambar banner thumbnail untuk preview WhatsApp (disarankan rasio 1.91:1 atau foto persegi)
    ogImage: "/clients/nama-klien/couple.jpg",
    // Ikon favicon browser (.ico atau .svg)
    favicon: "/favicon.svg",
  },

  // [OPSIONAL] Konfigurasi Warna & Tipografi Tema Klien (berbasis CSS Variables)
  // Biarkan sesuai nilai default atau sesuaikan bila klien menginginkan palet berbeda.
  theme: {
    colorPrimary: "#0a3123",         // Warna hijau tua utama
    colorPrimaryDark: "#052016",     // Warna hijau sangat pekat (background card/alt)
    colorSecondary: "#d4af37",       // Warna emas utama untuk ornamen/teks aksen
    colorSecondaryLight: "#f3e5ab",  // Warna emas muda/krem
    colorAccent: "#8b1e22",          // Warna aksen sekunder (marun/merah adat)
    fontDisplay: "'Cinzel Decorative', 'Cinzel', serif",
    fontSerif: "'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', sans-serif",
  },

  // [WAJIB] Daftar Section yang Aktif. 
  // Hapus nama section dari array ini jika ingin menyembunyikannya secara total.
  // Pilihan: "hero", "ayat", "couple", "events", "story", "gallery", "gift"
  activeSections: [
    "hero",
    "ayat",
    "couple",
    "events",
    "story",
    "gallery",
    "gift"
  ],

  // [WAJIB] Bagian Cover / Layar Pembuka
  cover: {
    subtitle: "The Wedding Of",
    guestPrefix: "Kepada Yth. Bapak/Ibu/Saudara/i",
    buttonText: "Buka Undangan"
  },

  // [WAJIB] Bagian Hero (Layar Pertama setelah Buka Undangan)
  hero: {
    eyebrow: "Walimatul 'Urs", // Judul pengantar adat/religius (misal: "Pernikahan Suci", "Om Swastyastu", dll)
    date: "2027-12-12", // Format ISO (YYYY-MM-DD), diformat otomatis oleh formatTanggal()
    weddingDateISO: "2027-12-12T09:00:00", // Format ISO lengkap untuk countdown timer
  },

  // [WAJIB] Data Pasangan Mempelai
  couple: {
    sectionTitle: "Pasangan Mempelai",
    greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:",
    
    // Data Mempelai Pria
    groom: {
      name: "Nama Lengkap Mempelai Pria",
      shortName: "Pria", // Nama panggilan (ditampilkan di judul/hero)
      parents: "Putra dari Bapak ... dan Ibu ...",
      instagram: "https://instagram.com/username",
      instagramHandle: "username", // Tanpa simbol @
      photo: "/clients/nama-klien/groom.jpg" // Rasio foto potret 1:1
    },

    // Data Mempelai Wanita
    bride: {
      name: "Nama Lengkap Mempelai Wanita",
      shortName: "Wanita", // Nama panggilan (ditampilkan di judul/hero)
      parents: "Putri dari Bapak ... dan Ibu ...",
      instagram: "https://instagram.com/username",
      instagramHandle: "username", // Tanpa simbol @
      photo: "/clients/nama-klien/bride.jpg" // Rasio foto potret 1:1
    }
  },

  // [OPSIONAL] Ayat Suci atau Kutipan Pernikahan
  // Kosongkan text jika tidak ingin menampilkan bagian ayat.
  ayat: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...",
    source: "QS. Ar-Rum: 21" // Sumber kutipan (misal: Alkitab, Bhagavad Gita, atau nama penyair)
  },

  // [WAJIB] Rangkaian Acara Pernikahan (Minimal 1 acara, bebas menambahkan 1-N acara)
  events: [
    {
      title: "Akad Nikah / Pemberkatan",
      date: "Minggu, 12 Desember 2027",
      time: "09.00 - 11.00",
      timezone: "WIB",
      venue: "Nama Gedung / Masjid / Tempat",
      address: "Alamat lengkap lokasi acara",
      mapsUrl: "https://maps.google.com/?q=...", // URL tujuan tombol 'Buka Google Maps'
      embedMapUrl: "" // Opsional: URL iframe embed Google Maps
    },
    {
      title: "Resepsi",
      date: "Minggu, 12 Desember 2027",
      time: "12.00 - 15.00",
      timezone: "WIB",
      venue: "Nama Gedung / Ballroom",
      address: "Alamat lengkap lokasi resepsi",
      mapsUrl: "https://maps.google.com/?q=...",
      embedMapUrl: ""
    }
  ],

  // [OPSIONAL] Perjalanan Cinta (0 - N tahapan cerita)
  // Jika array ini kosong [], section Perjalanan Cinta otomatis disembunyikan.
  // Pilihan ikon: "sparkles", "heart", "gem", "wedding"
  loveStory: [
    {
      year: "2021",
      date: "14 Februari 2021",
      title: "Pertemuan Pertama",
      description: "Ceritakan momen awal pertemuan...",
      icon: "sparkles",
      photo: null // Opsional: path gambar misal '/clients/nama-klien/story1.jpg'
    },
    {
      year: "2027",
      date: "12 Desember 2027",
      title: "Hari Bahagia",
      description: "Mengikat janji suci pernikahan...",
      icon: "wedding",
      photo: null
    }
  ],

  // [OPSIONAL] Galeri Foto Prewedding / Kebersamaan (0 - N foto)
  // Jika array ini kosong [], section Galeri otomatis disembunyikan.
  // Pilihan aspectRatio: "1/1", "3/4", "4/5", "16/9"
  gallery: [
    {
      id: 1,
      src: "/clients/nama-klien/couple.jpg",
      alt: "Foto Prewedding 1",
      title: "Judul Momen Indah",
      category: "Prewedding",
      aspectRatio: "3/4"
    }
  ],

  // [OPSIONAL] Tanda Kasih / Amplop Digital & Kirim Kado
  // Jika bankAccounts kosong dan physicalAddress null, section Gift otomatis disembunyikan.
  gift: {
    title: "Tanda Kasih",
    description: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberikan kado secara digital atau fisik:",
    // Daftar rekening bank / dompet digital (1 - N rekening)
    bankAccounts: [
      {
        bank: "BCA",
        number: "1234567890",
        holder: "Nama Pemilik Rekening"
      }
    ],
    // Alamat fisik pengiriman kado (isi null jika tidak menerima kado fisik)
    physicalAddress: {
      recipient: "Nama Penerima Kado",
      phone: "+62 812-xxxx-xxxx",
      address: "Alamat lengkap pengiriman kado fisik",
      note: "Catatan khusus pengiriman (misal konfirmasi kurir via WA)"
    }
  },

  // [WAJIB] Ucapan Penutup / Footer
  closing: {
    greeting: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    salutation: "Kami yang berbahagia",
    credit: "The Wedding of [Nama Pria] & [Nama Wanita] • [Tanggal Pernikahan]"
  },

  // [WAJIB] Musik Latar Belakang (.mp3 di folder /public/clients/{nama-slug}/)
  music: {
    src: "/clients/nama-klien/song.mp3",
    title: "Judul Lagu Latar"
  }
};
