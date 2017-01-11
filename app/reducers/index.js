import { combineReducers } from 'redux';

import * as recipesReducer from './recipes';

import { NavigationReducer as exnavigation } from '@exponent/ex-navigation'

export default combineReducers(Object.assign(
  recipesReducer,
  exnavigation
));