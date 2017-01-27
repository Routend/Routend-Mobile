import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    marginTop: 10,
  },
  chart_title : {
    justifyContent: 'center',
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor: 'white',
    color: '#404d5b',
    opacity: 0.8,
    fontWeight: 'bold',
  },
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 5
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
  log: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
  divider: {
    color: '#D8D8D8'
  },
  graph: {
    fontSize: 13,
    color: '#404d5b',
    fontWeight: 'bold'
  },
});

export default style;