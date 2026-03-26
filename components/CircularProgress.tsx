import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type CircularProgressProps = {
  radius: number;
  timeLeft: number;
  totalTime: number;
  mode: 'focus' | 'break';
  isActive: boolean;
};

export function CircularProgress({
  radius,
  timeLeft,
  totalTime,
  mode,
  isActive,
}: CircularProgressProps) {
  const circumference = 2 * Math.PI * radius;
  
  const progress = totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0;
  const strokeDashoffset = Math.max(0, circumference - progress * circumference);
  
  const strokeColor = mode === 'focus' ? '#FF5E5E' : '#4ECCA3';
  const size = radius * 2 + 20;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          stroke="#2A2A2A"
          strokeWidth="15"
          fill="transparent"
        />
        <Circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          stroke={strokeColor}
          strokeWidth="15"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + 10} ${radius + 10})`}
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={styles.timeText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.statusText}>{isActive ? 'Running' : 'Paused'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontSize: 64,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  statusText: {
    fontSize: 16,
    color: '#AAAAAA',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
