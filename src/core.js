import {List, Map, fromJS} from 'immutable';
import { calcMonthlyCost, calcSingleTripsCost } from './coremath';
const queryString = require('query-string');

export const STATE_INITIAL = fromJS({
  plannedTrips: {
    weekday: {
      subway: 2,
      nonSubway: 0
    },
    weekend: {
      subway: 0,
      nonSubway: 0
    }    
  },
  paymentOptions: {
    eTicket: {
      totalCost: 1420
    },
    singleTrips: {
      totalCost: 1540
    }
  },
  paymentOption: {
    totalCost: 373,
    averageCost: '33.91',
    explanation: [
      { type: "1-10", cost: 34, count: 10 },
      { type: "11-20", cost: 33, count: 1 }
    ]
  },
  ui: {
    windowSize: {
      width: 320,
      height: 480
    }
  },
  config: {
    baseUrl: 'http://whatever.org/'
  },
  topUpData: {
    value: 1420,
    cardNumber: null,
    cardNumberText: ''
  },
  metadata: {
    sharingUrl: 'http://whatever.org/',
    sharingTitle: 'Подорожник - калькулятор',
    routing: {
      locationBeforeTransitions: {
        pathname: '/',
        search: "",
        query: {          
        },
        hash: ''
      }
    }
  }

});

export function setWindowSize(state, width, height) {
  return state.setIn(['ui', 'windowSize', 'width'], width)
              .setIn(['ui', 'windowSize', 'height'], height);
}

/**
 * @param changeSet any of the elements or subtrips can be undefined
 * @return Immutable state
 */
export function setValues(state = STATE_INITIAL, changeSet) {
  if(!changeSet) return state;
  const newWeekdaySubwayTrips = changeSet.weekday && changeSet.weekday.subway !== undefined ?
                                changeSet.weekday.subway : state.getIn(['plannedTrips', 'weekday', 'subway']);
  
  const newWeekdayNonSubwayTrips = changeSet.weekday && changeSet.weekday.nonSubway !== undefined ?
                                changeSet.weekday.nonSubway : state.getIn(['plannedTrips', 'weekday', 'nonSubway']);
  const newWeekendSubwayTrips = changeSet.weekend && changeSet.weekend.subway !== undefined ?
                                changeSet.weekend.subway : state.getIn(['plannedTrips', 'weekend', 'subway']);
  
  const newWeekendNonSubwayTrips = changeSet.weekend && changeSet.weekend.nonSubway !== undefined ?
                                changeSet.weekend.nonSubway : state.getIn(['plannedTrips', 'weekend', 'nonSubway']);

  const preUpdatedState = state.setIn(['plannedTrips', 'weekday', 'subway'], newWeekdaySubwayTrips)
                               .setIn(['plannedTrips', 'weekday', 'nonSubway'], newWeekdayNonSubwayTrips)
                               .setIn(['plannedTrips', 'weekend', 'subway'], newWeekendSubwayTrips)
                               .setIn(['plannedTrips', 'weekend', 'nonSubway'], newWeekendNonSubwayTrips);
  // console.log('preUpdatedState: ', preUpdatedState.toJS())
  const newETicketCost = calcMonthlyCost( preUpdatedState.get('plannedTrips').toJS() );
  // console.log('newETicketCost: ', newETicketCost)
  const newSingleTripsCost = calcSingleTripsCost( preUpdatedState.get('plannedTrips').toJS() );
  const calcedPaymentState = preUpdatedState.setIn(['paymentOptions', 'eTicket', 'totalCost'], newETicketCost)
                        .setIn(['paymentOptions', 'singleTrips', 'totalCost'], newSingleTripsCost);
  return calcedPaymentState.setIn(['topUpData', 'value'], calcedPaymentState.getIn(['paymentOptions', 'eTicket', 'totalCost']));
}

//////// Below: exported for testing only ///////

/**
 * @return Immutable PaymentOption map
 */
export function _calcPaymentOption( plannedSubwayTrips ) {
  const origPlannedSubwayTrips = plannedSubwayTrips;
  let explanation = [];

  if( plannedSubwayTrips > 0) {
    const line0 = {type: '1-10', cost: 34, count: Math.min(10, plannedSubwayTrips)}
    explanation.push(line0);
    plannedSubwayTrips -= 10;
  }

  if( plannedSubwayTrips > 0) {
    const line0 = {type: '11-20', cost: 33, count: Math.min(10, plannedSubwayTrips)}
    explanation.push(line0);
    plannedSubwayTrips -= Math.min(10, plannedSubwayTrips);
  }

  if( plannedSubwayTrips > 0) {
    const line0 = {type: '21-30', cost: 32, count: Math.min(10, plannedSubwayTrips)}
    explanation.push(line0);
    plannedSubwayTrips -= Math.min(10, plannedSubwayTrips);
  }

  if( plannedSubwayTrips > 0) {
    const line0 = {type: '31-40', cost: 31, count: Math.min(10, plannedSubwayTrips)}
    explanation.push(line0);
    plannedSubwayTrips -= Math.min(10, plannedSubwayTrips);
  }

  if( plannedSubwayTrips > 0) {
    const line0 = {type: '41+', cost: 30, count: plannedSubwayTrips}
    explanation.push(line0);
    plannedSubwayTrips -= plannedSubwayTrips;
  }


  let totalCost = 0;
  explanation.map((line, index) => {
    totalCost += line.cost * line.count;
  });

  const averageCost = (totalCost / origPlannedSubwayTrips).toFixed(2);

  return fromJS(
    {
      totalCost: totalCost,
      averageCost: averageCost,
      explanation: explanation
    }
  );
}

/**
 * Updates urls for sharing and for displaying in the current page address bar according
 * to the core state parts (typically after lots of slow updates)
 */ 
export function updateUrls(state) {
  const searchString = '?v=20160618&wdST=' + state.getIn(['plannedTrips', 'weekday', 'subway'])
                        + '&wdNST=' + state.getIn(['plannedTrips', 'weekday', 'nonSubway'])
                        + '&weST=' + state.getIn(['plannedTrips', 'weekend', 'subway'])
                        + '&weNST=' + state.getIn(['plannedTrips', 'weekend', 'nonSubway']);
  console.log('calced searchString as ', searchString);
  const routedState = state.setIn(['metadata', 'routing'], {
    locationBeforeTransitions: {
        pathname: '/',
        search: searchString,
        query: {
        },
        hash: ''
      }
  })
  return routedState.setIn(['metadata', 'sharingUrl'], 
                    routedState.getIn(['config', 'baseUrl']) + searchString)
             .setIn(['metadata', 'sharingTitle'], 
                    'Подорожник на месяц обходится мне в ' 
                     + state.getIn(['paymentOptions', 'eTicket', 'totalCost']) + 'р.');
}

export function setConfig(state, baseUrl) {
  const configSetState = state.set('config', fromJS(
    {
      baseUrl: baseUrl
    }
  ));

  return updateUrls(configSetState);
}

export function navigateToCalcView(state) {
  return updateUrls( state );
}


export function navigateToPaymentView(state) {
  const routedState = state.setIn(['metadata', 'routing'], {
    locationBeforeTransitions: {
        pathname: '/#/pay',
        search: '',
        query: {
        },
        hash: ''
      }
  })
  return routedState;
}

/**
 * @param queryObj query-like object with the properties to pass to url
 * @param baseLocatiion Optional location-like object. Only host and pathname fields are used.
 *        Default value is window.location or if one is absent, then {host: 'podorozhnik.firebaseapp.com', pathname: '/'}
 * @return absolute url sendable to anybody
 */
export function getSharingUrl( queryObj, baseLocation ) {
  const loc = baseLocation || window.location || {host: 'podorozhnik.firebaseapp.com', pathname: '/'};
  let res = 'https://' + loc.host + loc.pathname + '?' + queryString.stringify( queryObj );
  return res;
}