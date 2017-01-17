import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'

export default class ProfileSettings extends React.Component {

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>PROFILE SETTINGS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <FormLabel>Name</FormLabel>
        <FormInput onChangeText={(text) => { this.setState({name: text}) }}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});