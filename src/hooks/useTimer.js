import { useEffect, useRef, useState } from 'react';

export function useTimer(initialSeconds, onEnd) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const onEndRef = useRef(onEnd);

  useEffect(() => {
    onEndRef.current = onEnd;
  }, [onEnd]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          onEndRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const start = () => setRunning(true);
  const stop = () => { setRunning(false); clearInterval(intervalRef.current); };
  const reset = (newSec = initialSeconds) => {
    stop();
    setSeconds(newSec);
  };

  return { seconds, running, start, stop, reset };
}
