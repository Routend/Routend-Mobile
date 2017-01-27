import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
    top: (Dimensions.get('window').height * 0.05)
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  matchText: {
    top: (Dimensions.get('window').width * 0.02),
    fontSize: 15,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  secondView: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: (Dimensions.get('window').width * 0.05)
  },
  thirdView: {
    padding: (Dimensions.get('window').width * 0.026),
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName: {
    fontSize: 13.5,
    fontWeight: 'bold',
    opacity: 0.8
  },
  fourthView: {
    padding: (Dimensions.get('window').width * 0.025),
    justifyContent: 'center',
    alignItems: 'center'
  },
  userName2: {
    fontSize: 13.5,
    fontWeight: 'bold',
    opacity: 0.8
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width * 0.95),
    top: (Dimensions.get('window').height * 0.05),
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    shadowColor: '#D8D8D8',
    shadowRadius: 0.03,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    left: (Dimensions.get('window').width * 0.022)
  },
  status: {
    width: (Dimensions.get('window').width * 0.8),
    justifyContent: 'center'
  },
  matchView: {
    top: (Dimensions.get('window').height * 0.060),
    left: (Dimensions.get('window').width * 0.02)
  },
  accept: {
    width: (Dimensions.get('window').width * 0.96)
  },
  reject: {
    width: (Dimensions.get('window').width * 0.96),
    bottom: (Dimensions.get('window').height * 0.01)
  },
});

export default style;