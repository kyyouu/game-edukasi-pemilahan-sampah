import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { detectiveCases, CATEGORIES } from '../data/trashItems';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level3Page.css';

// Skor per komponen kasus
const PTS_CLUE_CORRECT   = 5;  // per petunjuk relevan yang benar dipilih
const PTS_CATEGORY        = 15; // kategori benar
const PTS_ACTION          = 15; // tindakan benar
const PTS_PERFECT_CASE    = 10; // bonus kasus sempurna

// Shuffle utility
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

const CATEGORY_CONFIG = [
  { id: 0, name: 'Organik',   emoji: '🌿', color: '#27ae60', bg: '#e8fdf0', border: '#27ae60' },
  { id: 1, name: 'Anorganik', emoji: '♻️', color: '#2980b9', bg: '#e8f4fd', border: '#2980b9' },
];

const TOTAL_CASES = 2; // 2 kasus untuk babak 3
const CLUES_TO_SELECT = 3;

export default function Level3Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();

  // Shuffle 2 kasus secara acak per game session
  const [gameCases] = useState(() => shuffle(detectiveCases).slice(0, TOTAL_CASES));

  // ─── Global state ─────────────────────────────────────────────────────────
  const [caseIdx, setCaseIdx]           = useState(0);
  const [score, setScore]               = useState(0);
  const [results, setResults]           = useState([]); // array per-kasus
  const [finished, setFinished]         = useState(false);

  // ─── Per-case state ────────────────────────────────────────────────────────
  const [phase, setPhase]               = useState('intro');    // intro | clues | category | action | summary
  const [shuffledClues, setShuffledClues] = useState([]);
  const [selectedClues, setSelectedClues] = useState([]);       // array of clue IDs
  const [wrongClues, setWrongClues]     = useState([]);         // IDs petunjuk salah yang dipilih
  const [categoryAnswer, setCategoryAnswer] = useState(null);
  const [actionAnswer, setActionAnswer] = useState(null);
  const [shuffledActions, setShuffledActions] = useState([]);
  const [caseScore, setCaseScore]       = useState(0);
  const [isPerfect, setIsPerfect]       = useState(false);
  const [feedbackMsg, setFeedbackMsg]   = useState('');

  useEffect(() => { if (!state.playerName) navigate('/'); }, [state.playerName, navigate]);

  const currentCase = gameCases[caseIdx];

  // Inisialisasi kasus baru
  const initCase = useCallback((idx) => {
    const c = gameCases[idx];
    if (!c) return;
    setShuffledClues(shuffle(c.clues));
    setShuffledActions(shuffle(c.actions));
    setSelectedClues([]);
    setWrongClues([]);
    setCategoryAnswer(null);
    setActionAnswer(null);
    setCaseScore(0);
    setIsPerfect(false);
    setFeedbackMsg('');
    setPhase('intro');
  }, [gameCases]);

  useEffect(() => {
    initCase(0);
  }, []); // eslint-disable-line

  // ─── Phase: intro → clues ─────────────────────────────────────────────────
  const handleStartInvestigation = () => {
    sfx.click();
    setPhase('clues');
  };

  // ─── Phase: clues — pilih petunjuk ────────────────────────────────────────
  const handleClueSelect = (clue) => {
    if (selectedClues.includes(clue.id) || selectedClues.length >= CLUES_TO_SELECT) return;
    sfx.click();

    const newSelected = [...selectedClues, clue.id];
    setSelectedClues(newSelected);

    if (!clue.isRelevant) {
      // Petunjuk salah — tandai merah
      setWrongClues(prev => [...prev, clue.id]);
    } else {
      // Petunjuk benar
      setCaseScore(prev => prev + PTS_CLUE_CORRECT);
    }

    if (newSelected.length >= CLUES_TO_SELECT) {
      // Semua petunjuk sudah dipilih, tampilkan kesimpulan sebentar lalu ke kategori
      sfx.correct();
      setTimeout(() => setPhase('category'), 1200);
    }
  };

  // ─── Phase: category — pilih kategori ─────────────────────────────────────
  const handleCategoryAnswer = (catId) => {
    if (categoryAnswer !== null) return;
    sfx.click();
    setCategoryAnswer(catId);

    const correct = catId === currentCase.category;
    if (correct) {
      sfx.correct();
      setCaseScore(prev => prev + PTS_CATEGORY);
      setFeedbackMsg(`✅ Benar! Ini memang sampah ${CATEGORY_CONFIG[currentCase.category].name}!`);
    } else {
      sfx.wrong();
      setFeedbackMsg(`❌ Kurang tepat. ${currentCase.name} adalah sampah ${CATEGORY_CONFIG[currentCase.category].name}.`);
    }

    setTimeout(() => {
      setFeedbackMsg('');
      setPhase('action');
    }, 1600);
  };

  // ─── Phase: action — pilih tindakan ───────────────────────────────────────
  const handleActionAnswer = (actionIdx) => {
    if (actionAnswer !== null) return;
    sfx.click();
    setActionAnswer(actionIdx);

    const correct = shuffledActions[actionIdx].correct;
    if (correct) {
      sfx.correct();
      setCaseScore(prev => prev + PTS_ACTION);
      setFeedbackMsg('✅ Pilihan tindakan yang tepat!');
    } else {
      sfx.wrong();
      const correctAct = shuffledActions.find(a => a.correct);
      setFeedbackMsg(`❌ Kurang tepat. Tindakan yang benar: "${correctAct?.text}"`);
    }

    setTimeout(() => {
      setFeedbackMsg('');
      setPhase('summary');
    }, 1600);
  };

  // ─── Phase: summary → next case ──────────────────────────────────────────
  const handleNextCase = () => {
    sfx.click();

    // Hitung apakah sempurna (semua petunjuk relevan + kategori + tindakan benar)
    const noWrongClues    = wrongClues.length === 0;
    const catCorrect      = categoryAnswer === currentCase.category;
    const actCorrect      = actionAnswer !== null && shuffledActions[actionAnswer]?.correct;
    const perfect         = noWrongClues && catCorrect && actCorrect;
    const finalCaseScore  = caseScore + (perfect ? PTS_PERFECT_CASE : 0);

    setIsPerfect(perfect);
    setScore(prev => prev + finalCaseScore);
    setResults(prev => [...prev, { id: currentCase.id, perfect, score: finalCaseScore }]);

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

  // ─── Helpers ──────────────────────────────────────────────────────────────
  const relevantCount     = selectedClues.filter(id => {
    const cl = currentCase?.clues.find(c => c.id === id);
    return cl?.isRelevant;
  }).length;
  const progressPct = ((caseIdx) / TOTAL_CASES) * 100;

  if (!currentCase) return null;

  return (
    <GameLayout currentLevel={3}>
      <div className="level3-container">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-purple">🔎 BABAK 3</div>
          <h2 className="level-title">Detektif Sampah!</h2>
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

        {/* ── PHASE INDICATOR ─────────────────────────────────────── */}
        {!finished && (
          <div className="detective-phase-bar">
            {['intro', 'clues', 'category', 'action', 'summary'].map((ph, i) => {
              const phaseOrder = { intro: 0, clues: 1, category: 2, action: 3, summary: 4 };
              const phaseLabels = ['Kasus', 'Petunjuk', 'Kategori', 'Tindakan', 'Ringkasan'];
              const phaseIcons  = ['📋', '🔍', '🗂️', '🛠️', '⭐'];
              const currentOrd  = phaseOrder[phase] ?? 0;
              const isDone = i < currentOrd;
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

            {/* Case object display */}
            <div className="detective-subject">
              <div className="subject-emoji animate-float">{currentCase.emoji}</div>
              <div className="subject-name">{currentCase.name}</div>
            </div>

            {/* ── PHASE: INTRO ──────────────────────────────────────── */}
            {phase === 'intro' && (
              <div className="detective-intro animate-bounceIn">
                <div className="mission-badge">📋 KASUS BARU</div>
                <p className="mission-text">{currentCase.mission}</p>
                <p className="mission-instruction">
                  🔍 Cari <strong>3 petunjuk</strong> yang relevan untuk menentukan
                  jenis dan pengelolaan sampah ini!
                </p>
                <button
                  id={`btn-l3-investigate-${caseIdx}`}
                  className="btn btn-purple btn-lg btn-full"
                  onClick={handleStartInvestigation}
                >
                  🔎 MULAI INVESTIGASI!
                </button>
              </div>
            )}

            {/* ── PHASE: CLUES ──────────────────────────────────────── */}
            {phase === 'clues' && (
              <div className="detective-clues">
                <div className="clues-header">
                  <span className="clues-title">🔍 Pilih 3 Petunjuk yang Relevan:</span>
                  <span className={`clues-count ${selectedClues.length >= CLUES_TO_SELECT ? 'count-done' : ''}`}>
                    {selectedClues.length} / {CLUES_TO_SELECT}
                  </span>
                </div>

                {/* Progress dots for clues */}
                <div className="clue-progress-dots">
                  {Array.from({ length: CLUES_TO_SELECT }).map((_, i) => (
                    <div key={i} className={`clue-dot ${i < selectedClues.length ? 'clue-dot-filled' : ''}`} />
                  ))}
                </div>

                <div className="clue-cards-grid">
                  {shuffledClues.map((clue, i) => {
                    const isSelected = selectedClues.includes(clue.id);
                    const isWrong    = wrongClues.includes(clue.id);
                    return (
                      <button
                        key={clue.id}
                        id={`clue-${clue.id}`}
                        className={`clue-card ${isSelected ? (isWrong ? 'clue-wrong' : 'clue-correct') : ''} ${!isSelected && selectedClues.length >= CLUES_TO_SELECT ? 'clue-disabled' : ''}`}
                        onClick={() => handleClueSelect(clue)}
                        disabled={isSelected || selectedClues.length >= CLUES_TO_SELECT}
                      >
                        <span className="clue-num">{i + 1}</span>
                        <span className="clue-text">{clue.text}</span>
                        {isSelected && (
                          <span className="clue-mark">{isWrong ? '❌' : '✅'}</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedClues.length >= CLUES_TO_SELECT && (
                  <div className="clues-conclusion-preview animate-fadeInUp">
                    <span className="conclusion-icon">💡</span>
                    <span>Petunjuk terkumpul! Menyusun kesimpulan…</span>
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE: CATEGORY ────────────────────────────────────── */}
            {phase === 'category' && (
              <div className="detective-category animate-fadeInUp">
                {/* Kesimpulan dari petunjuk */}
                <div className="conclusion-box">
                  <div className="conclusion-header">
                    <span>🔎</span>
                    <span>Berdasarkan {relevantCount} petunjuk relevan yang kamu temukan:</span>
                  </div>
                  <div className="selected-clues-list">
                    {selectedClues.map(id => {
                      const cl = currentCase.clues.find(c => c.id === id);
                      const isRel = cl?.isRelevant;
                      return cl ? (
                        <div key={id} className={`selected-clue-item ${isRel ? 'item-relevant' : 'item-irrelevant'}`}>
                          {isRel ? '✅' : '❌'} {cl.text}
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>

                <div className="category-question">
                  <span>🗂️</span>
                  <span><strong>{currentCase.name}</strong> termasuk sampah jenis apa?</span>
                </div>

                <div className="category-choice-grid">
                  {CATEGORY_CONFIG.map(cat => {
                    let cls = '';
                    if (categoryAnswer !== null) {
                      if (cat.id === currentCase.category) cls = 'cat-btn-correct';
                      else if (cat.id === categoryAnswer) cls = 'cat-btn-wrong';
                      else cls = 'cat-btn-dim';
                    }
                    return (
                      <button
                        key={cat.id}
                        id={`l3-cat-${cat.id}`}
                        className={`detective-cat-btn ${cls}`}
                        style={{
                          background: cat.bg,
                          borderColor: cat.border,
                        }}
                        onClick={() => handleCategoryAnswer(cat.id)}
                        disabled={categoryAnswer !== null}
                      >
                        <span className="dcat-emoji">{cat.emoji}</span>
                        <span className="dcat-name" style={{ color: cat.color }}>{cat.name}</span>
                        {cls === 'cat-btn-correct' && <span className="dcat-mark">✅</span>}
                        {cls === 'cat-btn-wrong'   && <span className="dcat-mark">❌</span>}
                      </button>
                    );
                  })}
                </div>

                {feedbackMsg && (
                  <div className={`detective-feedback ${categoryAnswer === currentCase.category ? 'feedback-correct' : 'feedback-wrong'}`}>
                    {feedbackMsg}
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE: ACTION ───────────────────────────────────────── */}
            {phase === 'action' && (
              <div className="detective-action animate-fadeInUp">
                <div className="action-context">
                  <span className="action-context-badge" style={{ background: CATEGORY_CONFIG[currentCase.category].bg, borderColor: CATEGORY_CONFIG[currentCase.category].border, color: CATEGORY_CONFIG[currentCase.category].color }}>
                    {CATEGORY_CONFIG[currentCase.category].emoji} {CATEGORY_CONFIG[currentCase.category].name}
                  </span>
                  <span>{currentCase.conclusion}</span>
                </div>

                <div className="action-question">
                  🛠️ Apa <strong>tindakan yang tepat</strong> untuk {currentCase.name}?
                </div>

                <div className="action-choices-grid">
                  {shuffledActions.map((act, i) => {
                    let cls = '';
                    if (actionAnswer !== null) {
                      if (act.correct)  cls = 'act-correct';
                      else if (i === actionAnswer) cls = 'act-wrong';
                      else cls = 'act-dim';
                    }
                    return (
                      <button
                        key={i}
                        id={`l3-act-${i}`}
                        className={`action-choice-btn ${cls}`}
                        onClick={() => handleActionAnswer(i)}
                        disabled={actionAnswer !== null}
                      >
                        <span className="act-letter">{String.fromCharCode(65 + i)}</span>
                        <span className="act-text">{act.text}</span>
                        {cls === 'act-correct' && <span>✅</span>}
                        {cls === 'act-wrong'   && <span>❌</span>}
                      </button>
                    );
                  })}
                </div>

                {feedbackMsg && (
                  <div className={`detective-feedback ${actionAnswer !== null && shuffledActions[actionAnswer]?.correct ? 'feedback-correct' : 'feedback-wrong'}`}>
                    {feedbackMsg}
                  </div>
                )}
              </div>
            )}

            {/* ── PHASE: SUMMARY ──────────────────────────────────────── */}
            {phase === 'summary' && (
              <div className="detective-summary animate-bounceIn">
                <div className="summary-title">
                  {wrongClues.length === 0 && categoryAnswer === currentCase.category && shuffledActions[actionAnswer]?.correct
                    ? '🏆 Investigasi Sempurna!'
                    : '✅ Kasus Selesai!'}
                </div>

                <div className="summary-explanation">
                  <span>💡</span>
                  <span>{currentCase.actionExplanation}</span>
                </div>

                {/* Score breakdown */}
                <div className="summary-score-grid">
                  <div className="summary-score-item">
                    <span>🔍 Petunjuk</span>
                    <span className="summary-pts">{(CLUES_TO_SELECT - wrongClues.length) * PTS_CLUE_CORRECT} XP</span>
                  </div>
                  <div className="summary-score-item">
                    <span>🗂️ Kategori</span>
                    <span className="summary-pts">{categoryAnswer === currentCase.category ? PTS_CATEGORY : 0} XP</span>
                  </div>
                  <div className="summary-score-item">
                    <span>🛠️ Tindakan</span>
                    <span className="summary-pts">{shuffledActions[actionAnswer]?.correct ? PTS_ACTION : 0} XP</span>
                  </div>
                  {wrongClues.length === 0 && categoryAnswer === currentCase.category && shuffledActions[actionAnswer]?.correct && (
                    <div className="summary-score-item summary-bonus">
                      <span>🏆 Bonus Sempurna</span>
                      <span className="summary-pts">+{PTS_PERFECT_CASE} XP</span>
                    </div>
                  )}
                </div>

                <button
                  id={`btn-l3-next-case-${caseIdx}`}
                  className="btn btn-purple btn-lg btn-full"
                  onClick={handleNextCase}
                  style={{ marginTop: '8px' }}
                >
                  {caseIdx + 1 < TOTAL_CASES ? '➡️ KASUS BERIKUTNYA!' : '🏁 LIHAT HASIL!'}
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
              <h3>Semua Kasus Terselesaikan!</h3>
              <p>
                Kamu adalah <strong>Detektif Lingkungan</strong> sejati Desa Sukaraja!
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
