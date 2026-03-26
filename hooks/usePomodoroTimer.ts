import { useState, useCallback, useEffect, useRef } from 'react';

export function usePomodoroTimer(
  initialFocusTime: number, 
  initialBreakTime: number,
  onSessionComplete?: (completedMode: 'focus' | 'break') => void
) {
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [timeLeft, setTimeLeft] = useState(initialFocusTime);

  // Keep track of the total time for the current settings
  const focusTotal = useRef(initialFocusTime);
  const breakTotal = useRef(initialBreakTime);

  // Keep track of the *paused* remaining time for each mode
  const inactiveTimes = useRef({ focus: initialFocusTime, break: initialBreakTime });

  // Sync settings when they are loaded/changed externally
  const syncSettings = useCallback((newFocusTotal: number, newBreakTotal: number) => {
    focusTotal.current = newFocusTotal;
    breakTotal.current = newBreakTotal;
    
    inactiveTimes.current.focus = newFocusTotal;
    inactiveTimes.current.break = newBreakTotal;

    if (!isActive) {
      setTimeLeft(mode === 'focus' ? newFocusTotal : newBreakTotal);
    }
  }, [isActive, mode]);

  // Handle countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Completed current mode!
      if (onSessionComplete) onSessionComplete(mode);

      // Auto-loop
      if (mode === 'focus') {
        inactiveTimes.current.focus = focusTotal.current;
        setMode('break');
        setTimeLeft(breakTotal.current);
      } else {
        inactiveTimes.current.break = breakTotal.current;
        setMode('focus');
        setTimeLeft(focusTotal.current);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, onSessionComplete]);

  // Controls
  const toggleTimer = useCallback(() => setIsActive((prev) => !prev), []);
  
  const resetTimer = useCallback(() => {
    setIsActive(false);
    const total = mode === 'focus' ? focusTotal.current : breakTotal.current;
    setTimeLeft(total);
    inactiveTimes.current[mode] = total;
  }, [mode]);

  const switchMode = useCallback((newMode: 'focus' | 'break') => {
    if (mode === newMode) return;
    inactiveTimes.current[mode] = timeLeft;
    
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(inactiveTimes.current[newMode]);
  }, [mode, timeLeft]);

  return {
    isActive,
    mode,
    timeLeft,
    totalTime: mode === 'focus' ? focusTotal.current : breakTotal.current,
    toggleTimer,
    resetTimer,
    switchMode,
    syncSettings,
  };
}
