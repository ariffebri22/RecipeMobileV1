import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base_url = 'https://weak-blue-cape-buffalo-cap.cyclic.app/';

const instance = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return axios.create({
      baseURL: base_url,
      headers: {Authorization: `Bearer ${token}`},
    });
  } catch (error) {
    console.error('An error occurred while creating axios instance:', error);
    throw error;
  }
};

export {instance};
