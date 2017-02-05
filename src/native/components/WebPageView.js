import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  PropTypes,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  AppStateIOS,
  WebView
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';

import PaymentOption from './PaymentOption';
import Header from './Header';
import { LabeledSliderContainer } from './LabeledSlider';
import { InputBlockContainer } from './InputBlock';
import { wordingForExplanationLine } from '../../util';
import { AdMobBanner } from 'react-native-admob'

import { webPageViewStyle, getSetting } from '../styles/styles';
import * as actionCreators from '../../action_creators';

import NavigationBar from 'react-native-navbar';

const TEXT_RUB = Platform.OS === 'ios' ? '₽' : 'р.';

export class WebPageView extends Component {

  componentDidMount() {
    console.log('WebPageView component did mount,  url is ', this.props.url);
  }

  
  render() {
    // console.log('WebPageView render. props url is ', this.props.url)
    return (
      <View style={webPageViewStyle.wholeView}
        
      >
        <NavigationBar
          style={webPageViewStyle.navBar}
          statusBar={{
            hidden: webPageViewStyle.statusBar.hidden || false
          }}
          leftButton={{
            title: '< Back',
            handler: () => {
              if(this.props.navigator) {
                this.props.navigator.pop();
              }
            }
          }}
          title={{ title: 'Top up view', }}
        />
        <WebView
          source={{uri: this.props.uri}}
          style={webPageViewStyle.innerWebView}
        />

        <View
          style={webPageViewStyle.bottomBannerWrapper}
        >
          <AdMobBanner
            style={webPageViewStyle.bottomBanner}
            bannerSize={"smartBannerPortrait"}
            adUnitID={"ca-app-pub-6248714847105943/1045980532"}
            didFailToReceiveAdWithError={this.bannerError}
          />
        </View>

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    uri: state.getIn(['webViewData', 'uri'])
  };
}

const WebPageViewContainer = connect(
  mapStateToProps,
  actionCreators
)(WebPageView);

export default WebPageViewContainer;
