import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
  },
  newMatch: {
    left: (Dimensions.get('window').width * 0.03),
    top: (Dimensions.get('window').width * 0.02),
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: (Dimensions.get('window').width * 0.04)
  },
  matches: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  firstName: {
    fontSize: 12,
    fontWeight: 'bold',
    opacity: 0.8
  },
  locationMatch: {
    top: (Dimensions.get('window').width * 0.05)
  },
  activityText: {
    left: (Dimensions.get('window').width * 0.03),
    top: (Dimensions.get('window').width * 0.005),
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  location: {
    padding: (Dimensions.get('window').width * 0.03)
  },
  locationStar: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height * 0.01),
    left: (Dimensions.get('window').width * 0.025)
  },
});

export default style;