import React from 'react';

import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';

import { LabeledSliderContainer } from './LabeledSlider';

import Col from 'react-bootstrap/lib/Col';
import Label from 'react-bootstrap/lib/Label';

export class InputBlock extends React.Component {
    constructor(props) {
    super(props);
    // console.log('props:', props);
  }

  render() {
    // console.log('IB props:', this.props)
    return(
      <div>
        <div>Поездки в будний день</div>
        <Col className="col-centered" xs={10} sm={6}>

          <div>
            <LabeledSliderContainer
              title='метро'
              min={0}
              max={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekday', 'subway'])}
              onInputChange={(value) => {
                // console.log('onInputChange', value);
                if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekday: {subwayTrips: value}
                  });
                } 
              }}
              onInputFinalized={(value) => {
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized({
                    weekday: {subwayTrips: value}
                  });
                }}
              }
            />
            <LabeledSliderContainer
              title='наземный'
              min={0}
              max={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekday', 'nonSubway'])}
              onInputChange={(value) => {
                // console.log('onInputChange', value);
                if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekday: {nonSubwayTrips: value}
                  });
                } 
              }}
              onInputFinalized={(value) => {
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized({
                    weekday: {nonSubwayTrips: value}
                  });
                }}
              }
            />        
          </div>
        </Col>
<br/><br/>
        <div>Поездки в выходной день</div>
        <Col className="col-centered" xs={10} sm={6}>

          <div>
            <LabeledSliderContainer
              title='метро'
              min={0}
              max={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekend', 'subway'])}
              onInputChange={(value) => {
                // console.log('onInputChange', value);
                if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekend: {subwayTrips: value}
                  });
                } 
              }}
              onInputFinalized={(value) => {
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized({
                    weekend: {subwayTrips: value}
                  });
                }}
              }
            />
            <LabeledSliderContainer
              title='наземный'
              min={0}
              max={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekend', 'nonSubway'])}
              onInputChange={(value) => {
                // console.log('onInputChange', value);
                if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekend: {nonSubwayTrips: value}
                  });
                } 
              }}
              onInputFinalized={(value) => {
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized({
                    weekend: {nonSubwayTrips: value}
                  });
                }}
              }
            />        
          </div>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('IB state: ', state)
  // No additions for this class
  return {    
  };
}

export const InputBlockContainer = connect(
  mapStateToProps,
  actionCreators
)(InputBlock);