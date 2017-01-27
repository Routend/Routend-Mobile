import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f6f6f6'
  },
  topView: {
    flex: 10
  },
  mapView: {
    flex: 13,
    zIndex: 0
  },
  bar: {
    flex: 1.2,
    position: 'absolute',
    zIndex: 1,
    top: (Dimensions.get('window').height * 0.686)
  },
  barView: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#fcfcfc',
    width: (Dimensions.get('window').width * 0.92),
    height: (Dimensions.get('window').height * 0.10),
    borderRadius: 3,
    left: (Dimensions.get('window').width * 0.04),
    borderWidth: 0.8,
    borderColor: '#d3d3d3',
    opacity: 0.97,
    shadowRadius: 0.03,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  datePicker: {
    height: 2000,
    width: 118,
    right: 8,
    top: (Dimensions.get('window').height * 0.015)
  },
  barDivider: {
    top: (Dimensions.get('window').height * 0.026)
  },
  barText: {
    fontSize: 20,
    fontWeight: '100',
    color: '#545454'
  },
  trackView: {
    top: (Dimensions.get('window').height * 0.035),
    left: (Dimensions.get('window').width * 0.035),
    height: 25,
    width: 100
  },
  trackText: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  }
});

export default style;