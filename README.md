# Undangan Pernikahan Digital Tradisional (Template Berbasis Data)

Platform undangan pernikahan digital modern dan bernuansa adat tradisional mewah yang dirancang sebagai **template berbasis data (Data-Driven Multi-Client Template)**. Anda dapat menambahkan dan mengelola puluhan hingga ratusan klien tanpa perlu mengubah atau mengotak-atik kode komponen tampilan sama sekali.

---

## 📑 Daftar Isi
1. [Fitur Utama](#-fitur-utama)
2. [Keamanan & Privasi Produksi](#-keamanan--privasi-produksi)
3. [Alur Kerja Cepat: Menambah Klien Baru](#-alur-kerja-cepat-menambah-klien-baru)
4. [Sistem Token Admin & Distribusi Generator ke Klien](#-sistem-token-admin--distribusi-generator-ke-klien)
5. [Standar Format Tanggal ISO](#-standar-format-tanggal-iso)
6. [Struktur Folder & Aset](#-struktur-folder--aset)
7. [Spesifikasi & Format Aset yang Disarankan](#-spesifikasi--format-aset-yang-disarankan)
8. [Referensi Lengkap Skema Konfigurasi](#-referensi-lengkap-skema-konfigurasi)
9. [Fitur Nama Tamu (?to=Nama)](#-fitur-nama-tamu-tonama)
10. [Panduan Menjalankan, Build & Deploy](#-panduan-menjalankan-build--deploy)
11. [Arsitektur & Persiapan Masa Depan](#-arsitektur--persiapan-masa-depan)

---

## 🌟 Fitur Utama

- **100% Berbasis Konfigurasi Data**: Seluruh teks, tanggal, foto, rekening, musik, dan styling tema diatur murni dari satu file konfigurasi per klien (`src/data/clients/{slug}.js`).
- **Multi-Klien Dinamis dengan Code-Splitting**: Akses undangan klien melalui slug URL (contoh: `/arjuna-srikandi` atau `/rama-shinta`). Konfigurasi tiap klien dipisah menjadi chunk terisolasi (lazy-loaded).
- **Halaman Root Aman (Dev vs Production)**:
  - **Mode Dev** (`import.meta.env.DEV`): Menampilkan direktori seluruh klien aktif untuk mempermudah pengerjaan.
  - **Mode Produksi**: Menampilkan **Landing Netral Brand** (nama brand + tombol kontak WhatsApp konsultasi) tanpa menampilkan daftar klien, serta dipasangi `noindex`.
- **Generator Link Tamu Terproteksi Token**: Halaman generator per klien dilindungi token rahasia `adminKey` (`/{slug}/generator?key=TOKEN`). Tanpa token, akses otomatis ditolak.
- **Sanitasi XSS & URL Decoding Ketat**: Parameter `?to=Nama` disanitasi secara aman untuk mencegah script injection dan dibatasi maksimal 60 karakter dengan fallback aman ke "Tamu Undangan".
- **Format Tanggal ISO Seragam**: Seluruh tanggal disimpan sebagai ISO (`YYYY-MM-DD`) dan diformat secara otomatis dalam Bahasa Indonesia melalui satu fungsi terpusat `formatTanggal()`.
- **Slug Bersih & Monospace**: Seluruh penulisan slug ditampilkan dalam huruf kecil dan font monospace tanpa transformasi uppercase.
- **Fleksibilitas Konten & Tampilan Adaptif**:
  - Section kosong otomatis disembunyikan beserta menu navigasinya di navbar & bottom app bar.
  - Jumlah acara fleksibel: 1 acara terpusat rapi di desktop, 2 atau lebih acara terbagi dalam grid seimbang.
  - Jumlah rekening 1 hingga N rekening, opsi kado fisik, cerita cinta 0–N tahap, galeri foto 0–N gambar.
- **Tema CSS Variables**: Kustomisasi warna utama dan font per klien langsung dari konfigurasi.
- **Validasi Runtime Ramah Pengembang**: Console log otomatis memberi peringatan jelas bila terdapat field wajib yang belum diisi.

---

## 🔒 Keamanan & Privasi Produksi

Sebelum melakukan deploy ke produksi, sistem telah menerapkan standar keamanan berikut:

1. **Isolasi Data Klien (Lazy-Loading Chunk)**:
   Konfigurasi klien dimuat secara asinkron menggunakan Vite dynamic import (`() => import('./clients/{slug}.js')`). Ketika pengunjung membuka `/arjuna-srikandi`, peramban hanya mengunduh chunk JavaScript milik klien tersebut. Data klien lain (nomor rekening, nama mempelai, token admin) **tidak ikut ter-bundle** dan **tidak bisa diintip lewat browser DevTools**.
2. **Halaman Root Netral di Produksi**:
   Di lingkungan produksi (`!import.meta.env.DEV`), pengunjung yang membuka domain utama (`/`) akan melihat landing page promosi jasa undangan pernikahan netral dan tombol WhatsApp admin. Daftar klien sama sekali tidak dirender.
3. **Noindex & Nofollow Otomatis**:
   Semua halaman generator (`/{slug}/generator`), halaman akses ditolak, dan landing produksi otomatis disuntik tag `<meta name="robots" content="noindex, nofollow" />` agar tidak terindeks oleh Google atau mesin pencari lainnya.

---

## 🚀 Alur Kerja Cepat: Menambah Klien Baru

### 1. Jalankan Perintah Otomasi CLI
```bash
npm run new-client -- nama-slug
```
*Contoh:*
```bash
npm run new-client -- raden-anindita
```

Perintah ini akan secara otomatis:
1. Membuat folder aset di `public/clients/raden-anindita/` beserta aset awal.
2. Membuat token acak kriptografis 32 karakter untuk field `adminKey`.
3. Menyalin template konfigurasi ke `src/data/clients/raden-anindita.js`.
4. Menampilkan tautan undangan dan tautan generator link tamu terlindungi di terminal.

### 2. Isi Data Klien
Buka file `src/data/clients/raden-anindita.js` dan sesuaikan informasi:
- Nama mempelai & orang tua
- Tanggal acara format ISO (`"YYYY-MM-DD"`, misal `"2027-10-24"`)
- Nomor rekening untuk amplop digital
- Ayat/kutipan dan cerita perjalanan cinta

### 3. Masukkan Foto & Musik Klien
Ganti file di folder `public/clients/raden-anindita/`:
- `groom.jpg` : Foto mempelai pria
- `bride.jpg` : Foto mempelai wanita
- `couple.jpg`: Foto berdua / sampul
- `song.mp3`  : Musik latar pilihan klien

---

## 🔑 Sistem Token Admin & Distribusi Generator ke Klien

Setiap klien memiliki token rahasia unik (`adminKey`) minimal 16 karakter acak yang disimpan di file konfigurasinya:

```javascript
// src/data/clients/arjuna-srikandi.js
export const arjunaSrikandiConfig = {
  slug: "arjuna-srikandi",
  adminKey: "arj-sri-secret-token-2027-x9k2",
  ...
};
```

### Cara Membagikan Tautan Generator ke Klien
Kirimkan tautan khusus berikut **hanya kepada mempelai/panitia**:
```text
https://domain-anda.com/arjuna-srikandi/generator?key=arj-sri-secret-token-2027-x9k2
```

### Mekanisme Perlindungan:
- **Dengan Token Valid**: Klien dapat memasukkan daftar nama tamu, memilih pesan WhatsApp, menyalin tautan, dan mengekspor CSV. Halaman ini **hanya mengelola data klien yang bersangkutan** dan tidak memuat daftar klien lain.
- **Tanpa Token / Token Salah**: Pengunjung akan langsung diarahkan ke halaman **"Akses Ditolak"** dengan petunjuk untuk menggunakan tautan resmi yang memiliki parameter `?key=TOKEN`.

---

## 📅 Standar Format Tanggal ISO

Untuk menghindari kerancuan format dan timezone, seluruh tanggal di konfigurasi klien **wajib disimpan dalam format ISO (`YYYY-MM-DD`)**:

```javascript
// CONTOH DI FILE KONFIGURASI:
hero: {
  date: "2027-12-12", // Format ISO
},
events: [
  {
    title: "Akad Nikah",
    date: "2027-12-12", // Format ISO
    time: "09.00 - 11.00",
    timezone: "WIB",
  }
],
loveStory: [
  {
    year: "2021",
    date: "2021-02-14", // Format ISO
    title: "Pertemuan Pertama",
  }
]
```

Komponen tampilan otomatis memanggil fungsi utilitas [`formatTanggal()`](file:///home/serv/Projects/development/undangan-adat/src/utils/dateFormatter.js):
- `formatTanggal("2027-12-12")` &rarr; `"Minggu, 12 Desember 2027"`
- `formatTanggal("2027-12-12", { withDay: false })` &rarr; `"12 Desember 2027"`
- `formatTanggal("2027-12-12", { format: 'dotted' })` &rarr; `"12 . 12 . 2027"`

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
│       └── [slug-klien]/           # Folder aset klien baru
├── scripts/
│   ├── new-client.mjs              # Skrip otomasi pembuatan klien baru (dengan token)
│   └── test-verification.mjs       # Skrip pengujian otomatis integrasi & sanitasi
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
│   │   ├── Landing.jsx             # Portal pengembang (aktif hanya saat DEV)
│   │   ├── ProductionLanding.jsx   # Landing netral brand (aktif di PRODUKSI)
│   │   ├── AccessDenied.jsx        # Halaman proteksi token generator
│   │   ├── NotFound.jsx            # Halaman 404 ramah pengguna
│   │   └── GuestLinkGenerator.jsx  # Generator link tamu & WA terlindungi token
│   ├── context/
│   │   └── ClientContext.jsx       # Context & hook useClient()
│   ├── data/
│   │   ├── clientRegistry.js       # Dynamic lazy-loader & validator klien
│   │   └── clients/                # File konfigurasi tiap klien
│   │       ├── client-template.js
│   │       ├── arjuna-srikandi.js
│   │       └── rama-shinta.js
│   ├── services/
│   │   └── clientDataService.js    # Data Access Layer terabstraksi
│   └── utils/
│       ├── dateFormatter.js        # Utilitas format tanggal ISO ke Bahasa Indonesia
│       ├── sanitizeGuest.js        # Utilitas sanitasi nama tamu & XSS guard
│       └── seo.js                  # Utilitas meta robots (noindex, nofollow)
```

---

## 🎨 Spesifikasi & Format Aset yang Disarankan

| Aset | Rekomendasi Format | Resolusi Disarankan | Ukuran Maksimal | Keterangan |
|---|---|---|---|---|
| **Foto Couple (Sampul & OG)** | JPG / WebP | 1200 x 800 px (Rasio 3:2 atau 16:9) | ≤ 300 KB | Digunakan untuk Cover, Hero, dan OpenGraph WhatsApp |
| **Foto Potret Mempelai** | JPG / WebP | 800 x 1000 px (Rasio 4:5) | ≤ 250 KB | Foto terpisah mempelai pria & wanita |
| **Galeri Foto** | JPG / WebP | 1080 x 1080 px atau 1200 x 800 px | ≤ 350 KB | Tampilan grid dan popup lightbox |
| **Musik Latar (.mp3)** | MP3 (128 kbps) | Audio Stereo / Mono | ≤ 3.5 MB | Kompresi bitrate 128 kbps agar cepat dimuat pada seluler |

---

## ✉ Fitur Nama Tamu (?to=Nama)

Format URL untuk tamu undangan:
```text
https://domain-anda.com/arjuna-srikandi?to=Bapak+Ahmad+Dahlan
```
- Sistem secara otomatis men-decode spasi, tanda tambah, serta karakter khusus.
- **Sanitasi XSS Aktif**: Tag script dan entitas HTML berbahaya disanitasi otomatis.
- **Batas Karakter**: Nama tamu dibatasi maksimal 60 karakter untuk mencegah layout rusak.
- **Fallback**: Jika parameter `?to=` tidak ada atau kosong, tampilan otomatis menggunakan `"Tamu Undangan"`.

---

## 🛠 Panduan Menjalankan, Build & Deploy

### Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```
Akses di browser:
- Portal Dev: `http://localhost:5173/`
- Undangan Klien: `http://localhost:5173/arjuna-srikandi`
- Generator Tamu: `http://localhost:5173/arjuna-srikandi/generator?key=arj-sri-secret-token-2027-x9k2`

### Menjalankan Uji Otomatis
```bash
npm test
```

### Melakukan Build Produksi
```bash
npm run build
```
Hasil build bundel HTML, JS, dan CSS yang teroptimasi dengan chunk terisolasi per klien akan berada di folder `/dist`.

### Menjalankan Pratinjau Build Lokal
```bash
npm run preview
```

### Panduan Deploy ke Vercel

Proyek ini telah dikonfigurasi penuh dan siap dideploy langsung ke **Vercel** dengan arsitektur SPA performa tinggi, caching optimal, pre-rendered Open Graph per slug, serta header keamanan terintegrasi di [`vercel.json`](file:///home/serv/Projects/development/undangan-adat/vercel.json).

#### 1. Ringkasan Langkah Deploy
1. **Push Proyek ke Git Repository**:
   Pastikan seluruh perubahan terkini sudah di-commit dan di-push ke GitHub, GitLab, atau Bitbucket Anda.
   ```bash
   git add .
   git commit -m "feat: siapkan konfigurasi deploy Vercel dan pre-render OG"
   git push origin main
   ```
2. **Buka Vercel Dashboard**:
   - Masuk ke [vercel.com](https://vercel.com/) dan klik tombol **"Add New..." > "Project"**.
   - Pilih repository Git proyek undangan ini lalu klik **"Import"**.
3. **Konfigurasi Project Settings**:
   - **Framework Preset**: Pilih `Vite` (Vercel biasanya mendeteksi secara otomatis).
   - **Root Directory**: `./` (biarkan default).
   - **Build Command**: `npm run build` (menjalankan vite build dan pre-rendering Open Graph otomatis).
   - **Output Directory**: `dist`.
4. **Isi Environment Variables**:
   Buka accordion **Environment Variables** sebelum menekan tombol Deploy, lalu tambahkan variabel yang dibutuhkan (lihat daftar checklist di bawah).
5. **Deploy**:
   Klik tombol **"Deploy"**. Vercel akan menjalankan build dalam hitungan detik.

---

### 📋 Checklist Hal yang Harus Dilakukan Manual di Dashboard Vercel

Berikut daftar pengaturan yang perlu Anda periksa dan isi secara manual di Dashboard Vercel:

| No | Pengaturan di Vercel | Lokasi Menu | Nilai / Tindakan | Deskripsi |
|:---|:---|:---|:---|:---|
| 1 | **Framework Preset** | *Project Settings > General* | `Vite` | Memastikan runtime build Vite dikenali secara tepat. |
| 2 | **Build Command** | *Project Settings > General* | `npm run build` | Menjalankan build bundle sekaligus script `prerender.mjs` untuk Open Graph klien. |
| 3 | **Output Directory** | *Project Settings > General* | `dist` | Folder output statis hasil kompilasi. |
| 4 | **VITE_APP_URL** | *Settings > Environment Variables* | `https://nama-proyek.vercel.app` (atau domain kustom Anda) | **Sangat Disarankan**: Dibutuhkan agar meta tag `og:image` dan `og:url` terisi URL absolut lengkap sehingga kartu pratinjau muncul sempurna saat link dibagikan di WhatsApp, Telegram, Twitter, dan Facebook. |
| 5 | **VITE_BRAND_NAME** | *Settings > Environment Variables* | `"Kalyana Undangan Adat"` | Nama bisnis/brand Anda yang ditampilkan di landing page netral root (`/`) pada mode produksi. |
| 6 | **VITE_WHATSAPP_NUMBER** | *Settings > Environment Variables* | `6281234567890` (tanpa tanda `+`) | Nomor WhatsApp customer service/admin yang dituju ketika tombol "Konsultasi Pembuatan Undangan" pada root ditekan. |
| 7 | **Custom Domain** *(Opsional)* | *Settings > Domains* | Misal: `undangan.namabrand.com` | Masukkan domain Anda sendiri dan ikuti instruksi DNS CNAME/A record dari Vercel. |

---

#### 2. Konfigurasi `vercel.json` yang Diterapkan
File [`vercel.json`](file:///home/serv/Projects/development/undangan-adat/vercel.json) telah dilengkapi konfigurasi tingkat produksi:
- **SPA Rewrites**: Meroute seluruh path non-file (`/(.*)`) ke `/index.html` dengan tetap memprioritaskan file statis yang ada di disk.
- **Cache-Control Aset**:
  - `/assets/*` dan file biner/media diberi header `public, max-age=31536000, immutable` (cache 1 tahun di CDN & browser).
  - `/index.html` dan file `.html` diberi header `no-cache, no-store, must-revalidate` agar update kode selalu langsung diterima pengguna tanpa masalah stale cache.
- **Header Keamanan**:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: SAMEORIGIN`
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`

#### 3. Pre-Render Open Graph & Noindex Otomatis
Setiap kali `npm run build` dijalankan (termasuk saat Vercel melakukan build otomatis via git push):
- Menghasilkan file statis `dist/{slug}/index.html` dan `dist/{slug}.html` yang sudah disuntik tag Open Graph dan Twitter Cards spesifik tiap klien (judul, deskripsi, foto sampul, URL). Crawler WhatsApp/Facebook yang tidak menjalankan JavaScript dapat langsung membaca thumbnail pratinjau secara instan.
- Menghasilkan `dist/{slug}/generator/index.html` yang disuntik `<meta name="robots" content="noindex, nofollow" />` sehingga generator terlindung dari pencarian mesin pencari.
- Menghasilkan `dist/index.html` netral dengan tag `<meta name="robots" content="noindex, nofollow" />` untuk menjaga privasi platform.

---

## 🔮 Arsitektur & Persiapan Masa Depan

Seluruh pengambilan data diisolasi melalui **Data Access Layer** di [`src/services/clientDataService.js`](file:///home/serv/Projects/development/undangan-adat/src/services/clientDataService.js).

Komponen UI tidak membaca file secara langsung, melainkan mengonsumsi data melalui antarmuka:
- `fetchClientData(slug)` (Lazy-loaded async chunk)
- `getClientData(slug)`
- `resolveCurrentRoute()`

Ketika di masa depan sistem ingin dialihkan ke **Headless CMS, Supabase, Strapi, ataupun REST API**, Anda hanya perlu mengganti logika di `clientDataService.js` tanpa mengubah satu baris pun komponen tampilan visual.
