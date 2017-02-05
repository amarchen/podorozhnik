import { shareUrl,
         setWindowSize,
         pushToTopUpView,
         openBrowserView,
         changeTopUpValue,
         initiateSms,
         updateCardNumber
       } from './nativecore.js';


export default function(state = STATE_INITIAL, action) {
  // console.log('nativereducer action', action.type)
  switch (action.type) {
    case 'SHARE':
      return shareUrl(state);
    case 'SET_WINDOW_SIZE':
      return setWindowSize(state, action.width, action.height);
    case 'NAVGATE_TO_APP_TOP_UP_VIEW':
      return pushToTopUpView( state, action.suggestedSum, action.navigator );
    case 'OPEN_BROWSER_VIEW':
      return openBrowserView( state, action.url, action.navigator );
    case 'TOP_UP_VALUE_CHANGED':
      return changeTopUpValue( state, action.value);
    case 'INITIATE_SMS_PRESSED':
      initiateSms( action.destCardNumber, action.value );
      return state;
    case 'CARD_NUMBER_CHANGED':
      return updateCardNumber( state, action.value );
  }

  // console.log('NR: unknown action type', action.type);
  return state;
}