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
  TextInput
} from 'react-native';
import Share from 'react-native-share';
import {connect} from 'react-redux';

import PaymentOption from './PaymentOption';
import Header from './Header';
import { LabeledSliderContainer } from './LabeledSlider';
import { InputBlockContainer } from './InputBlock';
import { wordingForExplanationLine } from '../../util';
import { AdMobBanner } from 'react-native-admob'

import { topUpViewStyle, getSetting } from '../styles/styles';
import * as actionCreators from '../../action_creators';

import NavigationBar from 'react-native-navbar';

const TEXT_RUB = Platform.OS === 'ios' ? '₽' : 'р.';

export class TopUpView extends Component {

  componentDidMount() {
    // console.log('Top up view component did mount');
  }

  
  render() {
    // console.log('Top up view component render');
    return (
      <View style={topUpViewStyle.wholeView}
        
      >
        <NavigationBar
          style={topUpViewStyle.navBar}
          statusBar={{
            hidden: topUpViewStyle.statusBar.hidden || false
          }}
          leftButton={{
            title: '< Back',
            handler: () => {
              if(this.props.navigator) {
                this.props.navigator.pop();
              }
            }
          }}
          title={{ title: 'Пополнить', }}
        />
        <ScrollView
          style={topUpViewStyle.scrollView}
        >
          <View
            style={topUpViewStyle.mainContent}
          >
              <Text style={topUpViewStyle.mainText}
              >
              Пополнить карту со счёта мобильного телефона можно отправив СМС на номер 7878 (
                <Text 
                suppressHighlighting={false}
                style={topUpViewStyle.link}
                onPress={() => {
                  if(this.props.onLinkPressed) {
                    this.props.onLinkPressed(
                      'https://www.ruru.ru/init-payment/22318',
                      this.props.navigator
                    );
                  }
                }}>Информация на сайте метрополитена
                  </Text>
                ). 
              </Text>

              <Text
              style={topUpViewStyle.sectionTitle}
              >
              Пополнить подорожник
              </Text>

              <TextInput
                style={topUpViewStyle.cardNumberInput}
                placeholder={'введите номер карты'}
                maxLength={26}
                keyboardType={'numeric'}
                textAlign='center'
                value={this.props.cardNumberText}
                onChangeText={(text) => {
                  // console.log('CN number text changed to ', text);
                  if(this.props.onCardNumberTextChanged) {
                    this.props.onCardNumberTextChanged( text );
                  }
                }}
                onEndEditing={() =>{
                  // console.log('TUV: endEditing')
                  this.props.GA.trackEvent('general', 'entered card number');
                }}
              />

              <LabeledSliderContainer
                style={topUpViewStyle.topUpValueControl}
                title='рублей'
                minimumValue={10}
                maximumValue={4000}
                step={10}
                value={this.props.topUpValue}
                onInputChange={(value) => {
                  // console.log('IB sb sl onInputChange', value);
                  // console.log("top up value control ch to ", value)
                  if(this.props.onTopUpValueChanged) {
                    this.props.onTopUpValueChanged( value );
                  } 
                }}
              /> 

              <TouchableOpacity
                onPress={() => {
                  if(!this.props.cardNumber || this.props.cardNumber.length === 0) {
                    return;
                  }
                  // console.log('sendSms pressed: this.props.cardNumber is ', this.props.cardNumber);
                  this.props.GA.trackEvent('general', 'initiated sms', {'sum' : this.props.topUpValue});
                  if(this.props.onInitiateSmsPressed) {
                    this.props.onInitiateSmsPressed(
                      this.props.cardNumber,
                      this.props.topUpValue
                    );
                  }
                }}
              >
                <Text style={topUpViewStyle.sendSmsUpButton}>
                  Приготовить СМС
                </Text>
              </TouchableOpacity>

              <Text style={topUpViewStyle.mainText}>
В ответ придёт смс с указанием размера комиссии и запросом на подтверждение оплаты. (
                <Text 
                suppressHighlighting={false}
                style={topUpViewStyle.link}
                onPress={() => {
                  if(this.props.onLinkPressed) {
                    this.props.onLinkPressed(
                      'https://www.ruru.ru/init-payment/22318',
                      this.props.navigator
                    );
                  }
                }}>Проверить размер комиссии заранее</Text>).
              </Text> 
              
              <Text style={topUpViewStyle.mainText}
              >
              После пополнения счёта Подорожника, начисленные средства надо активировать,  приложив карту  к
              любому аппарату проверки средств карты в метро

              </Text>
          </View>
        </ScrollView>

        <View
          style={topUpViewStyle.bottomBannerWrapper}
        >
          <AdMobBanner
            style={topUpViewStyle.bottomBanner}
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
  const addedProps = {
    topUpValue: state.getIn(['topUpData', 'value']),
    cardNumber: state.getIn(['topUpData', 'cardNumber']),
    cardNumberText: state.getIn(['topUpData', 'cardNumberText']),
  };
  return addedProps;
}

const TopUpViewContainer = connect(
  mapStateToProps,
  actionCreators
)(TopUpView);

export default TopUpViewContainer;
