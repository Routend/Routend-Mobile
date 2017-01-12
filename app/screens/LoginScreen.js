import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { LoginForm } from 'react-native-uikit';
import Router from '../navigation/Router';
import { LoginFb } from 'react-native-uikit'

export default class Login extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={{uri:rowData.avatar_url}}
      />
    )
  }

  fetchUsers(email, password) {
    return fetch('http://107.170.226.9:3000/users')
      .then((response) => response.json())
      .then((data) => {
        data.forEach((el) => {
          if(el.password === password && el.email === email) {
            this.props.navigator.push(Router.getRoute('rootNavigation'))
          }
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View
        style={styles.container}>
        <View style={{flex: 1, backgroundColor: 'black'}}></View>
          <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}><Text>Routend Logo</Text></View>
            <View style={{flex: 1, backgroundColor: 'black'}}></View>
          <View style={{flex: 1.8, justifyContent: 'center', alignItems: 'center'}}>
              <LoginForm
              loginFb={() => console.log('login with facebook')}
              // onSubmit={(email, password) => this.props.navigator.push(Router.getRoute('rootNavigation'))}
              onSubmit={(email, password) => this.fetchUsers(email, password)}
              error={false}
              errorMsg={'username or password incorrect'}
              style={{marginTop: 30}}
              radius={0}
              inputStyle={{height: 34, width: (Dimensions.get('window').width * 0.9), fontSize: 12}}
              usernameStyle={{bottom: -10, borderTopLeftRadius: 10, borderTopRightRadius: 10, borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}
              passwordStyle={{borderTopLeftRadius: 0, borderTopRightRadius: 0,}}
              btnStyle={{bottom: 12,}}
              buttonText={'Login'}
              />
              <LoginFb
              onPress={() => this.fetchUsers()}
              style={{bottom: 20}}
              />
          </View>
        <View style={{flex: 1.3, backgroundColor: 'grey', alignItems: 'center', top: 10}}>
          <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('signup')) }}><Text style={{fontSize: 12.3}}>Create an Account</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

/*
        <List containerStyle={{marginBottom: 20}}>
        {
          list.map((l, i) => (
            <ListItem
              roundAvatar
              onPress={() => console.log('something')}
              avatar={l.avatar_url}
              key={i}
              title={l.name}
              subtitle={l.subtitle}
            />
          ))
        }
        </List>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//logout this.props.navigation.getNavigator('root').replace('login')