var ReactNative = require('react-native');
import Share from 'react-native-share';
import {appStyle} from './styles/styles';
import Communications from 'react-native-communications';

export function setWindowSize(state, width, height) {
  // console.log('n: setWindowSize');
  appStyle.onLayout()({
      nativeEvent: {
        layout: { width: width, height: height }
      }
    });
  // console.log('nc: ', appStyle.optionsBlock.backgroundColor)
  return state.setIn(['ui', 'windowSize', 'width'], width)
              .setIn(['ui', 'windowSize', 'height'], height);
}

export function shareUrl(state) {
  // console.log('nativecore: shareUrl2, Share is', Share);
  // console.log('nc: sharing', state.getIn(['metadata', 'sharingTitle']), 
    // state.getIn(['metadata', 'sharingUrl']));

  Share.open(
    {
      message: state.getIn(['metadata', 'sharingTitle']),
      url: state.getIn(['metadata', 'sharingUrl']),
      title: 'Поделиться расчётом'
    },(e) => {
      console.log(e);
      // alert(e);
    }
  );
  return state;
}

/**
 * @param navigator React-Natove Navigator object
 */
export function pushToTopUpView( state, suggestedSum, navigator ) {
  // console.log( 'nc: navigateToTopUpView with ', suggestedSum );
  navigator.push({name: 'TopUpView'});
  return state;
}

export function openBrowserView( state, url, navigator ) {
  const updatedState = state.setIn(['webViewData', 'uri'], url);
  navigator.push({
    name: 'WebPageView',
  });
  
  return updatedState;
}

export function changeTopUpValue( state, value ) {
  // console.log('changeTopUpValue with ', value);
  return state.setIn(['topUpData', 'value'], value);
}

export function initiateSms( destCardNumber, value ) {
  console.log(`initiating sms to ${destCardNumber} with ${value}`);
  Communications.text('7878', `pod ${destCardNumber} ${value}`);
}

export function updateCardNumber( state, rawText ) {
  return state.setIn(['topUpData', 'cardNumberText'], rawText)
              .setIn(['topUpData', 'cardNumber'], rawText.replace(/\s+/g, '') );
}