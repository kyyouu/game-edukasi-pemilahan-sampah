import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { downloadCertificate } from '../utils/certificate';
import { sfx } from '../utils/sounds';
import './ResultPage.css';

export default function ResultPage() {
  const { state, scorePercent, getStars, dispatch } = useGame();
  const navigate = useNavigate();
  const [starsShown, setStarsShown] = useState(0);
  const stars = getStars();

  useEffect(() => {
    if (!state.playerName) { navigate('/'); return; }

    sfx.victory();

    let i = 0;
    const t = setInterval(() => {
      i++;
      setStarsShown(i);
      sfx.click();
      if (i >= stars) clearInterval(t);
    }, 400);

    return () => clearInterval(t);
  }, []);

  const handleRestart = () => {
    sfx.click();
    sfx.whoosh();
    dispatch({ type: 'RESET_GAME' });
    navigate('/');
  };

  const handleDownloadCert = () => {
    sfx.click();
    downloadCertificate(state.playerName, state.totalScore, stars);
  };

  const levelData = [
    { key: 'level1', name: 'Babak 1 – Bersihkan Sampah', max: 200, icon: '🏫' },
    { key: 'level2', name: 'Babak 2 – Pilah Sampah', max: 150, icon: '♻️' },
    { key: 'level3', name: 'Babak 3 – Tebak Sampah', max: 120, icon: '🔍' },
    { key: 'level4', name: 'Babak 4 – Boss Dr. Sampah', max: 260, icon: '👹' },
  ];

  return (
    <div className="page-bg result-page">
      <div className="deco-sun">☀️</div>
      <div className="deco-cloud deco-cloud-1">☁️</div>

      <div className="result-card animate-bounceIn">
        <div className="result-title-badge">🏆 PETUALANGAN SELESAI</div>

        <h1 className="result-main-title">Hasil Misi</h1>

        <p className="result-player-text">
          Selamat, <strong>{state.playerName}</strong>! 🎉
        </p>

        {/* Stars */}
        <div className="result-stars-section animate-bounceIn">
          <div className="stars-container">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className={`star ${starsShown >= s ? 'active' : ''}`}>
                ⭐
              </span>
            ))}
          </div>
          <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-medium)', marginTop: '4px' }}>
            {starsShown} dari 5 Bintang
          </p>
        </div>

        {/* Score Circle */}
        <div className="result-score-circle">
          <span className="result-score-num">{state.totalScore}</span>
          <span className="result-score-lbl">Total XP</span>
        </div>

        <p className="result-percent-text">
          🏅 Tingkat Keberhasilan: {scorePercent}%
        </p>

        {/* Breakdown */}
        <div className="result-breakdown-box">
          <div className="breakdown-header">📊 Skor Per Babak:</div>
          {levelData.map(lvl => {
            const pts = state.levelScores[lvl.key] || 0;
            const pct = Math.round((pts / lvl.max) * 100);
            return (
              <div key={lvl.key} className="breakdown-row">
                <span>{lvl.icon}</span>
                <div style={{ flex: 1 }}>
                  <div>{lvl.name}</div>
                  <div className="breakdown-bar-bg">
                    <div className="breakdown-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="breakdown-score-txt">{pts} / {lvl.max}</span>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="result-actions">
          {scorePercent >= 80 && (
            <button id="btn-download-cert" className="btn btn-yellow btn-lg btn-full" onClick={handleDownloadCert}>
              📜 DOWNLOAD SERTIFIKAT!
            </button>
          )}

          <button id="btn-play-again" className="btn btn-teal btn-lg btn-full" onClick={handleRestart}>
            🔄 MAIN LAGI!
          </button>
        </div>

        {scorePercent < 80 && (
          <p className="result-tip-text">
            💡 Kumpulkan skor ≥ 80% untuk mendapatkan Sertifikat Pahlawan Lingkungan!
          </p>
        )}
      </div>
    </div>
  );
}
