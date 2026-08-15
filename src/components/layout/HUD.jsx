import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { bgm } from '../../utils/sounds';
import './HUD.css';

const LEVEL_INFO = [
  { n: 1, icon: '🏫', label: 'Babak 1' },
  { n: 2, icon: '♻️', label: 'Babak 2' },
  { n: 3, icon: '🔍', label: 'Babak 3' },
  { n: 4, icon: '👹', label: 'Babak 4' },
];

export default function HUD({ currentLevel }) {
  const { state } = useGame();
  const [isMuted, setIsMuted] = useState(false);

  const handleSoundToggle = () => {
    const nowMuted = bgm.toggle();
    setIsMuted(!nowMuted);
  };

  return (
    <header className="hud">
      {/* Logo */}
      <div className="hud-logo">
        <span className="hud-logo-icon">🌿</span>
        <span>DESAVERSE</span>
      </div>

      {/* HUD Center */}
      <div className="hud-center">
        {/* Desktop: Full level pills */}
        <div className="level-pills hud-desktop-only">
          {LEVEL_INFO.map(lvl => (
            <div
              key={lvl.n}
              className={`level-pill ${
                currentLevel > lvl.n ? 'pill-done' : currentLevel === lvl.n ? 'pill-current' : 'pill-locked'
              }`}
            >
              <span>{lvl.icon}</span>
              <span>{currentLevel > lvl.n ? '✓' : lvl.label}</span>
            </div>
          ))}
        </div>

        {/* Mobile: Compact Step Pill */}
        <div className="hud-step-pill hud-mobile-only">
          {LEVEL_INFO[currentLevel - 1]?.icon || '🌿'} Babak {currentLevel} / 4
        </div>
      </div>

      {/* HUD Right: score + sound + player */}
      <div className="hud-right">
        {/* Score */}
        <div className="hud-score-pill">
          <span>⭐</span>
          <span>{state.totalScore}</span>
        </div>

        {/* Sound Toggle */}
        <button
          className="hud-sound-btn"
          onClick={handleSoundToggle}
          title={isMuted ? 'Hidupkan Musik' : 'Matikan Musik'}
          aria-label={isMuted ? 'Hidupkan Musik' : 'Matikan Musik'}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>

        {/* Player */}
        <div className="hud-player">
          <div className="hud-avatar">
            <img
              src="/mascot_sd.png"
              alt="Pahlawan"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>
          <span className="hud-player-name">{state.playerName || 'Pahlawan'}</span>
        </div>
      </div>
    </header>
  );
}
