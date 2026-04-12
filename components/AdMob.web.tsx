import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BannerAd = () => (
  <View style={styles.bannerMock}>
    <Text style={styles.text}>AdMob Banner (Web Mock)</Text>
  </View>
);

export const BannerAdSize = {
  ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER',
};

export const TestIds = {
  BANNER: 'test-banner',
  INTERSTITIAL: 'test-interstitial',
};

export const AdEventType = {
  LOADED: 'loaded',
};

const styles = StyleSheet.create({
  bannerMock: {
    width: 320,
    height: 50,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
  },
  text: {
    color: '#aaa',
  },
});
