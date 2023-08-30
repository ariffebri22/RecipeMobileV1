import {combineReducers} from 'redux';

import login from './login';
import regis from './regis';

const appReducers = combineReducers({
  login,
  regis,
});

export default appReducers;
