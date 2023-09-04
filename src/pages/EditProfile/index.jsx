import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React, {useState} from 'react';
import {updateProfile} from '../../store/action/menu';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Image} from '@rneui/base';
import {Icon, Input} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Modal1, ButtonCta, PopupImage} from '../../components';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const login = useSelector(state => state.login);
  const {isLoading} = useSelector(state => state.putProfile);
  let popupRef = React.createRef();
  let popupRefImage = React.createRef();

  const [username, setUsername] = useState(login.data.username);
  const [picture, setPicture] = useState(login.data.photo);

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

  const handleChangesPress = () => {
    onShowPopup();
  };

  const id = login.data.id;

  const handleUpdateProfile = () => {
    const dataUser = new FormData();
    dataUser.append('username', username);
    if (picture) {
      dataUser.append('photo', {
        uri: picture,
        type: 'image/jpeg',
        name: 'user.jpg',
      });
    }
    onClosePopup();

    setTimeout(() => {
      dispatch(updateProfile(id, dataUser));
    }, 1000);
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
            setPicture(res.assets[0].uri); // Menggunakan URI gambar yang baru
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
          if (
            res.assets[0].type === 'image/png' ||
            res.assets[0].type === 'image/jpeg'
          ) {
            setPicture(res.assets[0].uri); // Menggunakan URI gambar yang baru
          } else {
            console.log('Invalid image file type');
          }
        }
      }
    });
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

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={{uri: picture}} style={styles.ImgProfile} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: '800',
            color: 'white',
            marginTop: 10,
            marginBottom: 20,
          }}
          onPress={onShowPopupImage}>
          Change Picture
        </Text>
      </View>
      <View style={styles.cover}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: 'rgba(0, 0, 0, 0.70)',
            marginTop: 30,
            marginBottom: 20,
            textAlign: 'center',
          }}>
          Change Username
        </Text>
        <Input
          inputContainerStyle={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)} // Mengubah state username
          leftIcon={
            <Icon
              marginLeft={10}
              type="feather"
              name="user"
              size={28}
              color="rgba(239, 200, 26, 1)"
            />
          }
        />
        <ButtonCta
          title={
            isLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              'Save Update'
            )
          }
          onPress={handleChangesPress}
        />
      </View>
      <Text style={{marginTop: 160}}>Recipe Mobile</Text>
      <Text>V 1.0.0</Text>
      <Text>2023 Arif Febriansyah</Text>
      <Modal1
        title="Confirm"
        message={`Are you sure to make these changes?`}
        ref={target => (popupRef = target)}
        onPress={handleUpdateProfile}
        onTouchOutside={onClosePopup}
      />
      <PopupImage
        title="Select Image from..."
        ref={target => (popupRefImage = target)}
        onTouchOutside={onClosePopupImage}
        data={popupListImage}
      />
      <Toast />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  head: {
    width: 395,
    height: 308,
    backgroundColor: '#EEC302',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cover: {
    width: 370,
    height: 250,
    backgroundColor: 'white',
    marginTop: 250,
    overflow: 'hidden',
    borderRadius: 30,
    flexDirection: 'column',
  },

  ImgProfile: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },

  input: {
    borderWidth: 1,
    padding: 0,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
