import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Input, Icon, Text, Image} from '@rneui/themed';
import {ButtonCta, Popup, PopupImage} from '../../components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {addRecipe} from '../../store/action/menu';
import Toast from 'react-native-toast-message';

const AddMenu = () => {
  const dispatch = useDispatch();
  let popupRef = React.createRef();
  let popupRefImage = React.createRef();
  const [picture, setPicture] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const {isLoading} = useSelector(state => state.postMenu);

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const onShowPopupImage = () => {
    popupRefImage.show();
  };

  const onClosePopupImage = () => {
    popupRefImage.close();
  };

  const handleCamera = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    await launchCamera(options, res => {
      if (res.didCancel) {
        console.log('Access camera denied');
      } else if (res.error) {
        console.log('Something wrong at ImagePicker', res.errorMessage);
      } else {
        if (res.assets && res.assets.length > 0) {
          if (
            res.assets[0].type === 'image/png' ||
            res.assets[0].type === 'image/jpeg'
          ) {
            setPicture(res.assets[0]);
          } else {
            console.log('Invalid image file type');
          }
        }
      }
    });
  };

  const handleLibrary = async () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    await launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('Access gallery denied');
      } else if (res.error) {
        console.log('Something wrong at ImagePicker', res.errorMessage);
      } else {
        if (res.assets && res.assets.length > 0) {
          const selectedImage = res.assets[0];

          if (
            selectedImage.type === 'image/png' ||
            selectedImage.type === 'image/jpeg'
          ) {
            if (selectedImage.fileSize <= 2 * 1024 * 1024) {
              setPicture(selectedImage);
            } else {
              console.log('File size too large (max 2 MB)');
              Toast.show({
                type: 'error',
                text1: 'Size to large',
                text2: 'Image size too large (max 2 MB)',
              });
            }
          } else {
            console.log('Invalid image file type');
            Toast.show({
              type: 'error',
              text1: 'Invalid File',
              text2: 'File must be JPG/PNG/JPEG',
            });
          }
        }
      }
    });
  };

  const onCategorySelect = category => {
    setSelectedCategory(category);
    onClosePopup();
  };

  const popupListImage = [
    {
      id: 1,
      name: 'Camera',
      onPress: handleCamera,
    },
    {
      id: 2,
      name: 'Gallery',
      onPress: handleLibrary,
    },
  ];

  const popupList = [
    {
      id: 1,
      name: 'Appetizers',
    },
    {
      id: 2,
      name: 'Main Course',
    },
    {
      id: 3,
      name: 'Dessert',
    },
  ];

  const onPostButtonPress = () => {
    if (!title || !selectedCategory || !picture || !ingredients) {
      Toast.show({
        type: 'error',
        text1: 'No Data Added',
        text2: 'Please enter the recipe data first',
      });
      return;
    }

    if (!selectedCategory || ![1, 2, 3].includes(selectedCategory.id)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Category',
        text2:
          'Category must be 1 (Appetizers), 2 (Main Course), or 3 (Dessert).',
      });
      return;
    }

    const dataRecipe = new FormData();
    dataRecipe.append('title', title);
    dataRecipe.append('ingredients', ingredients);

    if (selectedCategory) {
      dataRecipe.append('category_id', parseInt(selectedCategory.id));
    }

    if (picture) {
      dataRecipe.append('photo', {
        uri: picture.uri,
        type: picture.type,
        name: picture.fileName,
      });
    }

    dispatch(addRecipe(dataRecipe));
    setTimeout(() => {
      setTitle('');
      setIngredients('');
      setPicture(null);
      setSelectedCategory(null);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 30,
          color: '#EFC81A',
          fontWeight: '700',
          marginTop: 40,
          marginBottom: 30,
        }}>
        Add Your Recipe
      </Text>

      <View style={styles.addPhoto}>
        {picture ? (
          <View>
            <Image source={{uri: picture.uri}} style={styles.addPhotoImage} />
            <TouchableOpacity
              onPress={onShowPopupImage}
              style={styles.changePhotoButton}>
              <Text style={{color: 'white', fontSize: 13}}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={onShowPopupImage}>
            <Icon
              type="MaterialIcons"
              name="add-a-photo"
              size={40}
              color="#8B8A8F"
            />
            <Text style={{color: '#8B8A8F', fontSize: 13}}>
              Add your best picture.
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Input
        inputContainerStyle={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
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

      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={4}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={text => setIngredients(text)}
        textAlign="left"
        placeholderTextColor="#8B8A8F"
      />
      <TouchableOpacity onPress={onShowPopup} style={styles.category}>
        <Text style={{fontSize: 18, color: '#8B8A8F', marginLeft: 15}}>
          {selectedCategory ? selectedCategory.name : 'Category'}
        </Text>
      </TouchableOpacity>
      <Popup
        title="Category"
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        data={popupList}
        onSelect={item => onCategorySelect(item)}
      />
      <PopupImage
        title="Select Image from..."
        ref={target => (popupRefImage = target)}
        onTouchOutside={onClosePopupImage}
        data={popupListImage}
      />
      <ButtonCta
        title={
          isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            'POST'
          )
        }
        onPress={onPostButtonPress}
      />
      <Toast />
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

  textInput: {
    borderWidth: 1,
    // padding: 0,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 20,
    width: 328,
    marginBottom: 25,
    borderColor: '#8B8A8F',
    paddingLeft: 15,
  },

  category: {
    height: 50,
    width: 328,
    borderWidth: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 20,
    borderColor: '#8B8A8F',
    justifyContent: 'center',
  },

  addPhoto: {
    width: 328,
    height: 200,
    borderWidth: 1,
    borderColor: '#8B8A8F',
    marginBottom: 25,
    borderRadius: 10,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addPhotoImage: {
    width: 328,
    height: 200,
    borderRadius: 10,
  },

  changePhotoButton: {
    backgroundColor: '#EFC81A',
    width: 120,
    height: 30,
    position: 'absolute',
    marginHorizontal: 100,
    marginVertical: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
