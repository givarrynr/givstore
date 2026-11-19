/* ═══════════════════════════════════════════════════════
   GIVSTORE — Main JavaScript
   Fitur: Routing, Produk, Filter, Pencarian, Keranjang,
          Checkout, LocalStorage
═══════════════════════════════════════════════════════ */

'use strict';

/* ── 1. DATA PRODUK ─────────────────────────────────────── */
/*
 * CATATAN: Semua harga di bawah adalah HARGA SIMULASI untuk
 * keperluan demonstrasi website. Harga aktual dapat berbeda.
 * Hubungi GIVSTORE untuk harga resmi terkini.
 *
 * Gambar produk: GSMArena (fdn2.gsmarena.com) — semua URL telah diverifikasi 200 OK.
 * Fallback: model terdekat digunakan untuk varian yang tidak memiliki URL terpisah.
 */

/* ── PETA GAMBAR PRODUK ──────────────────────────────────
 * Key  = nama model (product.name), value = URL gambar.
 * Varian storage berbeda satu model berbagi satu gambar.
 * iPhone 17 Air belum tersedia di GSMArena → pakai iPhone 17.
 * iPhone 15 Plus → pakai iPhone 15. 14 Pro Max → 14 Pro.
 * iPhone 11 Pro Max → 11 Pro.
 */
const PRODUCT_IMAGES = {
  /* ── iPhone 17 ── */
  'iPhone 17e':       'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17e.jpg',
  'iPhone 17':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17.jpg',
  'iPhone 17 Air':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17.jpg',
  'iPhone 17 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro.jpg',
  'iPhone 17 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-17-pro-max.jpg',
  /* ── iPhone 16 ── */
  'iPhone 16':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16.jpg',
  'iPhone 16 Plus':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-plus.jpg',
  'iPhone 16 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro.jpg',
  'iPhone 16 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-16-pro-max.jpg',
  /* ── iPhone 15 ── */
  'iPhone 15':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg',
  'iPhone 15 Plus':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15.jpg',
  'iPhone 15 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro.jpg',
  'iPhone 15 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-15-pro-max.jpg',
  /* ── iPhone 14 ── */
  'iPhone 14':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14.jpg',
  'iPhone 14 Plus':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-plus.jpg',
  'iPhone 14 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg',
  'iPhone 14 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-14-pro.jpg',
  /* ── iPhone 13 ── */
  'iPhone 13 mini':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg',
  'iPhone 13':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13.jpg',
  'iPhone 13 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro.jpg',
  'iPhone 13 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg',
  /* ── iPhone 12 ── */
  'iPhone 12 mini':   'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-mini.jpg',
  'iPhone 12':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg',
  'iPhone 12 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro.jpg',
  'iPhone 12 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12-pro-max.jpg',
  /* ── iPhone 11 ── */
  'iPhone 11':        'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11.jpg',
  'iPhone 11 Pro':    'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',
  'iPhone 11 Pro Max':'https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-11-pro.jpg',
};

/** Ambil URL gambar produk, fallback ke SVG placeholder jika tidak ada */
function getProductImage(name) {
  return PRODUCT_IMAGES[name] || null;
}

const PRODUCTS = [

  /* ════════════════════════════════════════
     iPhone 17 Series  (harga simulasi 2025)
  ════════════════════════════════════════ */
  {
    id: 'ip17e-128',
    name: 'iPhone 17e',
    series: 'iPhone 17',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Black', hex: '#2C2C2C' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
    ],
    price: 10999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 17e adalah model entry-level seri 17 yang menghadirkan chip A18 dan kamera 48 MP dengan harga yang lebih terjangkau. Desain ramping, layar 6,1 inci Super Retina XDR.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A18',
      'Kamera Utama': '48 MP Fusion',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17e-256',
    name: 'iPhone 17e',
    series: 'iPhone 17',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black', hex: '#2C2C2C' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
    ],
    price: 12999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 17e 256 GB — semua keunggulan iPhone 17e dengan kapasitas yang lebih lapang untuk foto dan aplikasi.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A18',
      'Kamera Utama': '48 MP Fusion',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17-128',
    name: 'iPhone 17',
    series: 'iPhone 17',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Ultramarine', hex: '#4169E1' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 15999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: true,
    desc: 'iPhone 17 standar hadir dengan chip A19, kamera utama 48 MP yang ditingkatkan, dan Dynamic Island. Desain aluminium ramping dengan layar Super Retina XDR 6,1 inci.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A19',
      'Kamera Utama': '48 MP Fusion + 12 MP Ultrawide',
      'Kamera Selfie': '24 MP TrueDepth',
      'Baterai': 'hingga 24 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17-256',
    name: 'iPhone 17',
    series: 'iPhone 17',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Ultramarine', hex: '#4169E1' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 17999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 17 256 GB — kapasitas lebih besar untuk semua koleksi fotomu dengan chip A19 generasi terbaru.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A19',
      'Kamera Utama': '48 MP Fusion + 12 MP Ultrawide',
      'Kamera Selfie': '24 MP TrueDepth',
      'Baterai': 'hingga 24 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17air-128',
    name: 'iPhone 17 Air',
    series: 'iPhone 17',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Rose', hex: '#D4766A' },
    ],
    price: 19999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: true,
    desc: 'iPhone 17 Air adalah model tertipis yang pernah dibuat Apple, dengan ketebalan hanya 5,5 mm. Chip A19, layar 6,6 inci, dan bodi aluminium premium untuk pengalaman premium yang ringan.',
    specs: {
      'Layar': '6,6" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19',
      'Kamera Utama': '48 MP Fusion',
      'Kamera Selfie': '24 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Ketebalan': '5,5 mm (tertipis di kelasnya)',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17air-256',
    name: 'iPhone 17 Air',
    series: 'iPhone 17',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Sky Blue', hex: '#87CEEB' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Rose', hex: '#D4766A' },
    ],
    price: 21999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 17 Air 256 GB — desain paling tipis Apple dengan kapasitas nyaman untuk semua kegiatanmu.',
    specs: {
      'Layar': '6,6" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19',
      'Kamera Utama': '48 MP Fusion',
      'Kamera Selfie': '24 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Ketebalan': '5,5 mm (tertipis di kelasnya)',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17pro-256',
    name: 'iPhone 17 Pro',
    series: 'iPhone 17 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 23999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📲',
    featured: true,
    desc: 'iPhone 17 Pro dengan chip A19 Pro, sistem kamera Pro triple 48 MP, layar ProMotion 120Hz berukuran 6,3 inci, dan bodi titanium Grade 5. Kamera Video 8K untuk kreator profesional.',
    specs: {
      'Layar': '6,3" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '24 MP TrueDepth',
      'Video': '8K ProRes Video',
      'Baterai': 'hingga 29 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17pro-512',
    name: 'iPhone 17 Pro',
    series: 'iPhone 17 Pro',
    storage: '512 GB',
    storageGB: 512,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 27999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 17 Pro 512 GB — kapasitas besar untuk kreator video 8K dan fotografer profesional.',
    specs: {
      'Layar': '6,3" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '24 MP TrueDepth',
      'Video': '8K ProRes Video',
      'Baterai': 'hingga 29 jam video',
      'Penyimpanan': '512 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17promax-256',
    name: 'iPhone 17 Pro Max',
    series: 'iPhone 17 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 27999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📲',
    featured: true,
    desc: 'iPhone 17 Pro Max dengan layar 6,9 inci dan baterai terlama yang pernah ada pada iPhone. Chip A19 Pro, kamera Pro triple, dan video 8K ProRes.',
    specs: {
      'Layar': '6,9" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '24 MP TrueDepth',
      'Video': '8K ProRes Video',
      'Baterai': 'hingga 35 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip17promax-512',
    name: 'iPhone 17 Pro Max',
    series: 'iPhone 17 Pro',
    storage: '512 GB',
    storageGB: 512,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 31999000,
    originalPrice: null,
    badge: 'new',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 17 Pro Max 512 GB — flagship tertinggi untuk performa tanpa kompromi dan kapasitas produksi konten yang masif.',
    specs: {
      'Layar': '6,9" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A19 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '24 MP TrueDepth',
      'Video': '8K ProRes Video',
      'Baterai': 'hingga 35 jam video',
      'Penyimpanan': '512 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },

  /* ════════════════════════════════════════
     iPhone 16 Series
  ════════════════════════════════════════ */
  {
    id: 'ip16-128',
    name: 'iPhone 16',
    series: 'iPhone 16',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Ultramarine', hex: '#4169E1' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 14499000,
    originalPrice: null,
    badge: null,
    emoji: '📱',
    featured: true,
    desc: 'iPhone 16 hadir dengan chip A18, kamera 48 MP Fusion generasi terbaru, dan tombol kamera eksklusif. Desain yang lebih tipis dan ringan dengan layar Super Retina XDR 6,1 inci.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A18',
      'Kamera Utama': '48 MP Fusion + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16-256',
    name: 'iPhone 16',
    series: 'iPhone 16',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Ultramarine', hex: '#4169E1' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 16499000,
    originalPrice: null,
    badge: null,
    emoji: '📱',
    featured: false,
    desc: 'iPhone 16 256 GB dengan chip A18, kamera 48 MP Fusion, dan tombol kamera eksklusif. Kapasitas nyaman untuk semua kebutuhan sehari-hari.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A18',
      'Kamera Utama': '48 MP Fusion + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16plus-256',
    name: 'iPhone 16 Plus',
    series: 'iPhone 16',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Ultramarine', hex: '#4169E1' },
      { name: 'Teal', hex: '#008080' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 18499000,
    originalPrice: null,
    badge: null,
    emoji: '📱',
    featured: false,
    desc: 'iPhone 16 Plus dengan layar 6,7 inci untuk pengalaman menonton dan gaming yang lebih luas. Baterai tahan hingga 27 jam.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED',
      'Chip': 'Apple A18',
      'Kamera Utama': '48 MP Fusion + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 27 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16pro-256',
    name: 'iPhone 16 Pro',
    series: 'iPhone 16 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 21999000,
    originalPrice: null,
    badge: 'hot',
    emoji: '📲',
    featured: true,
    desc: 'iPhone 16 Pro dengan chip A18 Pro, sistem kamera Pro 48 MP triple, dan layar ProMotion 120Hz berukuran 6,3 inci. Dibuat dari titanium Grade 5.',
    specs: {
      'Layar': '6,3" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A18 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 27 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16pro-512',
    name: 'iPhone 16 Pro',
    series: 'iPhone 16 Pro',
    storage: '512 GB',
    storageGB: 512,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 25999000,
    originalPrice: null,
    badge: null,
    emoji: '📲',
    featured: false,
    desc: 'iPhone 16 Pro 512 GB — kapasitas besar untuk kreator konten profesional dengan chip A18 Pro.',
    specs: {
      'Layar': '6,3" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A18 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 27 jam video',
      'Penyimpanan': '512 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16promax-256',
    name: 'iPhone 16 Pro Max',
    series: 'iPhone 16 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 24999000,
    originalPrice: null,
    badge: 'hot',
    emoji: '📲',
    featured: true,
    desc: 'iPhone 16 Pro Max dengan layar 6,9 inci terbesar yang pernah ada di serinya. Baterai tahan hingga 33 jam dan sistem kamera yang paling canggih.',
    specs: {
      'Layar': '6,9" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A18 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 33 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },
  {
    id: 'ip16promax-512',
    name: 'iPhone 16 Pro Max',
    series: 'iPhone 16 Pro',
    storage: '512 GB',
    storageGB: 512,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
      { name: 'Desert Titanium', hex: '#C8A97A' },
    ],
    price: 28999000,
    originalPrice: null,
    badge: null,
    emoji: '📲',
    featured: false,
    desc: 'iPhone 16 Pro Max 512 GB — flagship seri 16 untuk performa tanpa kompromi.',
    specs: {
      'Layar': '6,9" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A18 Pro',
      'Kamera Utama': '48 MP Fusion + 48 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 33 jam video',
      'Penyimpanan': '512 GB',
      'Konektivitas': '5G, Wi-Fi 7, Bluetooth 5.3, Thread',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 18',
    },
  },

  /* ════════════════════════════════════════
     iPhone 15 Series
  ════════════════════════════════════════ */
  {
    id: 'ip15-128',
    name: 'iPhone 15',
    series: 'iPhone 15',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Yellow', hex: '#F5D062' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 12499000,
    originalPrice: 13499000,
    badge: 'sale',
    emoji: '📱',
    featured: true,
    desc: 'iPhone 15 dengan chip A16 Bionic, Dynamic Island pertama di model standar, kamera 48 MP, dan port USB-C.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '128 GB',
      'Port': 'USB-C (USB 2.0)',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip15-256',
    name: 'iPhone 15',
    series: 'iPhone 15',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Yellow', hex: '#F5D062' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 14499000,
    originalPrice: 15499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 15 256 GB — lebih banyak ruang untuk foto, video, dan aplikasimu dengan Dynamic Island dan USB-C.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '256 GB',
      'Port': 'USB-C (USB 2.0)',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip15plus-256',
    name: 'iPhone 15 Plus',
    series: 'iPhone 15',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Yellow', hex: '#F5D062' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Black', hex: '#2C2C2C' },
    ],
    price: 16499000,
    originalPrice: 17499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 15 Plus dengan layar 6,7 inci dan baterai tahan lebih lama. Semua fitur iPhone 15 dalam ukuran yang lebih besar.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 26 jam video',
      'Penyimpanan': '256 GB',
      'Port': 'USB-C (USB 2.0)',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip15pro-128',
    name: 'iPhone 15 Pro',
    series: 'iPhone 15 Pro',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Blue Titanium', hex: '#5A7A9A' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
    ],
    price: 18999000,
    originalPrice: 20999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 15 Pro dengan chip A17 Pro, bodi titanium, Action Button, kamera telephoto 3x, dan port USB-C USB 3.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A17 Pro',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 23 jam video',
      'Penyimpanan': '128 GB',
      'Port': 'USB-C (USB 3)',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip15pro-256',
    name: 'iPhone 15 Pro',
    series: 'iPhone 15 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Blue Titanium', hex: '#5A7A9A' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
    ],
    price: 20999000,
    originalPrice: 22999000,
    badge: 'sale',
    emoji: '📲',
    featured: true,
    desc: 'iPhone 15 Pro 256 GB — performa Pro dengan kapasitas nyaman untuk semua kebutuhan kreatif.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A17 Pro',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 23 jam video',
      'Penyimpanan': '256 GB',
      'Port': 'USB-C (USB 3)',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip15promax-256',
    name: 'iPhone 15 Pro Max',
    series: 'iPhone 15 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Black Titanium', hex: '#3A3A3A' },
      { name: 'White Titanium', hex: '#E8E0D5' },
      { name: 'Blue Titanium', hex: '#5A7A9A' },
      { name: 'Natural Titanium', hex: '#C4B9A8' },
    ],
    price: 23999000,
    originalPrice: 25999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 15 Pro Max dengan layar 6,7 inci, kamera telephoto 5x, dan baterai hingga 29 jam. Flagship terbaik seri 15.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A17 Pro',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 5x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 29 jam video',
      'Penyimpanan': '256 GB',
      'Port': 'USB-C (USB 3)',
      'Bodi': 'Titanium Grade 5',
      'Sistem Operasi': 'iOS 17 (upgradeable ke iOS 18)',
    },
  },

  /* ════════════════════════════════════════
     iPhone 14 Series
  ════════════════════════════════════════ */
  {
    id: 'ip14-128',
    name: 'iPhone 14',
    series: 'iPhone 14',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Purple', hex: '#8A7EBD' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 10499000,
    originalPrice: 12499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 14 dengan chip A15 Bionic, Crash Detection, Emergency SOS via satellite, dan kamera utama 12 MP yang ditingkatkan.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth Autofocus',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip14-256',
    name: 'iPhone 14',
    series: 'iPhone 14',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Purple', hex: '#8A7EBD' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 12499000,
    originalPrice: 14499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 14 256 GB dengan semua keunggulan iPhone 14 dan kapasitas yang lebih lapang untuk foto dan video.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth Autofocus',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip14plus-128',
    name: 'iPhone 14 Plus',
    series: 'iPhone 14',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#5A88C0' },
      { name: 'Purple', hex: '#8A7EBD' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 12999000,
    originalPrice: 14999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 14 Plus dengan layar 6,7 inci dan baterai terlama yang pernah ada di iPhone non-Pro. Performa A15 Bionic dengan layar besar.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Main + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth Autofocus',
      'Baterai': 'hingga 26 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip14pro-128',
    name: 'iPhone 14 Pro',
    series: 'iPhone 14 Pro',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Space Black', hex: '#1C1C1E' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Deep Purple', hex: '#4B3D6E' },
    ],
    price: 16499000,
    originalPrice: 19499000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 14 Pro — generasi pertama dengan Dynamic Island dan layar Always-On. Kamera 48 MP dan chip A16 Bionic.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz Always-On',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 23 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip14pro-256',
    name: 'iPhone 14 Pro',
    series: 'iPhone 14 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Space Black', hex: '#1C1C1E' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Deep Purple', hex: '#4B3D6E' },
    ],
    price: 18999000,
    originalPrice: 21499000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 14 Pro 256 GB — Dynamic Island, Always-On, kamera 48 MP, dengan kapasitas yang lebih luas.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz Always-On',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 23 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },
  {
    id: 'ip14promax-256',
    name: 'iPhone 14 Pro Max',
    series: 'iPhone 14 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Space Black', hex: '#1C1C1E' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Deep Purple', hex: '#4B3D6E' },
    ],
    price: 20999000,
    originalPrice: 23999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 14 Pro Max dengan layar 6,7 inci, Dynamic Island, Always-On Display, dan baterai terlama di seri Pro Max saat itu.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED ProMotion 120Hz Always-On',
      'Chip': 'Apple A16 Bionic',
      'Kamera Utama': '48 MP Main + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 29 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.3',
      'Sistem Operasi': 'iOS 16 (upgradeable ke iOS 18)',
    },
  },

  /* ════════════════════════════════════════
     iPhone 13 Series
  ════════════════════════════════════════ */
  {
    id: 'ip13mini-128',
    name: 'iPhone 13 mini',
    series: 'iPhone 13',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 7499000,
    originalPrice: 9499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 13 mini — desain kompak 5,4 inci dengan chip A15 Bionic dan kamera ganda 12 MP. Pilihan terbaik bagi yang menyukai iPhone ukuran kecil.',
    specs: {
      'Layar': '5,4" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },
  {
    id: 'ip13-128',
    name: 'iPhone 13',
    series: 'iPhone 13',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 8999000,
    originalPrice: 11499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 13 dengan chip A15 Bionic, kamera ganda 12 MP dengan Cinematic mode, dan notch yang lebih kecil 20% dari pendahulunya.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 19 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },
  {
    id: 'ip13-256',
    name: 'iPhone 13',
    series: 'iPhone 13',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Midnight', hex: '#1C1C1E' },
      { name: 'Starlight', hex: '#E8E0D5' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Pink', hex: '#E8769E' },
      { name: 'Red', hex: '#C0634A' },
    ],
    price: 10499000,
    originalPrice: 12999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 13 256 GB dengan Cinematic mode dan A15 Bionic untuk pengalaman sehari-hari yang lancar.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 19 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },
  {
    id: 'ip13pro-128',
    name: 'iPhone 13 Pro',
    series: 'iPhone 13 Pro',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Sierra Blue', hex: '#7BAFC8' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Graphite', hex: '#54524F' },
      { name: 'Alpine Green', hex: '#576856' },
    ],
    price: 12999000,
    originalPrice: 15999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 13 Pro dengan chip A15 Bionic, layar ProMotion 120Hz pertama di iPhone, kamera triple 12 MP, dan Cinematic mode.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },
  {
    id: 'ip13pro-256',
    name: 'iPhone 13 Pro',
    series: 'iPhone 13 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Sierra Blue', hex: '#7BAFC8' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Graphite', hex: '#54524F' },
      { name: 'Alpine Green', hex: '#576856' },
    ],
    price: 14499000,
    originalPrice: 17999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 13 Pro 256 GB dengan layar ProMotion 120Hz dan sistem kamera Pro triple pertama di iPhone.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 22 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },
  {
    id: 'ip13promax-256',
    name: 'iPhone 13 Pro Max',
    series: 'iPhone 13 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Sierra Blue', hex: '#7BAFC8' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Graphite', hex: '#54524F' },
      { name: 'Alpine Green', hex: '#576856' },
    ],
    price: 16499000,
    originalPrice: 19999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 13 Pro Max dengan layar 6,7 inci ProMotion 120Hz dan baterai terlama di kelasnya. Flagship seri 13.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED ProMotion 120Hz',
      'Chip': 'Apple A15 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 3x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 28 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 15 (upgradeable ke iOS 17)',
    },
  },

  /* ════════════════════════════════════════
     iPhone 12 Series
  ════════════════════════════════════════ */
  {
    id: 'ip12mini-64',
    name: 'iPhone 12 mini',
    series: 'iPhone 12',
    storage: '64 GB',
    storageGB: 64,
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Red', hex: '#C0634A' },
      { name: 'Purple', hex: '#8A7EBD' },
    ],
    price: 5999000,
    originalPrice: 7999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 12 mini — 5G pertama dalam ukuran kompak 5,4 inci. Chip A14 Bionic, kamera 12 MP, dan layar Super Retina XDR dengan Ceramic Shield.',
    specs: {
      'Layar': '5,4" Super Retina XDR OLED (Ceramic Shield)',
      'Chip': 'Apple A14 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 15 jam video',
      'Penyimpanan': '64 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 14 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip12-64',
    name: 'iPhone 12',
    series: 'iPhone 12',
    storage: '64 GB',
    storageGB: 64,
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Red', hex: '#C0634A' },
      { name: 'Purple', hex: '#8A7EBD' },
    ],
    price: 6999000,
    originalPrice: 9499000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 12 dengan chip A14 Bionic, desain flat-edge modern pertama sejak iPhone 4, 5G, dan Ceramic Shield. Kamera 12 MP dengan Night mode.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED (Ceramic Shield)',
      'Chip': 'Apple A14 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '64 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 14 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip12-128',
    name: 'iPhone 12',
    series: 'iPhone 12',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Blue', hex: '#3A6EA5' },
      { name: 'Green', hex: '#66A88A' },
      { name: 'Red', hex: '#C0634A' },
      { name: 'Purple', hex: '#8A7EBD' },
    ],
    price: 7999000,
    originalPrice: 10999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 12 128 GB — desain flat-edge ikonik, 5G, A14 Bionic, dan kamera Night mode dalam kapasitas yang lebih lega.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED (Ceramic Shield)',
      'Chip': 'Apple A14 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 14 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip12pro-128',
    name: 'iPhone 12 Pro',
    series: 'iPhone 12 Pro',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Graphite', hex: '#54524F' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Pacific Blue', hex: '#3A6EA5' },
    ],
    price: 10999000,
    originalPrice: 14999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 12 Pro dengan chip A14 Bionic, kamera triple Pro 12 MP, LiDAR Scanner, dan bodi stainless steel premium. 5G dengan ProRAW support.',
    specs: {
      'Layar': '6,1" Super Retina XDR OLED ProMotion',
      'Chip': 'Apple A14 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 2x Telephoto',
      'Sensor Tambahan': 'LiDAR Scanner',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 14 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip12promax-128',
    name: 'iPhone 12 Pro Max',
    series: 'iPhone 12 Pro',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Graphite', hex: '#54524F' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Pacific Blue', hex: '#3A6EA5' },
    ],
    price: 12499000,
    originalPrice: 16999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 12 Pro Max dengan layar 6,7 inci, sensor kamera utama 47% lebih besar, dan OIS sensor-shift generasi pertama. Flagship seri 12.',
    specs: {
      'Layar': '6,7" Super Retina XDR OLED',
      'Chip': 'Apple A14 Bionic',
      'Kamera Utama': '12 MP Wide (sensor besar) + 12 MP Ultrawide + 12 MP 2.5x Telephoto',
      'Sensor Tambahan': 'LiDAR Scanner',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': '5G, Wi-Fi 6, Bluetooth 5.0',
      'Sistem Operasi': 'iOS 14 (upgradeable ke iOS 16)',
    },
  },

  /* ════════════════════════════════════════
     iPhone 11 Series
  ════════════════════════════════════════ */
  {
    id: 'ip11-64',
    name: 'iPhone 11',
    series: 'iPhone 11',
    storage: '64 GB',
    storageGB: 64,
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Red', hex: '#C0634A' },
      { name: 'Yellow', hex: '#F5D062' },
      { name: 'Purple', hex: '#8A7EBD' },
      { name: 'Green', hex: '#66A88A' },
    ],
    price: 4999000,
    originalPrice: 6999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 11 dengan chip A13 Bionic, kamera ganda 12 MP dengan Night mode pertama, dan desain kaca yang jernih. Pilihan terjangkau dengan performa tangguh.',
    specs: {
      'Layar': '6,1" Liquid Retina IPS LCD',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '64 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip11-128',
    name: 'iPhone 11',
    series: 'iPhone 11',
    storage: '128 GB',
    storageGB: 128,
    colors: [
      { name: 'Black', hex: '#1C1C1E' },
      { name: 'White', hex: '#F5F2EE' },
      { name: 'Red', hex: '#C0634A' },
      { name: 'Yellow', hex: '#F5D062' },
      { name: 'Purple', hex: '#8A7EBD' },
      { name: 'Green', hex: '#66A88A' },
    ],
    price: 5999000,
    originalPrice: 7999000,
    badge: 'sale',
    emoji: '📱',
    featured: false,
    desc: 'iPhone 11 128 GB — chip A13 Bionic, kamera Night mode, dan kapasitas nyaman untuk semua kebutuhanmu.',
    specs: {
      'Layar': '6,1" Liquid Retina IPS LCD',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 17 jam video',
      'Penyimpanan': '128 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip11pro-64',
    name: 'iPhone 11 Pro',
    series: 'iPhone 11 Pro',
    storage: '64 GB',
    storageGB: 64,
    colors: [
      { name: 'Space Gray', hex: '#3A3A3C' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Midnight Green', hex: '#3D5A4C' },
    ],
    price: 7499000,
    originalPrice: 11999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 11 Pro — pertama dengan layar Super Retina XDR OLED dan sistem kamera triple 12 MP. Chip A13 Bionic dengan desain kaca matte premium.',
    specs: {
      'Layar': '5,8" Super Retina XDR OLED',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 2x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 18 jam video',
      'Penyimpanan': '64 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip11pro-256',
    name: 'iPhone 11 Pro',
    series: 'iPhone 11 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Space Gray', hex: '#3A3A3C' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Midnight Green', hex: '#3D5A4C' },
    ],
    price: 8999000,
    originalPrice: 13999000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 11 Pro 256 GB — sistem kamera triple Pro pertama Apple dengan kapasitas yang lebih luas.',
    specs: {
      'Layar': '5,8" Super Retina XDR OLED',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 2x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 18 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip11promax-64',
    name: 'iPhone 11 Pro Max',
    series: 'iPhone 11 Pro',
    storage: '64 GB',
    storageGB: 64,
    colors: [
      { name: 'Space Gray', hex: '#3A3A3C' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Midnight Green', hex: '#3D5A4C' },
    ],
    price: 8499000,
    originalPrice: 13499000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 11 Pro Max dengan layar 6,5 inci Super Retina XDR, sistem kamera triple, dan baterai terlama di iPhone saat itu.',
    specs: {
      'Layar': '6,5" Super Retina XDR OLED',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 2x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '64 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
  {
    id: 'ip11promax-256',
    name: 'iPhone 11 Pro Max',
    series: 'iPhone 11 Pro',
    storage: '256 GB',
    storageGB: 256,
    colors: [
      { name: 'Space Gray', hex: '#3A3A3C' },
      { name: 'Silver', hex: '#E8E0D5' },
      { name: 'Gold', hex: '#C8A97A' },
      { name: 'Midnight Green', hex: '#3D5A4C' },
    ],
    price: 9999000,
    originalPrice: 15499000,
    badge: 'sale',
    emoji: '📲',
    featured: false,
    desc: 'iPhone 11 Pro Max 256 GB — flagship seri 11 dengan layar besar, kamera triple, dan baterai terlama.',
    specs: {
      'Layar': '6,5" Super Retina XDR OLED',
      'Chip': 'Apple A13 Bionic',
      'Kamera Utama': '12 MP Wide + 12 MP Ultrawide + 12 MP 2x Telephoto',
      'Kamera Selfie': '12 MP TrueDepth',
      'Baterai': 'hingga 20 jam video',
      'Penyimpanan': '256 GB',
      'Konektivitas': 'Wi-Fi 6, Bluetooth 5.0 (non-5G)',
      'Sistem Operasi': 'iOS 13 (upgradeable ke iOS 16)',
    },
  },
];

/* ── 2. KONSTANTA FILTER ─────────────────────────────────── */
// Urutan seri dari terbaru ke terlama untuk tampilan filter
const SERIES_ORDER = [
  'iPhone 17 Pro', 'iPhone 17',
  'iPhone 16 Pro', 'iPhone 16',
  'iPhone 15 Pro', 'iPhone 15',
  'iPhone 14 Pro', 'iPhone 14',
  'iPhone 13 Pro', 'iPhone 13',
  'iPhone 12 Pro', 'iPhone 12',
  'iPhone 11 Pro', 'iPhone 11',
];
const MAX_PRICE = Math.max(...PRODUCTS.map(p => p.price));

/* ── 3. STATE ────────────────────────────────────────────── */
let cart = [];
let currentDetailId = null;
let selectedQty = 1;
let selectedStorage = null;
let selectedColor = null;
let activeFilters = { series: [], storage: [], maxPrice: MAX_PRICE };
let sortMode = 'default';
let searchQuery = '';

/* ── 3. UTILITY ─────────────────────────────────────────── */
function formatRupiah(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function showToast(msg, type = '') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast' + (type ? ' toast--' + type : '');
  el.classList.add('show');
  clearTimeout(el._timer);
  el._timer = setTimeout(() => el.classList.remove('show'), 2800);
}

/* ── 4. ROUTING / PAGE NAVIGATION ───────────────────────── */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update active nav links
  document.querySelectorAll('.navbar__links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Page-specific initializations
  if (pageId === 'catalog')  renderCatalog();
  if (pageId === 'cart')     renderCart();
  if (pageId === 'checkout') renderCheckoutSummary();

  // Close mobile menu if open
  document.getElementById('navLinks').classList.remove('open');
}

/* ── 5. NAVBAR HELPERS ──────────────────────────────────── */
function toggleMobileMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function toggleSearchBar() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('open');
  if (bar.classList.contains('open')) {
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
  } else {
    document.getElementById('searchInput').value = '';
    searchQuery = '';
  }
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 10);
});

/* ── 6. FEATURED PRODUCTS (BERANDA) ─────────────────────── */
function renderFeatured() {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, 4);
  renderProductGrid('featuredGrid', featured);
  renderNewProducts();
  renderHotProducts();
  renderSeriesGrid();
}

function renderNewProducts() {
  const newProds = PRODUCTS.filter(p => p.badge === 'new').slice(0, 4);
  renderProductGrid('newProductsGrid', newProds);
}

function renderHotProducts() {
  const hotProds = PRODUCTS.filter(p => p.badge === 'hot').slice(0, 4);
  renderProductGrid('hotProductsGrid', hotProds);
}

function renderSeriesGrid() {
  const grid = document.getElementById('seriesGrid');
  if (!grid) return;

  // Satu wakil per seri: ambil produk pertama tiap seri
  const seen = new Set();
  const reps  = [];
  for (const p of PRODUCTS) {
    if (!seen.has(p.series)) { seen.add(p.series); reps.push(p); }
  }

  grid.innerHTML = reps.map(p => {
    const imgUrl = getProductImage(p.name);
    const imgEl  = imgUrl
      ? `<img src="${imgUrl}" alt="${p.series}" loading="lazy" onerror="this.parentElement.classList.add('img-error');this.remove()">`
      : `<div class="series-card__svg">${phoneSVG()}</div>`;
    // Harga mulai dari seri ini
    const prices    = PRODUCTS.filter(x => x.series === p.series).map(x => x.price);
    const minPrice  = Math.min(...prices);
    const count     = prices.length;
    return `
      <div class="series-card" onclick="filterBySeries('${p.series}')">
        <div class="series-card__img">${imgEl}</div>
        <div class="series-card__info">
          <span class="series-card__name">${p.series}</span>
          <span class="series-card__meta">${count} varian · mulai ${formatRupiah(minPrice)}</span>
        </div>
      </div>`;
  }).join('');
}

/** Filter katalog ke seri tertentu lalu buka halaman katalog */
function filterBySeries(seriesName) {
  activeFilters.series = [seriesName];
  showPage('catalog');
}

/** Filter katalog berdasarkan badge lalu buka halaman katalog */
function filterByBadge(badge) {
  activeFilters = { series: [], storage: [], maxPrice: MAX_PRICE };
  showPage('catalog');
  // Setelah catalog render, terapkan filter badge secara manual
  setTimeout(() => {
    const result = PRODUCTS.filter(p => p.badge === badge);
    renderProductGrid('catalogGrid', result);
    document.getElementById('catalogCount').textContent = `${result.length} produk`;
    document.getElementById('catalogEmpty').style.display = result.length === 0 ? 'block' : 'none';
  }, 50);
}

/* ── 7. PRODUCT CARD HTML ───────────────────────────────── */
function productCardHTML(product) {
  const badgeMap = { new: 'badge--new', sale: 'badge--sale', hot: 'badge--hot' };
  const badgeLbl = { new: 'Baru', sale: 'Diskon', hot: 'Terlaris' };
  const imgUrl   = getProductImage(product.name);

  const imgHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${product.name}" class="product-card__photo"
          loading="lazy" onerror="this.parentElement.classList.add('img-error');this.remove()">`
    : `<div class="product-card__img-svg">${phoneSVG()}</div>`;

  return `
    <article class="product-card" onclick="openDetail('${product.id}')">
      <div class="product-card__img">
        ${imgHTML}
        ${product.badge ? `<span class="product-card__badge ${badgeMap[product.badge]}">${badgeLbl[product.badge]}</span>` : ''}
      </div>
      <div class="product-card__body">
        <span class="product-card__series">${product.series}</span>
        <h3 class="product-card__name">${product.name}</h3>
        <span class="product-card__storage">${product.storage}</span>
        <div>
          <span class="product-card__price">${formatRupiah(product.price)}</span>
          ${product.originalPrice ? `<span class="product-card__original-price">${formatRupiah(product.originalPrice)}</span>` : ''}
        </div>
      </div>
      <div class="product-card__footer">
        <button class="btn btn--ghost" onclick="event.stopPropagation(); addToCart('${product.id}', 1)">+ Keranjang</button>
        <button class="btn btn--primary" onclick="event.stopPropagation(); openDetail('${product.id}')">Detail</button>
      </div>
    </article>`;
}

/** SVG inline fallback jika gambar gagal dimuat */
function phoneSVG() {
  return `<svg viewBox="0 0 80 160" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="144">
    <rect x="4" y="4" width="72" height="152" rx="12" fill="#2C2C2C"/>
    <rect x="8" y="8" width="64" height="144" rx="10" fill="#1a1a1a"/>
    <rect x="28" y="11" width="24" height="5" rx="2.5" fill="#3a3a3a"/>
    <rect x="12" y="24" width="56" height="108" rx="4" fill="#222"/>
    <circle cx="40" cy="146" r="5" fill="#3a3a3a"/>
  </svg>`;
}

/** Buat elemen SVG phone untuk dipakai di onerror handler */
function createPhoneSVGEl() {
  const wrap = document.createElement('div');
  wrap.className = 'product-card__img-svg';
  wrap.innerHTML = phoneSVG();
  return wrap;
}

/* ── 8. CATALOG & FILTERS ───────────────────────────────── */
function buildFilterUI() {
  // Series — diurutkan sesuai SERIES_ORDER (terbaru ke terlama)
  const seriesInData = [...new Set(PRODUCTS.map(p => p.series))];
  const seriesSet = SERIES_ORDER.filter(s => seriesInData.includes(s));

  document.getElementById('seriesFilter').innerHTML = seriesSet.map(s => `
    <label class="filter-chip">
      <input type="checkbox" value="${s}" onchange="handleSeriesFilter(this)"
        ${activeFilters.series.includes(s) ? 'checked' : ''} />
      ${s}
    </label>`).join('');

  // Storage — urutkan numerik
  const storageSet = [...new Set(PRODUCTS.map(p => p.storage))].sort((a, b) =>
    parseInt(a) - parseInt(b));
  document.getElementById('storageFilter').innerHTML = storageSet.map(s => `
    <label class="filter-chip">
      <input type="checkbox" value="${s}" onchange="handleStorageFilter(this)"
        ${activeFilters.storage.includes(s) ? 'checked' : ''} />
      ${s}
    </label>`).join('');
}

function handleSeriesFilter(checkbox) {
  if (checkbox.checked) {
    activeFilters.series.push(checkbox.value);
  } else {
    activeFilters.series = activeFilters.series.filter(v => v !== checkbox.value);
  }
  applyFilters();
}

function handleStorageFilter(checkbox) {
  if (checkbox.checked) {
    activeFilters.storage.push(checkbox.value);
  } else {
    activeFilters.storage = activeFilters.storage.filter(v => v !== checkbox.value);
  }
  applyFilters();
}

function handlePriceFilter(val) {
  activeFilters.maxPrice = parseInt(val);
  document.getElementById('priceRangeLabel').textContent =
    '≤ ' + formatRupiah(activeFilters.maxPrice);
  applyFilters();
}

function resetFilters() {
  activeFilters = { series: [], storage: [], maxPrice: MAX_PRICE };
  const rangeEl = document.getElementById('priceRange');
  rangeEl.max   = MAX_PRICE;
  rangeEl.value = MAX_PRICE;
  document.getElementById('priceRangeLabel').textContent = '≤ ' + formatRupiah(MAX_PRICE);
  document.getElementById('sortSelect').value = 'default';
  sortMode = 'default';
  document.querySelectorAll('#seriesFilter input, #storageFilter input').forEach(cb => {
    cb.checked = false;
  });
  applyFilters();
}

function applyFilters() {
  sortMode = document.getElementById('sortSelect').value;
  let result = PRODUCTS.filter(p => {
    const seriesOK  = activeFilters.series.length === 0  || activeFilters.series.includes(p.series);
    const storageOK = activeFilters.storage.length === 0 || activeFilters.storage.includes(p.storage);
    const priceOK   = p.price <= activeFilters.maxPrice;
    return seriesOK && storageOK && priceOK;
  });

  if (sortMode === 'price-asc')  result.sort((a, b) => a.price - b.price);
  if (sortMode === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sortMode === 'name-asc')   result.sort((a, b) => a.name.localeCompare(b.name));

  renderProductGrid('catalogGrid', result);
  document.getElementById('catalogCount').textContent = `${result.length} produk`;
  document.getElementById('catalogEmpty').style.display = result.length === 0 ? 'block' : 'none';
}

function renderCatalog() {
  // Set slider max ke harga tertinggi produk (dilakukan sekali)
  const rangeEl = document.getElementById('priceRange');
  if (rangeEl.max !== String(MAX_PRICE)) {
    rangeEl.max   = MAX_PRICE;
    rangeEl.value = MAX_PRICE;
    document.getElementById('priceRangeLabel').textContent = '≤ ' + formatRupiah(MAX_PRICE);
    activeFilters.maxPrice = MAX_PRICE;
  }
  buildFilterUI();
  applyFilters();
}

function renderProductGrid(gridId, products) {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  grid.innerHTML = products.map(p => productCardHTML(p)).join('');
}

function toggleFilterPanel() {
  document.getElementById('filterPanel').classList.toggle('mobile-open');
}

/* ── 9. PRODUCT DETAIL ──────────────────────────────────── */
function openDetail(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  currentDetailId = productId;
  selectedQty = 1;
  selectedStorage = product.storage;
  selectedColor = product.colors[0]?.name || null;
  renderDetailPage(product);
  showPage('detail');
}

function renderDetailPage(product) {
  const container = document.getElementById('detailContent');
  const imgUrl    = getProductImage(product.name);

  const galleryContent = imgUrl
    ? `<img src="${imgUrl}" alt="${product.name}" class="detail-gallery__photo"
          onerror="this.parentElement.classList.add('img-error');this.replaceWith(createPhoneSVGEl())">`
    : createPhoneSVGEl().outerHTML;

  // Related products from same series
  const related = PRODUCTS.filter(p => p.series === product.series && p.id !== product.id).slice(0, 3);

  container.innerHTML = `
    <nav class="detail-breadcrumb" style="margin-bottom:2rem">
      <a href="#" onclick="showPage('home')">Beranda</a> /
      <a href="#" onclick="showPage('catalog')">Katalog</a> /
      <span>${product.name} ${product.storage}</span>
    </nav>

    <div class="detail-layout">
      <div class="detail-gallery">
        ${galleryContent}
      </div>

      <div class="detail-info">
        <div class="detail-series">${product.series}</div>
        <h1 class="detail-name">${product.name}</h1>
        <div>
          <span class="detail-price">${formatRupiah(product.price)}</span>
          ${product.originalPrice
            ? `<span class="detail-original-price">${formatRupiah(product.originalPrice)}</span>`
            : ''}
        </div>

        <p class="detail-desc">${product.desc}</p>

        <!-- Storage Options -->
        <div class="detail-options">
          <label>Penyimpanan</label>
          <div class="storage-chips" id="storageChips">
            ${getStorageVariants(product).map(v => `
              <button class="storage-chip ${v.storage === product.storage ? 'active' : ''}"
                onclick="selectVariant('${v.id}', '${v.storage}')">
                ${v.storage}
              </button>`).join('')}
          </div>
        </div>

        <!-- Color Options -->
        ${product.colors.length > 0 ? `
        <div class="detail-options">
          <label>Warna: <span id="selectedColorLabel">${product.colors[0].name}</span></label>
          <div class="color-chips" id="colorChips">
            ${product.colors.map((c, i) => `
              <div class="color-chip ${i === 0 ? 'active' : ''}"
                style="background:${c.hex};"
                title="${c.name}"
                onclick="selectColor(this, '${c.name}')">
              </div>`).join('')}
          </div>
        </div>` : ''}

        <!-- Quantity -->
        <div class="detail-options">
          <label>Jumlah</label>
          <div class="detail-qty">
            <div class="qty-ctrl">
              <button onclick="changeQty(-1)">−</button>
              <span id="qtyDisplay">1</span>
              <button onclick="changeQty(1)">+</button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="detail-actions">
          <button class="btn btn--ghost" onclick="addToCart('${product.id}', selectedQty)">
            + Keranjang
          </button>
          <button class="btn btn--primary" onclick="buyNow('${product.id}')">
            Beli Sekarang
          </button>
        </div>

        <!-- Specs -->
        <div class="detail-specs">
          <h3>Spesifikasi</h3>
          <table class="spec-table">
            ${Object.entries(product.specs).map(([k, v]) =>
              `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
          </table>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    ${related.length > 0 ? `
    <div style="margin-top:3rem">
      <h2 style="margin-bottom:1.5rem">Produk Serupa</h2>
      <div class="product-grid">
        ${related.map(p => productCardHTML(p)).join('')}
      </div>
    </div>` : ''}
  `;
}

function getStorageVariants(product) {
  // All variants of same name in different storage
  return PRODUCTS.filter(p => p.name === product.name).sort((a, b) => a.storageGB - b.storageGB);
}

function selectVariant(variantId, storage) {
  const product = PRODUCTS.find(p => p.id === variantId);
  if (!product) return;
  openDetail(variantId);
}

function selectColor(el, colorName) {
  document.querySelectorAll('#colorChips .color-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  selectedColor = colorName;
  document.getElementById('selectedColorLabel').textContent = colorName;
}

function changeQty(delta) {
  selectedQty = Math.max(1, Math.min(10, selectedQty + delta));
  document.getElementById('qtyDisplay').textContent = selectedQty;
}

/* ── 10. CART ────────────────────────────────────────────── */
function loadCart() {
  try {
    cart = JSON.parse(localStorage.getItem('givstore_cart') || '[]');
  } catch {
    cart = [];
  }
  updateCartBadge();
}

function saveCart() {
  localStorage.setItem('givstore_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const total = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById('cartBadge');
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}

function addToCart(productId, qty = 1, colorName = null) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const color = colorName || selectedColor || product.colors[0]?.name || '';
  const key = productId + '::' + color;

  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty = Math.min(10, existing.qty + qty);
  } else {
    cart.push({
      key,
      productId,
      color,
      qty,
      price: product.price,
    });
  }
  saveCart();
  showToast(`${product.name} ${product.storage} ditambahkan ke keranjang`, 'success');
}

function buyNow(productId) {
  addToCart(productId, selectedQty, selectedColor);
  showPage('checkout');
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  renderCart();
}

function updateCartItemQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, Math.min(10, item.qty + delta));
  saveCart();
  renderCart();
}

function getCartSubtotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summary   = document.getElementById('cartSummary');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty__icon">🛒</div>
        <h3>Keranjangmu masih kosong</h3>
        <p>Yuk, mulai pilih iPhone favoritmu!</p>
        <button class="btn btn--primary" onclick="showPage('catalog')">Lihat Katalog</button>
      </div>`;
    summary.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) return '';
    return `
      <div class="cart-item">
        <div class="cart-item__img">${product.emoji}</div>
        <div class="cart-item__info">
          <div class="cart-item__name">${product.name} ${product.storage}</div>
          <div class="cart-item__meta">${item.color}</div>
          <div class="cart-item__price">${formatRupiah(product.price)}</div>
        </div>
        <div class="cart-item__controls">
          <div class="qty-ctrl">
            <button onclick="updateCartItemQty('${item.key}', -1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateCartItemQty('${item.key}', 1)">+</button>
          </div>
          <button class="cart-item__remove" onclick="removeFromCart('${item.key}')">Hapus</button>
        </div>
      </div>`;
  }).join('');

  const subtotal = getCartSubtotal();
  summary.innerHTML = `
    <div class="summary__title">Ringkasan Pesanan</div>
    <div class="summary__row"><span>Subtotal (${cart.reduce((s,i)=>s+i.qty,0)} item)</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary__row"><span>Ongkos kirim</span><span>Dihitung saat checkout</span></div>
    <div class="summary__row summary__row--total"><span>Estimasi Total</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary__actions">
      <button class="btn btn--primary btn--full" onclick="showPage('checkout')">Lanjut ke Checkout</button>
      <button class="btn btn--ghost btn--full" onclick="showPage('catalog')">Lanjut Belanja</button>
    </div>`;
}

/* ── 11. CHECKOUT ────────────────────────────────────────── */
const SHIPPING_COST = { reguler: 15000, express: 35000, sameday: 65000 };

function getSelectedShipping() {
  const el = document.querySelector('input[name="shipping"]:checked');
  return el ? el.value : 'reguler';
}

function updateOrderSummary() {
  renderCheckoutSummary();
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutSummary');
  if (!container) return;

  const subtotal  = getCartSubtotal();
  const shipping  = SHIPPING_COST[getSelectedShipping()] || 15000;
  const total     = subtotal + shipping;

  container.innerHTML = `
    <div class="summary__title">Ringkasan Pesanan</div>
    ${cart.map(item => {
      const p = PRODUCTS.find(pr => pr.id === item.productId);
      if (!p) return '';
      return `<div class="summary__row">
        <span>${p.name} ${p.storage} ×${item.qty}</span>
        <span>${formatRupiah(p.price * item.qty)}</span>
      </div>`;
    }).join('')}
    <div class="summary__row"><span>Subtotal</span><span>${formatRupiah(subtotal)}</span></div>
    <div class="summary__row"><span>Ongkos kirim</span><span>${formatRupiah(shipping)}</span></div>
    <div class="summary__row summary__row--total"><span>Total</span><span>${formatRupiah(total)}</span></div>`;
}

function submitOrder(e) {
  e.preventDefault();

  if (cart.length === 0) {
    showToast('Keranjangmu kosong!', 'error');
    return;
  }

  const name     = document.getElementById('buyerName').value.trim();
  const phone    = document.getElementById('buyerPhone').value.trim();
  const email    = document.getElementById('buyerEmail').value.trim();
  const shipping = getSelectedShipping();
  const payment  = document.querySelector('input[name="payment"]:checked')?.value || 'transfer';
  const subtotal = getCartSubtotal();
  const total    = subtotal + (SHIPPING_COST[shipping] || 15000);

  // Build order ID
  const orderId = 'GS-' + Date.now().toString(36).toUpperCase();

  // Build success message
  const shippingLabel = { reguler: 'Reguler', express: 'Express', sameday: 'Same Day' };
  const paymentLabel  = { transfer: 'Transfer Bank', ewallet: 'E-Wallet', cod: 'COD' };

  document.getElementById('successMessage').innerHTML = `
    Pesanan <strong>${orderId}</strong> berhasil dibuat.<br>
    Nama: <strong>${name}</strong> | Total: <strong>${formatRupiah(total)}</strong><br>
    Pengiriman: <strong>${shippingLabel[shipping]}</strong> | Pembayaran: <strong>${paymentLabel[payment]}</strong><br><br>
    Tim kami akan menghubungi kamu melalui WhatsApp ke nomor <strong>${phone}</strong> atau email <strong>${email}</strong>
    untuk konfirmasi pembayaran dalam 1×24 jam.`;

  // Save order to localStorage (opsional, untuk riwayat)
  const orders = JSON.parse(localStorage.getItem('givstore_orders') || '[]');
  orders.push({ orderId, name, phone, email, cart: [...cart], total, shipping, payment, date: new Date().toISOString() });
  localStorage.setItem('givstore_orders', JSON.stringify(orders));

  // Clear cart
  cart = [];
  saveCart();

  // Reset form
  e.target.reset();
  const priceLabel = document.getElementById('priceRangeLabel');
  if (priceLabel) priceLabel.textContent = '≤ ' + formatRupiah(MAX_PRICE);

  showPage('success');
}

/* ── 12. PENCARIAN ───────────────────────────────────────── */
function handleSearch(query) {
  searchQuery = query.trim().toLowerCase();
  if (searchQuery.length < 1) return;

  const results = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery) ||
    p.series.toLowerCase().includes(searchQuery) ||
    p.storage.toLowerCase().includes(searchQuery) ||
    p.desc.toLowerCase().includes(searchQuery)
  );

  document.getElementById('searchResultMeta').textContent =
    `"${query}" — ${results.length} produk ditemukan`;

  renderProductGrid('searchGrid', results);
  const empty = document.getElementById('searchEmpty');
  if (empty) empty.style.display = results.length === 0 ? 'block' : 'none';

  showPage('search');
  document.getElementById('searchBar').classList.remove('open');
}

/* ── 13. KONTAK ──────────────────────────────────────────── */
function submitContact(e) {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  showToast(`Terima kasih, ${name}! Pesan kamu telah terkirim.`, 'success');
  e.target.reset();
}

/* ── 14. INIT ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadCart();
  renderFeatured();
  showPage('home');
});
