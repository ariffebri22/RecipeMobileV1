import {combineReducers} from 'redux';

import login from './login';
import regis from './regis';
import getMenuReducers from './getMenuReducers';

const appReducers = combineReducers({
  login,
  regis,
  getMenuReducers,
});

export default appReducers;
