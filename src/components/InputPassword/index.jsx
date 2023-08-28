import React, {useState} from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {LogoLock, LogoLockActive} from '../../assets';

const InputPassword = () => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = text => {
    setInputValue(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View
      style={[styles.container, {borderColor: isFocused ? '#EFC81A' : '#ccc'}]}>
      <Image
        source={isFocused ? LogoLockActive : LogoLock}
        style={styles.image}
      />
      <TextInput
        style={[styles.input, {color: isFocused ? '#EFC81A' : '#222'}]}
        placeholder="Password"
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 10,
    marginTop: 15,
    backgroundColor: '#EFEFEF',
  },

  image: {
    // width: 22,
    // height: 24,
    marginRight: 25,
    marginLeft: 15,
  },

  input: {
    width: 242,
    height: 40,
    padding: 0,
    fontSize: 16,
  },
});

export default InputPassword;
