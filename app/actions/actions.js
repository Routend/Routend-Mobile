import * as types from './types';

export function receiveCoord({ location }) {
  return {
    type: types.GET_COORDS,
    location
  };
}

export function fetchCoord(userId, startDate, endDate) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/coordinates?id_users=${userId}&start=${startDate}&end=${endDate}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(receiveCoord({location: resp}));
    });
  };
}

export function newPlace({ places }) {
  return {
    type: types.NEW_PLACES,
    places
  };
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
      dispatch(newPlace({places: resp}));
    });
  };
}

export function newImage({ image }) {
  return {
    type: types.NEW_IMAGES,
    image
  };
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
      dispatch(newImage({image: resp}));
    });
  };
}

export function getImage({ image }) {
  return {
    type: types.GET_IMAGES,
    image
  };
}

export function fetchImage(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/images?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(getImage({image: resp}));
    });
  };
}

export function getPlaces({ places }) {
  return {
    type: types.GET_PLACES,
    places
  };
}

export function fetchPlaces(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/locations?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(getPlaces({places: resp}));
    });
  };
}

export function userMatches({ users }) {
  return {
    type: types.GET_MATCHES,
    users
  };
}

export function fetchMatches(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/matches?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(userMatches({users: resp}));
    });
  };
}

export function userProfile({ user }) {
  return {
    type: types.GET_PROFILE,
    user
  };
}

export function fetchProfile(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/profiles?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(userProfile({user: resp}));
    });
  };
}

export function userStatus({ user }) {
  return {
    type: types.GET_STATUS,
    user
  };
}

export function fetchStatus(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/status?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(userStatus({user: resp}));
    });
  };
}

export function locationMatches({ locations }) {
  return {
    type: types.GET_LOCATION_MATCHES,
    locations
  };
}

export function fetchLocationMatches(userId) {
  return (dispatch, getState) => {
    return fetch(`http://45.55.24.84:3000/locations?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(locationMatches({locations: resp}));
    });
  };
}

export function locationDetails({ location }) {
  return {
    type: types.GET_LOCATION_DETAILS,
    location
  };
}

export function fetchLocationDetails(placeId) {
  return (dispatch, getState) => {
    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(locationDetails({location: resp}));
    });
  };
}

export function matchDetails({ users }) {
  return {
    type: types.GET_MATCH_DETAILS,
    users
  };
}

export function fetchMatchSuggestions(userId) {
  return (dispatch, getState) => {
    return fetch(`http://45.55.24.84:3000/users?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(matchDetails({users: resp}));
    });
  };
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
    });
  };
}

export function currentUser({ user }) {
  return {
    type: types.GET_CURRENT_USER,
    user
  };
}

export function getCurrentUser(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/profiles?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(currentUser({user: resp}));
    });
  };
}

export function currUserStats({ stats }) {
  return {
    type: types.GET_CURRENT_STATS,
    stats
  };
}

export function getUserStats(userId) {
  return (dispatch, getState) => {
    return fetch(`http://107.170.226.9:3000/categoryStats?id_users=${userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      dispatch(currUserStats({stats: resp}));
    });
  };
}

export function postUserMatch(id, matchId) {
  return (dispatch, getState) => {
    return fetch('http://107.170.226.9:3000/matches', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_users: id,
        match_id: matchId
      })
    })
    then((resp) => resp.json())
    .then(resp => {
      dispatch(matchDetails({ users: resp}));
    });
  };
}