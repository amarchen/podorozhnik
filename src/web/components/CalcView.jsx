import React from 'react';
import {connect} from 'react-redux';
// import {List, Map, fromJS} from 'immutable';

import { InputBlockContainer } from './InputBlock';
import { wordingForExplanationLine } from '../../util';
import * as actionCreators from '../../action_creators';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Button from 'react-bootstrap/lib/Button';

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon,
} from 'react-share';

require('./PodorozhnikApp.less');

const {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  VKShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const VKIcon = generateShareIcon('vk');


export class CalcView extends React.Component {
  constructor(props) {
    super(props);
    // console.log('App props:', props.model.toJS());
  }

  /**
   * @param lineCount fixed number of lines we return (some might be empty)
   * @param explanationLines Immutable data to fill lines with
   */
  generateDetailedList(lineCount, explanationLines) {
    let resultList = [];
    for(i=0; i<lineCount; i++) {
      let line = explanationLines.get(i);
      if(line) {
        resultList.push(<div key={i}>{
                      wordingForExplanationLine(line.get('type'), line.get('count')) + 
                      ' ' + line.get('cost')*line.get('count')
                    }₽ ({line.get('cost')}₽ каждая)</div>
        );
      } else {
        resultList.push(<div key={i}>&nbsp;</div>)
      }
    }
    return resultList;
  }

  render() {
    return(
      <span className="calcView">
        <Row id="eTicketRow" className="row-centered">
          <Col className="col-centered" xs={12} sm={8} md={6}>
            <ListGroup className="text-center" >
              <ListGroupItem bsStyle="success">
                Стоимость единого электронного билета на месяц: {this.props.totalETicketCost}₽
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <Row className="row-centered">
          <Col className="col-centered" xs={12} sm={8} md={6}>
            <div className="text-center">
              <Button bsStyle="primary"
                onClick={() => {
                  this.props.onPayButtonClicked()
                }}
              >Пополнить Подорожник на {this.props.totalETicketCost}₽</Button>
            </div>
          </Col>
        </Row>

        <Row className="row-centered">
          <Col className="col-centered" xs={12} sm={8} md={6}>
            <ListGroup className="text-center" >

              <ListGroupItem>
                Стоимость жетонов и билетов составила бы: {this.props.singleTripsCost}₽
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <Row className="row-centered">
          <InputBlockContainer
            plannedTrips={this.props.plannedTrips}
          />
        </Row>

        <Row className="row-centered">
          <Col className="col-centered">Поделиться рассчётом: 
          </Col>
        </Row>
        <Row className="row-centered">
          <Col className="col-centered">
            <VKShareButton
              url={this.props.sharingUrl}
              title={this.props.sharingTitle}
              className="shareButton">
              <VKIcon
                size={32}
                round />
            </VKShareButton>
            <FacebookShareButton
              url={this.props.sharingUrl}
              title={this.props.sharingTitle}
              className="shareButton">
              <FacebookIcon
                size={32}
                round />
            </FacebookShareButton>
            <TwitterShareButton
              url={this.props.sharingUrl}
              title={this.props.sharingTitle}
              className="shareButton">
              <TwitterIcon
                size={32}
                round />              
            </TwitterShareButton>
          </Col>
        </Row>
      </span>
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

const CalcViewContainer = connect(mapStateToProps, actionCreators)(CalcView);

export default CalcViewContainer;