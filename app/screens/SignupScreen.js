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
import styles from '../stylesheets/SignUpStyles.js';

export default class Signup extends React.Component {
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

  createUser(email, password) {
    if(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      var time = new Date();
      return fetch('http://107.170.226.9:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
          address: 'address here',
          email: email,
          createdAt: time
        })
      })
      .then((resp) => this.props.navigator.pop())
    } else {
      AlertIOS.alert('Invalid Email', 'Please try again.');
    }
  }

  render() {
    return (
       <Image source={require('../assets/Signup.jpg')} style={styles.container}>
       <TextInput
          style={styles.userName}
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
        <TouchableOpacity onPress={() => this.createUser(this.state.username, this.state.password) } style={styles.submit} />
      </Image>
    );
  }
}