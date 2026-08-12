import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { sfx } from '../utils/sounds';
import './VictoryPage.css';

const STAGES = [
  { id: 0, label: 'Kondisi Awal', desc: 'Desa Sukaraja dipenuhi sampah dan kotor... 😢', bg: 'scene-dirty' },
  { id: 1, label: 'Gotong Royong', desc: 'Warga desa dan Pahlawan bersama-sama membersihkan sampah! 💪', bg: 'scene-cleaning' },
  { id: 2, label: 'Desa Sukaraja Bersih!', desc: 'Desa Sukaraja kini kembali indah, hijau, dan asri! 🌿🎉', bg: 'scene-clean' },
];

export default function VictoryPage() {
  const { state } = useGame();
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!state.playerName) { navigate('/'); return; }

    sfx.victory();

    const t1 = setTimeout(() => {
      setStage(1);
      sfx.click();
    }, 2200);

    const t2 = setTimeout(() => {
      setStage(2);
      sfx.levelComplete();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [state.playerName, navigate]);


  const handleResult = () => {
    sfx.click();
    sfx.whoosh();
    navigate('/result');
  };

  return (
    <div className="page-bg victory-page">
      <div className="deco-sun">☀️</div>
      <div className="deco-cloud deco-cloud-1">☁️</div>

      <div className="victory-card animate-bounceIn">
        {/* Stage Badge */}
        <div
          className="welcome-top-badge"
          style={{
            background: stage === 2 ? 'var(--green)' : stage === 1 ? 'var(--blue)' : 'var(--orange)',
            color: 'white',
          }}
        >
          {STAGES[stage].label}
        </div>

        {/* Scene Box */}
        <div className={`victory-village-scene ${STAGES[stage].bg}`}>
          <div className="village-elements">
            {stage === 0 && (
              <>
                <span>🏚️</span>
                <span style={{ filter: 'grayscale(0.8)' }}>🌵</span>
                <span>🗑️</span>
                <span>🏚️</span>
              </>
            )}
            {stage === 1 && (
              <>
                <span>🏠</span>
                <span>🌱</span>
                <span>🧹</span>
                <span>🏡</span>
              </>
            )}
            {stage === 2 && (
              <>
                <span className="animate-float">🌳</span>
                <span>🏡</span>
                <span>🌸</span>
                <span className="animate-float" style={{ animationDelay: '0.4s' }}>🌲</span>
              </>
            )}
          </div>

          <div className="village-people">
            {stage === 0 && <span>😢👨‍🌾 👩‍💼😢</span>}
            {stage === 1 && <span>💪👨‍🌾 🧹👩‍💼 🌿</span>}
            {stage === 2 && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src="/mascot_sd.png" alt="Pahlawan SD" style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--border-dark)', background: 'white' }} />
                <span>😊👨‍🌾 🦋 👩‍💼😊 🐦 ✨</span>
              </div>
            )}
          </div>


          <div className={`village-ground ${stage === 2 ? 'ground-clean' : 'ground-dirty'}`}>
            {stage === 2 ? '🌿 🌱 🌸 DESA SUKARAJA HIJAU 🌸 🌱 🌿' : '🟤 🗑️ DESA KOTOR 🗑️ 🟤'}
          </div>
        </div>

        {/* Info Text */}
        <h2 className="victory-stage-title">
          {stage === 2 ? `Selamat, ${state.playerName}! 🎉` : STAGES[stage].desc}
        </h2>

        <p className="victory-stage-desc">
          {stage === 2
            ? 'Berkat kerja kerasmu memilah dan membersihkan sampah, Desa Sukaraja, Kec. Ciawigebang, Kab. Kuningan menjadi bersih dan sehat kembali!'
            : STAGES[stage].desc}
        </p>

        {stage === 2 && (
          <button
            id="btn-see-result"
            className="btn btn-teal btn-lg btn-full animate-bounceIn"
            onClick={handleResult}
          >
            🏆 LIHAT HASIL & SERTIFIKAT!
          </button>
        )}
      </div>
    </div>
  );
}
