import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';
import React from 'react';
import {ImgStartScreen, IconStart} from '../../assets';
import LinearGradient from 'react-native-linear-gradient';
import {ButtonCta} from '../../components';
import {useNavigation} from '@react-navigation/native';

const StartScreen = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate('Loginn');
  };
  return (
    <View>
      <ImageBackground
        source={ImgStartScreen}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(239, 200, 26, 0.4)']}
        locations={[0.1, 1]}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Image source={IconStart} style={{width: 65, marginTop: 15}}></Image>
        <View style={{marginBottom: 15, paddingHorizontal: 30}}>
          <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>
            Find and Add your best Recipes
          </Text>
          <Text style={{color: 'white', fontSize: 15, marginBottom: 5}}>
            Try various secret recipes from around the world for your cooking
            today, or you can add your best recipes so the whole world can taste
            your cooking.
          </Text>
          <ButtonCta title="Let's Started!" onPress={handleStart} />
        </View>
      </LinearGradient>
    </View>
  );
};

export default StartScreen;

const styles = StyleSheet.create({});
