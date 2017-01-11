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

export const recipeCount = createReducer(0, {
  // [types.SET_SEARCHED_RECIPES](state, action) {
  //   return action.recipes.length;
  // }
  [types.ADD_RECIPE](state, action){
    return state + 1;
  }
});

export const trackedPlaces = createReducer([], {
    [types.GET_PLACES](state, action) {
        return action.places;
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


const testing = [{id: 1, coordinates: {latitude: 37.79667, longitude:-122.39828}},
    {id: 1, coordinates:{latitude: 37.7971,longitude:-122.39836}},
    {id: 1, coordinates:{latitude: 37.7971,longitude:-122.39836}},
    {id: 1, coordinates:{latitude: 37.79724, longitude:-122.39729}},
    {id: 1, coordinates:{latitude: 37.79724, longitude:-122.39725}},
    {id: 1, coordinates:{latitude: 37.79724, longitude:-122.39723}},
    {id: 1, coordinates:{latitude: 37.79724, longitude:-122.39721}},
    {id: 1, coordinates:{latitude: 37.79723, longitude:-122.39718}},
    {id: 1, coordinates:{latitude: 37.79723, longitude:-122.39718}},
    {id: 1, coordinates:{latitude: 37.79722, longitude:-122.39716}},
    {id: 1, coordinates:{latitude: 37.7972,longitude:-122.39716}},
    {id: 1, coordinates:{latitude: 37.79718, longitude:-122.39715}},
    {id: 1, coordinates:{latitude: 37.79715, longitude:-122.39714}},
    {id: 1, coordinates:{latitude: 37.79667, longitude:-122.39704}},
    {id: 1, coordinates:{latitude: 37.79655, longitude:-122.39701}},
    {id: 1, coordinates:{latitude: 37.79644, longitude:-122.39698}},
    {id: 1, coordinates:{latitude: 37.7964,longitude:-122.39702}},
    {id: 1, coordinates:{latitude: 37.7964,longitude:-122.39702}},
    {id: 1, coordinates:{latitude: 37.79634, longitude:-122.39713}},
    {id: 1, coordinates:{latitude: 37.79619, longitude:-122.39819}},
    {id: 1, coordinates:{latitude: 37.79619, longitude:-122.39819}},
    {id: 1, coordinates:{latitude: 37.79611, longitude:-122.39818}},
    {id: 1, coordinates:{latitude: 37.79594, longitude:-122.39814}},
    {id: 1, coordinates:{latitude: 37.79594, longitude:-122.39814}},
    {id: 1, coordinates:{latitude: 37.79535, longitude:-122.398}},
    {id: 1, coordinates:{latitude: 37.79535, longitude:-122.398}},
    {id: 1, coordinates:{latitude: 37.79535, longitude:-122.39788}},
    {id: 1, coordinates:{latitude: 37.79538, longitude:-122.39762}},
    {id: 1, coordinates:{latitude: 37.79538, longitude:-122.39762}},
    {id: 1, coordinates:{latitude: 37.79548, longitude:-122.39684}},
    {id: 1, coordinates:{latitude: 37.79548, longitude:-122.39684}},
    {id: 1, coordinates:{latitude: 37.79525, longitude:-122.39679}},
    {id: 1, coordinates:{latitude: 37.7951,longitude:-122.39676}},
    {id: 1, coordinates:{latitude: 37.79502, longitude:-122.39674}},
    {id: 1, coordinates:{latitude: 37.79487, longitude:-122.39671}},
    {id: 1, coordinates:{latitude: 37.79475, longitude:-122.39669}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79462, longitude:-122.39655}},
    {id: 1, coordinates:{latitude: 37.79479, longitude:-122.39658}},
    {id: 1, coordinates:{latitude: 37.79493, longitude:-122.39661}},
    {id: 1, coordinates:{latitude: 37.79503, longitude:-122.39663}},
    {id: 1, coordinates:{latitude: 37.79503, longitude:-122.39663}},
    {id: 1, coordinates:{latitude: 37.79511, longitude:-122.39665}},
    {id: 1, coordinates:{latitude: 37.79518, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79526, longitude:-122.39668}},
    {id: 1, coordinates:{latitude: 37.79526, longitude:-122.39668}},
    {id: 1, coordinates:{latitude: 37.79525, longitude:-122.39679}},
    {id: 1, coordinates:{latitude: 37.7951,longitude:-122.39676}},
    {id: 1, coordinates:{latitude: 37.79502, longitude:-122.39674}},
    {id: 1, coordinates:{latitude: 37.79487, longitude:-122.39671}},
    {id: 1, coordinates:{latitude: 37.79475, longitude:-122.39669}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79462, longitude:-122.39655}},
    {id: 1, coordinates:{latitude: 37.79464, longitude:-122.39643}},
    {id: 1, coordinates:{latitude: 37.79462, longitude:-122.39639}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39638}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39637}},
    {id: 1, coordinates:{latitude: 37.7946, longitude:-122.39636}},
    {id: 1, coordinates:{latitude: 37.79459, longitude:-122.39636}},
    {id: 1, coordinates:{latitude: 37.79458, longitude:-122.39635}},
    {id: 1, coordinates:{latitude: 37.79401, longitude:-122.39624}},
    {id: 1, coordinates:{latitude: 37.79401, longitude:-122.39624}},
    {id: 1, coordinates:{latitude: 37.79393, longitude:-122.39622}},
    {id: 1, coordinates:{latitude: 37.79389, longitude:-122.39622}},
    {id: 1, coordinates:{latitude: 37.79388, longitude:-122.39622}},
    {id: 1, coordinates:{latitude: 37.79387, longitude:-122.39622}},
    {id: 1, coordinates:{latitude: 37.79386, longitude:-122.39622}},
    {id: 1, coordinates:{latitude: 37.79385, longitude:-122.39623}},
    {id: 1, coordinates:{latitude: 37.79384, longitude:-122.39623}},
    {id: 1, coordinates:{latitude: 37.79384, longitude:-122.39624}},
    {id: 1, coordinates:{latitude: 37.79383, longitude:-122.39625}},
    {id: 1, coordinates:{latitude: 37.79377, longitude:-122.39638}},
    {id: 1, coordinates:{latitude: 37.79377, longitude:-122.39638}},
    {id: 1, coordinates:{latitude: 37.79462, longitude:-122.39655}},
    {id: 1, coordinates:{latitude: 37.79462, longitude:-122.39655}},
    {id: 1, coordinates:{latitude: 37.79461, longitude:-122.39666}},
    {id: 1, coordinates:{latitude: 37.79457, longitude:-122.39694}},
    {id: 1, coordinates:{latitude: 37.79453, longitude:-122.39724}},
    {id: 1, coordinates:{latitude: 37.79449, longitude:-122.39756}},
    {id: 1, coordinates:{latitude: 37.79446, longitude:-122.39781}},
    {id: 1, coordinates:{latitude: 37.79446, longitude:-122.39781}},
    {id: 1, coordinates:{latitude: 37.79355, longitude:-122.39763}},
    {id: 1, coordinates:{latitude: 37.79352, longitude:-122.39763}},
    {id: 1, coordinates:{latitude: 37.7935, longitude:-122.39762}},
    {id: 1, coordinates:{latitude: 37.79258, longitude:-122.39744}},
    {id: 1, coordinates:{latitude: 37.79258, longitude:-122.39744}},
    {id: 1, coordinates:{latitude: 37.79252, longitude:-122.39743}},
    {id: 1, coordinates:{latitude: 37.79245, longitude:-122.39742}},
    {id: 1, coordinates:{latitude: 37.79242, longitude:-122.3974}},
    {id: 1, coordinates:{latitude: 37.7924, longitude:-122.39739}},
    {id: 1, coordinates:{latitude: 37.79238, longitude:-122.39737}},
    {id: 1, coordinates:{latitude: 37.79219, longitude:-122.39714}},
    {id: 1, coordinates:{latitude: 37.79219, longitude:-122.39714}},
    {id: 1, coordinates:{latitude: 37.79116, longitude:-122.39583}},
    {id: 1, coordinates:{latitude: 37.79116, longitude:-122.39583}},
    {id: 1, coordinates:{latitude: 37.79149, longitude:-122.39542}},
    {id: 1, coordinates:{latitude: 37.79161, longitude:-122.39526}},
    {id: 1, coordinates:{latitude: 37.79185, longitude:-122.39496}},
    {id: 1, coordinates:{latitude: 37.79222, longitude:-122.39449}},
    {id: 1, coordinates:{latitude: 37.79222, longitude:-122.39449}},
    {id: 1, coordinates:{latitude: 37.79239, longitude:-122.39471}},
    {id: 1, coordinates:{latitude: 37.79239, longitude:-122.39471}},
    {id: 1, coordinates:{latitude: 37.79222, longitude:-122.39449}},
    {id: 1, coordinates:{latitude: 37.79222, longitude:-122.39449}},
    {id: 1, coordinates:{latitude: 37.79224, longitude:-122.39446}},
    {id: 1, coordinates:{latitude: 37.79253, longitude:-122.39409}},
    {id: 1, coordinates:{latitude: 37.79288, longitude:-122.39365}},
    {id: 1, coordinates:{latitude: 37.79323, longitude:-122.3932}},
    {id: 1, coordinates:{latitude: 37.79323, longitude:-122.3932}},
    {id: 1, coordinates:{latitude: 37.79245, longitude:-122.39222}},
    {id: 1, coordinates:{latitude: 37.79223, longitude:-122.39195}},
    {id: 1, coordinates:{latitude: 37.79223, longitude:-122.39195}},
    {id: 1, coordinates:{latitude: 37.792, longitude:-122.39167}},
    {id: 1, coordinates:{latitude: 37.792, longitude:-122.39167}},
    {id: 1, coordinates:{latitude: 37.79236, longitude:-122.39123}},
    {id: 1, coordinates:{latitude: 37.79236, longitude:-122.39123}},
    {id: 1, coordinates:{latitude: 37.79213, longitude:-122.39115}},
    {id: 1, coordinates:{latitude: 37.79195, longitude:-122.39108}},
    {id: 1, coordinates:{latitude: 37.79174, longitude:-122.391}},
    {id: 1, coordinates:{latitude: 37.79163, longitude:-122.39095}},
    {id: 1, coordinates:{latitude: 37.79156, longitude:-122.39091}},
    {id: 1, coordinates:{latitude: 37.79147, longitude:-122.39087}},
    {id: 1, coordinates:{latitude: 37.79141, longitude:-122.39083}},
    {id: 1, coordinates:{latitude: 37.79133, longitude:-122.39077}},
    {id: 1, coordinates:{latitude: 37.79126, longitude:-122.39072}},
    {id: 1, coordinates:{latitude: 37.79119, longitude:-122.39065}},
    {id: 1, coordinates:{latitude: 37.79108, longitude:-122.39054}},
    {id: 1, coordinates:{latitude: 37.79102, longitude:-122.39048}},
    {id: 1, coordinates:{latitude: 37.79102, longitude:-122.39048}},
    {id: 1, coordinates:{latitude: 37.79096, longitude:-122.39042}},
    {id: 1, coordinates:{latitude: 37.79089, longitude:-122.39033}},
    {id: 1, coordinates:{latitude: 37.79083, longitude:-122.39026}},
    {id: 1, coordinates:{latitude: 37.79075, longitude:-122.39014}},
    {id: 1, coordinates:{latitude: 37.79075, longitude:-122.39014}},
    {id: 1, coordinates:{latitude: 37.7907,longitude:-122.3902}},
    {id: 1, coordinates:{latitude: 37.79046, longitude:-122.39052}},
    {id: 1, coordinates:{latitude: 37.79009, longitude:-122.39099}},
    {id: 1, coordinates:{latitude: 37.7897,longitude:-122.39148}},
    {id: 1, coordinates:{latitude: 37.7894,longitude:-122.39187}},
    {id: 1, coordinates:{latitude: 37.7894,longitude:-122.39187}},
    {id: 1, coordinates:{latitude: 37.79062, longitude:-122.3934}},
    {id: 1, coordinates:{latitude: 37.79185, longitude:-122.39496}},
    {id: 1, coordinates:{latitude: 37.79185, longitude:-122.39496}},
    {id: 1, coordinates:{latitude: 37.79161, longitude:-122.39526}},
    {id: 1, coordinates:{latitude: 37.79149, longitude:-122.39542}},
    {id: 1, coordinates:{latitude: 37.79116, longitude:-122.39583}},
    {id: 1, coordinates:{latitude: 37.79045, longitude:-122.39673}},
    {id: 1, coordinates:{latitude: 37.78978, longitude:-122.39759}},
    {id: 1, coordinates:{latitude: 37.7896,longitude:-122.39782}},
    {id: 1, coordinates:{latitude: 37.78918, longitude:-122.39834}},
    {id: 1, coordinates:{latitude: 37.78899, longitude:-122.39859}},
    {id: 1, coordinates:{latitude: 37.78837, longitude:-122.39936}},
    {id: 1, coordinates:{latitude: 37.78802, longitude:-122.39982}},
    {id: 1, coordinates:{latitude: 37.78746, longitude:-122.40052}},
    {id: 1, coordinates:{latitude: 37.78684, longitude:-122.40128}},
    {id: 1, coordinates:{latitude: 37.78632, longitude:-122.40195}},
    {id: 1, coordinates:{latitude: 37.78627, longitude:-122.40208}},
    {id: 1, coordinates:{latitude: 37.78594, longitude:-122.40249}},
    {id: 1, coordinates:{latitude: 37.78573, longitude:-122.40275}},
    {id: 1, coordinates:{latitude: 37.78565, longitude:-122.40286}},
    {id: 1, coordinates:{latitude: 37.78542, longitude:-122.40315}},
    {id: 1, coordinates:{latitude: 37.78536, longitude:-122.40322}},
    {id: 1, coordinates:{latitude: 37.78514, longitude:-122.40351}},
    {id: 1, coordinates:{latitude: 37.78452, longitude:-122.40429}},
    {id: 1, coordinates:{latitude: 37.78441, longitude:-122.40437}},
    {id: 1, coordinates:{latitude: 37.78401, longitude:-122.40487}},
    {id: 1, coordinates:{latitude: 37.78369, longitude:-122.40529}},
    {id: 1, coordinates:{latitude: 37.78356, longitude:-122.40545}},
    {id: 1, coordinates:{latitude: 37.78319, longitude:-122.40591}},
    {id: 1, coordinates:{latitude: 37.78309, longitude:-122.40604}},
    {id: 1, coordinates:{latitude: 37.78301, longitude:-122.40614}},
    {id: 1, coordinates:{latitude: 37.78273, longitude:-122.40649}},
    {id: 1, coordinates:{latitude: 37.78273, longitude:-122.40649}},
    {id: 1, coordinates:{latitude: 37.78296, longitude:-122.40678}},
    {id: 1, coordinates:{latitude: 37.78317, longitude:-122.40704}},
    {id: 1, coordinates:{latitude: 37.7833,longitude:-122.4072}},
    {id: 1, coordinates:{latitude: 37.78338, longitude:-122.4073}},
    {id: 1, coordinates:{latitude: 37.78354, longitude:-122.4075}},
    {id: 1, coordinates:{latitude: 37.78392, longitude:-122.40799}}];

    export const today = createReducer(testing, {
  [types.ADD_RECIPE](state, action) {
    return state;
  }
});