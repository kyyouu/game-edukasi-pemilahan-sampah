// 0 = Organik, 1 = Anorganik
export const CATEGORIES = [
  { id: 0, name: 'Organik', emoji: '🌿', color: '#2ecc71', bg: '#e8fdf0', border: '#a8f0c6', desc: 'Bisa terurai alami' },
  { id: 1, name: 'Anorganik', emoji: '♻️', color: '#3498db', bg: '#e8f4fd', border: '#a8d5f0', desc: 'Bisa didaur ulang' },
];

// Level 2: Drag & drop items
export const dragDropItems = [
  { id: 'd1', name: 'Daun kering', emoji: '🍂', category: 0, hint: 'Daun kering adalah sampah organik!' },
  { id: 'd2', name: 'Botol plastik', emoji: '🧴', category: 1, hint: 'Botol plastik adalah sampah anorganik!' },
  { id: 'd3', name: 'Kulit semangka', emoji: '🍉', category: 0, hint: 'Kulit semangka bisa terurai alami, termasuk sampah organik!' },
  { id: 'd4', name: 'Sisa nasi', emoji: '🍚', category: 0, hint: 'Sisa makanan adalah sampah organik!' },
  { id: 'd5', name: 'Kaleng soda', emoji: '🥤', category: 1, hint: 'Kaleng soda adalah sampah anorganik!' },
  { id: 'd6', name: 'Gelas plastik', emoji: '🥛', category: 1, hint: 'Gelas plastik adalah sampah anorganik yang bisa didaur ulang!' },
  { id: 'd7', name: 'Kulit buah', emoji: '🍊', category: 0, hint: 'Kulit buah adalah sampah organik!' },
  { id: 'd8', name: 'Kertas bekas', emoji: '📄', category: 1, hint: 'Kertas bekas adalah sampah anorganik yang bisa didaur ulang!' },
  { id: 'd9', name: 'Ranting pohon', emoji: '🌱', category: 0, hint: 'Ranting pohon berasal dari alam dan bisa terurai, termasuk sampah organik!' },
  { id: 'd10', name: 'Tulang ayam', emoji: '🍗', category: 0, hint: 'Tulang ayam adalah sampah organik!' },
];

// Level 3: Multiple choice trash items
export const guessItems = [
  {
    id: 'g1',
    name: 'Botol Plastik',
    emoji: '🍶',
    category: 1,
    categoryName: 'Anorganik',
    options: ['Organik', 'Anorganik'],
    correct: 1,
    desc: 'Botol plastik adalah sampah anorganik yang bisa didaur ulang menjadi produk baru!',
  },
  {
    id: 'g2',
    name: 'Kulit Pisang',
    emoji: '🍌',
    category: 0,
    categoryName: 'Organik',
    options: ['Organik', 'Anorganik'],
    correct: 0,
    desc: 'Kulit pisang bisa terurai alami dan dijadikan pupuk kompos!',
  },
  {
    id: 'g3',
    name: 'Sisa Sayuran',
    emoji: '🥦',
    category: 0,
    categoryName: 'Organik',
    options: ['Organik', 'Anorganik'],
    correct: 0,
    desc: 'Sisa sayuran berasal dari tumbuhan dan bisa terurai menjadi kompos yang menyuburkan tanah!',
  },
  {
    id: 'g4',
    name: 'Daun Kering',
    emoji: '🍂',
    category: 0,
    categoryName: 'Organik',
    options: ['Organik', 'Anorganik'],
    correct: 0,
    desc: 'Daun kering adalah sampah organik yang bisa jadi pupuk kompos!',
  },
  {
    id: 'g5',
    name: 'Kaleng Bekas',
    emoji: '🥫',
    category: 1,
    categoryName: 'Anorganik',
    options: ['Organik', 'Anorganik'],
    correct: 1,
    desc: 'Kaleng aluminium bisa didaur ulang berkali-kali tanpa kehilangan kualitas!',
  },
  {
    id: 'g6',
    name: 'Kertas',
    emoji: '📰',
    category: 1,
    categoryName: 'Anorganik',
    options: ['Organik', 'Anorganik'],
    correct: 1,
    desc: 'Kertas adalah sampah anorganik tapi bisa didaur ulang menjadi kertas baru!',
  },
];

// ============================================================
// Level 2: Conveyor Belt items — "Pabrik Pilah Sampah"
// 0 = Organik, 1 = Anorganik, 2 = B3
// ============================================================
export const conveyorItems = [
  { id: 'c1',  name: 'Kulit Pisang',    emoji: '🍌', category: 0, hint: 'Kulit pisang berasal dari tumbuhan dan mudah terurai oleh bakteri → Organik!' },
  { id: 'c2',  name: 'Botol Plastik',   emoji: '🧴', category: 1, hint: 'Botol plastik tidak bisa terurai alami tapi bisa didaur ulang → Anorganik!' },
  { id: 'c3',  name: 'Sisa Sayuran',    emoji: '🥦', category: 0, hint: 'Sisa sayuran berasal dari tumbuhan dan bisa terurai menjadi kompos → Organik!' },
  { id: 'c4',  name: 'Sisa Nasi',       emoji: '🍚', category: 0, hint: 'Sisa makanan bisa terurai dan dijadikan kompos → Organik!' },
  { id: 'c5',  name: 'Kaleng Soda',     emoji: '🥤', category: 1, hint: 'Kaleng aluminium bisa didaur ulang berkali-kali → Anorganik!' },
  { id: 'c6',  name: 'Gelas Plastik',   emoji: '🥛', category: 1, hint: 'Gelas plastik tidak bisa terurai alami dan bisa didaur ulang → Anorganik!' },
  { id: 'c7',  name: 'Daun Kering',     emoji: '🍂', category: 0, hint: 'Daun kering bisa dijadikan pupuk kompos yang menyuburkan tanah → Organik!' },
  { id: 'c8',  name: 'Kertas Bekas',    emoji: '📄', category: 1, hint: 'Kertas bekas bisa didaur ulang menjadi kertas baru → Anorganik!' },
  { id: 'c9',  name: 'Kulit Semangka',  emoji: '🍉', category: 0, hint: 'Kulit semangka berasal dari tumbuhan dan bisa terurai menjadi kompos → Organik!' },
  { id: 'c10', name: 'Kulit Jeruk',     emoji: '🍊', category: 0, hint: 'Kulit buah bisa terurai alami menjadi kompos → Organik!' },
  { id: 'c11', name: 'Kardus Bekas',    emoji: '📦', category: 1, hint: 'Kardus bisa didaur ulang menjadi bahan kemasan baru → Anorganik!' },
  { id: 'c12', name: 'Botol Minuman',   emoji: '🍾', category: 1, hint: 'Botol kaca bisa didaur ulang menjadi produk kaca baru → Anorganik!' },
  { id: 'c13', name: 'Tulang Ayam',     emoji: '🍗', category: 0, hint: 'Tulang ayam berasal dari makhluk hidup dan bisa terurai → Organik!' },
  { id: 'c14', name: 'Botol Kaca',      emoji: '🍶', category: 1, hint: 'Botol kaca bisa didaur ulang menjadi produk kaca baru → Anorganik!' },
  { id: 'c15', name: 'Ranting Pohon',   emoji: '🌿', category: 0, hint: 'Ranting pohon berasal dari alam dan bisa terurai menjadi kompos → Organik!' },
];

// ============================================================
// Level 3: Tebak Sampahku — "Tebak Sampahku!"
// Setiap kasus: objek, gambar, kategori, tindakan
// ============================================================
export const detectiveCases = [
  {
    id: 'det1',
    name: 'Botol Plastik',
    emoji: '🧴',
    image: '/trash/botol_plastik.jpg',
    mission: 'Ada botol plastik bekas di kelas kita. Termasuk sampah apa ya? 🤔',
    funFact: 'Plastik butuh 500 tahun untuk hancur di tanah!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    conclusion: 'Botol plastik TIDAK bisa hancur sendiri di tanah, tapi bisa didaur ulang jadi barang baru!',
    actions: [
      { text: '🗑️ Buang ke sungai', correct: false },
      { text: '♻️ Pilah & kumpulkan untuk didaur ulang', correct: true  },
      { text: '🔥 Bakar saja', correct: false },
    ],
    actionExplanation: 'Botol plastik bisa jadi barang baru! Kumpulkan dan bawa ke bank sampah! ♻️',
  },
  {
    id: 'det2',
    name: 'Kulit Pisang',
    emoji: '🍌',
    image: '/trash/kulit_pisang.jpg',
    mission: 'Ada kulit pisang yang jatuh di halaman. Termasuk sampah apa ya? 🤔',
    funFact: 'Kulit pisang bisa jadi pupuk yang menyuburkan tanaman!',
    category: 0, // Organik
    categoryName: 'Organik',
    conclusion: 'Kulit pisang berasal dari tumbuhan dan bisa hancur sendiri di tanah. Ini sampah Organik!',
    actions: [
      { text: '🌱 Jadikan pupuk kompos', correct: true  },
      { text: '🔥 Dibakar', correct: false },
      { text: '🚰 Dibuang ke selokan', correct: false },
    ],
    actionExplanation: 'Kulit pisang bisa jadi pupuk kompos yang menyuburkan tanaman! 🌿',
  },
  {
    id: 'det3',
    name: 'Kemasan Plastik',
    emoji: '🧴',
    image: '/trash/botol_plastik.jpg',
    mission: 'Ada kemasan plastik shampo bekas di kamar mandi. Sampah apa ya? 🤔',
    funFact: 'Kalau plastik dibakar, asapnya bisa bikin sesak napas!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    conclusion: 'Kemasan plastik tidak bisa hancur sendiri, tapi bisa didaur ulang jadi barang baru!',
    actions: [
      { text: '♻️ Pilah ke tempat sampah anorganik', correct: true  },
      { text: '🌊 Buang ke sungai', correct: false },
      { text: '🔥 Dibakar di halaman', correct: false },
    ],
    actionExplanation: 'Pisahkan di tempat sampah anorganik, lalu bawa ke bank sampah! ♻️',
  },
  {
    id: 'det4',
    name: 'Kaleng Minuman',
    emoji: '🥫',
    image: '/trash/kaleng_minuman.jpg',
    mission: 'Ada kaleng minuman bekas di pinggir jalan desa. Sampah apa ya? 🤔',
    funFact: 'Satu kaleng aluminium bisa didaur ulang berkali-kali!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    conclusion: 'Kaleng terbuat dari logam dan tidak bisa hancur sendiri, tapi sangat berharga untuk didaur ulang!',
    actions: [
      { text: '💰 Kumpulkan & jual ke pengepul', correct: true  },
      { text: '🚰 Buang ke selokan', correct: false },
      { text: '🔥 Dibakar', correct: false },
    ],
    actionExplanation: 'Kaleng aluminium bisa dijual ke pengepul atau dibawa ke bank sampah! 💰',
  },
  {
    id: 'det5',
    name: 'Sisa Makanan',
    emoji: '🍛',
    image: '/trash/sisa_makanan.jpg',
    mission: 'Ada sisa nasi dan sayur di meja makan. Sampah apa ya? 🤔',
    funFact: 'Sisa makanan bisa jadi pupuk super untuk kebun kita!',
    category: 0, // Organik
    categoryName: 'Organik',
    conclusion: 'Sisa makanan berasal dari alam dan bisa hancur sendiri jadi tanah yang subur!',
    actions: [
      { text: '🌱 Jadikan pupuk/kompos', correct: true  },
      { text: '🏞️ Buang ke sungai', correct: false },
      { text: '🗑️ Campur sampah plastik', correct: false },
    ],
    actionExplanation: 'Sisa makanan bisa jadi pupuk kompos yang menyuburkan kebun! 🌿',
  },
  {
    id: 'det6',
    name: 'Buah Busuk',
    emoji: '🍎',
    image: '/trash/buah_busuk.jpg',
    mission: 'Ada apel yang sudah busuk di keranjang buah. Sampah apa ya? 🤔',
    funFact: 'Buah busuk bisa jadi makanan cacing yang menyuburkan tanah!',
    category: 0, // Organik
    categoryName: 'Organik',
    conclusion: 'Buah busuk berasal dari tumbuhan dan bisa hancur sendiri di tanah. Ini sampah Organik!',
    actions: [
      { text: '🌱 Kubur di tanah untuk jadi kompos', correct: true  },
      { text: '🚰 Buang ke got', correct: false },
      { text: '🔥 Dibakar', correct: false },
    ],
    actionExplanation: 'Buah busuk bisa dikubur di tanah untuk menyuburkan kebun! 🌱',
  },
  {
    id: 'det7',
    name: 'Kertas Koran',
    emoji: '📰',
    image: '/trash/kertas_koran.jpg',
    mission: 'Ada tumpukan koran lama di sudut rumah. Sampah apa ya? 🤔',
    funFact: 'Satu ton kertas daur ulang bisa menyelamatkan 17 pohon!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    conclusion: 'Kertas dibuat dari kayu yang diproses dan bisa didaur ulang jadi kertas baru!',
    actions: [
      { text: '♻️ Kumpulkan & jual ke pengepul kertas', correct: true  },
      { text: '🔥 Dibakar di pekarangan', correct: false },
      { text: '🚰 Dibuang ke selokan', correct: false },
    ],
    actionExplanation: 'Kertas bekas bisa jadi kertas baru! Kumpulkan dan jual ke pengepul! ♻️',
  },
  {
    id: 'det8',
    name: 'Daun Kering',
    emoji: '🍂',
    image: null, // gunakan emoji
    mission: 'Ada daun kering berserakan di halaman sekolah. Sampah apa ya? 🤔',
    funFact: 'Daun kering bisa jadi pupuk alami yang kaya nutrisi!',
    category: 0, // Organik
    categoryName: 'Organik',
    conclusion: 'Daun kering berasal dari pohon dan bisa hancur sendiri jadi tanah yang subur!',
    actions: [
      { text: '🌱 Tumpuk untuk jadi kompos', correct: true  },
      { text: '🔥 Dibakar agar halaman bersih', correct: false },
      { text: '🌊 Dibuang ke sungai', correct: false },
    ],
    actionExplanation: 'Daun kering bisa ditumpuk jadi pupuk kompos untuk menyuburkan kebun! 🍃',
  },
  {
    id: 'det9',
    name: 'Kemasan Sachet',
    emoji: '🛍️',
    image: null, // gunakan emoji
    mission: 'Ada banyak bungkus sachet plastik di jalan desa. Sampah apa ya? 🤔',
    funFact: 'Sachet plastik tipis sangat susah didaur ulang dan berbahaya untuk laut!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    conclusion: 'Kemasan sachet plastik tidak bisa hancur sendiri dan sangat mencemari lingkungan!',
    actions: [
      { text: '♻️ Pilah ke tempat sampah anorganik', correct: true  },
      { text: '🌊 Dibuang ke got/sungai', correct: false },
      { text: '🔥 Dibakar', correct: false },
    ],
    actionExplanation: 'Pisahkan ke tempat sampah anorganik dan bawa ke bank sampah! ♻️',
  },
];

// Level 1: Trash items scattered
export const scatteredTrash = [
  { id: 's1', emoji: '🗑️', name: 'Sampah plastik' },
  { id: 's2', emoji: '🍌', name: 'Kulit pisang' },
  { id: 's3', emoji: '📄', name: 'Kertas' },
  { id: 's4', emoji: '🧴', name: 'Botol shampoo' },
  { id: 's5', emoji: '🥤', name: 'Gelas plastik' },
  { id: 's6', emoji: '🍂', name: 'Daun' },
  { id: 's7', emoji: '🎒', name: 'Tas rusak' },
  { id: 's8', emoji: '🧸', name: 'Mainan rusak' },
  { id: 's9', emoji: '👟', name: 'Sandal rusak' },
  { id: 's10', emoji: '🍎', name: 'Buah busuk' },
  { id: 's11', emoji: '📦', name: 'Kotak kardus' },
  { id: 's12', emoji: '🥛', name: 'Botol susu' },
];
