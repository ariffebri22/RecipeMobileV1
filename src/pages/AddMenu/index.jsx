import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import {Input, Icon, Text} from '@rneui/themed';
import {ButtonCta} from '../../components';

const AddMenu = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          color: '#EFC81A',
          fontWeight: '700',
          marginTop: 80,
          marginBottom: 30,
        }}>
        Add Your Recipe
      </Text>
      <Input
        inputContainerStyle={styles.input}
        placeholder="Title"
        leftIcon={
          <Icon
            marginLeft={10}
            type="feather"
            name="book-open"
            size={28}
            color="#8B8A8F"
          />
        }
      />
      <Input
        inputContainerStyle={styles.input}
        placeholder="Ingredients"
        numberOfLines={6}
      />
      <Input inputContainerStyle={styles.input} placeholder="Add Photo" />
      <Input inputContainerStyle={styles.input} placeholder="Category" />
      <ButtonCta title="POST" />
    </View>
  );
};

export default AddMenu;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 0,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
