import axios from 'axios';
import Toast from 'react-native-toast-message';

const base_url = 'https://weak-blue-cape-buffalo-cap.cyclic.app/';

export const postlogin = (data, navigation) => async (dispatch, getState) => {
  try {
    dispatch({type: 'LOGIN_REQUEST'});
    const result = await axios.post(base_url + `users/login`, data);
    console.log('result data ', result.data);
    result.data && dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
    result.data && console.log('success');
    navigation.replace('Splashh');
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
  return (dispatch, getState) => {
    try {
      const token = getState().login.data.token;
      console.log('get token', token);
      dispatch({type: 'DELETE_TOKEN'});
    } catch (error) {
      console.error('An error occurred while logging out:', error);
      console.log(token);
    }
  };
};

export const register = (data, navigation) => async dispatch => {
  try {
    let headers = {
      'Content-Type': 'multipart/form-data',
    };

    dispatch({type: 'REGIS_REQUEST'});

    const response = await axios.post(base_url + `users`, data, {headers});

    dispatch({type: 'REGIS_SUCCESS', payload: response.data.users});
    Toast.show({
      type: 'success',
      text1: 'Registration Successful!',
    });
    setTimeout(() => {
      navigation.replace('Loginn');
    }, 2000);
  } catch (error) {
    console.log('An error occurred:', error);
    dispatch({
      type: 'REGIS_FAILED',
      payload: error.response?.data?.message || 'An error occurred',
    });
    console.error(error);
    Toast.show({
      type: error.response?.data?.message,
    });
  }
};
