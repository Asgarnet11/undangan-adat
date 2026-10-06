/**
 * KONFIGURASI KLIEN: RADEN RAMA WIJAYA & DEWI SHINTA
 * -----------------------------------------------------------------
 * Contoh implementasi klien kedua untuk membuktikan modularitas template.
 */

export const ramaShintaConfig = {
  slug: "rama-shinta",
  adminKey: "ram-shi-secret-token-2027-w7m4",

  meta: {
    title: "The Wedding of Rama & Shinta",
    description: "Undangan Pernikahan Raden Rama Wijaya & Dewi Shinta • Sabtu, 18 September 2027",
    ogImage: "/clients/rama-shinta/couple.jpg",
    favicon: "/favicon.svg",
  },

  theme: {
    colorPrimary: "#102a3a",         // Biru malam / Navy Adat
    colorPrimaryDark: "#081620",
    colorSecondary: "#d4af37",       // Emas klasik
    colorSecondaryLight: "#f5e6b8",
    colorAccent: "#9e2a2b",
    fontDisplay: "'Cinzel Decorative', 'Cinzel', serif",
    fontSerif: "'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', sans-serif",
  },

  activeSections: [
    "hero",
    "ayat",
    "couple",
    "events",
    "story",
    "gallery",
    "gift",
    "closing"
  ],

  cover: {
    subtitle: "The Wedding Of",
    title: "Rama & Shinta",
    date: "2027-09-18",
    buttonText: "Buka Undangan",
  },

  hero: {
    eyebrow: "Walimatul 'Ursy",
    title: "Rama & Shinta",
    date: "2027-09-18",
  },

  countdown: {
    targetIsoDate: "2027-09-18T08:00:00+07:00",
    calendar: {
      title: "Pernikahan Rama & Shinta",
      details: "Pernikahan Raden Rama Wijaya & Dewi Shinta",
      location: "Gedung Pewayangan Kautaman, Jakarta Timur",
      startIso: "20270918T010000Z",
      endIso: "20270918T070000Z",
    },
  },

  ayat: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  couple: {
    groom: {
      name: "Raden Rama Wijaya",
      shortName: "Rama",
      parents: "Putra pertama dari Bpk. Prabu Dasaratha & Ibu Dewi Kausalya",
      instagram: "ramawijaya",
      photo: "/clients/rama-shinta/groom.jpg",
    },
    bride: {
      name: "Dewi Shinta",
      shortName: "Shinta",
      parents: "Putri kedua dari Bpk. Prabu Janaka & Ibu Permaisuri",
      instagram: "dewishinta",
      photo: "/clients/rama-shinta/bride.jpg",
    },
  },

  // Contoh fleksibilitas: 1 Acara Utama (Tunggal) untuk membuktikan layout adaptif
  events: [
    {
      title: "Akad & Resepsi Pernikahan",
      date: "2027-09-18",
      time: "09.00 - 14.00",
      timezone: "WIB",
      locationName: "Gedung Pewayangan Kautaman",
      address: "Jl. Raya Pintu 1 TMII, Ceger, Cipayung, Jakarta Timur",
      mapUrl: "https://maps.google.com/?q=Gedung+Pewayangan+Kautaman+Jakarta",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.7538562303254!2d106.88764027499097!3d-6.296041993692998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2e30776b251%3A0xe5eb6c4bf8a96434!2sGedung%20Pewayangan%20Kautaman!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
    },
  ],

  loveStory: [
    {
      year: "2020",
      date: "2020-03-10",
      title: "Pertemuan Pertama",
      story: "Pertama kali berkenalan dalam kegiatan seni tradisi di universitas.",
    },
    {
      year: "2024",
      date: "2024-07-21",
      title: "Menjalin Komitmen",
      story: "Memutuskan untuk melangkah ke jenjang yang lebih serius dengan restu kedua keluarga.",
    },
    {
      year: "2027",
      date: "2027-09-18",
      title: "Menuju Pelaminan",
      story: "Mengikat janji suci pernikahan untuk melangkah bersama mengarungi bahtera rumah tangga.",
    },
  ],

  gallery: [
    {
      id: 1,
      title: "Kebersamaan",
      category: "Prewedding",
      thumbnail: "/clients/rama-shinta/couple.jpg",
      full: "/clients/rama-shinta/couple.jpg",
    },
    {
      id: 2,
      title: "Mempelai Pria",
      category: "Potret",
      thumbnail: "/clients/rama-shinta/groom.jpg",
      full: "/clients/rama-shinta/groom.jpg",
    },
    {
      id: 3,
      title: "Mempelai Wanita",
      category: "Potret",
      thumbnail: "/clients/rama-shinta/bride.jpg",
      full: "/clients/rama-shinta/bride.jpg",
    },
  ],

  gift: {
    bankAccounts: [
      {
        bank: "Bank Mandiri",
        accountNumber: "1370019283741",
        accountHolder: "Raden Rama Wijaya",
        qrImage: "",
      },
    ],
    physicalGift: {
      recipient: "Rama & Shinta",
      address: "Jl. Ceger Raya No. 45, Cipayung, Jakarta Timur",
      phone: "+62 812-3456-7890",
      note: "Konfirmasi pengiriman kado fisik dapat dilakukan melalui nomor WhatsApp di atas.",
    },
  },

  closing: {
    greeting: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    salutation: "Kami yang berbahagia",
    credit: "The Wedding of Rama & Shinta • 18 September 2027",
  },

  music: {
    src: "/clients/rama-shinta/song.mp3",
    title: "Gending Pengantin Tradisional",
    autoplay: true,
  },
};

export default ramaShintaConfig;
