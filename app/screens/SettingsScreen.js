import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Router from '../navigation/Router';

// const list2 = [
//   {
//     title: 'General',
//     icon: 'adjust'
//   },
//   {
//     title: 'Edit Profile',
//     icon: 'cloud-queue',
//     page: 'profilesettings'
//   },
//   {
//     title: 'Notifications',
//     icon: 'alarm'
//   },
//   {
//     title: 'Data',
//     icon: 'airplanemode-active'
//   },
//   {
//     title: 'Help Center',
//     icon: 'business-center'
//   },
//   {
//     title: 'Report a Problem',
//     icon: 'build'
//   },
// ]

export default class SettingsScreen extends React.Component {
  // state = {
  //   fontLoaded: false,
  // };

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>SETTINGS</Text>),
      backgroundColor: '#175785',
    },
  }

  // componentDidMount() {
  //   Font.loadAsync({
  //     'space-mono': require('../containers/assets/fonts/SpaceMono-Regular.ttl'),
  //   });
  // }

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

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <List>
          <ListItem
            key={0}
            title={'General'}
            leftIcon={{name: 'adjust'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
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
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
          <ListItem
            key={3}
            title={'Help Center'}
            leftIcon={{name: 'business-center'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
          <ListItem
            key={4}
            title={'Report a Problem'}
            leftIcon={{name: 'report-problem'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
          <ListItem
            key={5}
            title={'Privacy Policy'}
            leftIcon={{name: 'build'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
          />
          <ListItem
            key={6}
            title={'Log Out'}
            leftIcon={{name: 'cancel'}}
            onPress={ () => {this.props.navigator.push(Router.getRoute('profilesettings'))}  }
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
