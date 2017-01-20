import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  AlertIOS,
} from 'react-native';
import { Card, ListItem } from 'react-native-elements';

export default class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 3,
      checked: false,
    }
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
          title='Privacy Policy'
          image={{uri: 'http://app5ive.com/wp-content/uploads/2016/04/Privacy_banner.jpg'}}>
          <Text style={{marginBottom: 10}}>
            Information on how we keep you and your data secure
          </Text>
        </Card>
        <Card
          title='Privacy Policy'>
          <ListItem
            key={0}
            title={'Routend is committed to protecting your privacy. This privacy policy tells you about our online collection and use of data. The terms of this policy apply to Routends Mobile application. By using this app, you understand and agree to the terms of this policy.'}
            />
        </Card>
      </ScrollView>
    );
  }
}