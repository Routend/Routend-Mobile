import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
} from 'react-native';
import { Button, Avatar } from 'react-native-uikit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      city: '',
      state: ''
    }
  }

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
        <View style={{left: (Dimensions.get('window').width * 0.10), width: (Dimensions.get('window').width * 0.80), top: (Dimensions.get('window').height * 0.064), backgroundColor: '#175785', height: 1 }} />
          <Avatar
            style={{borderWidth: 0, borderColor: '#175785'}}
            containerStyle={{position: 'absolute', top: (Dimensions.get('window').height * 0.005), left: (Dimensions.get('window').width * 0.4)}}
            src={'https://s3.amazonaws.com/uifaces/faces/twitter/evagiselle/128.jpg'}
            size={(Dimensions.get('window').width * 0.2)}
            circle={true}
            onPress={() => console.log('pressed')}
          />

        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.18), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({firstName: text})}
          placeholder={'First Name'}
          value={this.state.firstName}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.233), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({lastName: text})}
          placeholder={'Last Name'}
          value={this.state.lastName}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.283), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({gender: text})}
          placeholder={'Gender'}
          value={this.state.gender}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.333), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({city: text})}
          placeholder={'City'}
          value={this.state.city}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.385), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({state: text})}
          placeholder={'State'}
          value={this.state.state}
          multiline={true}
        />
        <Icon name="ios-contact" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.177)}} size={29} color="#175785" />
        <Icon name="ios-contact-outline" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.227)}} size={29} color="#175785" />
        <Icon name="ios-contacts" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.279)}} size={29} color="#175785" />
        <Icon name="ios-list" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.044), top: (Dimensions.get('window').height * 0.325)}} size={37} color="#175785" />
        <Icon name="ios-pin" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.044), top: (Dimensions.get('window').height * 0.376)}} size={31} color="#175785" />
        <View style={{top: (Dimensions.get('window').height * 0.1)}}>
          <View style={{ top: (Dimensions.get('window').height * 0.07), backgroundColor: '#d7d7d7', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.12), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.17), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.22), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.27), backgroundColor: '#eee', height: 1 }} />
          <View style={{ top: (Dimensions.get('window').height * 0.32), backgroundColor: '#d7d7d7', height: 1 }} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

      //   <View style={{top: (Dimensions.get('window').height * 0.25)}}>
      //     <TextInput
      //     style={{paddingLeft: (Dimensions.get('window').width * 0.1), paddingTop: (Dimensions.get('window').height * 0.008), top: (Dimensions.get('window').height * 0.06), left: (Dimensions.get('window').width * 0.1), height: 42, borderColor: 'gray', borderWidth: 0, borderBottomWidth: 1, height: 34, width: (Dimensions.get('window').width), fontSize: 12, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
      //     onChangeText={(text) => this.setState({email: text})}
      //     placeholder={'Email'}
      //     value={this.state.email}
      //     multiline={true}
      //   />
      //     <TextInput
      //     style={{paddingLeft: (Dimensions.get('window').width * 0.1), paddingTop: (Dimensions.get('window').height * 0.008), top: (Dimensions.get('window').height * 0.06), left: (Dimensions.get('window').width * 0.1), height: 42, borderColor: 'gray', borderWidth: 0, borderBottomWidth: 1, height: 34, width: (Dimensions.get('window').width), fontSize: 12, borderTopLeftRadius: 5, borderTopRightRadius: 5}}
      //     onChangeText={(text) => this.setState({email: text})}
      //     placeholder={'Email'}
      //     value={this.state.email}
      //     multiline={true}
      //   />
      //     <Button
      //       color={'#fff'}
      //       backgroundColor={'#26a69a'}
      //       style={{top: (Dimensions.get('window').height * 0.08), width: (Dimensions.get('window').width * 0.8), left: (Dimensions.get('window').width * 0.1)}}
      //       radius={5}>
      //       Sign In
      //     </Button>
      // </View>