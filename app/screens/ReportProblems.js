import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  AlertIOS,
} from 'react-native';
import { Button } from 'react-native-uikit';
import { CheckBox, Card } from 'react-native-elements';

export default class ReportProblems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 3,
      checked: false,
    }
  }

  updateProfile() {
    // this.props.postProfile(this.state.userId, this.state.firstName, this.state.lastName, this.state.gender, this.state.city, this.state.state, this.state.image, this.state.status)
    // .done(function() {
      AlertIOS.alert('Success', 'Your notification settings have been updated!');
    // })
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>HELP CENTER</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {
    return (
      <ScrollView
        >
        <Card
          title='Report a Problem'
          image={{uri: 'http://i2.cdn.cnn.com/cnnnext/dam/assets/111110075215-iphone-4s-battery-horizontal-large-gallery.jpg'}}>
          <Text style={{marginBottom: 10}}>
            Have any issues with our app? Let us know!
          </Text>
        </Card>
        <Button
          onPress={() => this.updateProfile()}
          color={'#fff'}
          backgroundColor={'#175785'}
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.375), width: (Dimensions.get('window').width * 0.8), left: (Dimensions.get('window').width * 0.1)}}
          radius={5}>
          Contact Us
        </Button>
      </ScrollView>
    );
  }
}