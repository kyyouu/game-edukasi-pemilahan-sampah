import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { dragDropItems, CATEGORIES } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level2Page.css';

const CATEGORY_STYLES = [
  { ...CATEGORIES[0], bg: '#E8F5E9', badgeBg: 'var(--green)', color: 'white', labelDesc: '🌱 Sampah Organik (Sisa Makanan & Daun)' },
  { ...CATEGORIES[1], bg: '#E3F2FD', badgeBg: 'var(--blue)', color: 'white', labelDesc: '📦 Sampah Anorganik (Plastik & Botol)' },
  { ...CATEGORIES[2], bg: '#FFEBEE', badgeBg: 'var(--red)', color: 'white', labelDesc: '☣️ Sampah B3 (Berbahaya & Lampu)' },
];

export default function Level2Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [items] = useState(() => [...dragDropItems].sort(() => Math.random() - 0.5));
  const [binItems, setBinItems] = useState({ 0: [], 1: [], 2: [] });
  const [dragging, setDragging] = useState(null);
  const [dragOverBin, setDragOverBin] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shakeItem, setShakeItem] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!state.playerName) navigate('/');
  }, [state.playerName, navigate]);

  const placed = Object.values(binItems).flat();
  const remaining = items.filter(i => !placed.includes(i.id));

  useEffect(() => {
    if (remaining.length === 0 && items.length > 0) {
      sfx.levelComplete();
      setTimeout(() => setCompleted(true), 500);
    }
  }, [remaining.length, items.length]);

  const processPlacement = (itemId, catId) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const isCorrect = item.category === catId;
    if (isCorrect) {
      sfx.correct();
      setBinItems(prev => ({ ...prev, [catId]: [...prev[catId], itemId] }));
      setScore(prev => prev + 30);
      setFeedback({
        correct: true,
        text: `✅ Benar! ${item.name} masuk ke Tong ${CATEGORY_STYLES[catId].name}! (+30 XP)`,
      });
    } else {
      sfx.wrong();
      setShakeItem(itemId);
      setTimeout(() => setShakeItem(null), 500);
      setFeedback({
        correct: false,
        text: `❌ Kurang Tepat! ${item.name} harusnya masuk Tong ${CATEGORY_STYLES[item.category].name}. ${item.hint}`,
      });
    }

    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDragStart = (e, id) => {
    setDragging(id);
    setSelected(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDragEnd = () => {
    setDragging(null);
    setDragOverBin(null);
  };

  const handleDragOver = (e, catId) => {
    e.preventDefault();
    setDragOverBin(catId);
  };

  const handleDragLeave = () => setDragOverBin(null);

  const handleDrop = (e, catId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    processPlacement(itemId, catId);
    setDragOverBin(null);
    setDragging(null);
    setSelected(null);
  };

  const handleItemClick = (id) => {
    sfx.click();
    setSelected(prev => (prev === id ? null : id));
  };

  const handleBinClick = (catId) => {
    if (!selected) return;
    processPlacement(selected, catId);
    setSelected(null);
  };

  const handleNextLevel = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level2', score } });
    navigate('/level/3');
  };

  const selectedItemObj = items.find(i => i.id === selected);

  return (
    <GameLayout currentLevel={2}>
      <div className="level2-container">
        {/* Header */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-teal">♻️ BABAK 2</div>
          <h2 className="level-title">Pilah Sampah dengan Benar!</h2>
          <p className="level-desc">
            Selesai: <strong>{placed.length} / {items.length} Sampah</strong> &nbsp;|&nbsp;
            <span className="score-badge" style={{ fontSize: '0.82rem', padding: '2px 10px' }}>⭐ +{score} XP</span>
          </p>
        </div>

        {/* Kids Friendly Guide Banner */}
        <div className="l2-guide-banner">
          {selectedItemObj ? (
            <span>👉 <strong>{selectedItemObj.name}</strong> terpilih! Sekarang sentuh/klik Tong Sampah yang cocok di bawah! 👇</span>
          ) : (
            <span>💡 <strong>Cara Main:</strong> Sentuh/klik sampah lalu pilih Tong Sampah, ATAU seret (drag & drop) sampah ke tong!</span>
          )}
        </div>

        {/* Feedback Banner */}
        {feedback && (
          <div
            className={`feedback-banner ${
              feedback.correct ? 'feedback-correct' : 'feedback-wrong'
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Bins Row */}
        <div className="l2-bins-grid">
          {CATEGORY_STYLES.map(cat => (
            <div
              key={cat.id}
              id={`bin-${cat.id}`}
              className={`l2-bin-card ${
                dragOverBin === cat.id ? 'bin-over' : ''
              } ${selected ? 'bin-target' : ''}`}
              style={{ background: cat.bg }}
              onDragOver={e => handleDragOver(e, cat.id)}
              onDragLeave={handleDragLeave}
              onDrop={e => handleDrop(e, cat.id)}
              onClick={() => handleBinClick(cat.id)}
            >
              <div
                className="bin-header-badge"
                style={{ background: cat.badgeBg, color: cat.color }}
              >
                {cat.name}
              </div>
              <div className="bin-emoji-display">{cat.emoji}</div>
              <div className="bin-desc-text">{cat.desc}</div>
              <div className="bin-item-count">
                {binItems[cat.id].length} Sampah Terkumpul
              </div>

              <div className="bin-collected-chips">
                {binItems[cat.id].map(id => {
                  const it = items.find(i => i.id === id);
                  return it ? (
                    <span key={id} className="bin-chip" title={it.name}>
                      {it.emoji}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Items Pool Card */}
        <div className="l2-items-card">
          <div className="l2-items-header">
            <span>📦 Sampah yang Belum Dipilah:</span>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-medium)' }}>
              ({remaining.length} Tersisa)
            </span>
          </div>

          <div className="l2-items-flex">
            {items.map(item => {
              if (placed.includes(item.id)) return null;
              return (
                <div
                  key={item.id}
                  id={`item-${item.id}`}
                  className={`l2-item-box ${
                    dragging === item.id ? 'dragging' : ''
                  } ${selected === item.id ? 'selected' : ''} ${
                    shakeItem === item.id ? 'animate-shake' : ''
                  }`}
                  draggable
                  onDragStart={e => handleDragStart(e, item.id)}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleItemClick(item.id)}
                >
                  <span className="l2-item-emoji">{item.emoji}</span>
                  <span className="l2-item-name">{item.name}</span>
                </div>
              );
            })}

            {remaining.length === 0 && (
              <div style={{ textAlign: 'center', width: '100%', padding: '16px', fontWeight: 900, color: 'var(--teal-dark)', fontSize: '1.2rem' }}>
                🎉 Hore! Semua sampah berhasil kamu pilah dengan rapi!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {completed && (
        <div className="modal-overlay">
          <div className="modal-box animate-bounceIn">
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🎊</div>
            <h3>Pemilahan Sampah Selesai!</h3>
            <p>
              Hebat sekali! Sampah Desa Sukaraja telah terpilah dengan rapi!
            </p>
            <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
              ⭐ Total XP Babak 2: +{score}
            </div>
            <button
              id="btn-l2-next"
              className="btn btn-teal btn-lg btn-full"
              onClick={handleNextLevel}
            >
              ▶ LANJUT BABAK 3!
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  );
}
