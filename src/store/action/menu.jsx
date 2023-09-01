import axios from 'axios';
import Toast from 'react-native-toast-message';
import {logout} from './auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = 'https://weak-blue-cape-buffalo-cap.cyclic.app/';

export const getMenu = () => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('Token not found in AsyncStorage');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    dispatch({type: 'GET_MENU_REQUEST'});

    const response = await axios.get(base_url + 'recipe', {headers});

    if (response.data && response.data.message) {
      dispatch({type: 'GET_MENU_SUCCESS', payload: response.data});
      console.log('Success');
    } else {
      console.log('Invalid response data:', response.data);
    }
  } catch (err) {
    console.error('Error:', err);

    if (
      err.response?.data?.message ===
      'Login session expired, please login again'
    ) {
      Toast.show({
        type: 'error',
        text1: err.response.data.message,
      });

      setTimeout(() => {
        // Clear local storage and navigate to the login page
        dispatch(logout());
      }, 4000);
    } else {
      dispatch({type: 'GET_MENU_ERROR', payload: err.message});
    }
  }
};
