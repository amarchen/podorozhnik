import { Map, fromJS } from 'immutable';
import { setValues,
         setWindowSize,
         updateUrls,
         STATE_INITIAL,
         setConfig,
         navigateToPaymentView,
         navigateToCalcView } from './core';

import { LOCATION_CHANGE } from 'react-router-redux';
import { updateFromLocation } from './web/webcore.js';


export default function(state = STATE_INITIAL, action) {
  // console.log('commonreducer action', action.type)
  switch (action.type) {
    case 'SET_VALUES':
      return setValues(state, action.changeSet);
    case 'SET_WINDOW_SIZE':
      return setWindowSize(state, action.width, action.height);
    case 'SET_CONFIG':
      return setConfig(state, action.baseUrl);
    case 'NAVIGATE_TO_PAYMENT_VIEW':
      return navigateToPaymentView(state)
      case 'NAVIGATE_TO_CALC_VIEW':
      return navigateToCalcView(state)
    case 'UPDATE_EXPENSIVE_VALUES':
      return updateUrls(state);
    case LOCATION_CHANGE:
      return updateFromLocation(state, action.payload);
  }

  // console.log('CR: unknown action type', action.type);
  return state;
}