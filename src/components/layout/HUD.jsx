import { useGame } from '../../context/GameContext';
import './HUD.css';

const LEVEL_INFO = [
  { n: 1, icon: '🏫', label: 'Level 1' },
  { n: 2, icon: '♻️', label: 'Level 2' },
  { n: 3, icon: '🔍', label: 'Level 3' },
  { n: 4, icon: '👹', label: 'Level 4' },
];

export default function HUD({ currentLevel }) {
  const { state } = useGame();

  return (
    <header className="hud">
      {/* Logo */}
      <div className="hud-logo">
        <span className="hud-logo-icon">🌿</span>
        <span>DESAVERSE</span>
      </div>

      {/* Level Pills */}
      <div className="level-pills">
        {LEVEL_INFO.map(lvl => (
          <div
            key={lvl.n}
            className={`level-pill ${
              currentLevel > lvl.n ? 'pill-done' : currentLevel === lvl.n ? 'pill-current' : 'pill-locked'
            }`}
          >
            <span>{lvl.icon}</span>
            <span>{currentLevel > lvl.n ? '✓' : `Babak ${lvl.n}`}</span>
          </div>
        ))}
      </div>

      {/* Score */}
      <div className="hud-score-pill">
        <span>⭐</span>
        <span>{state.totalScore} XP</span>
      </div>

      {/* Player */}
      <div className="hud-player">
        <div className="hud-avatar">
          <img src="/mascot_sd.png" alt="Pahlawan" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
        </div>
        <span className="hud-player-name">{state.playerName || 'Pahlawan'}</span>
      </div>
    </header>
  );
}
