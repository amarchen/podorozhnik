import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {expect} from 'chai';

import {InputBlock} from '../../../src/web/components/InputBlock';

describe('InputBlock', () => {

  // it('renders all sub-elements', () => {
  //   const component = renderIntoDocument(
  //     <InputBlock 
  //       subwayTrips="8"
  //     />
  //   );

  //   const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
  //   expect(inputs.length).to.equal(1);
  //   expect(inputs[0].value).to.equal('8');
  // });

  // it('invokes callback when value is changed', () => {
  //   let subwayTripsIssued;
  //   const handleChange = (evt) => {
  //     subwayTripsIssued = evt.subwayTrips;
  //   }

  //   const component = renderIntoDocument(
  //     <InputBlock 
  //       subwayTrips="8"
  //       onInputChange={handleChange}
  //     />
  //   );
  //   const inputs = scryRenderedDOMComponentsWithTag(component, 'input');
  //   Simulate.change(inputs[0], { target: { value: '10' } } ) ;

  //   expect(subwayTripsIssued).to.equal(10);
  // });

});

