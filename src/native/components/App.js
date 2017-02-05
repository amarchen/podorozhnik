import React, { Component } from 'react';
import {
  View,
  PropTypes,
  Platform,
  AppStateIOS,
  Navigator
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';

import { appStyle } from '../styles/styles';
import * as actionCreators from '../../action_creators';
var NavigationBar = require('react-native-navbar');

import Home from './Home';
import TopUpView from './TopUpView';
import WebPageView from './WebPageView';
import { STATE_INITIAL } from '../../core'

const GA = require('react-native-google-analytics-bridge');
const GA_TRACKER_ID = Platform.OS === 'ios' ? 'UA-76217125-6' : 'UA-76217125-5';
console.log('chosen GA tracker ID is ', GA_TRACKER_ID);

GA.setTrackerId( GA_TRACKER_ID );

const TEXT_RUB = Platform.OS === 'ios' ? '₽' : 'р.';

function renderScene(route, navigator) {
   console.log(`App renderScene for route ${route.name}`);
   if(route.name == 'Home') {
     return <Home 
      navigator={navigator} 
      GA={GA}
    />
   }
   if(route.name == 'TopUpView') {
     return <TopUpView 
      navigator={navigator} 
      GA={GA}
    />
   }
   if(route.name == 'WebPageView') {
     return <WebPageView 
      navigator={navigator} 
      GA={GA}
      // url='http://ispp.spbmetropoliten.ru/'
    />
   }
}

// function renderScene(route, navigator) {
//   return <route.component
//     route={route}
//     navigator={navigator} 
//     GA={GA}
//   />;
// }

/** The app entry point */
export class App extends Component {

  componentWillMount() {
    console.log('App component will mount');
    GA.trackEvent('general', 'app: started');
  }


  componentDidMount() {
    console.log('App component did mount');
    GA.trackEvent('general', 'app: activated');
    GA.trackEvent('general', 'app: moved to foreground');
    if( Platform.OS === 'ios' ) {
      AppStateIOS.addEventListener('change', this._handleAppStateChange);
    }
  }

  componentWillUnmount() {
    GA.trackEvent('general', 'app: exit');
    if( Platform.OS === 'ios' ) {
      AppStateIOS.removeEventListener(' change', this._handleAppStateChange);
    }
  }

  _handleAppStateChange(currentAppState) {
    console.log('_handleAppStateChange width ', currentAppState);
    if(currentAppState === 'background') {
      GA.trackEvent('general', 'app: moved to background');
    } else {
      GA.trackEvent('general', 'app: moved to foreground');
    }
  }

  render() {
    const routes = [
      { name: 'Home' },
      { name: 'TopUpView' },
      { name: 'WebPageView'}
    ];

    return (
      <View style={appStyle.podorozhnikAppView}
        onLayout={(e) => {
                if(this.props.onAppLayout) {
                  this.props.onAppLayout({
                    width: e.nativeEvent.layout.width,
                    height: e.nativeEvent.layout.height
                  });
                } 
              }
            }
      >
        <Navigator
            style={appStyle.appNavigator}
            initialRoute={routes[0]}
            initialRouteStack={routes}
            onDidFocus={(route) => {
              console.log('N: onDidFocus: ', route.name);
              GA.trackScreenView(route.name);
            }}
            renderScene={renderScene}/>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    model: state || STATE_INITIAL
  };
}

const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App);

export default AppContainer;
