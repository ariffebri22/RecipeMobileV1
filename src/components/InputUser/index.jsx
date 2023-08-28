import React, {useState} from 'react';
import {View, TextInput, Image, StyleSheet} from 'react-native';
import {LogoUser, LogoUserActive} from '../../assets';

const InputUser = ({placeHolder}) => {
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
      style={[
        styles.container,
        {borderColor: isFocused ? '#EFC81A' : '#ccc'}, // Change border color based on focus
      ]}>
      <Image
        source={
          isFocused
            ? LogoUserActive // Use yellow image when focused
            : LogoUser // Use gray image when not focused
        }
        style={styles.image}
      />
      <TextInput
        style={[
          styles.input,
          {color: isFocused ? '#EFC81A' : '#222'}, // Change text color based on focus
        ]}
        placeholder={placeHolder}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
    width: 250,
    height: 40,
    padding: 0,
    fontSize: 16,
  },
});

export default InputUser;
