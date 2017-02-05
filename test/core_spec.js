import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {
  STATE_INITIAL,
  setValues,
  _calcPaymentOption
} from '../src/core';

describe('Core application logic', () => {

  describe('initModel', () => {

    it('creates initial set of entries', () => {
      const state = undefined;
      const nextState = setValues(state, undefined);

      // just check that there is something in a proper place that looks correct.
      // Checking whole model would require too much test maintenance
      expect(nextState).to.equal(STATE_INITIAL); // expect
    });  // it
  });

  it('caclulates costs correctly', () => {
        // first 10 trips are 34r each
    expect(_calcPaymentOption(0).get('totalCost')).to.equal(0);
    expect(_calcPaymentOption(1).get('totalCost')).to.equal(34);
    expect(_calcPaymentOption(10).get('totalCost')).to.equal(340);

    // // 11-20th trip are 33r each
    expect(_calcPaymentOption(11).get('totalCost')).to.equal(373);
    expect(_calcPaymentOption(20).get('totalCost')).to.equal(670);
    
    // // 21-30th trip are 32r each
    expect(_calcPaymentOption(21).get('totalCost')).to.equal(702);
    expect(_calcPaymentOption(30).get('totalCost')).to.equal(990);
    
    // // 31-40th trip are 31r each
    expect(_calcPaymentOption(31).get('totalCost')).to.equal(1021);
    expect(_calcPaymentOption(40).get('totalCost')).to.equal(1300);
    
    // // 41th and later trips trip are 30r each
    expect(_calcPaymentOption(41).get('totalCost')).to.equal(1330);
    expect(_calcPaymentOption(80).get('totalCost')).to.equal(2500);

  });

});