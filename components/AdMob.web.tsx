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

export const InterstitialAd = {
  createForAdRequest: () => ({
    load: () => {},
    show: () => {
      console.log('Showing Interstitial Ad (Web Mock)');
    },
    addAdEventListener: (event: string, callback: () => void) => {
      if (event === AdEventType.LOADED) {
        setTimeout(callback, 500); // Simulate network load
      }
      return () => {};
    },
  }),
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
