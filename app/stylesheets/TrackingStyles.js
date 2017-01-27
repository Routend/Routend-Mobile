import {StyleSheet, Dimensions } from 'react-native';

let style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  card1: {
    marginLeft: 20,
    marginRight: 15
  },
  card2: {
    marginLeft: 20,
    marginRight: 15,
    marginBottom: 10
  },
  cardStyle: {
    marginTop: 0
  },
  button: {
    top: 5,
    width: (Dimensions.get('window').width * 0.9)
  },
  nameLabel: {
    color: '#626262'
  },
  nameInput: {
    color: '#000',
    fontSize: 14
  },
  categoryLabel: {
    color: '#626262'
  },
  categoryInput: {
    color: '#000',
    fontSize: 14
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default style;