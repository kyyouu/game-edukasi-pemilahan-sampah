// 0 = Organik, 1 = Anorganik, 2 = B3
export const CATEGORIES = [
  { id: 0, name: 'Organik', emoji: '🌿', color: '#2ecc71', bg: '#e8fdf0', border: '#a8f0c6', desc: 'Bisa terurai alami' },
  { id: 1, name: 'Anorganik', emoji: '♻️', color: '#3498db', bg: '#e8f4fd', border: '#a8d5f0', desc: 'Bisa didaur ulang' },
  { id: 2, name: 'B3', emoji: '☣️', color: '#e74c3c', bg: '#fde8e8', border: '#f0a8a8', desc: 'Berbahaya & Beracun' },
];

// Level 2: Drag & drop items
export const dragDropItems = [
  { id: 'd1', name: 'Daun kering', emoji: '🍂', category: 0, hint: 'Daun kering adalah sampah organik!' },
  { id: 'd2', name: 'Botol plastik', emoji: '🧴', category: 1, hint: 'Botol plastik adalah sampah anorganik!' },
  { id: 'd3', name: 'Baterai', emoji: '🔋', category: 2, hint: 'Baterai adalah limbah B3!' },
  { id: 'd4', name: 'Sisa nasi', emoji: '🍚', category: 0, hint: 'Sisa makanan adalah sampah organik!' },
  { id: 'd5', name: 'Kaleng soda', emoji: '🥤', category: 1, hint: 'Kaleng soda adalah sampah anorganik!' },
  { id: 'd6', name: 'Obat kadaluarsa', emoji: '💊', category: 2, hint: 'Obat kadaluarsa adalah limbah B3!' },
  { id: 'd7', name: 'Kulit buah', emoji: '🍊', category: 0, hint: 'Kulit buah adalah sampah organik!' },
  { id: 'd8', name: 'Kertas bekas', emoji: '📄', category: 1, hint: 'Kertas bekas adalah sampah anorganik yang bisa didaur ulang!' },
  { id: 'd9', name: 'Cat bekas', emoji: '🎨', category: 2, hint: 'Cat mengandung bahan kimia berbahaya, termasuk B3!' },
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
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 1,
    desc: 'Botol plastik adalah sampah anorganik yang bisa didaur ulang menjadi produk baru!',
  },
  {
    id: 'g2',
    name: 'Kulit Pisang',
    emoji: '🍌',
    category: 0,
    categoryName: 'Organik',
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 0,
    desc: 'Kulit pisang bisa terurai alami dan dijadikan pupuk kompos!',
  },
  {
    id: 'g3',
    name: 'Baterai Bekas',
    emoji: '🔋',
    category: 2,
    categoryName: 'B3',
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 2,
    desc: 'Baterai mengandung merkuri dan logam berat yang sangat berbahaya!',
  },
  {
    id: 'g4',
    name: 'Daun Kering',
    emoji: '🍂',
    category: 0,
    categoryName: 'Organik',
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 0,
    desc: 'Daun kering adalah sampah organik yang bisa jadi pupuk kompos!',
  },
  {
    id: 'g5',
    name: 'Kaleng Bekas',
    emoji: '🥫',
    category: 1,
    categoryName: 'Anorganik',
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 1,
    desc: 'Kaleng aluminium bisa didaur ulang berkali-kali tanpa kehilangan kualitas!',
  },
  {
    id: 'g6',
    name: 'Kertas',
    emoji: '📰',
    category: 1,
    categoryName: 'Anorganik',
    options: ['Organik', 'Anorganik', 'B3'],
    correct: 1,
    desc: 'Kertas adalah sampah anorganik tapi bisa didaur ulang menjadi kertas baru!',
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
