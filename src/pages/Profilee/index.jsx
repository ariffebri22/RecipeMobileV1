import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ButtonCta} from '../../components';
import {logout} from '../../store/action/auth';
import {useDispatch} from 'react-redux';

const Profilee = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ButtonCta title="LOGOUT" onPress={() => dispatch(logout())} />
    </View>
  );
};

export default Profilee;

const styles = StyleSheet.create({});
