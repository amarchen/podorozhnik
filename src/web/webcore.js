import {List, Map, fromJS} from 'immutable';

import { setValues, navigateToCalcView } from './../core';

export function updateFromLocation(state, routerPayload) {
  const query = routerPayload.query;
  // console.log('q: ', query)
  const weekdaySubway = query && query.wdST && parseInt(query.wdST, 10) || 2;
  const weekdayNonSubway = query && query.wdNST && parseInt(query.wdNST, 10) || 0;
  const weekendSubway = query && query.weST && parseInt(query.weST, 10) || 0;
  const weekendNonSubway = query && query.weNST && parseInt(query.weNST, 10) || 0;

  const changeSet = {
    weekday: {
      subway: weekdaySubway,
      nonSubway: weekdayNonSubway
    },
    weekend: {
      subway: weekendSubway,
      nonSubway: weekendNonSubway
    }
  }
  
  return navigateToCalcView(setValues(state, changeSet));
  // return setPath( state, routerPayload.pathname );
  // return state;
}