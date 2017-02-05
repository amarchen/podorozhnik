import React from 'react';

import {connect} from 'react-redux';
import * as actionCreators from '../../action_creators';

import Label from 'react-bootstrap/lib/Label';

export class LabeledSlider extends React.Component {
    constructor(props) {
    super(props);
    // console.log('props:', props);
  }

  render() {
    // console.log('this.props', this.props);
    return(
      <div className="slider text-center">
        <label htmlFor='labeledSlider'>{this.props.title}:&nbsp; </label>
        <Label bsStyle="primary">{this.props.value}</Label>&nbsp;
        <input type='range'
               id='labeledSlider'
               min={this.props.min}
               max={this.props.max}
               step={this.props.step}
               value={this.props.value}
               onChange={(ev) => {
                // console.log('onch with ', ev.target.value)
                if(this.props.onInputChange) {
                  this.props.onInputChange(
                    parseInt(ev.target.value, 10)
                  );
                } 
               }}

               onInput={(ev) => {
                // console.log('on input with ', ev.target.value)
                if(this.props.onInputChange) {
                  this.props.onInputChange(
                    parseInt(ev.target.value, 10)
                  );
                } 
               }}

              onTouchEnd={(ev) => {
                // console.log('on touch end with ', ev.target.value)
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized(
                    parseInt(ev.target.value, 10)
                  );
                } 
              }}

              // onChange event isn't firing on IE 10 and around, so using onMouseUp as a fallback
              onMouseUp={(ev) => {
                // console.log('mouseup with ', ev.target.value);
                if(this.props.onInputFinalized) {
                  this.props.onInputFinalized(
                    parseInt(ev.target.value, 10)
                  );
                }
              }}
         />        
      </div>
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