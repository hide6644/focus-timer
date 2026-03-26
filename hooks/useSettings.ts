import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DEFAULT_FOCUS_TIME_SEC,
  DEFAULT_BREAK_TIME_SEC,
  STORAGE_KEY_FOCUS,
  STORAGE_KEY_BREAK,
} from '../constants/TimerConfig';

export function useSettings() {
  const [focusTimeTotal, setFocusTimeTotal] = useState(DEFAULT_FOCUS_TIME_SEC);
  const [breakTimeTotal, setBreakTimeTotal] = useState(DEFAULT_BREAK_TIME_SEC);

  // Load settings from storage and update state
  const loadSettings = useCallback(async () => {
    try {
      const storedFocus = await AsyncStorage.getItem(STORAGE_KEY_FOCUS);
      const storedBreak = await AsyncStorage.getItem(STORAGE_KEY_BREAK);

      const parsedFocus = storedFocus !== null ? parseInt(storedFocus, 10) * 60 : DEFAULT_FOCUS_TIME_SEC;
      const parsedBreak = storedBreak !== null ? parseInt(storedBreak, 10) * 60 : DEFAULT_BREAK_TIME_SEC;

      let settingsChanged = false;
      
      if (parsedFocus !== focusTimeTotal) {
        setFocusTimeTotal(parsedFocus);
        settingsChanged = true;
      }
      if (parsedBreak !== breakTimeTotal) {
        setBreakTimeTotal(parsedBreak);
        settingsChanged = true;
      }
      
      return { 
        changed: settingsChanged, 
        focusTimeTotal: parsedFocus, 
        breakTimeTotal: parsedBreak 
      };
    } catch (e) {
      console.error('Error loading settings', e);
      return { changed: false, focusTimeTotal, breakTimeTotal };
    }
  }, [focusTimeTotal, breakTimeTotal]);

  // Save settings back to storage
  const saveSettings = useCallback(async (focusMin: string, breakMin: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_FOCUS, focusMin);
      await AsyncStorage.setItem(STORAGE_KEY_BREAK, breakMin);
      // Immediately reflect via state
      setFocusTimeTotal(parseInt(focusMin, 10) * 60);
      setBreakTimeTotal(parseInt(breakMin, 10) * 60);
      return true;
    } catch (e) {
      console.error('Error saving settings', e);
      return false;
    }
  }, []);

  return {
    focusTimeTotal,
    breakTimeTotal,
    loadSettings,
    saveSettings,
  };
}
