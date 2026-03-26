import { NativeModules } from 'react-native';

// Check if the native AdMob module is installed (it won't be in standard Expo Go)
const isNativeLinked = !!NativeModules.RNGoogleMobileAdsModule;

let BannerAd: any, BannerAdSize: any, TestIds: any, InterstitialAd: any, AdEventType: any;

if (isNativeLinked) {
  const AdMob = require('react-native-google-mobile-ads');
  BannerAd = AdMob.BannerAd;
  BannerAdSize = AdMob.BannerAdSize;
  TestIds = AdMob.TestIds;
  InterstitialAd = AdMob.InterstitialAd;
  AdEventType = AdMob.AdEventType;
} else {
  const Mock = require('./AdMob.web');
  BannerAd = Mock.BannerAd;
  BannerAdSize = Mock.BannerAdSize;
  TestIds = Mock.TestIds;
  InterstitialAd = Mock.InterstitialAd;
  AdEventType = Mock.AdEventType;
}

export { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType };
