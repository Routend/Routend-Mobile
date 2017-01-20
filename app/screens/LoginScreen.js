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
          console.log(data[0].id);
          global.id = data[0].id;
          this.props.navigator.push(Router.getRoute('rootNavigation'));
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
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.598), left: (Dimensions.get('window').width * 0.23), borderWidth: 0, color: 'white', height: (Dimensions.get('window').height * 0.05), width: (Dimensions.get('window').width), fontSize: 13}}
          onChangeText={(text) => this.setState({username: text})}
          placeholder={'Username'}
          placeholderTextColor={'white'}
        />
       <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.691), left: (Dimensions.get('window').width * 0.23), borderWidth: 0, color: 'white', height: (Dimensions.get('window').height * 0.05), width: (Dimensions.get('window').width), fontSize: 13}}
          onChangeText={(text) => this.setState({password: text})}
          placeholder={'Password'}
          placeholderTextColor={'white'}
          password={true}
        />
        <TouchableOpacity onPress={() => this.fetchUsers(this.state.username, this.state.password) } style={{top: (Dimensions.get('window').height * 0.821), width: (Dimensions.get('window').width), height: (Dimensions.get('window').height * 0.09)}} />
        <TouchableOpacity onPress={() => this.props.navigator.push(Router.getRoute('signup'))} style={{left: (Dimensions.get('window').width * 0.631), top: (Dimensions.get('window').height * 0.851), width: (Dimensions.get('window').width * 0.12), height: (Dimensions.get('window').height * 0.03)}} />
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  }
});