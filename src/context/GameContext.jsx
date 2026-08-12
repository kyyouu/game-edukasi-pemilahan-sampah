import { createContext, useContext, useReducer, useEffect } from 'react';

const GameContext = createContext(null);

const initialState = {
  playerName: '',
  totalScore: 0,
  levelScores: { level1: 0, level2: 0, level3: 0, level4: 0 },
  currentLevel: 0, // 0=welcome, 1=story, 2=L1, 3=L2, 4=L3, 5=L4, 6=victory, 7=result
  gameStarted: false,
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, playerName: action.payload };

    case 'START_GAME':
      return { ...state, gameStarted: true, currentLevel: 1 };

    case 'SET_LEVEL':
      return { ...state, currentLevel: action.payload };

    case 'ADD_SCORE': {
      const { level, amount } = action.payload;
      const newLevelScores = { ...state.levelScores, [level]: state.levelScores[level] + amount };
      const newTotal = Object.values(newLevelScores).reduce((a, b) => a + b, 0);
      return { ...state, levelScores: newLevelScores, totalScore: newTotal };
    }

    case 'SET_LEVEL_SCORE': {
      const { level, score } = action.payload;
      const newLevelScores = { ...state.levelScores, [level]: score };
      const newTotal = Object.values(newLevelScores).reduce((a, b) => a + b, 0);
      return { ...state, levelScores: newLevelScores, totalScore: newTotal };
    }

    case 'RESET_GAME':
      return { ...initialState, playerName: state.playerName };

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('pahlawan-game-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Only restore name, not full game state
        return { ...init, playerName: parsed.playerName || '' };
      }
    } catch {}
    return init;
  });

  useEffect(() => {
    localStorage.setItem('pahlawan-game-state', JSON.stringify({ playerName: state.playerName }));
  }, [state.playerName]);

  // Computed values
  const scorePercent = Math.min(100, Math.round((state.totalScore / 1000) * 100));

  const getStars = () => {
    if (scorePercent >= 90) return 5;
    if (scorePercent >= 75) return 4;
    if (scorePercent >= 60) return 3;
    if (scorePercent >= 40) return 2;
    return 1;
  };

  return (
    <GameContext.Provider value={{ state, dispatch, scorePercent, getStars }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
