export function onInputChange(valueObj) {
  // console.log('ac: onInputChange with ', valueObj)
  let changeSet = {
    weekday: {
      subway: valueObj.weekday && valueObj.weekday.subwayTrips,
      nonSubway: valueObj.weekday && valueObj.weekday.nonSubwayTrips
    },
    weekend: {
      subway: valueObj.weekend && valueObj.weekend.subwayTrips,
      nonSubway: valueObj.weekend && valueObj.weekend.nonSubwayTrips
    }
  };
  // console.log('cs:', changeSet)

  return {
    type: 'SET_VALUES',
    changeSet: changeSet
  };
}

export function onInputFinalized(valueObj) {
  let changeSet = {
    weekday: {
      subway: valueObj.weekday && valueObj.weekday.subwayTrips,
      nonSubway: valueObj.weekday && valueObj.weekday.nonSubwayTrips
    },
    weekend: {
      subway: valueObj.weekend && valueObj.weekend.subwayTrips,
      nonSubway: valueObj.weekend && valueObj.weekend.nonSubwayTrips
    }
  };
  return function(dispatch) {
    dispatch({
      type: 'SET_VALUES',
      changeSet: changeSet
    });

    dispatch({
      type: 'UPDATE_EXPENSIVE_VALUES',
      changeSet: changeSet
    });
  }
}

export function onAppLayout(dims) {
  return {
    type: 'SET_WINDOW_SIZE',
    width: dims.width,
    height: dims.height
  }
}

export function onSharePressed() {
  return function(dispatch) {
    dispatch({
      type: 'UPDATE_EXPENSIVE_VALUES'
    });
    dispatch({
      type: 'SHARE',
      url: 'https://podorozhnik.firebaseapp.com'
    });
  }
}

export function onPayButtonClicked() {
  return {
    type: 'NAVIGATE_TO_PAYMENT_VIEW'
  }
}

export function onPaymentViewBackButtonClicked() {
  return {
    type: 'NAVIGATE_TO_CALC_VIEW'
  } 
}

/**
 * @param suggestedSum In Rubles
 * @param React-Navite Navigator object.
 * TODO: Switch to declarative navigation e.g. via https://github.com/aksonov/react-native-router-flux
 */
export function onTopUpPressed( suggestedSum, navigator ) {
  return {
    type: 'NAVGATE_TO_APP_TOP_UP_VIEW',
    suggestedSum: suggestedSum,
    navigator: navigator
  };
}

export function onLinkPressed( url, navigator ) {
  return {
    type: 'OPEN_BROWSER_VIEW',
    url: url,
    navigator: navigator
  };
}

export function onTopUpValueChanged( value ) {
  // console.log("AC: onTopUpValueChanged with", value);
  return  {
    type: 'TOP_UP_VALUE_CHANGED',
    value: value
  };
}

export function onInitiateSmsPressed( destCardNumber, value ) {
  return {
    type: 'INITIATE_SMS_PRESSED',
    destCardNumber: destCardNumber,
    value: value
  };
}

export function onCardNumberTextChanged( text ) {
  return {
    type: 'CARD_NUMBER_CHANGED',
    value: text
  }
}