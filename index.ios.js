// import Exponent from 'exponent';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer.js'
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
} from 'react-native';
import {
  NavigationContext,
  createNavigationEnabledStore,
} from '@exponent/ex-navigation'
import Router from './app/navigation/Router';

// logger only works in dev mode
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__});

// configure store, put all your middleware here, using two.
function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      )
    );
  return createNavigationEnabledStore(createStore, 'exnavigation',)(
  reducer,
  initialState,
  enhancer
)
  // return createStore(reducer, initialState, enhancer);
}

const store = configureStore({})

const navigationContext = new NavigationContext({
  router: Router,
  store: store,
});

const App = () => (
  <Provider store={store}>
    <AppContainer context={navigationContext} />
  </Provider>
  );


AppRegistry.registerComponent('iRoutend', () => App);
