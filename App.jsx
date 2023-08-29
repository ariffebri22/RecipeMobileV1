/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Router from './src/router';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import storages from './src/store';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

const {store, persistor} = storages();

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
}

export default App;

// import * as React from 'react';
// import {View, Text} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import Router from './src/router';

// function App() {
//   return (
//     <NavigationContainer>
//       <Router />
//     </NavigationContainer>
//   );
// }
