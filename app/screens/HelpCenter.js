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

const users = [
 {
    name: 'Using Routend',
 },
 {
    name: 'Managing Your Account',
 },
 {
    name: 'Adding Matches',
 },
 {
    name: 'User Suggestions',
 },
 {
    name: 'Contacting Us',
 }
]

export default class HelpCenter extends React.Component {
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
          title='Help Center'
          image={{uri: 'https://fscl01.fonpit.de/userfiles/2692059/image/Blog/chinese-woman-on-the-phone_shutterstock-w628.jpg'}}>
          <Text style={{marginBottom: 10}}>
            Find common answers to questions here
          </Text>
        </Card>
        <Card
          title='FAQ'>
          {
              users.map((u, i) => {
                return (
                  <ListItem
                    key={i}
                    roundAvatar
                    title={u.name}
                    avatar={{uri:u.avatar}} />
                )
              })
            }
        </Card>
      </ScrollView>
    );
  }
}