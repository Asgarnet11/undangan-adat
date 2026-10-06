/**
 * KONFIGURASI KLIEN: RADEN ARJUNA PRATAMA & DEWI SRIKANDI MAHARANI
 * -----------------------------------------------------------------
 * File konfigurasi lengkap berbasis data untuk klien 'arjuna-srikandi'.
 */

export const arjunaSrikandiConfig = {
  slug: "arjuna-srikandi",

  // Metadata Website (SEO, Open Graph, Browser Tab)
  meta: {
    title: "The Wedding of Arjuna & Srikandi",
    description: "Undangan Pernikahan Tradisional Raden Arjuna Pratama & Dewi Srikandi Maharani • Minggu, 12 Desember 2027",
    ogImage: "/clients/arjuna-srikandi/couple.jpg",
    favicon: "/favicon.svg",
  },

  // Tema Visual Klien (CSS Custom Properties)
  theme: {
    colorPrimary: "#0a3123",
    colorPrimaryDark: "#052016",
    colorSecondary: "#d4af37",
    colorSecondaryLight: "#f3e5ab",
    colorAccent: "#8b1e22",
    fontDisplay: "'Cinzel Decorative', 'Cinzel', serif",
    fontSerif: "'Playfair Display', Georgia, serif",
    fontSans: "'Plus Jakarta Sans', sans-serif",
  },

  // Daftar Section yang Aktif
  activeSections: [
    "hero",
    "ayat",
    "couple",
    "events",
    "story",
    "gallery",
    "gift"
  ],

  // Cover / Layar Pembuka
  cover: {
    subtitle: "The Wedding Of",
    guestPrefix: "Kepada Yth. Bapak/Ibu/Saudara/i",
    buttonText: "Buka Undangan"
  },

  // Hero Section
  hero: {
    eyebrow: "Walimatul 'Urs",
    date: "Minggu, 12 Desember 2027",
    weddingDateISO: "2027-12-12T09:00:00",
  },

  // Data Mempelai
  couple: {
    sectionTitle: "Pasangan Mempelai",
    greeting: "Assalamu'alaikum Warahmatullahi Wabarakatuh\n\nDengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan acara pernikahan putra-putri kami:",
    groom: {
      name: "Raden Arjuna Pratama",
      shortName: "Arjuna",
      parents: "Putra dari Raden Wijaya dan Sri Lestari",
      instagram: "https://instagram.com/arjuna",
      instagramHandle: "arjuna",
      photo: "/clients/arjuna-srikandi/groom.jpg"
    },
    bride: {
      name: "Dewi Srikandi Maharani",
      shortName: "Srikandi",
      parents: "Putri dari Bima Maharana dan Dewi Sari",
      instagram: "https://instagram.com/tsrikandi",
      instagramHandle: "tsrikandi",
      photo: "/clients/arjuna-srikandi/bride.jpg"
    }
  },

  // Ayat / Kutipan Suci
  ayat: {
    text: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.",
    source: "QS. Ar-Rum: 21"
  },

  // Rangkaian Acara (Akad & Resepsi)
  events: [
    {
      title: "Akad Nikah",
      date: "Minggu, 12 Desember 2027",
      time: "09.00 - 11.00",
      timezone: "WIB",
      venue: "Pendopo Mempelai Wanita",
      address: "Jl. Malioboro No. 12, Yogyakarta",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jl.+Malioboro+No.+12,+Yogyakarta",
      embedMapUrl: ""
    },
    {
      title: "Resepsi",
      date: "Minggu, 12 Desember 2027",
      time: "12.00 - 15.00",
      timezone: "WIB",
      venue: "Joglo Convention Hall",
      address: "Jl. Solo No. 88, Yogyakarta",
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jl.+Solo+No.+88,+Yogyakarta",
      embedMapUrl: ""
    }
  ],

  // Perjalanan Cinta (Timeline Kisah Kasih)
  loveStory: [
    {
      year: "2021",
      date: "14 Februari 2021",
      title: "Pertemuan Pertama",
      description: "Berawal dari sebuah acara kebudayaan tradisional di Yogyakarta, takdir mempertemukan kami dalam satu tatap dan percakapan sederhana.",
      icon: "sparkles",
      photo: null
    },
    {
      year: "2023",
      date: "18 Juni 2023",
      title: "Mengikat Komitmen",
      description: "Setelah dua tahun saling mengenal dan menguatkan rasa, kami memantapkan hati untuk saling berjalan berdampingan menuju masa depan.",
      icon: "heart",
      photo: null
    },
    {
      year: "2026",
      date: "25 Oktober 2026",
      title: "Lamaran Sakral",
      description: "Di hadapan kedua keluarga besar tercinta, doa dan niat tulus berpadu dalam prosesi lamaran yang penuh kehangatan dan restu.",
      icon: "gem",
      photo: null
    },
    {
      year: "2027",
      date: "12 Desember 2027",
      title: "Menuju Hari Bahagia",
      description: "Langkah suci kami berlanjut menuju gerbang pernikahan yang abadi, memohon doa dan ridho Ilahi mengarungi mahligai rumah tangga.",
      icon: "wedding",
      photo: null
    }
  ],

  // Galeri Foto
  gallery: [
    {
      id: 1,
      src: "/clients/arjuna-srikandi/couple.jpg",
      alt: "Momen Bahagia Bersama",
      title: "Momen Bahagia Bersama",
      category: "Prewedding",
      aspectRatio: "3/4"
    },
    {
      id: 2,
      src: "/clients/arjuna-srikandi/groom.jpg",
      alt: "Raden Arjuna Pratama",
      title: "Raden Arjuna Pratama",
      category: "Mempelai Pria",
      aspectRatio: "1/1"
    },
    {
      id: 3,
      src: "/clients/arjuna-srikandi/bride.jpg",
      alt: "Dewi Srikandi Maharani",
      title: "Dewi Srikandi Maharani",
      category: "Mempelai Wanita",
      aspectRatio: "1/1"
    },
    {
      id: 4,
      src: "/clients/arjuna-srikandi/couple.jpg",
      alt: "Janji Suci Dalam Kalbu",
      title: "Janji Suci Dalam Kalbu",
      category: "Prewedding",
      aspectRatio: "3/4"
    },
    {
      id: 5,
      src: "/clients/arjuna-srikandi/groom.jpg",
      alt: "Senyum Penuh Makna",
      title: "Senyum Penuh Wibawa",
      category: "Mempelai Pria",
      aspectRatio: "1/1"
    },
    {
      id: 6,
      src: "/clients/arjuna-srikandi/bride.jpg",
      alt: "Bersanding Dalam Adat",
      title: "Anggun Berbalut Adat",
      category: "Mempelai Wanita",
      aspectRatio: "1/1"
    }
  ],

  // Hadiah & Amplop Digital
  gift: {
    title: "Tanda Kasih",
    description: "Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberikan kado secara digital atau fisik:",
    bankAccounts: [
      {
        bank: "BCA",
        number: "8735129840",
        holder: "Raden Arjuna Pratama"
      },
      {
        bank: "Mandiri",
        number: "1370018923456",
        holder: "Dewi Srikandi Maharani"
      }
    ],
    physicalAddress: {
      recipient: "Raden Arjuna & Dewi Srikandi",
      phone: "+62 812-3456-7890",
      address: "Jl. Kaliurang KM 7.5 No. 42, Sleman, D.I. Yogyakarta 55581",
      note: "Konfirmasi pengiriman kado fisik melalui WhatsApp mempelai"
    }
  },

  // Ucapan Penutup / Footer
  closing: {
    greeting: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",
    salutation: "Kami yang berbahagia",
    credit: "The Wedding of Arjuna & Srikandi • Minggu, 12 Desember 2027"
  },

  // Musik Latar
  music: {
    src: "/clients/arjuna-srikandi/song.mp3",
    title: "Gending Pengantin Tradisional"
  }
};
