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
    return fetch('http://107.170.226.9:3000/profiles', {
      method: 'PUT',
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

export function newImage({ image }) {
  return {
    type: types.NEW_IMAGES,
    image
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

export function fetchMatches(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/matches?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(userMatches({users: resp}));
    })
  }
}

export function userMatches({ users }) {
  return {
    type: types.GET_MATCHES,
    users
  }
}

export function fetchProfile(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/profiles?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(userProfile({user: resp}));
    })
  }
}

export function userProfile({ user }) {
  return {
    type: types.GET_PROFILE,
    user
  }
}

export function fetchStatus(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/status?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(userStatus({user: resp}));
    })
  }
}

export function userStatus({ user }) {
  return {
    type: types.GET_STATUS,
    user
  }
}

export function fetchLocationMatches(userId) {
  return (dispatch, getState) => {
    return fetch(`http://45.55.24.84:3000/locations?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(locationMatches({locations: resp}));
    })
  }
}

export function locationMatches({ locations }) {
  return {
    type: types.GET_LOCATION_MATCHES,
    locations
  }
}

export function fetchLocationDetails(placeId) {
  return (dispatch, getState) => {
    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(locationDetails({location: resp}));
    })
  }
}

export function locationDetails({ location }) {
  return {
    type: types.GET_LOCATION_DETAILS,
    location
  }
}

export function fetchMatchSuggestions(userId) {
  return (dispatch, getState) => {
    return fetch(`http://45.55.24.84:3000/users?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(matchDetails({users: resp}));
    })
  }
}

export function matchDetails({ users }) {
  return {
    type: types.GET_MATCH_DETAILS,
    users
  }
}

export function postProfile(id, firstName, lastName, gender, city, state, image, status) {
  return (dispatch, getState) => {
    return fetch('http://107.170.226.9:3000/profiles', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_users: id,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        city: city,
        state: state,
        image: image,
        status: status,
      })
    })
    then((resp) => resp.json())
    .then(resp => {
      console.log('Profile Updated!', resp);
    })
  }
}

export function getCurrentUser(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/profiles?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      // console.log('api respon', resp);
      dispatch(currentUser({user: resp}));
    })
  }
}

export function currentUser({ user }) {
  return {
    type: types.GET_CURRENT_USER,
    user
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