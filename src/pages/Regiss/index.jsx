import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';
import {BgSplash, LogoMamaKecil} from '../../assets';
import {InputUser, InputPassword, ButtonCta} from '../../components';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const Regiss = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.replace('Splashh');
  };

  const handleSignin = () => {
    navigation.navigate('Loginn');
  };

  return (
    <View>
      <View style={styles.container}>
        <Image source={BgSplash} style={styles.BgSplash}></Image>
        <View style={styles.overlay} />
        <Image source={LogoMamaKecil} style={styles.logo} />
      </View>
      <View style={styles.main}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.login}>Register to Recipe App</Text>
        <InputUser placeHolder="Username" />
        <InputUser placeHolder="examplexxx@gmail.com" />
        <InputPassword />
      </View>
      <View style={styles.forgotCover}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
      <ButtonCta title="REGISTER" onPress={handleLoginPress} />
      <View style={styles.word}>
        <Text>
          <Text style={styles.dont}>Have an account? </Text>
          <Text style={styles.signup} onPress={handleSignin}>
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Regiss;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
  },

  container: {
    alignItems: 'center',
    height: 200,
  },

  BgSplash: {
    flexDirection: 'column',
    alignItems: 'center',
    width: screenWidth,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...StyleSheet.absoluteFillObject,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 200, 26, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, // Warna kuning agak transparan
  },

  logo: {
    // ...StyleSheet.absoluteFillObject,
    // width: 100,
    // height: 100,
    marginTop: 50,
  },

  welcome: {
    marginTop: 40,
    fontSize: 28,
    color: '#EFC81A',
    fontWeight: 'bold',
  },

  login: {
    color: '#C4C4C4',
  },

  forgot: {
    fontSize: 15,
    marginTop: 15,
  },

  forgotCover: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },

  dont: {
    color: '#999999',
    fontSize: 15,
  },

  signup: {
    color: '#EFC81A',
    fontSize: 15,
    fontWeight: 'bold',
  },

  word: {
    alignItems: 'center',
    marginTop: 40,
  },
});
