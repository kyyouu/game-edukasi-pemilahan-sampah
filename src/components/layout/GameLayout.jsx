import HUD from './HUD';
import './GameLayout.css';

export default function GameLayout({ children, currentLevel }) {
  return (
    <div className="page-bg">
      {/* Decorative Sky Elements */}
      <div className="deco-sun">☀️</div>
      <div className="deco-cloud deco-cloud-1">☁️</div>
      <div className="deco-cloud deco-cloud-2">☁️</div>

      {/* HUD Header */}
      <HUD currentLevel={currentLevel} />

      {/* Main Content Area */}
      <main className="page-container">
        {children}
      </main>
    </div>
  );
}
