import { List, Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/web/webreducers';
import { STATE_INITIAL } from '../src/core';

describe('reducer', () => {

  // it('handles SET_VALUES without initial state', () => {
  //   const initialState = undefined;
  //   const action = {
  //     type: 'SET_VALUES',
  //     subway: 2
  //   };
    
  //   const nextState = reducer(initialState, action);
  //   expect(nextState).to.equal(fromJS({
  //     plannedMonthlyTrips: {
  //       tram: 0,
  //       trolleyBus: 0,
  //       bus: 0,
  //       subway: 2
  //     },
  //     notDistributedTrips: {
  //       tram: 0,
  //       trolleyBus: 0,
  //       bus: 0,
  //       subway: 0
  //     },
  //     paymentOptions: [
  //       {
  //         monthly: "none",
  //         metroPackage: 'none',
  //         walletMoney: 68,
  //         walletSubwayTrips: 2,
  //         walletNonSubwayTrips: 0,
  //         totalCost: 68
  //       },
  //     ],
  //     // winner is just a convenience copy of a winning paymentOption
  //     winner: {
  //       monthly: "none",
  //       metroPackage: 'none',
  //       walletMoney: 0,
  //       walletSubwayTrips: 0,
  //       walletNonSubwayTrips: 0
  //     }
  //   }));
  // });  // it

  // it('handles SET_VALUES for subway trips', () => {
  //   const initialState = STATE_INITIAL.setIn(['plannedMonthlyTrips', 'subway'], 8);
  //   const action = {
  //     type: 'SET_VALUES',
  //     subway: 2
  //   };
    
  //   const nextState = reducer(initialState, action);

  //   expect(nextState).to.equal(fromJS({
  //     plannedMonthlyTrips: {
  //       tram: 0,
  //       trolleyBus: 0,
  //       bus: 0,
  //       subway: 2
  //     },
  //     notDistributedTrips: {
  //       tram: 0,
  //       trolleyBus: 0,
  //       bus: 0,
  //       subway: 0
  //     },
  //     paymentOptions: [
  //       {
  //         monthly: "none",
  //         metroPackage: 'none',
  //         walletMoney: 68,
  //         walletSubwayTrips: 2,
  //         walletNonSubwayTrips: 0,
  //         totalCost: 68
  //       },
  //     ],
  //     // winner is just a convenience copy of a winning paymentOption
  //     winner: {
  //       monthly: "none",
  //       metroPackage: 'none',
  //       walletMoney: 0,
  //       walletSubwayTrips: 0,
  //       walletNonSubwayTrips: 0
  //     }
  //   }));
  // });

});