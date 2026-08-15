import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { conveyorItems, CATEGORIES } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level2Page.css';

const ITEM_TIME   = 9;    // detik per item sebelum lolos
const MAX_LIVES   = 3;
const PTS_CORRECT = 20;
const TOTAL_ITEMS = 10; // 10 item, cukup untuk anak SD

// Shuffle array once, ambil 10 item
const SHUFFLED = [...conveyorItems].sort(() => Math.random() - 0.5).slice(0, TOTAL_ITEMS);

const CATEGORY_CONFIG = [
  { id: 0, name: 'Organik',    emoji: '🌿', color: '#2ECC71', shadow: '#1a8a45', bg: '#e8fdf0', border: '#27ae60' },
  { id: 1, name: 'Anorganik',  emoji: '♻️', color: '#3498DB', shadow: '#1a5a9e', bg: '#e8f4fd', border: '#2980b9' },
  { id: 2, name: 'B3',         emoji: '☣️', color: '#E74C3C', shadow: '#922b21', bg: '#fde8e8', border: '#c0392b' },
];

export default function Level2Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  // Game state
  const [phase, setPhase]         = useState('intro'); // intro | playing | choosing | feedback | done
  const [itemIdx, setItemIdx]     = useState(0);
  const [lives, setLives]         = useState(MAX_LIVES);
  const [score, setScore]         = useState(0);
  const [combo, setCombo]         = useState(0);
  const [processed, setProcessed] = useState(0); // berhasil dipilah
  const [feedback, setFeedback]   = useState(null);
  const [itemTimer, setItemTimer] = useState(ITEM_TIME);
  const [isMoving, setIsMoving]   = useState(false); // item bergerak di belt
  const [showCombo, setShowCombo] = useState(false);
  const [floatText, setFloatText] = useState(null); // floating +pts text
  const [choosingItem, setChoosingItem] = useState(null); // item yang sedang dipilih kategori

  const timerRef   = useRef(null);
  const phaseRef   = useRef(phase);
  const livesRef   = useRef(lives);
  const itemIdxRef = useRef(itemIdx);

  useEffect(() => { if (!state.playerName) navigate('/'); }, [state.playerName, navigate]);
  useEffect(() => { phaseRef.current   = phase;   }, [phase]);
  useEffect(() => { livesRef.current   = lives;   }, [lives]);
  useEffect(() => { itemIdxRef.current = itemIdx; }, [itemIdx]);

  const currentItem = SHUFFLED[itemIdx];

  // ─── Start per-item countdown ───────────────────────────────────────────────
  const startItemTimer = useCallback(() => {
    clearInterval(timerRef.current);
    setItemTimer(ITEM_TIME);
    timerRef.current = setInterval(() => {
      setItemTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          // Sampah lolos! Kurangi nyawa
          handleItemMissed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []); // eslint-disable-line

  const stopItemTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  // ─── Item lolos (waktu habis) ────────────────────────────────────────────────
  const handleItemMissed = useCallback(() => {
    if (phaseRef.current !== 'playing') return;
    sfx.wrong();
    setPhase('feedback');
    setCombo(0);
    const newLives = Math.max(0, livesRef.current - 1);
    setLives(newLives);
    const missed = SHUFFLED[itemIdxRef.current];
    setFeedback({
      type: 'missed',
      item: missed,
      text: `⏰ Waduh! ${missed.name} keburu lewat! ${missed.hint}`,
    });
    setTimeout(() => advanceToNextItem(newLives), 2500);
  }, []); // eslint-disable-line

  // ─── Advance ke item berikutnya ─────────────────────────────────────────────
  const advanceToNextItem = useCallback((currentLives) => {
    const nextIdx = itemIdxRef.current + 1;
    if (nextIdx >= TOTAL_ITEMS || currentLives <= 0) {
      sfx.levelComplete();
      setPhase('done');
      return;
    }
    setPhase('playing');
    setFeedback(null);
    setChoosingItem(null);
    setIsMoving(true);
    setItemIdx(nextIdx);
    setTimeout(() => {
      setIsMoving(false);
      startItemTimer();
    }, 800);
  }, [startItemTimer]);

  // ─── START GAME ──────────────────────────────────────────────────────────────
  const handleStart = () => {
    sfx.click();
    setPhase('playing');
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
      startItemTimer();
    }, 800);
  };

  // ─── Pemain klik item di conveyor ────────────────────────────────────────────
  const handleItemClick = () => {
    if (phase !== 'playing') return;
    sfx.click();
    stopItemTimer();
    setPhase('choosing');
    setChoosingItem(currentItem);
  };

  // ─── Pemain pilih kategori ───────────────────────────────────────────────────
  const handleCategorySelect = (catId) => {
    if (phase !== 'choosing' || !choosingItem) return;
    const correct = choosingItem.category === catId;

    if (correct) {
      sfx.correct();
      const newCombo = combo + 1;
      setCombo(newCombo);
      const pts = PTS_CORRECT + (newCombo > 1 ? (newCombo - 1) * 5 : 0);
      setScore(prev => prev + pts);
      setProcessed(prev => prev + 1);

      if (newCombo >= 2) {
        sfx.combo();
        setShowCombo(true);
        setTimeout(() => setShowCombo(false), 1200);
      }
      setFloatText(`+${pts} XP`);
      setTimeout(() => setFloatText(null), 900);

      setFeedback({
        type: 'correct',
        item: choosingItem,
        catId,
        text: `✅ Benar! ${choosingItem.name} → ${CATEGORY_CONFIG[catId].name}!${newCombo >= 2 ? ` 🔥 Combo x${newCombo}!` : ''}`,
      });
      setPhase('feedback');
      setTimeout(() => advanceToNextItem(livesRef.current), 1600);
    } else {
      sfx.wrong();
      setCombo(0);
      const newLives = Math.max(0, livesRef.current - 1);
      setLives(newLives);
      setFeedback({
        type: 'wrong',
        item: choosingItem,
        catId,
        text: `❌ Kurang Tepat! ${choosingItem.name} masuk ${CATEGORY_CONFIG[choosingItem.category].name}. ${choosingItem.hint}`,
      });
      setPhase('feedback');
      setTimeout(() => advanceToNextItem(newLives), 2500);
    }
  };

  const handleNextLevel = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level2', score } });
    navigate('/level/3');
  };

  // Cleanup on unmount
  useEffect(() => () => clearInterval(timerRef.current), []);

  const timerPct = (itemTimer / ITEM_TIME) * 100;
  const progressPct = (itemIdx / TOTAL_ITEMS) * 100;

  return (
    <GameLayout currentLevel={2}>
      <div className="level2-container">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-teal">♻️ BABAK 2</div>
          <h2 className="level-title">Pabrik Pilah Sampah!</h2>
          <p className="level-desc">
            Klik sampah di conveyor lalu pilih kategorinya yang benar!
          </p>
        </div>

        {/* ── STATS BAR ───────────────────────────────────────────── */}
        <div className="factory-stats-bar">
          {/* Lives */}
          <div className="factory-stat-item">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} className={`life-heart ${i < lives ? 'life-alive' : 'life-dead'}`}>
                {i < lives ? '❤️' : '🖤'}
              </span>
            ))}
          </div>

          {/* Score */}
          <div className="factory-stat-score">
            <span>⭐</span>
            <span>{score} XP</span>
          </div>

          {/* Progress */}
          <div className="factory-stat-item" style={{ minWidth: 80, textAlign: 'right' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800 }}>
              {itemIdx + (phase === 'done' ? 0 : 0)} / {TOTAL_ITEMS}
            </span>
          </div>
        </div>

        {/* ── PROGRESS BAR (overall) ───────────────────────────────── */}
        <div className="factory-progress-bar-bg">
          <div className="factory-progress-bar-fill" style={{ width: `${progressPct}%` }} />
          <span className="factory-progress-label">
            {processed} Sampah Dipilah
          </span>
        </div>

        {/* ── INTRO CARD ──────────────────────────────────────────── */}
        {phase === 'intro' && (
          <div className="factory-intro-card animate-bounceIn">
            <div style={{ fontSize: '4rem' }}>🏭</div>
            <h3>Pabrik Pilah Sampah Desa Sukaraja</h3>
            <p>
              Sampah dari seluruh desa datang lewat <strong>conveyor belt</strong>!
              Kamu harus <strong>mengklik sampah</strong> sebelum lolos,
              lalu pilih kategori yang benar: Organik, Anorganik, atau B3.
            </p>
            <div className="intro-rules-row">
              <div className="intro-rule">⏰ <strong>{ITEM_TIME}s</strong><br/>per sampah</div>
              <div className="intro-rule">❤️ <strong>{MAX_LIVES}</strong><br/>nyawa</div>
              <div className="intro-rule">📦 <strong>{TOTAL_ITEMS}</strong><br/>sampah</div>
              <div className="intro-rule">🔥 <strong>Combo</strong><br/>bonus XP!</div>
            </div>
            <button
              id="btn-l2-start"
              className="btn btn-teal btn-lg btn-full"
              onClick={handleStart}
            >
              ▶ MULAI PILAH SAMPAH!
            </button>
          </div>
        )}

        {/* ── CONVEYOR AREA ────────────────────────────────────────── */}
        {(phase === 'playing' || phase === 'choosing' || phase === 'feedback') && (
          <div className="conveyor-scene-wrap">

            {/* Per-item timer bar */}
            {phase === 'playing' && (
              <div className={`item-timer-bar-bg ${itemTimer <= 3 ? 'urgent' : ''}`}>
                <div
                  className="item-timer-bar-fill"
                  style={{
                    width: `${timerPct}%`,
                    background: timerPct > 50
                      ? 'linear-gradient(90deg, #2ECC71, #FFC107)'
                      : timerPct > 25
                        ? 'linear-gradient(90deg, #FFC107, #FF7043)'
                        : 'linear-gradient(90deg, #FF5252, #B71C1C)',
                  }}
                />
                <span className={`item-timer-label ${itemTimer <= 3 ? 'urgent-text' : ''}`}>
                  ⏱ {itemTimer}s
                </span>
              </div>
            )}

            {/* ── ROAD SCENE ROW: Truk | Belt | TPS ── */}
            <div className="road-scene-row">

              {/* Truk kiri */}
              <div className="truck-area">
                <div className="truck-icon-wrap">
                  <span className="truck-emoji">🚛</span>
                </div>
                <div className="truck-label">Sampah<br/>Masuk</div>
              </div>

              {/* Conveyor Belt (jalan tengah) */}
              <div className="conveyor-track">
                {/* Belt texture lines */}
                <div className="belt-lines">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="belt-line" />
                  ))}
                </div>

                {/* The item on the belt */}
                {currentItem && phase !== 'done' && (
                  <div
                    className={`conveyor-item-wrapper ${isMoving ? 'item-entering' : ''} ${phase === 'choosing' ? 'item-stopped' : ''}`}
                  >
                    <button
                      id={`conveyor-item-${currentItem.id}`}
                      className={`conveyor-item-btn ${phase === 'playing' ? 'clickable' : ''} ${phase === 'feedback' && feedback?.type === 'correct' ? 'item-correct' : ''} ${phase === 'feedback' && (feedback?.type === 'wrong' || feedback?.type === 'missed') ? 'item-wrong' : ''}`}
                      onClick={handleItemClick}
                      disabled={phase !== 'playing'}
                    >
                      <span className="conveyor-item-emoji">{currentItem.emoji}</span>
                      <span className="conveyor-item-name">{currentItem.name}</span>
                      {phase === 'playing' && (
                        <span className="conveyor-click-hint">Klik!</span>
                      )}
                    </button>
                  </div>
                )}

                {/* Conveyor rollers */}
                <div className="belt-roller belt-roller-left" />
                <div className="belt-roller belt-roller-right" />
              </div>

              {/* TPS kanan */}
              <div className="tps-area">
                <div className="tps-building">
                  <span className="tps-emoji">🏭</span>
                  <div className="tps-windows">
                    <span>▪</span><span>▪</span>
                    <span>▪</span><span>▪</span>
                  </div>
                </div>
                <div className="tps-sign-badge">TPS<br/>Desa</div>
              </div>

            </div>

            {/* ── JALAN di bawah belt ── */}
            <div className="road-ground">
              <div className="road-stripe road-stripe-left" />
              <div className="road-center-line">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="road-dash" />
                ))}
              </div>
              <div className="road-stripe road-stripe-right" />
            </div>

          </div>
        )}

        {/* ── FEEDBACK BANNER ──────────────────────────────────────── */}
        {feedback && phase === 'feedback' && (
          <div className={`factory-feedback ${feedback.type === 'correct' ? 'feedback-correct' : 'feedback-wrong'}`}>
            {feedback.text}
          </div>
        )}

        {/* ── COMBO FLASH ─────────────────────────────────────────── */}
        {showCombo && combo >= 2 && (
          <div className="combo-flash animate-bounceIn">
            🔥 COMBO x{combo}! +{(combo - 1) * 5} BONUS XP!
          </div>
        )}

        {/* ── FLOAT SCORE ─────────────────────────────────────────── */}
        {floatText && (
          <div className="float-pts animate-floatUp">{floatText}</div>
        )}

        {/* ── CATEGORY CHOICE PANEL ────────────────────────────────── */}
        {phase === 'choosing' && choosingItem && (
          <div className="category-panel animate-fadeInUp">
            <div className="category-panel-title">
              <span className="category-item-preview">{choosingItem.emoji}</span>
              <span>Masukkan <strong>{choosingItem.name}</strong> ke mana?</span>
            </div>
            <div className="category-buttons-grid">
              {CATEGORY_CONFIG.map(cat => (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  className="cat-choice-btn"
                  style={{
                    background: cat.bg,
                    borderColor: cat.border,
                    boxShadow: `0 5px 0 ${cat.shadow}`,
                  }}
                  onClick={() => handleCategorySelect(cat.id)}
                >
                  <span className="cat-emoji">{cat.emoji}</span>
                  <span className="cat-name" style={{ color: cat.color }}>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── DONE MODAL ───────────────────────────────────────────── */}
        {phase === 'done' && (
          <div className="modal-overlay">
            <div className="modal-box animate-bounceIn">
              <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
                {lives > 0 ? '🏆' : '💪'}
              </div>
              <h3>{lives > 0 ? 'Pabrik Bersih!' : 'Nyawa Habis!'}</h3>
              <p>
                Kamu berhasil memilah{' '}
                <strong>{processed}</strong> dari{' '}
                <strong>{TOTAL_ITEMS}</strong> sampah dengan benar!
              </p>
              {combo >= 3 && (
                <p style={{ color: '#e67e22', fontWeight: 900 }}>
                  🔥 Kombo tertinggi: x{combo}
                </p>
              )}
              <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
                ⭐ Total XP Babak 2: +{score}
              </div>
              <button
                id="btn-l2-next"
                className="btn btn-teal btn-lg btn-full"
                onClick={handleNextLevel}
              >
                🔎 LANJUT BABAK 3 – DETEKTIF SAMPAH!
              </button>
            </div>
          </div>
        )}

      </div>
    </GameLayout>
  );
}
