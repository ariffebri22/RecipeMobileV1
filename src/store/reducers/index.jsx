import {combineReducers} from 'redux';

import login from './login';

const appReducers = combineReducers({
  login,
});

export default appReducers;
