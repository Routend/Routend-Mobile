import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

const list2 = [
  {
    title: 'General',
    icon: 'adjust'
  },
  {
    title: 'Edit Profile',
    icon: 'cloud-queue'
  },
  {
    title: 'Notifications',
    icon: 'alarm'
  },
  {
    title: 'Data',
    icon: 'airplanemode-active'
  },
  {
    title: 'Help Center',
    icon: 'business-center'
  },
  {
    title: 'Report a Problem',
    icon: 'build'
  },
]

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
          {
            list2.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{name: item.icon}}
              />
            ))
          }
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
