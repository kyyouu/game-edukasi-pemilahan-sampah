import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { detectiveCases } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level3Page.css';

// Skor per komponen
const PTS_CATEGORY     = 20; // kategori benar
const PTS_ACTION       = 20; // tindakan benar
const PTS_PERFECT_CASE = 10; // bonus kasus sempurna

// Shuffle utility
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const CATEGORY_CONFIG = [
  { id: 0, name: 'Organik',   emoji: '🌿', color: '#27ae60', bg: '#e8fdf0', border: '#27ae60',
    desc: 'Bisa hancur sendiri di tanah' },
  { id: 1, name: 'Anorganik', emoji: '♻️', color: '#2980b9', bg: '#e8f4fd', border: '#2980b9',
    desc: 'Bisa didaur ulang jadi barang baru' },
];

const TOTAL_CASES = 2;

export default function Level3Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  const [gameCases] = useState(() => shuffle(detectiveCases).slice(0, TOTAL_CASES));

  // Global state
  const [caseIdx, setCaseIdx]     = useState(0);
  const [score, setScore]         = useState(0);
  const [results, setResults]     = useState([]);
  const [finished, setFinished]   = useState(false);

  // Per-case state
  const [phase, setPhase]                 = useState('intro');  // intro | kategori | aksi | ringkasan
  const [categoryAnswer, setCategoryAnswer] = useState(null);
  const [actionAnswer, setActionAnswer]   = useState(null);
  const [shuffledActions, setShuffledActions] = useState([]);
  const [caseScore, setCaseScore]         = useState(0);
  const [feedbackMsg, setFeedbackMsg]     = useState('');
  useEffect(() => { if (!state.playerName) navigate('/'); }, [state.playerName, navigate]);

  const currentCase = gameCases[caseIdx];

  const initCase = useCallback((idx) => {
    const c = gameCases[idx];
    if (!c) return;
    setShuffledActions(shuffle(c.actions));
    setCategoryAnswer(null);
    setActionAnswer(null);
    setCaseScore(0);
    setFeedbackMsg('');
    setPhase('intro');
  }, [gameCases]);

  useEffect(() => { initCase(0); }, []); // eslint-disable-line

  // ─── Phase: intro → kategori ──────────────────────────────────────────────
  const handleStart = () => {
    sfx.click();
    setPhase('kategori');
  };

  // ─── Phase: kategori ─────────────────────────────────────────────────────
  const handleCategoryAnswer = (catId) => {
    if (categoryAnswer !== null) return;
    sfx.click();
    setCategoryAnswer(catId);

    const correct = catId === currentCase.category;
    if (correct) {
      sfx.correct();
      setCaseScore(prev => prev + PTS_CATEGORY);
      setFeedbackMsg(`🎉 Benar banget! Ini memang sampah ${CATEGORY_CONFIG[currentCase.category].name}!`);
    } else {
      sfx.wrong();
      setFeedbackMsg(`❌ Hampir! ${currentCase.name} itu sampah ${CATEGORY_CONFIG[currentCase.category].name}.`);
    }

    setTimeout(() => {
      setFeedbackMsg('');
      setPhase('aksi');
    }, 1800);
  };

  // ─── Phase: aksi ─────────────────────────────────────────────────────────
  const handleActionAnswer = (actionIdx) => {
    if (actionAnswer !== null) return;
    sfx.click();
    setActionAnswer(actionIdx);

    const correct = shuffledActions[actionIdx].correct;
    if (correct) {
      sfx.correct();
      setCaseScore(prev => prev + PTS_ACTION);
      setFeedbackMsg('✅ Pilihan yang tepat! Kamu hebat! 🌟');
    } else {
      sfx.wrong();
      const correctAct = shuffledActions.find(a => a.correct);
      setFeedbackMsg(`❌ Hmm, kurang tepat! Yang benar: "${correctAct?.text}"`);
    }

    setTimeout(() => {
      setFeedbackMsg('');
      setPhase('ringkasan');
    }, 1800);
  };

  // ─── Phase: ringkasan → next ──────────────────────────────────────────────
  const handleNextCase = () => {
    sfx.click();

    const catCorrect = categoryAnswer === currentCase.category;
    const actCorrect = actionAnswer !== null && shuffledActions[actionAnswer]?.correct;
    const perfect    = catCorrect && actCorrect;
    const finalScore = caseScore + (perfect ? PTS_PERFECT_CASE : 0);

    setScore(prev => prev + finalScore);
    setResults(prev => [...prev, { id: currentCase.id, perfect, score: finalScore }]);

    if (caseIdx + 1 >= TOTAL_CASES) {
      sfx.levelComplete();
      setTimeout(() => setFinished(true), 300);
    } else {
      const nextIdx = caseIdx + 1;
      setCaseIdx(nextIdx);
      initCase(nextIdx);
    }
  };

  const handleGoToBoss = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level3', score } });
    navigate('/level/4');
  };

  if (!currentCase) return null;

  const catCorrect = categoryAnswer === currentCase.category;
  const actCorrect = actionAnswer !== null && shuffledActions[actionAnswer]?.correct;

  return (
    <GameLayout currentLevel={3}>
      <div className="level3-container">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-purple">🔎 BABAK 3</div>
          <h2 className="level-title">Tebak Sampahku!</h2>
          <p className="level-desc">
            Kasus {caseIdx + 1} dari {TOTAL_CASES} &nbsp;|&nbsp;
            <span className="score-badge" style={{ fontSize: '0.82rem', padding: '2px 10px' }}>
              ⭐ {score} XP
            </span>
          </p>
        </div>

        {/* ── CASE PROGRESS DOTS ──────────────────────────────────── */}
        <div className="progress-dots">
          {gameCases.map((_, i) => (
            <div
              key={i}
              className={`prog-dot ${
                i < caseIdx ? 'done' : i === caseIdx ? 'active' : 'todo'
              }`}
            />
          ))}
        </div>

        {/* ── PHASE INDICATOR (simpel) ─────────────────────────────── */}
        {!finished && (
          <div className="detective-phase-bar">
            {['intro', 'kategori', 'aksi', 'ringkasan'].map((ph, i) => {
              const phaseOrder  = { intro: 0, kategori: 1, aksi: 2, ringkasan: 3 };
              const phaseLabels = ['Kenalan', 'Tebak Jenis', 'Apa Tindakannya?', 'Hasil'];
              const phaseIcons  = ['👀', '🤔', '🛠️', '⭐'];
              const currentOrd  = phaseOrder[phase] ?? 0;
              const isDone   = i < currentOrd;
              const isActive = i === currentOrd;
              return (
                <div key={ph} className={`phase-step ${isDone ? 'phase-done' : isActive ? 'phase-active' : 'phase-locked'}`}>
                  <span className="phase-icon">{phaseIcons[i]}</span>
                  <span className="phase-label">{phaseLabels[i]}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* ── DETECTIVE BOARD ─────────────────────────────────────── */}
        {!finished && (
          <div className="detective-board animate-fadeInUp">

            {/* Gambar / Emoji item */}
            <div className="detective-subject">
              {currentCase.image ? (
                <img
                  src={currentCase.image}
                  alt={currentCase.name}
                  className="detective-item-img animate-float"
                />
              ) : (
                <div className="subject-emoji animate-float">{currentCase.emoji}</div>
              )}
              <div className="subject-name">{currentCase.name}</div>
            </div>

            {/* ── PHASE: INTRO ──────────────────────────────────────── */}
            {phase === 'intro' && (
              <div className="detective-intro animate-bounceIn">
                <div className="mission-badge">📋 KASUS BARU!</div>
                <p className="mission-text">{currentCase.mission}</p>

                {/* Fun Fact bubble - ditampilkan langsung agar anak SD bisa baca santai */}
                {currentCase.funFact && (
                  <div className="funfact-bubble animate-fadeInUp">
                    💡 <strong>Tahukah Kamu?</strong><br/>
                    <span>{currentCase.funFact}</span>
                  </div>
                )}

                <button
                  id={`btn-l3-start-${caseIdx}`}
                  className="btn btn-purple btn-lg btn-full"
                  onClick={handleStart}
                  style={{ marginTop: '6px' }}
                >
                  🔍 YUK TEBAK JENISNYA! ➡️
                </button>
              </div>
            )}

            {/* ── PHASE: KATEGORI ────────────────────────────────────── */}
            {phase === 'kategori' && (
              <div className="detective-category animate-fadeInUp">
                <div className="category-question">
                  <span>🤔</span>
                  <span><strong>{currentCase.name}</strong> termasuk sampah apa?</span>
                </div>

                <div className="category-choice-grid l3-cat-big-grid">
                  {CATEGORY_CONFIG.map(cat => {
                    let cls = '';
                    if (categoryAnswer !== null) {
                      if (cat.id === currentCase.category) cls = 'cat-btn-correct';
                      else if (cat.id === categoryAnswer)  cls = 'cat-btn-wrong';
                      else cls = 'cat-btn-dim';
                    }
                    return (
                      <button
                        key={cat.id}
                        id={`l3-cat-${cat.id}`}
                        className={`detective-cat-btn ${cls}`}
                        style={{ background: cat.bg, borderColor: cat.border }}
                        onClick={() => handleCategoryAnswer(cat.id)}
                        disabled={categoryAnswer !== null}
                      >
                        <span className="dcat-emoji">{cat.emoji}</span>
                        <span className="dcat-name" style={{ color: cat.color }}>{cat.name}</span>
                        <span className="dcat-desc">{cat.desc}</span>
                        {cls === 'cat-btn-correct' && <span className="dcat-mark">✅</span>}
                        {cls === 'cat-btn-wrong'   && <span className="dcat-mark">❌</span>}
                      </button>
                    );
                  })}
                </div>

                {feedbackMsg && (
                  <div className={`detective-feedback ${catCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                    {feedbackMsg}
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE: AKSI ─────────────────────────────────────────── */}
            {phase === 'aksi' && (
              <div className="detective-action animate-fadeInUp">
                {/* Kesimpulan kategori */}
                <div className="action-context">
                  <span
                    className="action-context-badge"
                    style={{
                      background: CATEGORY_CONFIG[currentCase.category].bg,
                      borderColor: CATEGORY_CONFIG[currentCase.category].border,
                      color: CATEGORY_CONFIG[currentCase.category].color,
                    }}
                  >
                    {CATEGORY_CONFIG[currentCase.category].emoji} {CATEGORY_CONFIG[currentCase.category].name}
                  </span>
                  <span>{currentCase.conclusion}</span>
                </div>

                <div className="action-question">
                  🛠️ Terus, <strong>{currentCase.name}</strong> paling baik diapakan?
                </div>

                <div className="action-choices-grid l3-action-big-grid">
                  {shuffledActions.map((act, i) => {
                    let cls = '';
                    if (actionAnswer !== null) {
                      if (act.correct)          cls = 'act-correct';
                      else if (i === actionAnswer) cls = 'act-wrong';
                      else cls = 'act-dim';
                    }
                    return (
                      <button
                        key={i}
                        id={`l3-act-${i}`}
                        className={`action-choice-btn l3-act-big ${cls}`}
                        onClick={() => handleActionAnswer(i)}
                        disabled={actionAnswer !== null}
                      >
                        <span className="act-text">{act.text}</span>
                        {cls === 'act-correct' && <span>✅</span>}
                        {cls === 'act-wrong'   && <span>❌</span>}
                      </button>
                    );
                  })}
                </div>

                {feedbackMsg && (
                  <div className={`detective-feedback ${actCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
                    {feedbackMsg}
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE: RINGKASAN ────────────────────────────────────── */}
            {phase === 'ringkasan' && (
              <div className="detective-summary animate-bounceIn">
                <div className="summary-title">
                  {catCorrect && actCorrect ? '🏆 Kamu Hebat!' : '✅ Kasus Selesai!'}
                </div>

                {/* Penjelasan singkat */}
                <div className="summary-explanation">
                  <span>💡</span>
                  <span>{currentCase.actionExplanation}</span>
                </div>

                {/* Score breakdown simpel */}
                <div className="summary-score-grid">
                  <div className="summary-score-item">
                    <span>🤔 Tebak Jenis</span>
                    <span className="summary-pts">{catCorrect ? PTS_CATEGORY : 0} XP</span>
                  </div>
                  <div className="summary-score-item">
                    <span>🛠️ Tindakan</span>
                    <span className="summary-pts">{actCorrect ? PTS_ACTION : 0} XP</span>
                  </div>
                  {catCorrect && actCorrect && (
                    <div className="summary-score-item summary-bonus">
                      <span>🌟 Bonus Sempurna!</span>
                      <span className="summary-pts">+{PTS_PERFECT_CASE} XP</span>
                    </div>
                  )}
                </div>

                <button
                  id={`btn-l3-next-${caseIdx}`}
                  className="btn btn-purple btn-lg btn-full"
                  onClick={handleNextCase}
                  style={{ marginTop: '8px' }}
                >
                  {caseIdx + 1 < TOTAL_CASES ? '➡️ Kasus Berikutnya!' : '🏁 Lihat Hasil!'}
                </button>
              </div>
            )}

          </div>
        )}

        {/* ── FINISHED — GO TO BOSS ────────────────────────────────── */}
        {finished && (
          <div className="modal-overlay">
            <div className="modal-box animate-bounceIn">
              <div style={{ fontSize: '3.5rem', marginBottom: '8px' }}>🕵️</div>
              <h3>Semua Kasus Selesai!</h3>
              <p>
                Kamu adalah <strong>Pahlawan Lingkungan</strong> Desa Sukaraja! 🌿
              </p>
              <p>
                Kasus sempurna:{' '}
                <strong>{results.filter(r => r.perfect).length}</strong> dari{' '}
                <strong>{TOTAL_CASES}</strong>
              </p>
              <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
                ⭐ Total XP Babak 3: +{score}
              </div>
              <button
                id="btn-l3-boss"
                className="btn btn-red btn-lg btn-full"
                onClick={handleGoToBoss}
              >
                👹 LAWAN DR. SAMPAH (BABAK 4)!
              </button>
            </div>
          </div>
        )}

      </div>
    </GameLayout>
  );
}
