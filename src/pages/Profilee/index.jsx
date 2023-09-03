import {StyleSheet, View} from 'react-native';
import React from 'react';
import {logout} from '../../store/action/auth';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Image} from '@rneui/base';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {Modal1} from '../../components';

const Profilee = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const login = useSelector(state => state.login);
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const handleLogout = () => {
    onClosePopup();
    Toast.show({
      type: 'success',
      text1: 'Adios👋',
    });

    setTimeout(() => {
      dispatch(logout());
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={{uri: login.data.photo}} style={styles.ImgProfile} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: '800',
            color: 'white',
            marginTop: 10,
            marginBottom: 20,
          }}>
          {login.data.username}
        </Text>
      </View>
      <View style={styles.cover}>
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Icon
              marginLeft={20}
              marginRight={20}
              type="feather"
              name="user"
              size={35}
              color="rgba(239, 200, 26, 1)"
            />
            <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
              Edit Profile
            </Text>
          </View>
          <View style={styles.barRight}>
            <Icon
              marginRight={20}
              type="feather"
              name="chevron-right"
              size={35}
              color="#8C8C8C"
            />
          </View>
        </View>
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Icon
              marginLeft={20}
              marginRight={20}
              type="feather"
              name="award"
              size={35}
              color="rgba(239, 200, 26, 1)"
            />
            <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
              My Recipe
            </Text>
          </View>
          <View style={styles.barRight}>
            <Icon
              marginRight={20}
              type="feather"
              name="chevron-right"
              size={35}
              color="#8C8C8C"
              onPress={() =>
                navigation.push('MyRecipe', {itemId: login.data.id})
              }
            />
          </View>
        </View>
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Icon
              marginLeft={20}
              marginRight={20}
              type="feather"
              name="bookmark"
              size={35}
              color="rgba(239, 200, 26, 1)"
            />
            <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
              Saved Recipe
            </Text>
          </View>
          <View style={styles.barRight}>
            <Icon
              marginRight={20}
              type="feather"
              name="chevron-right"
              size={35}
              color="#8C8C8C"
            />
          </View>
        </View>
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Icon
              marginLeft={20}
              marginRight={20}
              type="feather"
              name="thumbs-up"
              size={35}
              color="rgba(239, 200, 26, 1)"
            />
            <Text style={{color: 'rgba(0, 0, 0, 0.70);', fontSize: 20}}>
              Liked Recipe
            </Text>
          </View>
          <View style={styles.barRight}>
            <Icon
              marginRight={20}
              type="feather"
              name="chevron-right"
              size={35}
              color="#8C8C8C"
            />
          </View>
        </View>
        <View style={styles.bar}>
          <View style={styles.barLeft}>
            <Icon
              marginLeft={20}
              marginRight={20}
              type="feather"
              name="log-out"
              size={35}
              color="#ff6666"
            />
            <Text
              style={{color: '#ff6666', fontSize: 20}}
              onPress={onShowPopup}>
              Logout
            </Text>
          </View>
          <View style={styles.barRight}></View>
        </View>
      </View>
      <Toast />
      <Modal1
        title="Logout"
        message={`Are you sure want to logout?`}
        ref={target => (popupRef = target)}
        onTouchOutside={onClosePopup}
        onPress={handleLogout}
      />
    </View>
  );
};

export default Profilee;

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
    height: 530,
    backgroundColor: 'white',
    marginTop: 250,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: 'hidden',
    flexDirection: 'column',
  },

  ImgProfile: {
    width: 120,
    height: 120,
    borderRadius: 100,
  },

  bar: {
    width: 370,
    height: 70,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  barLeft: {
    // width: 150,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
  },

  barRight: {
    // width: 100,
    alignItems: 'center',
    flexDirection: 'row',
  },
});

{
  /* <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ButtonCta title="LOGOUT" onPress={() => dispatch(logout())} />
    </View> */
}
