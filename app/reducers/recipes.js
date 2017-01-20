import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

// export const searchedRecipes = createReducer({}, {
//   [types.SET_SEARCHED_RECIPES](state, action) {
//     let newState = {};
//     action.recipes.forEach( (recipe) => {
//       newState[recipe.id] = recipe
//     });
//     return newState;
//   }
// });

export const trackedPlaces = createReducer([], {
  [types.GET_PLACES](state, action) {
    return action.places;
  }
});

export const newPlaces = createReducer([], {
  [types.NEW_PLACES](state, action) {
    return action.places;
  }
});

export const newImage = createReducer([], {
  [types.NEW_IMAGES](state, action) {
    return action.image[action.image.length - 1].image;
  }
});

export const getImage = createReducer([], {
  [types.GET_IMAGES](state, action) {
    return action.image[action.image.length - 1].image;
  }
});


export const getMatches = createReducer([], {
  [types.GET_MATCHES](state, action) {
    return action.users;
  }
});

export const getProfile = createReducer([], {
  [types.GET_PROFILE](state, action) {
    return action.user;
  }
});

export const getStatus = createReducer([], {
  [types.GET_STATUS](state, action) {
    return action.user;
  }
});

export const mLocations = createReducer([], {
  [types.GET_LOCATION_MATCHES](state, action) {
    return action.locations;
  }
});

export const mLocationDetails = createReducer([], {
  [types.GET_LOCATION_DETAILS](state, action) {
    return action.location;
  }
});

export const mUserDetails = createReducer([], {
  [types.GET_MATCH_DETAILS](state, action) {
    return action.users;
  }
});

export const currentUserDetails = createReducer([], {
  [types.GET_CURRENT_USER](state, action) {
    return action.user;
  }
});

export const testCount = createReducer([], {
  ['TEST'](state, action) {
    return action.test;
  }
});
