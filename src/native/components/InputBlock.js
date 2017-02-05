import React, { Component } from 'react';
import { 
  View,
  PropTypes,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import { StableSliderContainer } from './StableSlider';
import { LabeledSliderContainer } from './LabeledSlider';
import * as actionCreators from '../../action_creators';
import { inputBlockStyle } from '../styles/styles';

export class InputBlock extends React.Component {
    constructor(props) {
    super(props);
  }

    render() {
      return(
        <View    
          style={inputBlockStyle.wholeBlock}       
        >  
          <Text
            style={inputBlockStyle.sectionTitle}
          >
            Поездки в будний день
          </Text>
          <View
            style={inputBlockStyle.valuesRow}
          >
            <LabeledSliderContainer
              style={inputBlockStyle.valueControl}
              title='метро'
              minimumValue={0}
              maximumValue={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekday', 'subway'])}
              onInputChange={(value) => {
                // console.log('IB sb sl onInputChange', value);
                if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekday: {subwayTrips: value}
                  });
                } 
              }}
            /> 
            <LabeledSliderContainer
              style={inputBlockStyle.valueControl}
              title='наземный'
              minimumValue={0}
              maximumValue={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekday', 'nonSubway'])}
              onInputChange={(value) => {
                // console.log('IB: nonSb sl. onValueChange with ', value)
                  if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekday: {nonSubwayTrips: value}
                  });
                } 
                }
              }
            /> 
          </View>

          <Text
            style={inputBlockStyle.sectionTitle}
          >
            Поездки в выходной день
          </Text>
          <View
            style={inputBlockStyle.valuesRow}
          >
            <LabeledSliderContainer
              style={inputBlockStyle.valueControl}
              title='метро'
              minimumValue={0}
              maximumValue={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekend', 'subway'])}
              onInputChange={(value) => {
                // console.log('IB: sl. onValueChange with ', value)
                  if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekend: {subwayTrips: value}
                  });
                } 
                }
              }
            /> 
            <LabeledSliderContainer
              style={inputBlockStyle.valueControl}
              title='наземный'
              minimumValue={0}
              maximumValue={6}
              step={1}
              value={this.props.plannedTrips.getIn(['weekend', 'nonSubway'])}
              onInputChange={(value) => {
                // console.log('IB: sl. onValueChange with ', value)
                  if(this.props.onInputChange) {
                  this.props.onInputChange({
                    weekend: {nonSubwayTrips: value}
                  });
                } 
                }
              }
            /> 
          </View>
                   
        </View>
    );
  }
}

function mapStateToProps(state) {
  // No additions for this class
  return {    
  };
}



export const InputBlockContainer = connect(
  mapStateToProps,
  actionCreators
)(InputBlock);