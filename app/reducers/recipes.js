import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

export const searchedRecipes = createReducer({}, {
  [types.SET_SEARCHED_RECIPES](state, action) {
    let newState = {};
    action.recipes.forEach( (recipe) => {
      newState[recipe.id] = recipe
    });
    return newState;
  }
});

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

export const testCount = createReducer([], {
  // [types.SET_SEARCHED_RECIPES](state, action) {
  //   return action.recipes.length;
  // }
  ['TEST'](state, action){
    // console.log('action.test', action.test);
    // var results = action.test.map(function(value, index) {
    //     var obj = Object.create(null);
    //     obj[coordinates] = Object.create(null);
    //     obj.id = index;
    //     obj.coordinates.latitude = value.lat;
    //     obj.coordinates.longitude = value.lng;
    //     return obj;
    // });
    // console.log('results testcount', results);
    // return results;
    // let results = [];
    // action.test.forEach((coord, index) => {
    //     var obj = {};
    //     obj[coordinates] = {};
    //     obj[coordinates].latitude = coord.lat;
    //     obj[coordinates].longitude = coord.lng;
    //     results.push(obj);
    // })
    return action.test;
  }
});
