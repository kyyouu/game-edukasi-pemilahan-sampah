import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { useTimer } from '../hooks/useTimer';
import { scatteredTrash } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level1Page.css';

const TOTAL_TIME = 40;
const MAX_SCORE = 200;

export default function Level1Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [trashItems, setTrashItems] = useState(() =>
    scatteredTrash.map((t, i) => ({
      ...t,
      position: {
        x: 10 + (i % 4) * 22 + Math.random() * 8,
        y: 20 + Math.floor(i / 4) * 26 + Math.random() * 8,
      },
      collected: false,
      popping: false,
    }))
  );
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [combo, setCombo] = useState(0);
  const [floatScore, setFloatScore] = useState(null);

  useEffect(() => {
    if (!state.playerName) navigate('/');
  }, [state.playerName, navigate]);

  const handleTimeEnd = useCallback(() => {
    sfx.levelComplete();
    setGameOver(true);
  }, []);

  const { seconds, start } = useTimer(TOTAL_TIME, handleTimeEnd);

  const remaining = trashItems.filter(t => !t.collected).length;
  const collected = trashItems.filter(t => t.collected).length;
  const timePercent = (seconds / TOTAL_TIME) * 100;
  const isAllCleaned = remaining === 0;

  useEffect(() => {
    if (isAllCleaned && started) {
      sfx.levelComplete();
      setGameOver(true);
    }
  }, [isAllCleaned, started]);

  const collectTrash = (id) => {
    if (gameOver || !started) return;

    sfx.collect();
    if (combo >= 2) sfx.combo();

    setTrashItems(prev =>
      prev.map(t => (t.id === id && !t.collected ? { ...t, popping: true } : t))
    );

    setTimeout(() => {
      setTrashItems(prev =>
        prev.map(t => (t.id === id ? { ...t, collected: true, popping: false } : t))
      );
    }, 350);

    const pts = 10 + combo * 2;
    setScore(prev => Math.min(prev + pts, MAX_SCORE));
    setCombo(prev => prev + 1);
    setFloatScore(pts);
    setTimeout(() => setFloatScore(null), 700);

    clearTimeout(window._comboTimer);
    window._comboTimer = setTimeout(() => setCombo(0), 1800);
  };

  const handleNext = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level1', score } });
    navigate('/level/2');
  };

  return (
    <GameLayout currentLevel={1}>
      <div className="level1-container">
        {/* Level Header */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-yellow">🧹 BABAK 1</div>
          <h2 className="level-title">Bersihkan Sampah Jalanan!</h2>
          <p className="level-desc">
            Klik atau tekan semua sampah yang mengotori jalanan Desa Sukaraja!
          </p>
        </div>

        {/* Stats Header */}
        <div className="l1-stats-bar">
          <div className={`l1-stat-item ${seconds <= 10 ? 'urgent' : ''}`}>
            <span>⏰</span>
            <span>{seconds}d</span>
          </div>

          <div className="l1-timer-box">
            <div className="timer-bar">
              <div className="timer-fill" style={{ width: `${timePercent}%` }} />
            </div>
          </div>

          <div className="l1-stat-item">
            <span>🗑️ Sisa:</span>
            <strong>{remaining}</strong>
          </div>

          <div className="l1-stat-item">
            <span>⭐ XP:</span>
            <strong>{score}</strong>
          </div>

          {combo > 1 && <div className="combo-badge">🔥 Combo x{combo}!</div>}
        </div>

        {/* Play Field */}
        {!started ? (
          <div className="l1-start-card animate-bounceIn">
            <div style={{ fontSize: '4rem' }}>🏫</div>
            <h3>Jalanan Desa Sukaraja Kotor!</h3>
            <p>
              Ada <strong>{scatteredTrash.length} sampah</strong> berserakan. Bersihkan semuanya sebelum waktu <strong>{TOTAL_TIME} detik</strong> habis!
            </p>
            <button
              id="btn-l1-start"
              className="btn btn-teal btn-lg btn-full"
              style={{ marginTop: '12px' }}
              onClick={() => {
                sfx.click();
                setStarted(true);
                start();
              }}
            >
              ▶ MULAI BERSIH-BERSIH!
            </button>
          </div>
        ) : (
          <div className="l1-field-card">
            <div className="l1-road-field">
              <div className="road-bottom-grass" />
              {trashItems.map(
                item =>
                  !item.collected && (
                    <button
                      key={item.id}
                      id={`trash-${item.id}`}
                      className={`l1-trash-btn ${item.popping ? 'popping' : ''}`}
                      style={{ left: `${item.position.x}%`, top: `${item.position.y}%` }}
                      onClick={() => collectTrash(item.id)}
                    >
                      <span className="l1-trash-emoji">{item.emoji}</span>
                      <span className="l1-trash-name">{item.name}</span>
                    </button>
                  )
              )}
              {floatScore && <div className="l1-float-score">+{floatScore} XP</div>}
            </div>
          </div>
        )}
      </div>

      {/* Modal Completion */}
      {gameOver && (
        <div className="modal-overlay">
          <div className="modal-box animate-bounceIn">
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>
              {isAllCleaned ? '🏆' : '⏰'}
            </div>
            <h3>{isAllCleaned ? 'Luar Biasa!' : 'Waktu Habis!'}</h3>
            <p>
              Kamu berhasil membersihkan <strong>{collected}</strong> dari <strong>{scatteredTrash.length}</strong> sampah!
            </p>
            <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
              ⭐ Total XP: +{score}
            </div>
            <button
              id="btn-l1-next"
              className="btn btn-teal btn-lg btn-full"
              onClick={handleNext}
            >
              ▶ LANJUT BABAK 2!
            </button>
          </div>
        </div>
      )}
    </GameLayout>
  );
}
