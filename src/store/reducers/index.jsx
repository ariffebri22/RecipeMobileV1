import {combineReducers} from 'redux';

import login from './login';
import regis from './regis';
import getMenuReducers from './getMenuReducers';
import {postMenu} from './postMenu';
import getMenuById from './getMenuById';
import getMenuByUsers from './getMenuByUsers';
import putMenu from './putMenu';
import deleteMenu from './deleteMenu';
import putProfile from './putProfile';

const appReducers = combineReducers({
  login,
  regis,
  getMenuReducers,
  postMenu,
  getMenuById,
  getMenuByUsers,
  putMenu,
  deleteMenu,
  putProfile,
});

export default appReducers;
