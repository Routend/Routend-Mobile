import React from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  AlertIOS,
} from 'react-native';
import Router from '../navigation/Router';
import styles from '../stylesheets/SignInStyles.js';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  fetchUsers(email, password) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return fetch(`http://107.170.226.9:3000/users?email=${email}&password=${password}`)
        .then((response) => response.json())
        .then((data) => {
          global.id = data[0].id;
          this.props.navigator.replace(Router.getRoute('rootNavigation'));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      AlertIOS.alert('Login Unsuccessful', 'Incorrect Username or Password');
    }
  }

  render() {
    return (
       <Image source={require('../assets/Routend10.jpg')} style={styles.container}>
       <TextInput
          style={styles.username}
          onChangeText={(text) => this.setState({username: text})}
          placeholder={'Username'}
          placeholderTextColor={'white'}
        />
       <TextInput
          style={styles.password}
          onChangeText={(text) => this.setState({password: text})}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          password={true}
        />
        <TouchableOpacity onPress={() => this.fetchUsers(this.state.username, this.state.password)} style={styles.submit} />
        <TouchableOpacity onPress={() => this.props.navigator.push(Router.getRoute('signup'))} style={styles.signUp} />
      </Image>
    );
  }
}