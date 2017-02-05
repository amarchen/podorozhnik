import React, { Component } from 'react';
import { 
  View,
  PropTypes,
  Text,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import { StableSliderContainer } from './StableSlider';
import * as actionCreators from '../../action_creators';
import { labeledSliderStyle } from '../styles/styles';

export class LabeledSlider extends React.Component {
    constructor(props) {
    super(props);
    // console.log('props:', props);
  }

  render() {
    // console.log('LS: this.props', this.props);

    return (
      <View style={labeledSliderStyle.labeledSliderView}>
          <Text>{this.props.title}: {this.props.value}</Text> 
          <StableSliderContainer
              style={labeledSliderStyle.labeledSliderSlider}
              minimumValue={this.props.minimumValue}
              maximumValue={this.props.maximumValue}
              step={1}
              value={this.props.value}
              onInputChange={(value) => {
                // console.log('LabSl: sl. onValueChange with ', value)
                  if(this.props.onInputChange) {
                    this.props.onInputChange(
                      value
                    );
                  } 
                }
              }

            />   
      </View>
    );

  }
}

function mapStateToProps(state) {
  // No additions for this class
  return {    
  };
}

export const LabeledSliderContainer = connect(
  mapStateToProps,
  null  // low level component, no actions to be dispatched by it
)(LabeledSlider);