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
// Level 3: Detective Cases — "Detektif Sampah"
// Setiap kasus: objek, petunjuk (benar & salah), kategori, tindakan
// ============================================================
export const detectiveCases = [
  {
    id: 'det1',
    name: 'Botol Plastik',
    emoji: '🧴',
    mission: 'Bantu detektif menyelidiki botol plastik ini!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    clues: [
      { id: 'cl1a', text: 'Terbuat dari bahan plastik sintetis',      isRelevant: true },
      { id: 'cl1b', text: 'Sulit terurai secara alami (500 tahun!)',   isRelevant: true },
      { id: 'cl1c', text: 'Dapat didaur ulang menjadi produk baru',    isRelevant: true },
      { id: 'cl1d', text: 'Mudah membusuk bila terkena air',           isRelevant: false },
      { id: 'cl1e', text: 'Berasal dari sisa makanan',                 isRelevant: false },
      { id: 'cl1f', text: 'Warnanya hijau seperti daun',               isRelevant: false },
    ],
    conclusion: 'Botol plastik tidak bisa terurai alami dan bisa didaur ulang. Jadi termasuk sampah Anorganik!',
    actions: [
      { text: 'Dibuang ke sungai',            correct: false },
      { text: 'Dipilah untuk didaur ulang', correct: true  },
      { text: 'Dibakar sembarangan',           correct: false },
      { text: 'Dicampur sampah organik',       correct: false },
    ],
    actionExplanation: 'Botol plastik harus dipilah dan diserahkan ke bank sampah atau pengepul daur ulang!',
  },
  {
    id: 'det2',
    name: 'Kulit Pisang',
    emoji: '🍌',
    mission: 'Selidiki kulit pisang yang ditemukan di jalan Desa Sukaraja!',
    category: 0, // Organik
    categoryName: 'Organik',
    clues: [
      { id: 'cl2a', text: 'Berasal dari tumbuhan pisang',             isRelevant: true  },
      { id: 'cl2b', text: 'Mudah membusuk dalam beberapa hari',       isRelevant: true  },
      { id: 'cl2c', text: 'Bisa diolah menjadi pupuk kompos',         isRelevant: true  },
      { id: 'cl2d', text: 'Mengandung logam berat berbahaya',         isRelevant: false },
      { id: 'cl2e', text: 'Terbuat dari bahan plastik',               isRelevant: false },
      { id: 'cl2f', text: 'Tidak bisa terurai sama sekali',           isRelevant: false },
    ],
    conclusion: 'Kulit pisang berasal dari tumbuhan, mudah terurai, dan bisa jadi kompos. Ini sampah Organik!',
    actions: [
      { text: 'Dicampur dengan sampah B3',     correct: false },
      { text: 'Dibuang ke got/selokan',        correct: false },
      { text: 'Diolah menjadi kompos', correct: true  },
      { text: 'Dibakar agar cepat habis',      correct: false },
    ],
    actionExplanation: 'Kulit pisang bisa diolah menjadi pupuk kompos yang menyuburkan tanaman di Desa Sukaraja!',
  },
  {
    id: 'det3',
    name: 'Kemasan Plastik',
    emoji: '🧴',
    mission: 'Kemasan plastik botol ditemukan berserakan di halaman sekolah. Selidiki!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    clues: [
      { id: 'cl3a', text: 'Terbuat dari bahan plastik sintetis',       isRelevant: true  },
      { id: 'cl3b', text: 'Sulit terurai secara alami di tanah',       isRelevant: true  },
      { id: 'cl3c', text: 'Bisa didaur ulang menjadi produk plastik baru', isRelevant: true  },
      { id: 'cl3d', text: 'Bisa dimakan oleh ulat tanah',              isRelevant: false },
      { id: 'cl3e', text: 'Berasal dari sisa makanan',                 isRelevant: false },
      { id: 'cl3f', text: 'Mudah hancur jika kena air hujan',          isRelevant: false },
    ],
    conclusion: 'Kemasan plastik tidak bisa terurai alami tapi bisa didaur ulang. Ini sampah Anorganik!',
    actions: [
      { text: 'Dibuang ke selokan',                              correct: false },
      { text: 'Dipilah dan dibawa ke bank sampah', correct: true  },
      { text: 'Dibakar di halaman sekolah',                      correct: false },
      { text: 'Dikubur di taman sekolah',                        correct: false },
    ],
    actionExplanation: 'Kemasan plastik harus dipilah dan dibawa ke bank sampah agar bisa didaur ulang menjadi produk baru!',
  },
  {
    id: 'det4',
    name: 'Kaleng Minuman',
    emoji: '🥫',
    mission: 'Kaleng minuman ditemukan berserakan di pinggir jalan. Selidiki!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    clues: [
      { id: 'cl4a', text: 'Terbuat dari aluminium atau baja',         isRelevant: true  },
      { id: 'cl4b', text: 'Bisa didaur ulang menjadi logam baru',     isRelevant: true  },
      { id: 'cl4c', text: 'Tidak mudah terurai di alam',              isRelevant: true  },
      { id: 'cl4d', text: 'Mengandung racun berbahaya jika dibakar',  isRelevant: false },
      { id: 'cl4e', text: 'Berasal dari makhluk hidup',               isRelevant: false },
      { id: 'cl4f', text: 'Bisa langsung dijadikan kompos',           isRelevant: false },
    ],
    conclusion: 'Kaleng terbuat dari logam, tidak terurai alami, tapi sangat berharga untuk didaur ulang. Anorganik!',
    actions: [
      { text: 'Dibuang ke selokan',                   correct: false },
      { text: 'Dikumpulkan untuk dijual ke pengepul', correct: true },
      { text: 'Dicampur tanah agar cepat terurai',    correct: false },
      { text: 'Dibakar di tempat terbuka',            correct: false },
    ],
    actionExplanation: 'Kaleng aluminium sangat berharga! Kumpulkan dan jual ke pengepul atau bank sampah.',
  },
  {
    id: 'det5',
    name: 'Sisa Makanan',
    emoji: '🍛',
    mission: 'Sisa nasi dan sayur ditemukan di tempat sampah campur. Selidiki!',
    category: 0, // Organik
    categoryName: 'Organik',
    clues: [
      { id: 'cl5a', text: 'Berasal dari bahan makanan alami',         isRelevant: true  },
      { id: 'cl5b', text: 'Terurai oleh bakteri dalam beberapa hari', isRelevant: true  },
      { id: 'cl5c', text: 'Bisa diolah menjadi pupuk cair/kompos',    isRelevant: true  },
      { id: 'cl5d', text: 'Mengandung bahan kimia sintetis',          isRelevant: false },
      { id: 'cl5e', text: 'Terbuat dari logam',                       isRelevant: false },
      { id: 'cl5f', text: 'Butuh 500 tahun untuk terurai',            isRelevant: false },
    ],
    conclusion: 'Sisa makanan berasal dari alam dan bisa terurai secara biologis. Ini sampah Organik!',
    actions: [
      { text: 'Dibuang ke sungai agar ikan bisa makan', correct: false },
      { text: 'Dicampur dengan sampah plastik',         correct: false },
      { text: 'Diolah menjadi biogas atau kompos',   correct: true  },
      { text: 'Dibakar di halaman rumah',               correct: false },
    ],
    actionExplanation: 'Sisa makanan bisa diolah menjadi biogas atau kompos yang berguna untuk pertanian!',
  },
  {
    id: 'det6',
    name: 'Buah Busuk',
    emoji: '🍎',
    mission: 'Buah busuk ditemukan di sudut kelas. Selidiki termasuk sampah apa!',
    category: 0, // Organik
    categoryName: 'Organik',
    clues: [
      { id: 'cl6a', text: 'Berasal dari tumbuhan (pohon buah)',        isRelevant: true  },
      { id: 'cl6b', text: 'Mudah membusuk dan bisa terurai alami',     isRelevant: true  },
      { id: 'cl6c', text: 'Bisa diolah menjadi pupuk kompos',          isRelevant: true  },
      { id: 'cl6d', text: 'Terbuat dari bahan plastik',                isRelevant: false },
      { id: 'cl6e', text: 'Mengandung logam berat berbahaya',          isRelevant: false },
      { id: 'cl6f', text: 'Butuh ratusan tahun untuk terurai',         isRelevant: false },
    ],
    conclusion: 'Buah busuk berasal dari tumbuhan dan mudah terurai secara alami. Ini sampah Organik!',
    actions: [
      { text: 'Dibuang ke got agar mengalir',          correct: false },
      { text: 'Diolah menjadi pupuk kompos',        correct: true  },
      { text: 'Dibakar di halaman sekolah',            correct: false },
      { text: 'Dicampur dengan sampah plastik',        correct: false },
    ],
    actionExplanation: 'Buah busuk bisa diolah menjadi pupuk kompos yang menyuburkan tanaman di kebun sekolah!',
  },
  {
    id: 'det7',
    name: 'Kertas Koran',
    emoji: '📰',
    mission: 'Tumpukan koran lama ditemukan di pinggir jalan. Selidiki!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    clues: [
      { id: 'cl7a', text: 'Terbuat dari serat kayu yang diproses',    isRelevant: true  },
      { id: 'cl7b', text: 'Bisa didaur ulang menjadi kertas baru',    isRelevant: true  },
      { id: 'cl7c', text: 'Perlu waktu lama terurai jika menumpuk',   isRelevant: true  },
      { id: 'cl7d', text: 'Mengandung racun kimia berbahaya',         isRelevant: false },
      { id: 'cl7e', text: 'Bisa langsung jadi pupuk seperti daun',    isRelevant: false },
      { id: 'cl7f', text: 'Berbahaya jika disentuh tangan',           isRelevant: false },
    ],
    conclusion: 'Kertas berasal dari kayu yang diproses dan bisa didaur ulang menjadi kertas baru. Ini Anorganik!',
    actions: [
      { text: 'Dibuang ke selokan',                          correct: false },
      { text: 'Dikumpulkan dan dijual ke pengepul kertas', correct: true  },
      { text: 'Dibakar di pekarangan',                       correct: false },
      { text: 'Dicampur dengan sampah makanan',              correct: false },
    ],
    actionExplanation: 'Kertas bekas sangat berharga untuk didaur ulang! Kumpulkan dan jual ke pengepul untuk jadi kertas baru.',
  },
  {
    id: 'det8',
    name: 'Daun Kering',
    emoji: '🍂',
    mission: 'Daun kering berserakan di halaman warga Desa Sukaraja. Selidiki!',
    category: 0, // Organik
    categoryName: 'Organik',
    clues: [
      { id: 'cl8a', text: 'Gugur dari pohon secara alami',            isRelevant: true  },
      { id: 'cl8b', text: 'Terurai oleh cacing dan bakteri tanah',    isRelevant: true  },
      { id: 'cl8c', text: 'Bisa menjadi pupuk kompos yang subur',     isRelevant: true  },
      { id: 'cl8d', text: 'Mengandung plastik di dalamnya',           isRelevant: false },
      { id: 'cl8e', text: 'Butuh ratusan tahun untuk terurai',        isRelevant: false },
      { id: 'cl8f', text: 'Berbahaya jika dimakan hewan',             isRelevant: false },
    ],
    conclusion: 'Daun kering berasal dari alam dan mudah terurai menjadi humus yang menyuburkan tanah. Organik!',
    actions: [
      { text: 'Dibakar agar halaman bersih',          correct: false },
      { text: 'Dibuang ke sungai',                    correct: false },
      { text: 'Dibuat kompos untuk kebun warga',   correct: true  },
      { text: 'Dicampur dengan baterai bekas',        correct: false },
    ],
    actionExplanation: 'Daun kering adalah bahan kompos terbaik! Tumpuk dan biarkan terurai untuk menyuburkan kebun.',
  },
  {
    id: 'det9',
    name: 'Kemasan Sachet',
    emoji: '🛍️',
    mission: 'Banyak kemasan sachet plastik ditemukan di jalan desa. Selidiki!',
    category: 1, // Anorganik
    categoryName: 'Anorganik',
    clues: [
      { id: 'cl9a', text: 'Terbuat dari plastik multi-layer tipis',   isRelevant: true  },
      { id: 'cl9b', text: 'Sangat sulit terurai di alam (100+ tahun)',isRelevant: true  },
      { id: 'cl9c', text: 'Perlu dipilah dan dikirim ke bank sampah', isRelevant: true  },
      { id: 'cl9d', text: 'Bisa langsung dijadikan makanan ikan',     isRelevant: false },
      { id: 'cl9e', text: 'Berasal dari bahan organik seperti daun',  isRelevant: false },
      { id: 'cl9f', text: 'Aman dibuang ke dalam tanah',              isRelevant: false },
    ],
    conclusion: 'Kemasan sachet plastik sulit terurai dan mencemari lingkungan. Ini termasuk sampah Anorganik!',
    actions: [
      { text: 'Dibuang ke sungai atau got',              correct: false },
      { text: 'Dikubur dalam tanah',                     correct: false },
      { text: 'Dipilah dan dibawa ke bank sampah',   correct: true  },
      { text: 'Dibakar agar cepat hilang',               correct: false },
    ],
    actionExplanation: 'Kemasan sachet harus dipilah ke tempat sampah anorganik dan dibawa ke bank sampah atau pengepul!',
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
