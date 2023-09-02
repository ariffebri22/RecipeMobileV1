import {combineReducers} from 'redux';

import login from './login';
import regis from './regis';
import getMenuReducers from './getMenuReducers';
import {postMenu} from './postMenu';
import getMenuById from './getMenuById';

const appReducers = combineReducers({
  login,
  regis,
  getMenuReducers,
  postMenu,
  getMenuById,
});

export default appReducers;
