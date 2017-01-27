import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';

export default class RootNavigation extends React.Component {

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
          id="logs"
          renderIcon={isSelected => this._renderIcon('bar-chart', isSelected)}>
          <StackNavigation initialRoute="logs" />
        </TabNavigationItem>
        <TabNavigationItem
          id="matches"
          renderIcon={isSelected => this._renderIcon('globe', isSelected)}>
          <StackNavigation initialRoute="matches" />
        </TabNavigationItem>
        <TabNavigationItem
          id="social"
          renderIcon={isSelected => this._renderIcon('user-circle', isSelected)}>
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
