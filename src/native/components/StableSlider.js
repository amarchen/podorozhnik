/**
 * Same as Slider, but does not accept external value setting while use is dragging it
 * That is to avoid vobbling
 */
import React, { Component } from 'react';
import { 
  View,
  PropTypes,
  Slider,
} from 'react-native';
import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';
// import { stableSliderStyle } from '../styles/styles';

export class StableSlider extends React.Component {
  constructor(props) {
    super(props);
    _isSliding = false;
    _lastValueSlidedTo = props.value;
    _aniFrameRequestInProgress = false;

    this.smartInputChange = (value) => {
      this._lastValueSlidedTo = value;
      // console.log('_lastValueSlidedTo set to ', _lastValueSlidedTo);
  
      if( !_aniFrameRequestInProgress ) {
        _aniFrameRequestInProgress = true;
        requestAnimationFrame(() => {
          // console.log('requestAnimationFrame satisfied')
          this._fireInputChange( this._lastValueSlidedTo );
          _aniFrameRequestInProgress = false;
        });
      }      
  
    }
  }

  /**
   * @param value Integer calue to be fired if there's a handler
   */
  _fireInputChange(value) {
    // console.log('_fireInputChange with ', value);
    if(this.props.onInputChange) {
      this.props.onInputChange(
        value
      );
    } 
  }

  shouldComponentUpdate() {
    // console.log('shouldComponentUpdate returns ', !_isSliding)
    // @TODO: Consider using InteractionManager.runAfterInteractions instead
    return !_isSliding;
  }

  render() {
    // console.log('SL render. this.props is', this.props)
    return(
      <Slider
        {...this.props}
        // style={stableSliderStyle.slider}
        // maximumValue={18}
        // minimumValue={1}
        // style={{alignSelf: 'stretch'}}
        // hitSlop={{top: 400, bottom: 400, left: 400, right: 400}}
        onValueChange={(value) => {
          // console.log('Sl: onValueChange with ', value,)
          _isSliding = true;
          this.smartInputChange(value)
        }}
        onSlidingComplete={(value) => {
          // console.log('SL: onSlidingComplete')
          _isSliding = false;
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  // No additions for this class
  return {    
  };
}

export const StableSliderContainer = connect(
  mapStateToProps,
  null// actionCreators
)(StableSlider);