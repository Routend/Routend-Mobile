import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  user: {
    fontSize: 15,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  bar: {
    justifyContent: 'center',
    top: 5,
    alignItems: 'center',
    flexDirection: 'row',
    width: 195,
    height: 40,
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
  },
  friendList: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  line: {
    color: "#D8D8D8"
  },
  message: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  textInput: {
    position: 'absolute',
    paddingLeft: (Dimensions.get('window').width * 0.05),
    top: (Dimensions.get('window').height * 0.41),
    left: (Dimensions.get('window').width * 0.05),
    height: (Dimensions.get('window').height * 0.05),
    width: (Dimensions.get('window').width * 0.8),
    fontSize: 13
  },
  touchable: {
    position: 'absolute',
    paddingLeft: (Dimensions.get('window').width * 0.05),
    top: (Dimensions.get('window').height * 0.423),
    left: (Dimensions.get('window').width * 0.76)
  },
  listContainer: {
    bottom: (Dimensions.get('window').height * 0.013),
    marginBottom: 20
  },
  cardTitle: {
    bottom: 10,
    fontSize: 11
  },
  update: {
    fontSize: 10
  },
  divider: {
    top: 4
  },
  cardContainer: {
    height: 60
  }
});

export default style;