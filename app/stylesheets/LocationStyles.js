import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    // flex: 1,
  },
  topView: {
    left: (Dimensions.get('window').width * 0.11),
    top: (Dimensions.get('window').height * 0.00),
    bottom: (Dimensions.get('window').height * 0.05)
  },
  nameView: {
    top: (Dimensions.get('window').width * 0.02),
    fontSize: 15,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  phoneView: {
    top: (Dimensions.get('window').width * 0.02),
    fontSize: 11,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  addressView: {
    top: (Dimensions.get('window').width * 0.02),
    fontSize: 11,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  galleryView: {
    top: (Dimensions.get('window').width * 0.03)
  },
  openingHours: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (Dimensions.get('window').width * 0.95),
    top: (Dimensions.get('window').height * 0.03),
    paddingVertical: (Dimensions.get('window').height * 0.01),
    borderRadius: 3,
    backgroundColor: '#fff',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    shadowColor: '#D8D8D8',
    shadowRadius: 0.03,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1, },
    left: (Dimensions.get('window').width * 0.022)
  },
  openingText: {
    fontWeight: 'bold',
    opacity: 0.9
  },
  review: {
    width: (Dimensions.get('window').width * 0.95),
    top: (Dimensions.get('window').height * 0.03),
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
  ratingBox: {
    position: 'absolute',
    bottom: (Dimensions.get('window').height * 0.044),
    left: (Dimensions.get('window').width * 0.2)
  },
  reviewView: {
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  reviewText: {
    fontSize: 13
  },
  buttonView: {
    top: (Dimensions.get('window').height * 0.060),
    left: (Dimensions.get('window').width * 0.02)
  },
  buttonWidth: {
    width: (Dimensions.get('window').width * 0.96)
  },
  buttonReject: {
    width: (Dimensions.get('window').width * 0.96),
    bottom: (Dimensions.get('window').height * 0.01)
  },
  padding: {
    height: (Dimensions.get('window').height * 0.14)
  }
});

export default style;