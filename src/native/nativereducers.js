import reduceReducers from 'reduce-reducers';

import commonReducer from './../commonreducer';
import nativeReducer from './nativereducer';

const nativereducers = reduceReducers(commonReducer, nativeReducer);
export default nativereducers;