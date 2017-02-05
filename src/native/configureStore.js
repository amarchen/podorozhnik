import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';

import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
import merger from 'redux-storage-merger-immutablejs';

import nativereducers from './nativereducers';

export default function configureStore(initialState) {

  let engine = createEngine('podo-test-key');

  // That will listen for the LOAD events and merge the data being loaded into state
  const storageReducer = storage.reducer( nativereducers, merger );

  // This middlewhere calls engine.save() after every event dispatched that might be an overkill. Not sure if debouncing is applied
  // TODO: second argument can be a list of events that should NOY trigger saving
  const storageMiddleware = storage.createMiddleware( engine );
  const createStoreWithMiddleware = applyMiddleware( storageMiddleware )( createStore );

  const enhancer = compose(
    applyMiddleware(thunk, storageMiddleware),
    devTools()
  );

  // const store = createStoreWithMiddleware(reducer);
  const load = storage.createLoader(engine);
  // Note: passing enhancer as last argument requires redux@>=3.1.0
  const store = createStore(storageReducer, initialState, enhancer);

  // load [possible] existing save right at the end of configureStore()
  load( store )
    .then((newState) => console.log('Loaded state:', newState))
    .catch((e) => {console.log('Failed to load previous state. No save yet?')});
  return store;
}