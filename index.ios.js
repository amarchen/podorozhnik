/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux'
import configureStore from './src/native/configureStore';

import AppContainer from './src/native/components/App';

import reducer from './src/native/nativereducers';
// import PodorozhnikAppContainer from './src/web/components/PodorozhnikApp';

// TODO: Parse from url if launched from a link
const initiaSubwaylTrips = 2;

const store = configureStore();

store.dispatch({
  type: 'SET_CONFIG',
  baseUrl: 'https://podorozhnik.firebaseapp.com'
});

// store.dispatch({
//   type: 'SET_VALUES',
//   subway: initiaSubwaylTrips
// });

// store.dispatch({
//   type: 'UPDATE_EXPENSIVE_VALUES',
//   subway: initiaSubwaylTrips
// });

class podorozhnik extends Component {
  render() {
    return (
      <Provider store={store}>
       <AppContainer/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('podorozhnik', () => podorozhnik);
