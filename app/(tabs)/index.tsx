import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType } from '../../components/AdMob';
import { CircularProgress } from '../../components/CircularProgress';
import { useSettings } from '../../hooks/useSettings';
import { usePomodoroTimer } from '../../hooks/usePomodoroTimer';
import { DEFAULT_FOCUS_TIME_SEC, DEFAULT_BREAK_TIME_SEC } from '../../constants/TimerConfig';

const { width } = Dimensions.get('window');
const CIRCLE_RADIUS = width * 0.35;

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

export default function TimerScreen() {
  const { loadSettings } = useSettings();
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });
    interstitial.load();
    return () => unsubscribeLoaded();
  }, []);

  const handleSessionComplete = useCallback((completedMode: 'focus' | 'break') => {
    if (completedMode === 'focus' && interstitialLoaded) {
      try {
        interstitial.show();
        interstitial.load();
      } catch (e) {
        console.log('Error showing interstitial ad', e);
      }
    }
  }, [interstitialLoaded]);

  const {
    isActive,
    mode,
    timeLeft,
    totalTime,
    toggleTimer,
    resetTimer,
    switchMode,
    syncSettings,
  } = usePomodoroTimer(DEFAULT_FOCUS_TIME_SEC, DEFAULT_BREAK_TIME_SEC, handleSessionComplete);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadSettings().then((result) => {
        if (active && result.changed) {
          syncSettings(result.focusTimeTotal, result.breakTimeTotal);
        }
      });
      return () => { active = false; };
    }, [loadSettings, syncSettings])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Focus Timer</Text>
      </View>

      <View style={[styles.modeSelector, { opacity: isActive ? 0.5 : 1 }]}>
        <TouchableOpacity
          disabled={isActive}
          style={[styles.modeButton, mode === 'focus' && styles.modeButtonActive]}
          onPress={() => switchMode('focus')}
        >
          <Text style={[styles.modeText, mode === 'focus' && styles.modeTextActive]}>Focus</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isActive}
          style={[styles.modeButton, mode === 'break' && styles.modeButtonActive]}
          onPress={() => switchMode('break')}
        >
          <Text style={[styles.modeText, mode === 'break' && styles.modeTextActive]}>Break</Text>
        </TouchableOpacity>
      </View>

      <CircularProgress
        radius={CIRCLE_RADIUS}
        timeLeft={timeLeft}
        totalTime={totalTime}
        mode={mode}
        isActive={isActive}
      />

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleTimer}>
          <Text style={styles.controlButtonText}>{isActive ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.controlButton, styles.resetButton]} onPress={resetTimer}>
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.adContainer}>
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 60,
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    padding: 5,
    marginBottom: 50,
  },
  modeButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  modeButtonActive: {
    backgroundColor: '#333333',
  },
  modeText: {
    color: '#888888',
    fontSize: 16,
    fontWeight: '600',
  },
  modeTextActive: {
    color: '#FFFFFF',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  controlButton: {
    backgroundColor: '#FF5E5E',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    minWidth: 120,
    alignItems: 'center',
    boxShadow: '0px 4px 8px rgba(255, 94, 94, 0.3)',
  },
  resetButton: {
    backgroundColor: '#333333',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
  },
});
