import React, { Component } from 'react';
import { 
  View,
  ScrollView,
  PropTypes,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  AppStateIOS
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';

import PaymentOption from './PaymentOption';
import Header from './Header';
import { LabeledSliderContainer } from './LabeledSlider';
import { InputBlockContainer } from './InputBlock';
import { wordingForExplanationLine } from '../../util';
import { AdMobBanner } from 'react-native-admob'

import { appStyle, getSetting } from '../styles/styles';
import * as actionCreators from '../../action_creators';

import NavigationBar from 'react-native-navbar';
import { STATE_INITIAL } from '../../core';

const TEXT_RUB = Platform.OS === 'ios' ? '₽' : 'р.';

/** The app entry point */
export class Home extends Component {

  componentDidMount() {
    console.log('Home component did mount');
  }

  // /**
  //  * @param lineCount fixed number of lines we return (some might be empty)
  //  * @param explanationLines Immutable data to fill lines with
  //  */
  // generateDetailedList(lineCount, explanationLines) {
  //   let resultList = [];
  //   for(i=0; i<lineCount; i++) {
  //     let line = explanationLines.get(i);
  //     if(line) {
  //       resultList.push(<Text key={i} style={appStyle.explanationLine}>{
  //                   wordingForExplanationLine(line.get('type'), line.get('count')) + 
  //                   ' ' + line.get('cost')*line.get('count')
  //                 }{TEXT_RUB} ({line.get('cost')}{TEXT_RUB} каждая)</Text>
  //       );
  //     } else {
  //       resultList.push(<Text key={i} style={appStyle.explanationLine}>&nbsp;</Text>)
  //     }
  //   }
  //   return resultList;
  // }


// Пополнить на {this.props.totalETicketCost}{TEXT_RUB}

// Поделиться расчётом
  render() {
    // console.log('Home component render');
    return (
      <View  style={appStyle.homeView}
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
        <NavigationBar
          style={appStyle.navBar}
          statusBar={{
            hidden: appStyle.statusBar.hidden || false
          }}
          title={{ title: 'Подорожник', }}
          rightButton={{
            title: 'Поделиться',
            handler: () => {
              console.log('Share pressed');
              if(this.props.onSharePressed) {
                this.props.onSharePressed();
              }
            }
          }}
        />
        <ScrollView
          style={appStyle.homeScrollView}
        >
          <View
            style={appStyle.mainContent}
          >
            <View 
              style={[appStyle.optionsBlock, appStyle.totalBlockWrapper]}>
              <View style={appStyle.totalBlock}>
                <Text style={appStyle.totalBlockText}
                >
                Стоимость единого электронного билета на месяц: 
                </Text>
                <View style={appStyle.totalValueWrapper}>
                  <Text style={appStyle.totalBlockValue}>
                    {this.props.totalETicketCost}{TEXT_RUB}
                  </Text>
                </View>
              </View>
            </View>

            <View style={appStyle.topUpRow}>
              <TouchableOpacity
                onPress={() => {
                  console.log('topUp pressed');
                  if(this.props.onTopUpPressed) {
                    this.props.onTopUpPressed(
                      this.props.totalETicketCost,
                      this.props.navigator
                    );
                  }
                }}
                >
                <Text style={appStyle.topUpButton}>
                  Пополнить на {this.props.totalETicketCost}{TEXT_RUB}
                </Text>
              </TouchableOpacity>
            </View>

            <View 
              style={[appStyle.optionsBlock, appStyle.averageBlockWrapper]}>
              <View style={appStyle.averageBlock}>
                <Text style={appStyle.averageBlockText}>
                  Стоимость жетонов и билетов составила бы: {this.props.singleTripsCost}{TEXT_RUB}
                </Text>
              </View>
            </View>

            <View
              style={appStyle.inputBlockWrapper}
            >
              <InputBlockContainer
                style={appStyle.inputsBlock}
                plannedTrips={this.props.plannedTrips}
              />
            </View>

          </View>
        </ScrollView>

        <View
          style={appStyle.bottomBannerWrapper}
        >
          <AdMobBanner
            style={appStyle.bottomBanner}
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
   // in release Android build sometimes (after pressing Share) state is somehow undefined for a moment
   // possibly Activity creation happens from scratch then and something isn't initialized on time
   state = state || STATE_INITIAL;

  return {
    totalETicketCost: state.getIn(['paymentOptions', 'eTicket', 'totalCost']),
    singleTripsCost: state.getIn(['paymentOptions', 'singleTrips', 'totalCost']),
    weekdaySubwayTrips: state.getIn(['plannedTrips', 'weekday', 'subway']),
    weekdayNonSubwayTrips: state.getIn(['plannedTrips', 'weekday', 'nonSubway']),
    plannedTrips: state.get('plannedTrips'),
    sharingUrl: state.getIn(['metadata', 'sharingUrl']),
    sharingTitle: state.getIn(['metadata', 'sharingTitle']),
    model: state
  };
}

const HomeContainer = connect(
  mapStateToProps,
  actionCreators
)(Home);

export default HomeContainer;
