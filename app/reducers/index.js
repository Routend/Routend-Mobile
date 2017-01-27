import { combineReducers } from 'redux';
import * as trackReducer from './reducers';
import { NavigationReducer as exnavigation } from '@exponent/ex-navigation';

export default combineReducers(Object.assign(
  trackReducer,
  exnavigation
));