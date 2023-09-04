import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getMenuUsers, deleteRecipe, getMenu} from '../../store/action/menu';
import {Icon} from '@rneui/themed';
import Toast from 'react-native-toast-message';
import {Modal1} from '../../components';

const Items = ({id, photo, title, category, creator, creator_photo}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  let popupRef = React.createRef();

  const onShowPopup = () => {
    popupRef.show();
  };

  const onClosePopup = () => {
    popupRef.close();
  };

  const handleDelete = () => {
    dispatch(deleteRecipe(id))
      .then(() => {
        onClosePopup();
        dispatch(getMenuUsers(login.data.id));
        dispatch(getMenu());
      })
      .catch(error => {
        Toast.show({
          type: 'error',
          text1: error.message,
        });
      });
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.push('DetailMenu', {itemId: id})}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 20,
            marginHorizontal: 30,
            justifyContent: 'flex-start',
          }}>
          <View>
            <Image
              style={{height: 100, width: 100, borderRadius: 10}}
              source={{uri: photo}}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              marginLeft: 10,
              width: 130,
            }}>
            <Text
              onPress={() => navigation.push('DetailMenu', {itemId: id})}
              style={{fontSize: 16, fontWeight: 'bold'}}>
              {title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text>{category}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Image
                source={{
                  uri: creator_photo !== null ? creator_photo : ImgProfile,
                }}
                style={{height: 28, width: 28, borderRadius: 50}}
              />
              <Text style={{marginLeft: 5}}>{creator}</Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              width: 90,
              height: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.push('EditMenu', {itemId: id})}
              style={{
                backgroundColor: '#30C0F3',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                marginTop: 20,
                borderRadius: 8,
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Edit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onShowPopup}
              style={{
                backgroundColor: '#F57E71',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                height: 30,
                marginTop: 10,
                borderRadius: 8,
              }}>
              <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <Modal1
          title="Confirm"
          message={`Are you sure to delete ${title}?`}
          ref={target => (popupRef = target)}
          onTouchOutside={onClosePopup}
          onPress={handleDelete}
        />
      </View>
    </View>
  );
};

const MyRecipe = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const login = useSelector(state => state.login);
  const getMenuByUsers = useSelector(state => state.getMenuByUsers);
  const {data, isSuccess, isError} = getMenuByUsers;

  console.log(data);

  useEffect(() => {
    dispatch(getMenuUsers(login.data.id));
  }, [dispatch, login.data.id]);

  return (
    <View style={styles.container}>
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
            // marginLeft: 60,
          }}>
          My Recipe
        </Text>
        <Text style={{fontSize: 30, color: '#EFC81A', fontWeight: '700'}}>
          {data.data ? data.data.length : 0}
        </Text>
      </View>

      {isError ? (
        <Text>Anda belum memiliki recipe</Text>
      ) : (
        <View style={styles.content}>
          {data.data && data.data.length > 0 ? (
            <FlatList
              marginBottom={200}
              data={data.data}
              renderItem={({item}) => (
                <Items
                  id={item.id}
                  photo={item.photo}
                  title={item.title}
                  category={item.category}
                  navigation={navigation}
                  creator={item.creator}
                  creator_photo={item.creator_photo}
                />
              )}
            />
          ) : (
            <Text>Anda belum memiliki recipe</Text>
          )}
        </View>
      )}
      <Toast />
    </View>
  );
};

export default MyRecipe;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },

  content: {
    width: '100%',
  },
});
