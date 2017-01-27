import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import {
  NavigationProvider,
  StackNavigation,
} from '@exponent/ex-navigation';
import {
  AppRegistry,
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Router from '../navigation/Router';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsReady: false,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationProvider router={Router}>
          <StackNavigation id="root" initialRoute={Router.getRoute('login')} />
        </NavigationProvider>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusBarUnderlay: {
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

//sending dispatching actions/ sending to rest of application
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// takes all actions and dispatches to props,
// state is global state of the object.
export default connect((state) => {
  return {}
}, mapDispatchToProps)(AppContainer);
