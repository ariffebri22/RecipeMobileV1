import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Home,
  Loginn,
  Profilee,
  Message,
  AddMenu,
  Splashh,
  Regiss,
} from '../pages';
import {
  IconAddActive,
  IconAddNon,
  IconHomeActive,
  IconHomeNon,
  IconMessageActive,
  IconMessageNon,
  IconUserActive,
  IconUserNon,
} from '../assets';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IconHomeActive : IconHomeNon}
              style={{width: 30, height: 30, marginTop: 15}}
            />
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AddMenu"
        component={AddMenu}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IconAddActive : IconAddNon}
              style={{width: 30, height: 30, marginTop: 15}}
            />
          ),
          tabBarLabel: '',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IconMessageActive : IconMessageNon}
              style={{width: 30, height: 30, marginTop: 15}}
            />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="Profilee"
        component={Profilee}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? IconUserActive : IconUserNon}
              style={{width: 30, height: 30, marginTop: 15}}
            />
          ),
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loginn">
        <Stack.Screen
          name="Loginn"
          component={Loginn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Splashh"
          component={Splashh}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Regiss"
          component={Regiss}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;

const styles = StyleSheet.create({
  TabNav: {
    backgroundColor: 'red',
  },
});
