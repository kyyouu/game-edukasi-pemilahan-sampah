import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { sfx, bgm, unlockAudio } from '../utils/sounds';
import './WelcomePage.css';

export default function WelcomePage() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { dispatch } = useGame();
  const navigate = useNavigate();

  const handleStart = () => {
    unlockAudio();
    bgm.start();
    const trimmed = name.trim();
    if (!trimmed) {
      sfx.wrong();
      setError('Masukkan namamu dulu, Pahlawan! 😊');
      return;
    }
    if (trimmed.length < 2) {
      sfx.wrong();
      setError('Nama minimal 2 huruf ya!');
      return;
    }
    sfx.click();
    sfx.whoosh();
    setError('');
    dispatch({ type: 'RESET_GAME' });
    dispatch({ type: 'SET_NAME', payload: trimmed });
    navigate('/story');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleStart();
  };

  return (
    <div className="page-bg page-bg-dirty welcome-page">
      <div className="welcome-content animate-fadeInUp">
        {/* Header Title Section Card */}
        <div className="welcome-header-card animate-bounceIn">
          <div className="welcome-top-pill">
            EDUKASI LINGKUNGAN SD 🌿
          </div>

          <h1 className="welcome-main-title">PAHLAWAN LINGKUNGAN</h1>

          <div className="welcome-location-pill">
            📍 Desa Sukaraja, Kec. Ciawigebang, Kab. Kuningan
          </div>
        </div>

        {/* Greeting Hero Card */}
        <div className="welcome-greeting-card">
          <div className="greeting-avatar-circle">
            <img src="/mascot_sd.png" alt="Windah Anak SD" className="greeting-avatar-img" />
          </div>
          <div className="greeting-text">
            <h3>Halo Pahlawan Cilik!</h3>
            <p>Bantu Kakak dan warga Desa Sukaraja membersihkan lingkungan dari sampah!</p>
          </div>
        </div>

        {/* Input Form Card */}
        <div className="welcome-form-card">
          <label htmlFor="input-name" className="welcome-label">
            ✏️ Siapa Namamu?
          </label>
          <div className="welcome-input-wrap">
            <input
              id="input-name"
              type="text"
              className={`welcome-input ${error ? 'welcome-input-error' : ''}`}
              placeholder="Ketik nama kamu di sini..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError('');
              }}
              onKeyDown={handleKey}
              maxLength={25}
              autoFocus
            />
          </div>
          {error && <p className="welcome-err-msg">⚠️ {error}</p>}

          <div className="welcome-btn-group">
            <button
              id="btn-start-game"
              className="btn btn-teal btn-lg btn-full"
              onClick={handleStart}
            >
              ▶ MULAI BERMAIN!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}