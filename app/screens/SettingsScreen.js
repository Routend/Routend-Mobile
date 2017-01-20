import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  AlertIOS,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Router from '../navigation/Router';

export default class SettingsScreen extends React.Component {
  logOut() {
    AlertIOS.alert(
     'Logout',
     'Are you sure you want to logout?',
     [
      {text: 'Yes', onPress: () => this.props.navigation.getNavigator('root').immediatelyResetStack([Router.getRoute('login')], 0)},
       {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
     ],
    );
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>SETTINGS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <List>
          <ListItem
            key={1}
            title={'Edit Profile'}
            leftIcon={{name: 'cloud-queue'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
          <ListItem
            key={2}
            title={'Notifications'}
            leftIcon={{name: 'alarm'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('notification'))}  }
          />
          <ListItem
            key={3}
            title={'Help Center'}
            leftIcon={{name: 'business-center'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('helpcenter'))}  }
          />
          <ListItem
            key={4}
            title={'Report a Problem'}
            leftIcon={{name: 'report-problem'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('reportproblems'))}  }
          />
          <ListItem
            key={5}
            title={'Privacy Policy'}
            leftIcon={{name: 'build'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('privacypolicy'))}  }
          />
          <ListItem
            key={6}
            title={'Log Out'}
            leftIcon={{name: 'cancel'}}
            onPress={ () => this.logOut() }
          />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
