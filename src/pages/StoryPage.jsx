import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import { storyLines, missionBriefing } from '../data/story';
import { sfx } from '../utils/sounds';
import './StoryPage.css';

export default function StoryPage() {
  const { state } = useGame();
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState('story'); // 'story' | 'briefing'
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!state.playerName) navigate('/');
  }, [state.playerName, navigate]);

  const currentData = storyLines[currentLine];

  // Typewriter effect
  useEffect(() => {
    if (!currentData || phase !== 'story') return;
    const text = currentData.text;
    if (charIdx < text.length) {
      setIsTyping(true);
      timerRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[charIdx]);
        setCharIdx(prev => prev + 1);
      }, 18);

    } else {
      setIsTyping(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [charIdx, currentData, phase]);

  const handleNext = () => {
    sfx.click();
    if (isTyping) {
      clearTimeout(timerRef.current);
      setDisplayedText(currentData.text);
      setIsTyping(false);
      return;
    }

    const nextIdx = currentLine + 1;
    if (nextIdx >= storyLines.length) {
      sfx.levelComplete();
      setPhase('briefing');
    } else {
      setCurrentLine(nextIdx);
      setDisplayedText('');
      setCharIdx(0);
      setIsTyping(true);
    }
  };

  const handleSkip = () => {
    sfx.click();
    sfx.levelComplete();
    setPhase('briefing');
  };

  // Determine if image is a full scene banner (like river/village) or a character portrait
  const isSceneBanner = currentData.image && (currentData.image.includes('trash_river') || currentData.image.includes('bg_dirty'));

  return (
    <div className="page-bg page-bg-dirty story-page">
      <div className="story-container animate-fadeInUp">
        {phase === 'story' ? (
          /* Exact Desaverse Dialog Card with Representative Illustrations */
          <div className="desaverse-dialog-card">
            {/* Header: Speaker Pill & Step Counter */}
            <div className="dialog-header-row">
              <div className="dialog-speaker-badge">
                <span>{currentData.icon}</span>
                <span>{currentData.speaker === 'KAMU' ? state.playerName.toUpperCase() : currentData.speaker}</span>
              </div>
              <div className="dialog-step-counter">
                {currentLine + 1} / {storyLines.length}
              </div>
            </div>

            {/* Representative Scene Banner (for narration scenes) */}
            {isSceneBanner && (
              <div className="dialog-scene-frame animate-fadeInUp">
                <img src={currentData.image} alt="Scene Illustration" className="dialog-scene-img" />
              </div>
            )}

            {/* Content: Character Avatar & Typewriter Text */}
            <div className="dialog-main-content">
              {!isSceneBanner && currentData.image && (
                <div className="dialog-avatar-wrap animate-bounceIn">
                  <img src={currentData.image} alt={currentData.speaker} className="dialog-avatar-img" />
                </div>
              )}

              <div className="dialog-text-body">
                {displayedText}
                {isTyping && <span className="animate-wiggle"> ▌</span>}
              </div>
            </div>

            {/* Footer: Skip & Next Buttons */}
            <div className="dialog-footer-row">
              <button className="btn btn-white btn-sm" onClick={handleSkip}>
                ⏭ Lewati Cerita
              </button>
              <button id="btn-next-story" className="btn btn-teal" onClick={handleNext}>
                {isTyping ? '⚡ Tampilkan Semua' : currentLine + 1 >= storyLines.length ? 'Lihat Misi ▶' : 'Lanjut ▶'}
              </button>
            </div>
          </div>
        ) : (
          /* Mission Briefing Panel */
          <div className="briefing-card animate-bounceIn">
            <div style={{ fontSize: '3rem' }}>🎯</div>
            <h2 className="briefing-title">Misi Pahlawan Desa</h2>
            <p className="briefing-sub">
              Selesaikan 4 babak tantangan untuk menyelamatkan Desa Sukaraja!
            </p>

            <div className="briefing-list">
              {missionBriefing.map((m) => (
                <div key={m.level} className="briefing-item">
                  <div className="briefing-icon-box" style={{ background: m.color, color: 'white' }}>
                    {m.icon}
                  </div>
                  <div className="briefing-info">
                    <div className="briefing-item-title">{m.title}</div>
                    <div className="briefing-item-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              id="btn-start-level1"
              className="btn btn-teal btn-lg btn-full"
              onClick={() => {
                sfx.click();
                sfx.whoosh();
                navigate('/level/1');
              }}
            >
              🚀 MULAI BABAK 1!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
