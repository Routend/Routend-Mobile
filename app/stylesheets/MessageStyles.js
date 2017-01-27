import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 15,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  bar: {
    justifyContent: 'center',
    top: 5,
    marginBottom: (Dimensions.get('window').height * 0.02),
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
  divider: {
    color: "#D8D8D8"
  },
  messages: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  header: {
    textAlign:'center',
    fontSize: 8,
    padding: 10,
    backgroundColor: '#eee'
  }
});

export default style;