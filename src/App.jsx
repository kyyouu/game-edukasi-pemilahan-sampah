import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GameProvider, useGame } from './context/GameContext';
import WelcomePage from './pages/WelcomePage';
import StoryPage from './pages/StoryPage';
import Level1Page from './pages/Level1Page';
import Level2Page from './pages/Level2Page';
import Level3Page from './pages/Level3Page';
import Level4Page from './pages/Level4Page';
import VictoryPage from './pages/VictoryPage';
import ResultPage from './pages/ResultPage';

// Animated fullscreen background component
function FixedBg() {
  const location = useLocation();
  const isClean = location.pathname === '/victory' || location.pathname === '/result';

  return (
    <>
      {/* Moving Panoramic Village Wallpaper */}
      <div
        className="animated-bg-layer"
        style={{
          backgroundImage: isClean ? "url('/bg_clean.png')" : "url('/bg_dirty.png')",
        }}
      />

      {/* Floating Atmosphere Particles: Withered brown leaves when dirty, Fresh green leaves & flowers when clean! */}
      <div className="floating-leaf" style={{ top: '15%', animationDuration: '24s', animationDelay: '0s' }}>
        {isClean ? '🍃' : '🍂'}
      </div>
      <div className="floating-leaf" style={{ top: '40%', animationDuration: '32s', animationDelay: '-10s' }}>
        {isClean ? '🌸' : '💨'}
      </div>
      <div className="floating-leaf" style={{ top: '70%', animationDuration: '28s', animationDelay: '-18s' }}>
        {isClean ? '🌱' : '🍂'}
      </div>
    </>
  );
}

export default function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        {/* Animated Moving Background Wallpaper */}
        <FixedBg />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/level/1" element={<Level1Page />} />
          <Route path="/level/2" element={<Level2Page />} />
          <Route path="/level/3" element={<Level3Page />} />
          <Route path="/level/4" element={<Level4Page />} />
          <Route path="/victory" element={<VictoryPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}
