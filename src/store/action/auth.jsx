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
    console.log('get token', getState().login.data.token);
    dispatch({type: 'DELETE_TOKEN'});
  };
};
