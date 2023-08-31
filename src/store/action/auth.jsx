import axios from 'axios';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = 'https://weak-blue-cape-buffalo-cap.cyclic.app/';

export const postlogin = (data, navigation) => async dispatch => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + `users/login`, data);
    console.log('result data ', result.data);
    await AsyncStorage.setItem('token', result.data.token);
    result.data && dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
    result.data && console.log('success');
  } catch (err) {
    console.log('err');
    console.log(data);
    Toast.show({
      type: 'error',
      text1: err.response.data.message,
    });
    console.log(err.response.data.message);
    dispatch({type: 'LOGIN_ERROR', payload: err.response.data.message});
  }
};

export const logout = () => {
  return async (dispatch, getState) => {
    // console.log('get token', getState().login.data.token);
    console.log(await AsyncStorage.getItem('token'));
    dispatch({type: 'DELETE_TOKEN'});
  };
};

export const register = (data, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'REGISTER_REQUEST'});
    const result = await axios.post(base_url + `users`, data);
    console.log('result data ', result.data);
    result.data &&
      dispatch({type: 'REGISTER_SUCCESS', payload: result.data.message});
    result.data && console.log('success');
    Toast.show({
      type: 'success',
      text1: 'Registration Successful!',
    });
    setTimeout(() => {
      navigation.replace('Loginn');
    }, 2000);
  } catch (err) {
    console.log('err');
    console.log(err.response.data.message);
    dispatch({type: 'REGISTER_ERROR', payload: err.response.data.message});
    Toast.show({
      type: 'error',
      text1: err.response?.data?.message,
    });
  }
};
