import React from 'react';
import {connect} from 'react-redux';
// import {List, Map, fromJS} from 'immutable';

import { InputBlockContainer } from './InputBlock';
import { GoogleAdManagerTag } from './GoogleAdManagerTag';
import { SubscribeBlock } from './SubscribeBlock';
import { wordingForExplanationLine } from '../../util';
import * as actionCreators from '../../action_creators';
var ReactDisqusThread = require('react-disqus-thread');

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';

require('./PodorozhnikApp.less');

export class PodorozhnikApp extends React.Component {
  constructor(props) {
    super(props);
    // console.log('App props:', props.model.toJS());
  }

  render() {
    // console.log('app .props: ', this.props);
    return(
      <Grid>

        <PageHeader className="text-center">
          Карта Подорожник<br/>
          <small className="subHeader">Подсчитать экономию и пополнить</small>
        </PageHeader>
        
        {this.props.children}
        
        <Row className="row-centered">
          <Col className="col-centered adColumn">
            <GoogleAdManagerTag/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ReactDisqusThread
                identifier="Podorozhnik-root"
                shortname="calculators-rus"
                title="Подорожник - калькулятор"
                url="https://podorozhnik.firebaseapp.com/"
                />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <SubscribeBlock/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    totalETicketCost: state.getIn(['paymentOptions', 'eTicket', 'totalCost']),
    singleTripsCost: state.getIn(['paymentOptions', 'singleTrips', 'totalCost']),
    weekdaySubwayTrips: state.getIn(['plannedTrips', 'weekday', 'subway']),
    weekdayNonSubwayTrips: state.getIn(['plannedTrips', 'weekday', 'nonSubway']),
    plannedTrips: state.get('plannedTrips'),
    sharingUrl: state.getIn(['metadata', 'sharingUrl']),
    sharingTitle: state.getIn(['metadata', 'sharingTitle']),
    model: state
  };
}

const PodorozhnikAppContainer = connect(mapStateToProps, actionCreators)(PodorozhnikApp);

export default PodorozhnikAppContainer;