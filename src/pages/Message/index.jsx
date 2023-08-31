import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';

const Message = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Icon
        // marginBottom={20}
        type="feather"
        name="message-circle"
        size={50}
        color="rgba(0, 0, 0, 0.30)"
      />
      <Text style={{fontSize: 20, color: 'rgba(0, 0, 0, 0.30)'}}>
        No Message
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
