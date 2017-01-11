import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
// import {
//   Notifications,
// } from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
// import {
//   FontAwesome,
// } from '@exponent/vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
// import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
// import { Ionicons } from 'react-native-vector-icons';

export default class RootNavigation extends React.Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    // this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <TabNavigation
        tabBarHeight={45}
        tabBarColor="#25272A"
        initialTab="home">
        <TabNavigationItem
          id="home"
          renderIcon={isSelected => this._renderIcon('home', isSelected)}>
          <StackNavigation initialRoute="home" />
        </TabNavigationItem>

        <TabNavigationItem
          id="stats"
          renderIcon={isSelected => this._renderIcon('user-circle', isSelected)}>
          <StackNavigation initialRoute="stats" />
        </TabNavigationItem>
        <TabNavigationItem
          id="tracklocation"
          renderIcon={isSelected => this._renderIcon('feed', isSelected)}>
          <StackNavigation initialRoute="tracklocation" />
        </TabNavigationItem>
        <TabNavigationItem
          id="social"
          renderIcon={isSelected => this._renderIcon('globe', isSelected)}>
          <StackNavigation initialRoute="social" />
        </TabNavigationItem>
        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={23}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  // _registerForPushNotifications() {
  //   // Send our push token over to our backend so we can receive notifications
  //   // You can comment the following line out if you want to stop receiving
  //   // a notification every time you open the app. Check out the source
  //   // for this function in api/registerForPushNotificationsAsync.js
  //   registerForPushNotificationsAsync();

  //   // Watch for incoming notifications
  //   this._notificationSubscription = Notifications.addListener(this._handleNotification);
  // }

  // _handleNotification = ({origin, data}) => {
  //   this.props.navigator.showLocalAlert(
  //     `Push notification ${origin} with data: ${JSON.stringify(data)}`,
  //     Alerts.notice
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
});
