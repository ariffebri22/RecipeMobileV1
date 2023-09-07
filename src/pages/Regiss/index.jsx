import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BgSplash, LogoMamaKecil} from '../../assets';
import {ButtonCta} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {Input, Icon} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {register} from '../../store/action/auth';
import {IconDefault} from '../../assets';

const screenWidth = Dimensions.get('window').width;

const Regiss = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {messageError, isError, isLoading} = useSelector(state => state.regis);
  const [isFocused, setIsFocused] = useState(false);
  const [inputData, setInputData] = useState({
    type: 'user',
    username: '',
    email: '',
    password: '',
  });

  const handleInput = (name, value) => {
    setInputData({...inputData, [name]: value});
  };

  const handleSubmit = async () => {
    try {
      dispatch(register(inputData, navigation));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = () => {
    navigation.navigate('Loginn');
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <Image source={BgSplash} style={styles.BgSplash}></Image>
        <View style={styles.overlay} />
        <Image source={LogoMamaKecil} style={styles.logo} />
      </View>
      <View style={styles.main}>
        <Text style={styles.welcome}>Welcome !</Text>
        <Text style={styles.login}>Register to Recipe App</Text>
        <Input
          inputContainerStyle={[
            styles.input,
            {color: isFocused ? '#EFC81A' : '#222'},
          ]}
          placeholder="Username"
          value={inputData.username}
          onChangeText={text => setInputData({...inputData, username: text})}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
        <Input
          inputContainerStyle={[
            styles.input,
            {color: isFocused ? '#EFC81A' : '#222'},
          ]}
          placeholder="examplexxx@gmail.com"
          value={inputData.email}
          onChangeText={text => setInputData({...inputData, email: text})}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
        <Input
          inputContainerStyle={[
            styles.input,
            {color: isFocused ? '#EFC81A' : '#222'},
          ]}
          placeholder="Password"
          value={inputData.password}
          onChangeText={text => setInputData({...inputData, password: text})}
          secureTextEntry
          leftIcon={
            <Icon
              marginLeft={10}
              type="feather"
              name="lock"
              size={28}
              color="rgba(239, 200, 26, 1)"
            />
          }
        />
      </View>
      <View style={styles.forgotCover}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </View>
      <ButtonCta
        title={
          isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            'REGISTER'
          )
        }
        onPress={handleSubmit}
      />
      <View style={styles.word}>
        <Text>
          <Text style={styles.dont}>Have an account? </Text>
          <Text style={styles.signup} onPress={handleSignin}>
            Sign In
          </Text>
        </Text>
      </View>
      <Toast />
    </View>
  );
};

export default Regiss;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  container: {
    alignItems: 'center',
    height: 200,
  },

  BgSplash: {
    flexDirection: 'column',
    alignItems: 'center',
    width: screenWidth,
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    ...StyleSheet.absoluteFillObject,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(239, 200, 26, 0.5)',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20, // Warna kuning agak transparan
  },

  logo: {
    // ...StyleSheet.absoluteFillObject,
    // width: 100,
    // height: 100,
    marginTop: 50,
  },

  welcome: {
    marginTop: 40,
    fontSize: 28,
    color: '#EFC81A',
    fontWeight: 'bold',
  },

  login: {
    color: '#C4C4C4',
    marginBottom: 20,
  },

  forgot: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
  },

  forgotCover: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
  },

  dont: {
    color: '#999999',
    fontSize: 15,
  },

  signup: {
    color: '#EFC81A',
    fontSize: 15,
    fontWeight: 'bold',
  },

  word: {
    alignItems: 'center',
    marginTop: 40,
  },

  inputEmail: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 0,
    marginTop: 15,
    backgroundColor: '#EFEFEF',
    width: 319,
    height: 60,
  },

  input: {
    borderWidth: 1,
    padding: 0,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    // height: 50,
  },

  image: {
    marginRight: 15,
    marginLeft: 15,
  },
});
