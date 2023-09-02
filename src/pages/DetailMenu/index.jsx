import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Icon} from '@rneui/themed';
import {
  IconBookmark,
  IconBookmarkActive,
  IconLike,
  IconLikeActive,
} from '../../assets/Images';
import {useNavigation} from '@react-navigation/native';
import {getMenuDetails} from '../../store/action/menu';

const DetailMenu = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {getMenuById} = useSelector(state => state);
  const {data} = getMenuById;
  const itemId = route.params?.itemId;
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    dispatch(getMenuDetails(itemId));
  }, [dispatch, itemId]);

  const title = data?.data?.title || '';
  const creator = data?.data?.creator || '';
  const ingredients = data?.data?.ingredients || '';

  const toggleLike = () => {
    setLiked(!liked);
  };

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: data?.data?.photo}} style={styles.ImgMenu} />
      <View style={{width: '100%', height: '55%'}}>
        <View style={styles.bgImg}></View>
        <View style={{alignItems: 'flex-start'}}>
          <Icon
            type="feather"
            name="chevron-left"
            size={60}
            color="white"
            marginLeft={10}
            marginTop={10}
            onPress={() => navigation.goBack()}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 25,
              marginTop: 160,
            }}>
            <View>
              <View style={{width: 210}}>
                <Text
                  style={{
                    fontSize: 29,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  {title}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 15,
                    marginTop: 5,
                  }}>
                  By {creator}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginLeft: 50}}>
              <TouchableOpacity onPress={toggleBookmark}>
                <Image
                  source={bookmarked ? IconBookmarkActive : IconBookmark}
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleLike}>
                <Image source={liked ? IconLikeActive : IconLike} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <Text
          style={{
            fontSize: 25,
            color: 'black',
            marginRight: 170,
            marginTop: 20,
            marginBottom: 20,
          }}>
          Ingredients
        </Text>
        <ScrollView
          style={{
            width: 300,
            maxHeight: 300,
            backgroundColor: 'rgba(250, 247, 237, 1)',
            borderRadius: 20,
            padding: 20,
          }}>
          <Text
            style={{
              color: 'rgba(102, 102, 102, 1)',
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            {ingredients}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default DetailMenu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'cyan',
    alignItems: 'center',
    height: '100%',
  },

  ImgMenu: {
    width: '100%',
    height: '55%',
    position: 'absolute',
  },

  bgImg: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    position: 'absolute',
  },

  content: {
    backgroundColor: 'white',
    width: '100%',
    height: '60%',
    position: 'absolute',
    marginTop: 340,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
});
