import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { bossQuestions } from '../data/questions';
import { sfx } from '../utils/sounds';
import GameLayout from '../components/layout/GameLayout';
import './Level4Page.css';

const HP_DAMAGE = 20;
const PTS_PER_CORRECT = 52;

export default function Level4Page() {
  const { state, dispatch } = useGame();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [monsterHp, setMonsterHp] = useState(100);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [bossDefeated, setBossDefeated] = useState(false);
  const [monsterState, setMonsterState] = useState('idle'); // idle | hit | shake | dead
  const [isShooting, setIsShooting] = useState(false);
  const [showDamage, setShowDamage] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  useEffect(() => {
    if (!state.playerName) navigate('/');
  }, [state.playerName, navigate]);

  const q = bossQuestions[currentQ];

  const advanceNextQ = (nextIdx, currentHp) => {
    setIsShooting(false);
    setShowDamage(false);
    setMonsterState(currentHp <= 0 ? 'dead' : 'idle');

    if (currentHp <= 0 || nextIdx >= bossQuestions.length) {
      sfx.victory();
      setBossDefeated(true);
    } else {
      setCurrentQ(nextIdx);
      setSelected(null);
      setAnswered(false);
      setFeedbackMsg('');
    }
  };

  const handleAnswer = (idx) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);

    const correct = idx === q.correct;

    if (correct) {
      // 1. Launch Shooting Animation
      setIsShooting(true);
      sfx.whoosh();
      setFeedbackMsg('⚡ SERANGAN TEPAT! Peluru Energi Meluncur!');

      // 2. Projectile Hits Monster (after 380ms)
      setTimeout(() => {
        setIsShooting(false);
        setMonsterState('hit');
        setShowDamage(true);
        sfx.bossHit();

        const newHp = Math.max(0, monsterHp - HP_DAMAGE);
        setMonsterHp(newHp);
        setScore(p => p + PTS_PER_CORRECT);

        // 3. Auto-Advance to Next Question (after 1100ms)
        setTimeout(() => {
          advanceNextQ(currentQ + 1, newHp);
        }, 1100);
      }, 380);
    } else {
      sfx.wrong();
      setMonsterState('shake');
      setFeedbackMsg('🛡️ Serangan Meleset! Tetap Semangat!');

      // Auto Advance on wrong answer after short pause
      setTimeout(() => {
        setMonsterState('idle');
        advanceNextQ(currentQ + 1, monsterHp);
      }, 1200);
    }
  };

  const handleFinishBoss = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'SET_LEVEL_SCORE', payload: { level: 'level4', score } });
    navigate('/victory');
  };

  return (
    <GameLayout currentLevel={4}>
      <div className="level4-container">
        {/* Header */}
        <div className="level-header animate-fadeInUp">
          <div className="level-badge badge-red">👹 BABAK 4 (BOSS BATTLE)</div>
          <h2 className="level-title">Kalahkan Dr. Sampah!</h2>
          <p className="level-desc">
            Jawab pertanyaan untuk menembakkan Peluru Energi ke Dr. Sampah!
          </p>
        </div>

        {/* Boss Battle Arena Stage Card */}
        <div className="l4-boss-card animate-fadeInUp">
          <div className="l4-boss-header-row">
            <div className="boss-title-tag">
              <span>👹</span>
              <span>DR. SAMPAH</span>
            </div>
            <div style={{ fontWeight: 800, color: monsterHp <= 30 ? 'var(--red-dark)' : 'var(--text-dark)', fontSize: '0.95rem' }}>
              HP: {monsterHp}%
            </div>
          </div>

          {/* HP Bar */}
          <div className="hp-bar">
            <div
              className="hp-fill"
              style={{
                width: `${monsterHp}%`,
                background: monsterHp > 50 ? 'linear-gradient(90deg, #66BB6A, #FFA726)' : 'linear-gradient(90deg, #EF5350, #C62828)',
              }}
            />
          </div>

          {/* Battle Stage: Player vs Dr. Sampah */}
          <div className="l4-battle-stage">
            {/* Player Side */}
            <div className="stage-player-side">
              <img src="/mascot_sd.png" alt="Pahlawan Cilik" className="player-figter-img" />
              <span className="player-fighter-name">{state.playerName || 'Pahlawan'}</span>
            </div>

            {/* Shooting Beam Projectile Animation */}
            {isShooting && <div className="laser-beam-projectile">⚡⭐</div>}

            {/* Boss Side */}
            <div className="stage-boss-side">
              {monsterState === 'dead' ? (
                <span className="monster-big-emoji">💀</span>
              ) : (
                <img
                  src="/boss.png"
                  alt="Dr. Sampah"
                  className={`boss-char-img ${
                    monsterState === 'idle'
                      ? 'animate-float'
                      : monsterState === 'shake'
                      ? 'animate-shake'
                      : 'animate-bounceIn'
                  }`}
                />
              )}

              {/* Hit & Damage Floating FX */}
              {showDamage && (
                <>
                  <div className="boss-hit-effect">💥</div>
                  <div className="damage-float-num">-20 HP!</div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Question Card */}
        {!bossDefeated ? (
          <div className="l4-question-card animate-fadeInUp">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="welcome-sub-badge" style={{ fontSize: '0.8rem' }}>
                Serangan {currentQ + 1} / {bossQuestions.length}
              </span>
              <span className="score-badge" style={{ fontSize: '0.82rem', padding: '2px 10px' }}>
                ⭐ +{score} XP
              </span>
            </div>

            <h3 className="l4-q-title">{q.question}</h3>

            {/* Attack Options Grid */}
            <div className="l4-options-list">
              {q.options.map((opt, i) => {
                let cls = '';
                if (answered) {
                  if (i === q.correct) cls = 'opt-correct';
                  else if (i === selected) cls = 'opt-wrong';
                  else cls = 'opt-dim';
                }
                return (
                  <button
                    key={i}
                    id={`l4-opt-${i}`}
                    className={`l4-opt-row ${cls}`}
                    onClick={() => handleAnswer(i)}
                    disabled={answered}
                  >
                    <span className="l4-opt-letter">{String.fromCharCode(65 + i)}</span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {cls === 'opt-correct' && <span>✅ (Nembak!)</span>}
                    {cls === 'opt-wrong' && <span>❌</span>}
                  </button>
                );
              })}
            </div>

            {/* Feedback Message */}
            {feedbackMsg && <div className="l4-feedback-toast">{feedbackMsg}</div>}
          </div>
        ) : (
          /* Boss Defeated Victory Card */
          <div className="modal-box animate-bounceIn" style={{ maxWidth: '100%' }}>
            <div style={{ fontSize: '4rem', marginBottom: '8px' }}>🎉</div>
            <h3>DR. SAMPAH BERHASIL DIKALAHKAN!</h3>
            <p>
              Hore! Berkat tembakan pengetahuanmu, Dr. Sampah menyerah dan melarikan diri dari Desa Sukaraja!
            </p>
            <div className="score-badge" style={{ margin: '14px auto 18px', display: 'inline-flex' }}>
              ⭐ Bonus XP Boss: +{score}
            </div>
            <button
              id="btn-l4-victory"
              className="btn btn-green btn-lg btn-full"
              onClick={handleFinishBoss}
            >
              🌿 LIHAT PERUBAHAN DESA SUKARAJA!
            </button>
          </div>
        )}
      </div>
    </GameLayout>
  );
}
