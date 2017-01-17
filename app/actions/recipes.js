import * as types from './types';
import Api from '../lib/api'

export function fetchCoord(userId, startDate, endDate) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/coordinates?id_users=${userId}&start=${startDate}&end=${endDate}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(testy({test: resp}));
    })
  }
}

export function postLocation(id, name, category, placeId, image, address, rating, latitude, longitude) {
  return (dispatch, getState) => {
    return fetch('http://107.170.226.9:3000/locations', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_users: id,
        name: name,
        category: category,
        placeId: placeId,
        image: image,
        address: address,
        rating: rating,
        lat: latitude,
        lng: longitude
      })
    })
    then((resp) => resp.json())
    .then(resp => {
      console.log('api respon', resp);
      dispatch(newPlace({places: resp}));
    })
  }
}

export function newPlace({ places }) {
  return {
    type: types.NEW_PLACES,
    places
  }
}

export function postImage(id, url) {
  return (dispatch, getState) => {
    return fetch('http://107.170.226.9:3000/images', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_users: id,
        image: url
      })
    })
    then((resp) => resp.json())
    .then(resp => {
      console.log('posting respon', resp);
      dispatch(newImage({image: resp}));
    })
  }
}

export function fetchImage(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/images?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      console.log('api respon', resp);
      dispatch(getImage({image: resp}));
    })
  }
}

export function newImage({ image }) {
  return {
    type: types.NEW_IMAGES,
    image
  }
}

export function getImage({ image }) {
  return {
    type: types.GET_IMAGES,
    image
  }
}

export function fetchPlaces(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/locations?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      console.log('api respon', resp);
      dispatch(getPlaces({places: resp}));
    })
  }
}


export function getPlaces({ places }) {
  return {
    type: types.GET_PLACES,
    places
  }
}

export function testy({ test }) {
  return {
    type: 'TEST',
    test
  }
}

// { recipes } = (args)  and inside args.recipes  === {recipes: recipes} inside return statement
// export function setSearchedRecipes( { recipes } ) {
//   return {
//     type: types.SET_SEARCHED_RECIPES,
//     recipes
//   }
// }

// export function addRecipe() {
//   return {
//     type: types.ADD_RECIPE,
//   }
// }

// export function fetchRecipes(ingredients) {
//   return (dispatch, getState) => {
//     const params = [
//     `ingredients=${encodeURIComponent(ingredients)}`,
//     'fillIngredients=false',
//     ]
//     return Api.get('/recipes/findByIngredients?${params}')
//     .then(resp => {
//       dispatch(setSearchedRecipes({recipes: resp}));
//       console.log(resp);
//       }).catch((ex) => {
//         console.log(ex);
//       })
//   }
// }