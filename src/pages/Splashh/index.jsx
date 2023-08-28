import {ImageBackground, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {BgSplash, LogoMama} from '../../assets';

const Splashh = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('MainApp');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground source={BgSplash} style={styles.background}>
      <View style={styles.overlay} />
      <Image source={LogoMama} style={styles.logo} />
    </ImageBackground>
  );
};

export default Splashh;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 200, 26, 0.5)', // Warna kuning agak transparan
  },

  logo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
