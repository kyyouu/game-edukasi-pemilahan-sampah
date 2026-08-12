import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { guessItems } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level3Page.css';

const PTS = 40;

const OPT_STYLES = [
  { label: 'Organik', icon: '🌿', color: '#66BB6A' },
  { label: 'Anorganik', icon: '♻️', color: '#42A5F5' },
  { label: 'B3 (Berbahaya)', icon: '☣️', color: '#EF5350' },
];

export default function Level3Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!state.playerName) navigate('/');
  }, [state.playerName, navigate]);

  const current = guessItems[idx];

  const advanceNext = (nextIdx, currentResults) => {
    if (nextIdx >= guessItems.length) {
      sfx.levelComplete();
      setFinished(true);
    } else {
      setIdx(nextIdx);
      setSelected(null);
      setAnswered(false);
    }
  };

  const handleAnswer = (optIdx) => {
    if (answered) return;
    setSelected(optIdx);
    setAnswered(true);

    const correct = optIdx === current.correct;
    const newResults = [...results, { id: current.id, correct }];
    setResults(newResults);

    if (correct) {
      sfx.correct();
      setScore(p => p + PTS);
      // Auto-advance directly if correct! No need to click next!
      setTimeout(() => {
        advanceNext(idx + 1, newResults);
      }, 750);
    } else {
      sfx.wrong();
    }
  };

  const handleManualNext = () => {
    sfx.click();
    advanceNext(idx + 1, results);
  };

  const handleGoToBoss = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level3', score } });
    navigate('/level/4');
  };

  return (
    <GameLayout currentLevel={3}>
      <div className="level3-container">
        {/* Header */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-purple">🔍 BABAK 3</div>
          <h2 className="level-title">Tebak Jenis Sampah!</h2>
          <p className="level-desc">
            Pertanyaan {idx + 1} dari {guessItems.length} &nbsp;|&nbsp;
            <span className="score-badge" style={{ fontSize: '0.82rem', padding: '2px 10px' }}>⭐ +{score} XP</span>
          </p>
        </div>

        {/* Progress Bar Dots */}
        <div className="progress-dots" style={{ marginBottom: '4px' }}>
          {guessItems.map((_, i) => (
            <div
              key={i}
              className={`prog-dot ${
                i < idx ? 'done' : i === idx ? 'active' : 'todo'
              }`}
            />
          ))}
        </div>

        {!finished ? (
          <div className="l3-card animate-fadeInUp">
            {/* Item Display Box */}
            <div className="l3-item-display">
              <span className="l3-emoji animate-float">{current.emoji}</span>
              <h3 className="l3-item-title">{current.name}</h3>
              <p className="l3-prompt-text">Termasuk jenis sampah apakah barang ini?</p>
            </div>

            {/* Options Buttons */}
            <div className="l3-options-grid">
              {current.options.map((opt, i) => {
                const optInfo = OPT_STYLES[i];
                let cls = '';
                if (answered) {
                  if (i === current.correct) cls = 'opt-correct';
                  else if (i === selected) cls = 'opt-wrong';
                  else cls = 'opt-dim';
                }
                return (
                  <button
                    key={i}
                    id={`l3-opt-${i}`}
                    className={`l3-opt-btn ${cls}`}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                  >
                    <span className="opt-icon">{optInfo.icon}</span>
                    <span className="opt-label">{opt}</span>
                    {cls === 'opt-correct' && <span style={{ fontSize: '1.2rem' }}>✅ Benar!</span>}
                    {cls === 'opt-wrong' && <span style={{ fontSize: '1.2rem' }}>❌ Salah!</span>}
                  </button>
                );
              })}
            </div>

            {/* Explanation Box shown only when wrong so child learns */}
            {answered && selected !== current.correct && (
              <div className="l3-explanation-box animate-fadeInUp">
                <p>💡 Penjelasan: {current.desc}</p>
                <button
                  id="btn-l3-next"
                  className="btn btn-teal btn-full"
                  onClick={handleManualNext}
                >
                  {idx + 1 < guessItems.length ? 'LANJUT SOAL BERIKUTNYA ▶' : 'LIHAT HASIL BABAK 3 🏁'}
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Completion Box */
          <div className="modal-box animate-bounceIn" style={{ maxWidth: '100%' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🏆</div>
            <h3>Babak 3 Selesai!</h3>
            <p>
              Jawaban Benar: <strong>{results.filter(r => r.correct).length}</strong> dari <strong>{guessItems.length}</strong>
            </p>
            <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
              ⭐ Bonus XP: +{score}
            </div>
            <button
              id="btn-l3-boss"
              className="btn btn-red btn-lg btn-full"
              onClick={handleGoToBoss}
            >
              👹 LAWAN DR. SAMPAH (BABAK 4)!
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
