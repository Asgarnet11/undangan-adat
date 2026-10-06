# Undangan Pernikahan Digital Tradisional (Template Berbasis Data)

Platform undangan pernikahan digital modern dan bernuansa adat tradisional mewah yang dirancang sebagai **template berbasis data (Data-Driven Template)**. Anda dapat menambahkan dan mengelola puluhan hingga ratusan klien tanpa perlu mengubah atau mengotak-atik kode komponen tampilan sama sekali.

---

## 📑 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Alur Kerja Cepat: Menambah Klien Baru](#-alur-kerja-cepat-menambah-klien-baru)
3. [Struktur Folder & Aset](#-struktur-folder--aset)
4. [Spesifikasi & Format Aset yang Disarankan](#-spesifikasi--format-aset-yang-disarankan)
5. [Referensi Lengkap Skema Konfigurasi](#-referensi-lengkap-skema-konfigurasi)
6. [Fitur Nama Tamu & Generator Link WhatsApp](#-fitur-nama-tamu--generator-link-whatsapp)
7. [Panduan Menjalankan, Build & Deploy](#-panduan-menjalankan-build--deploy)
8. [Arsitektur & Persiapan Masa Depan](#-arsitektur--persiapan-masa-depan)

---

## 🌟 Fitur Utama

- **100% Berbasis Konfigurasi Data**: Seluruh teks, tanggal, foto, rekening, musik, dan styling tema diatur murni dari satu file konfigurasi per klien (`src/data/clients/{slug}.js`).
- **Multi-Klien Dinamis**: Akses undangan klien melalui slug URL (misal `/arjuna-srikandi` atau `/rama-shinta`). Otomatis mendeteksi klien baru melalui Vite dynamic registry.
- **Halaman Root & 404 Elegan**: Halaman beranda `/` menyajikan landing direktori klien terdaftar, dan URL slug yang tidak ditemukan dialihkan ke halaman "Undangan Tidak Ditemukan" dengan desain elegan.
- **Generator Link Tamu & WhatsApp**: Fitur bawaan di `/generator` untuk memasukkan ratusan nama tamu, menghasilkan link terpersonalisasi, template pesan WhatsApp dinamis, salin satu per satu, salin semua, serta ekspor CSV.
- **Sanitasi XSS & URL Decoding Ketat**: Parameter `?to=Nama` disanitasi secara aman untuk mencegah script injection dan dibatasi maksimal 60 karakter dengan fallback anggun ke "Tamu Undangan".
- **Fleksibilitas Konten & Tampilan Adaptif**:
  - Section kosong otomatis disembunyikan beserta menu navigasinya di navbar & bottom app bar.
  - Jumlah acara fleksibel: 1 acara terpusat secara rapi di desktop, 2 atau lebih acara terbagi dalam grid seimbang.
  - Jumlah rekening 1 hingga N rekening (bank/e-wallet), opsi kado fisik, cerita cinta 0–N tahap, galeri foto 0–N gambar.
- **Tema CSS Variables**: Kustomisasi warna utama (hijau adat, biru navy, dsb.) dan font per klien langsung dari konfigurasi.
- **Validasi Runtime Ramah Pengembang**: Console log otomatis memberi peringatan jelas bila terdapat field wajib yang belum diisi.

---

## 🚀 Alur Kerja Cepat: Menambah Klien Baru

### 1. Jalankan Perintah Otomasi CLI
Gunakan skrip generator yang sudah disediakan:
```bash
npm run new-client -- nama-slug
```
*Contoh:*
```bash
npm run new-client -- raden-anindita
```

Perintah ini akan secara otomatis:
1. Membuat folder aset di `public/clients/raden-anindita/` beserta aset awal.
2. Menyalin file template ke `src/data/clients/raden-anindita.js`.
3. Mendaftarkan slug klien ke sistem auto-discovery registry.

### 2. Isi Data Klien
Buka file `src/data/clients/raden-anindita.js` dan sesuaikan informasi:
- Nama mempelai & orang tua
- Tanggal dan lokasi acara (Akad / Resepsi)
- Nomor rekening untuk amplop digital
- Ayat/kutipan dan cerita perjalanan cinta

### 3. Masukkan Foto & Musik Klien
Ganti file di folder `public/clients/raden-anindita/`:
- `groom.jpg` : Foto mempelai pria
- `bride.jpg` : Foto mempelai wanita
- `couple.jpg`: Foto berdua / sampul
- `song.mp3`  : Musik latar pilihan klien

### 4. Pratinjau Undangan
Buka di browser:
```
http://localhost:5173/raden-anindita
```
Buka generator link tamu untuk klien tersebut:
```
http://localhost:5173/generator?client=raden-anindita
```

---

## 📁 Struktur Folder & Aset

```text
├── public/
│   ├── assets/                     # Ornamen grafis global & latar belakang
│   └── clients/                    # ASET PER KLIEN
│       ├── template/               # Template aset default
│       ├── arjuna-srikandi/        # Folder aset klien Arjuna & Srikandi
│       │   ├── bride.jpg
│       │   ├── couple.jpg
│       │   ├── groom.jpg
│       │   └── song.mp3
│       └── [slug-klien]/           # Folder aset untuk tiap klien baru
├── scripts/
│   └── new-client.mjs              # Skrip otomasi pembuatan klien baru
├── src/
│   ├── components/                 # Komponen UI tampilan
│   │   ├── Cover.jsx
│   │   ├── Hero.jsx
│   │   ├── Couple.jsx
│   │   ├── Events.jsx
│   │   ├── Story.jsx
│   │   ├── Gallery.jsx
│   │   ├── Gift.jsx
│   │   ├── Navbar.jsx
│   │   ├── Landing.jsx             # Halaman portal root (/)
│   │   ├── NotFound.jsx            # Halaman 404 ramah pengguna
│   │   └── GuestLinkGenerator.jsx  # Alat generator link tamu & WA
│   ├── context/
│   │   └── ClientContext.jsx       # Context & hook useClient()
│   ├── data/
│   │   ├── clientRegistry.js       # Registry & auto-discovery klien
│   │   └── clients/                # KONFIGURASI DATA KLIEN
│   │       ├── client-template.js  # Template lengkap dengan dokumentasi
│   │       ├── arjuna-srikandi.js  # Klien Arjuna & Srikandi
│   │       └── [slug].js           # File konfigurasi tiap klien baru
│   ├── services/
│   │   └── clientDataService.js    # Data Access Layer terabstraksi
│   └── utils/
│       └── sanitizeGuest.js        # Utilitas sanitasi nama tamu & XSS guard
```

---

## 🎨 Spesifikasi & Format Aset yang Disarankan

Untuk performa muat halaman terbaik di ponsel pintar:

| Aset | Rekomendasi Format | Resolusi Disarankan | Ukuran Maksimal | Keterangan |
|---|---|---|---|---|
| **Foto Couple (Sampul & OG)** | JPG / WebP | 1200 x 800 px (Rasio 3:2 atau 16:9) | ≤ 300 KB | Digunakan untuk Cover, Hero, dan OpenGraph WhatsApp |
| **Foto Potret Mempelai** | JPG / WebP | 800 x 1000 px (Rasio 4:5) | ≤ 250 KB | Foto terpisah mempelai pria & wanita |
| **Galeri Foto** | JPG / WebP | 1080 x 1080 px atau 1200 x 800 px | ≤ 350 KB | Tampilan grid dan popup lightbox |
| **Musik Latar (.mp3)** | MP3 (128 kbps) | Audio Stereo / Mono | ≤ 3.5 MB | Kompresi bitrate 128 kbps agar cepat dimuat pada koneksi seluler |

---

## 📋 Referensi Lengkap Skema Konfigurasi

Setiap file di `src/data/clients/{slug}.js` mengekspor objek konfigurasi dengan struktur berikut:

```javascript
export const clientConfig = {
  // [WAJIB] Slug unik untuk URL (huruf kecil, tanda hubung)
  slug: "arjuna-srikandi",

  // [WAJIB] Metadata Halaman (SEO, Tab Browser, Preview WhatsApp)
  meta: {
    title: "The Wedding of Arjuna & Srikandi",
    description: "Undangan Pernikahan Raden Arjuna Pratama & Dewi Srikandi Maharani",
    ogImage: "/clients/arjuna-srikandi/couple.jpg",
    favicon: "/favicon.svg",
  },

  // [OPSIONAL] Kustomisasi Tema Visual Klien
  theme: {
    colorPrimary: "#0a3123",         // Warna utama (latar belakang dominan)
    colorPrimaryDark: "#052016",     // Warna gelap sekunder
    colorSecondary: "#d4af37",       // Warna emas ornamen & aksen
    colorSecondaryLight: "#f3e5ab",  // Warna emas muda/krem
    colorAccent: "#8b1e22",          // Warna aksen merah adat
  },

  // [WAJIB] Daftar Section yang Diaktifkan
  // Hilangkan dari array jika ingin menyembunyikan section tersebut
  activeSections: [
    "hero", "ayat", "couple", "events", "story", "gallery", "gift", "closing"
  ],

  // [WAJIB] Cover Depan
  cover: {
    subtitle: "The Wedding Of",
    title: "Arjuna & Srikandi",
    date: "Minggu, 12 Desember 2027",
    buttonText: "Buka Undangan",
  },

  // [WAJIB] Data Mempelai
  couple: {
    groom: {
      name: "Raden Arjuna Pratama, S.T.",
      shortName: "Arjuna",
      parents: "Putra pertama dari Bpk. Ir. H. Bambang Wijaya & Ibu Hj. Siti Rahayu",
      instagram: "arjunapratama",
      photo: "/clients/arjuna-srikandi/groom.jpg",
    },
    bride: {
      name: "Dewi Srikandi Maharani, S.Ds.",
      shortName: "Srikandi",
      parents: "Putri kedua dari Bpk. Drs. H. Suryo Broto & Ibu Hj. Endang Lestari",
      instagram: "srikandimaharani",
      photo: "/clients/arjuna-srikandi/bride.jpg",
    },
  },

  // [WAJIB] Jadwal Acara (1 sampai N acara)
  events: [
    {
      title: "Akad Nikah",
      date: "Minggu, 12 Desember 2027",
      time: "08.00 - 10.00",
      timezone: "WIB",
      locationName: "Masjid Agung Al-Falah",
      address: "Jl. Raya Darmo No. 100, Surabaya, Jawa Timur",
      mapUrl: "https://maps.google.com/?q=...",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    },
    {
      title: "Resepsi Pernikahan",
      date: "Minggu, 12 Desember 2027",
      time: "11.00 - 14.00",
      timezone: "WIB",
      locationName: "Grand Ballroom Hotel Majapahit",
      address: "Jl. Tunjungan No. 65, Surabaya, Jawa Timur",
      mapUrl: "https://maps.google.com/?q=...",
      mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
    }
  ],

  // [OPSIONAL] Cerita Perjalanan Cinta (0 sampai N tahapan)
  loveStory: [
    { year: "2018", title: "Pertemuan Pertama", story: "..." },
    { year: "2023", title: "Lamaran", story: "..." }
  ],

  // [OPSIONAL] Galeri Foto (0 sampai N foto)
  gallery: [
    {
      id: 1,
      title: "Romansa Taman",
      category: "Prewedding",
      thumbnail: "/clients/arjuna-srikandi/couple.jpg",
      full: "/clients/arjuna-srikandi/couple.jpg",
    }
  ],

  // [OPSIONAL] Amplop Digital & Hadiah Fisik
  gift: {
    bankAccounts: [
      {
        bank: "Bank Central Asia (BCA)",
        accountNumber: "8290123456",
        accountHolder: "Raden Arjuna Pratama",
      }
    ],
    physicalGift: {
      recipient: "Arjuna & Srikandi",
      address: "Jl. Dharmahusada Indah Barat No. 12, Mulyorejo, Surabaya 60115",
      phone: "+62 812-3456-7890",
      note: "Konfirmasi pengiriman kado dapat menghubungi nomor di atas."
    }
  },

  // [WAJIB] Musik Latar
  music: {
    src: "/clients/arjuna-srikandi/song.mp3",
    title: "Gending Sriwijaya & Sunda Harmoni",
    autoplay: true,
  }
};
```

---

## ✉ Fitur Nama Tamu & Generator Link WhatsApp

### Parameter URL Tamu
Format URL untuk tamu undangan:
```text
https://undangan-anda.com/{slug}?to=Bapak+Ahmad+Dahlan
```
- Sistem secara otomatis men-decode spasi, tanda tambah, serta karakter khusus.
- **Sanitasi XSS Aktif**: Karakter tag HTML berbahaya disanitasi secara otomatis.
- **Batas Karakter**: Nama tamu dibatasi maksimal 60 karakter untuk mencegah layout rusak.
- **Fallback**: Jika parameter `?to=` tidak ada atau kosong, tampilan otomatis memakai `"Tamu Undangan"`.

### Alat Generator Link Bawaan
Akses menu generator melalui URL:
```text
http://localhost:5173/generator?client=arjuna-srikandi
```
Fitur yang tersedia:
1. **Pilihan Klien**: Dropdown untuk berganti klien secara instan.
2. **Input Massal**: Masukkan daftar nama tamu (satu nama per baris).
3. **Editor Template WhatsApp**: Kostumisasi pesan undangan dengan variabel dinamis:
   - `{nama}` : Nama tamu terformat rapi.
   - `{mempelai}` : Nama panggilan kedua mempelai.
   - `{link}` : Tautan langsung ke undangan tamu tersebut.
4. **Kirim Cepat**: Tombol *Kirim WhatsApp* membuka chat WhatsApp resmi tamu.
5. **Aksi Massal**: Tombol *Salin Semua Pesan* dan *Unduh CSV* untuk arsip panitia.

---

## 🛠 Panduan Menjalankan, Build & Deploy

### Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Akses di browser:
- Direktori Klien: `http://localhost:5173/`
- Klien Arjuna: `http://localhost:5173/arjuna-srikandi`
- Generator Link: `http://localhost:5173/generator?client=arjuna-srikandi`

### Melakukan Build Produksi
```bash
npm run build
```
Hasil build bundel HTML, JS, dan CSS yang teroptimasi akan berada di folder `/dist`.

### Menjalankan Pratinjau Build Lokal
```bash
npm run preview
```

### Panduan Deploy

#### 1. Vercel
Tambahkan file konfigurasi `vercel.json` di root jika menggunakan rewrite SPA:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
Lalu jalankan `vercel` atau sambungkan repositori Git di dashboard Vercel.

#### 2. Netlify
Buat file `public/_redirects` dengan konten:
```text
/*    /index.html   200
```
Lalu build menggunakan pengaturan standar:
- Build command: `npm run build`
- Publish directory: `dist`

#### 3. Cloudflare Pages
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`

---

## 🔮 Arsitektur & Persiapan Masa Depan

Seluruh pengambilan data telah diisolasi melalui **Data Access Layer** di [`src/services/clientDataService.js`](file:///home/serv/Projects/development/undangan-adat/src/services/clientDataService.js).

Komponen UI tidak berinteraksi langsung dengan filesystem, melainkan mengonsumsi data melalui antarmuka:
- `getClientData(slug)`
- `fetchClientData(slug)` (Async-ready)
- `resolveCurrentRoute()`

Ketika di masa depan sistem ingin dihubungkan ke **REST API, Supabase, Strapi, ataupun Headless CMS**, Anda hanya perlu memperbarui isi fungsi di `clientDataService.js` tanpa menyentuh satupun baris kode di komponen visual.
