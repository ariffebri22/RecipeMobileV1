import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const SavedRecipe = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'space-between',
        height: '100%',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: 'cyan',
          width: '100%',
          alignItems: 'center',
          height: 80,
          paddingRight: 20,
        }}>
        <Icon
          type="feather"
          name="chevron-left"
          size={60}
          color="#EFC81A"
          // marginLeft={10}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 30,
            color: '#EFC81A',
            fontWeight: '700',
            marginRight: 70,
          }}>
          Saved Recipe
        </Text>
      </View>
      <Text style={{textAlign: 'center', marginBottom: 350}}>
        No saved recipe
      </Text>
    </View>
  );
};

export default SavedRecipe;

const styles = StyleSheet.create({});
