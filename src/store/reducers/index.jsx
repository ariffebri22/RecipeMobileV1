import {combineReducers} from 'redux';

import login from './login';
import regis from './regis';
import getMenuReducers from './getMenuReducers';
import {postMenu} from './postMenu';

const appReducers = combineReducers({
  login,
  regis,
  getMenuReducers,
  postMenu,
});

export default appReducers;
