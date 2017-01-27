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


export default class NotificationSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      checked: false,
    }
  }

  updateProfile() {
      AlertIOS.alert('Success', 'Your notification settings have been updated!');
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>NOTIFICATIONS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {
    return (
      <ScrollView
        >
        <Card
          title='Notification Settings'
          image={{uri: 'http://www.imore.com/sites/imore.com/files/styles/large_wm_brw/public/field/image/2014/01/today_screen_nc_hero.jpg?itok=MLnyoE6g'}}>
          <Text style={{marginBottom: 10}}>
            Enable or disable push notifications here
          </Text>
        </Card>
        <CheckBox
          center
          title='Push Notifications'
          iconRight={true}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
          onPress={() => this.setState({checked: !this.state.checked}) }
        />
        <Button
          onPress={() => this.updateProfile()}
          color={'#fff'}
          backgroundColor={'#175785'}
          style={styles.button}
          radius={5}>
          Done
        </Button>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: 'absolute',
    top: (Dimensions.get('window').height * 0.45),
    width: (Dimensions.get('window').width * 0.8),
    left: (Dimensions.get('window').width * 0.1)
  }
});