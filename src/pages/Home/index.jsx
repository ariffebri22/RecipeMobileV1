import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import React from 'react';
import {InputSearch} from '../../components';
import {Text, Image} from '@rneui/base';
import {Img1} from '../../assets';

const screenWidth = Dimensions.get('window').width;

function Home() {
  return (
    <View style={styles.container}>
      <InputSearch placeHolder="Search Pasta, Bread , etc" />
      <View style={styles.row}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Popular Recipes</Text>
        <Text style={{fontSize: 16}}>Popular check</Text>
        <ScrollView
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.box}>
            <Image source={Img1}></Image>
            <Text>Item 1</Text>
          </View>
          <View style={styles.box}>
            <Text>Item 2</Text>
          </View>
          <View style={styles.box}>
            <Text>Item 3</Text>
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
          <View style={styles.square}>
            <Image source={Img1}></Image>
            <Text>Item 1</Text>
          </View>
          <View style={styles.square}>
            <Text>Item 2</Text>
          </View>
          <View style={styles.square}>
            <Text>Item 3</Text>
          </View>
          <View style={styles.square}>
            <Text>Item 4</Text>
          </View>
        </ScrollView>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 20, fontWeight: '600'}}>Popular Recipes</Text>
        <ScrollView
          horizontal={true}
          style={styles.carousel}
          showsHorizontalScrollIndicator={false}>
          <View style={styles.box1}>
            <Image source={Img1}></Image>
            <Text>Item 1</Text>
          </View>
          <View style={styles.box1}>
            <Text>Item 2</Text>
          </View>
          <View style={styles.box1}>
            <Text>Item 3</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCFCFC',
    flex: 1,
    alignItems: 'center',
  },

  row: {
    alignItems: 'flex-start',
    // flex: 1,
    // backgroundColor: 'red',
    width: screenWidth,
    paddingLeft: 30,
    marginTop: 20,
    // marginHorizontal: ,
  },

  carousel: {
    flexDirection: 'row',
    marginTop: 20,
  },

  box: {
    width: 260,
    height: 158,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
  },

  box1: {
    width: 180,
    height: 140,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
  },

  square: {
    width: 70,
    height: 70,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 10,
  },
});
