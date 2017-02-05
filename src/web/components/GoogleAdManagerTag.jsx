// Just one hard coded tag for now
// Expects common part of code to be defined in <head> already

import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';

export class GoogleAdManagerTag extends React.Component {
    constructor(props) {
    super(props);
    // console.log('props:', props);
  }

  componentDidMount() {
    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1486323176337-0'); });
  }
  
//<!-- /1026214/podo_pub -->
  render() {
    return (
      <div>
        <div id='div-gpt-ad-1486323176337-0'>
        </div>
      </div>
    );
  }
}
