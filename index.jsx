import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory, useRouterHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore, routerReducer, push } from 'react-router-redux';
import createBrowserHistory from 'history/lib/createBrowserHistory';
const queryString = require('query-string');

import reducer from './src/web/webreducers';
import PodorozhnikAppContainer from './src/web/components/PodorozhnikApp';
import PaymentInfoViewContainer from './src/web/components/PaymentInfoView';
import CalcViewContainer from './src/web/components/CalcView';

const middleware = routerMiddleware(browserHistory)

export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(middleware, thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );

  const store = createStore(reducer, initialState, enhancer
  );
  
  return store;
}

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store, {selectLocationState: (state) => {
  const r = state.getIn(['metadata', 'routing']);
  // console.log('fetched path as ', r);
  return r || '/'; 
}});

store.dispatch({
  type: 'SET_CONFIG',
  baseUrl: window.location.origin
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={PodorozhnikAppContainer}>
        <IndexRoute component={CalcViewContainer}/>
        <Route path="#/pay" component={PaymentInfoViewContainer}>
        </Route>        
      </Route>

    </Router>
  </Provider>,
  document.getElementById('app')
);