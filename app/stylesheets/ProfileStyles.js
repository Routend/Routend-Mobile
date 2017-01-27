import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    borderWidth: 0.5,
    borderColor: '#175785'
  },
  avatarContainer: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.018),
    left: (Dimensions.get('window').width * 0.4)},
  profile: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.133),
    left: (Dimensions.get('window').width * 0.445)
  },
  profileText: {
    fontSize: 10,
    color: '#175785'
  },
  firstName: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.185),
    left: (Dimensions.get('window').width * 0.18),
    height: 42,
    borderColor: 'gray',
    borderWidth: 0,
    height: 34,
    width: (Dimensions.get('window').width), fontSize: 12
  },
  lastName: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.255),
    left: (Dimensions.get('window').width * 0.18),
    height: 42,
    borderColor: 'gray',
    borderWidth: 0,
    height: 34,
    width: (Dimensions.get('window').width), fontSize: 12
  },
  gender: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.32),
    left: (Dimensions.get('window').width * 0.18),
    height: 42,
    borderColor: 'gray',
    borderWidth: 0,
    height: 34,
    width: (Dimensions.get('window').width), fontSize: 12
  },
  city: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.387),
    left: (Dimensions.get('window').width * 0.18),
    height: 42,
    borderColor: 'gray',
    borderWidth: 0,
    height: 34,
    width: (Dimensions.get('window').width), fontSize: 12
  },
  state: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.45),
    left: (Dimensions.get('window').width * 0.18),
    height: 42,
    borderColor: 'gray',
    borderWidth: 0,
    height: 34,
    width: (Dimensions.get('window').width), fontSize: 12
  },
  firstIcon: {
    position: 'absolute',
    left: (Dimensions.get('window').width * 0.034),
    top: (Dimensions.get('window').height * 0.178)
  },
  lastIcon: {
    position: 'absolute',
    left: (Dimensions.get('window').width * 0.034),
    top: (Dimensions.get('window').height * 0.252)
  },
  genderIcon: {
    position: 'absolute',
    left: (Dimensions.get('window').width * 0.034),
    top: (Dimensions.get('window').height * 0.317)
  },
  cityIcon: {
    position: 'absolute',
    left: (Dimensions.get('window').width * 0.044),
    top: (Dimensions.get('window').height * 0.375)
  },
  stateIcon: {
    position: 'absolute',
    left: (Dimensions.get('window').width * 0.044),
    top: (Dimensions.get('window').height * 0.443)
  },
  topView: {
    top: (Dimensions.get('window').height * 0.05)
  },
  secondView: {
    top: (Dimensions.get('window').height * 0.11),
    backgroundColor: '#d7d7d7', height: 1
  },
  thirdView: {
    left: (Dimensions.get('window').width * 0.13),
    top: (Dimensions.get('window').height * 0.18),
    backgroundColor: '#eee',
    height: 1
  },
  fourthView: {
    left: (Dimensions.get('window').width * 0.13),
    top: (Dimensions.get('window').height * 0.25),
    backgroundColor: '#eee',
    height: 1
  },
  fifthView: {
    left: (Dimensions.get('window').width * 0.13),
    top: (Dimensions.get('window').height * 0.31),
    backgroundColor: '#eee',
    height: 1
  },
  sixthView: {
    left: (Dimensions.get('window').width * 0.13),
    top: (Dimensions.get('window').height * 0.38),
    backgroundColor: '#eee',
    height: 1
  },
  seventhView: {
    top: (Dimensions.get('window').height * 0.45),
    backgroundColor: '#d7d7d7',
    height: 1
  },
  submitButton: {
    top: (Dimensions.get('window').height * 0.47),
    width: (Dimensions.get('window').width * 0.8),
    left: (Dimensions.get('window').width * 0.1)
  },
  header: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold'
  }
});

export default style;