import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackgroundImage} from '@rneui/base';
import {Input, Icon, SearchBar, Image, Text} from '@rneui/themed';
import axios from 'axios';
import {
  ImgGado,
  ImgNasgor,
  ImgParfrait,
  ImgSate,
  ImgSpagheti,
  ImgStrawbery,
  Icon1,
  Icon2,
  Icon3,
  Hello,
} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

function Home() {
  const navigation = useNavigation();
  const login = useSelector(state => state.login);

  const handleCta = () => {
    navigation.navigate('SearchMenu');
  };
  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 30,
          height: 150,
          justifyContent: 'space-between',
          flexDirection: 'row',
          overflow: 'hidden',
          shadowColor: 'black',
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 20}}>Hi, {login.data.username} !</Text>
          <Text style={{fontSize: 15}}>What are you cooking today?</Text>
          <TouchableOpacity
            onPress={handleCta}
            style={{
              backgroundColor: '#EFC81A',
              borderRadius: 6,
              height: 30,
              width: 90,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={{color: 'white'}}>Let's cook !</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Image
            source={Hello}
            style={{width: 110, height: 110, marginTop: 10}}
          />
        </View>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Popular Recipes</Text>
        <Text style={{fontSize: 16}}>Popular check</Text>
        <ScrollView
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.box}>
            <BackgroundImage source={ImgGado} style={styles.Img} />
            <Text style={styles.textImg}>Gado-gado</Text>
          </View>
          <View style={styles.box}>
            <BackgroundImage source={ImgNasgor} style={styles.Img} />
            <Text style={styles.textImg}>Nasi Goreng</Text>
          </View>
          <View style={styles.box}>
            <BackgroundImage source={ImgSate} style={styles.Img} />
            <Text style={styles.textImg}>Sate Ayam</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.row}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, fontWeight: '600'}}>New Recipes</Text>
          <Text style={{fontSize: 12, marginLeft: 172, color: 'blue'}}>
            More Info
          </Text>
        </View>
        <ScrollView
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.IconCont}>
            <View style={styles.square}>
              <BackgroundImage source={Icon2} style={styles.Icon} />
            </View>
            <Text style={{marginTop: 5, fontSize: 15}}>Soup</Text>
          </View>
          <View style={styles.IconCont}>
            <View style={styles.square}>
              <BackgroundImage source={Icon1} style={styles.Icon} />
            </View>
            <Text style={{marginTop: 5, fontSize: 15}}>Chicken</Text>
          </View>
          <View style={styles.IconCont}>
            <View style={styles.square}>
              <BackgroundImage source={Icon3} style={styles.Icon} />
            </View>
            <Text style={{marginTop: 5, fontSize: 15}}>Seafood</Text>
          </View>
          <View style={styles.IconCont}>
            <View style={styles.square}>
              <BackgroundImage source={Icon1} style={styles.Icon} />
            </View>
            <Text style={{marginTop: 5, fontSize: 15}}>Dessert</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Popular For You</Text>
        <ScrollView
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.box1}>
            <BackgroundImage source={ImgParfrait} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{fontSize: 16, fontWeight: '900', marginLeft: 10}}>
                Parfrait Fruit
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', marginLeft: 10}}>
                Parfaits are made of fruit...
              </Text>
            </View>
          </View>
          <View style={styles.box1}>
            <BackgroundImage source={ImgStrawbery} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{fontSize: 16, fontWeight: '900', marginLeft: 10}}>
                Strawberry Shortcake
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', marginLeft: 10}}>
                This Shortcake made with...
              </Text>
            </View>
          </View>
          <View style={styles.box1}>
            <BackgroundImage source={ImgSpagheti} style={styles.Img1} />
            <View style={styles.headTitle}>
              <Text style={{fontSize: 16, fontWeight: '900', marginLeft: 10}}>
                Spaghetti Carbonara
              </Text>
              <Text style={{fontSize: 12, fontWeight: '500', marginLeft: 10}}>
                Delicious health food is...
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    flex: 1,
    // alignItems: 'center',
  },

  row: {
    alignItems: 'flex-start',
    width: screenWidth,
    paddingLeft: 30,
    marginBottom: 15,
    // overflow: 'visible',
  },

  carousel: {
    flexDirection: 'row',
    marginTop: 15,
    // height: 200,
    // overflow: 'visible',
  },

  box: {
    width: 260,
    height: 158,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  box1: {
    width: 180,
    height: 140,
    backgroundColor: 'lightgray',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 20, height: 10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 20,
  },

  square: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    // marginRight: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },

  Img: {
    width: 260,
    height: 158,
    position: 'absolute',
  },

  Img1: {
    width: 180,
    height: 140,
    position: 'absolute',
  },

  textImg: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginLeft: 20,
    marginBottom: 14,
  },

  Icon: {
    width: 75,
    height: 75,
    position: 'absolute',
  },

  IconCont: {
    alignItems: 'center',
    marginRight: 20,
  },

  headTitle: {
    width: 180,
    height: 50,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },

  input: {
    // height: 50,
  },
});

export default Home;
