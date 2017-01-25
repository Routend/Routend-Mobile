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

  contactUs() {
    AlertIOS.alert('Contact', 'Message us at support@routend.com!');
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>REPORT A PROBLEM</Text>),
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
          <Text style={styles.text}>
            Have any issues with our app? Let us know!
          </Text>
        </Card>
        <Button
          onPress={() => this.contactUs()}
          color={'#fff'}
          backgroundColor={'#175785'}
          style={styles.button}
          radius={5}>
          Contact Us
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginBottom: 10
  },
  button: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.375),
    width: (Dimensions.get('window').width * 0.8),
    left: (Dimensions.get('window').width * 0.1)
  }
});