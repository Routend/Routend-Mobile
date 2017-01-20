import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  View,
  AlertIOS,
  TouchableOpacity,
} from 'react-native';
import { Button, Avatar } from 'react-native-uikit';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var ImagePicker = require('react-native-image-picker');
import { RNS3 } from 'react-native-aws3';

let iOptions = {
  title: 'Select Avatar',
  allowsEditing: true,
  mediaType: 'photo'
};

let options = {
  keyPrefix: "images/",
  bucket: "routend",
  region: "us-west-1",
  accessKey: "AKIAJ3SMBHUDIYKY46LA",
  secretKey: "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",
  successActionStatus: 201
}

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 3,
      firstName: this.props.currUser.first_name,
      lastName: this.props.currUser.last_name,
      gender: this.props.currUser.gender,
      city: this.props.currUser.city,
      state: this.props.currUser.state,
      image: this.props.currUser.image,
      status: this.props.currUser.status,
    }
  }

  choosePhoto() {
    var that = this;
    ImagePicker.showImagePicker(iOptions, (response) => {
      console.log('Response = ', response);
        let source;
        source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.log('image source', source);

        let file = {
          // `uri` can also be a file system path (i.e. file://)
          uri: source,
          name: (Math.random().toString(36).substr(2, 15) + ".jpg"),
          type: "image/jpg"
        }

        RNS3.put(file, options).then(response => {
          // if (response.status !== 201)
          //   throw new Error("Failed to upload image to S3");
          console.log(response.body);
          that.props.postImage(that.state.userId, response.body.postResponse.location)
          .done(function() {
            that.setState({
              profileImg: response.body.postResponse.location
            });
          });
        });
      // }
    })
  }

  updateProfile() {
    this.props.postProfile(this.state.userId, this.state.firstName, this.state.lastName, this.state.gender, this.state.city, this.state.state, this.state.image, this.state.status)
    .done(function() {
      AlertIOS.alert('Success', 'Your profile has been updated!');
    })
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
        <TouchableOpacity onPress={() => this.choosePhoto()} style={{position: 'absolute', top: (Dimensions.get('window').height * 0.133), left: (Dimensions.get('window').width * 0.445)}}><Text style={{fontSize: 10, color: '#175785'}}>CHANGE</Text></TouchableOpacity>
          <Avatar
            style={{borderWidth: 0.5, borderColor: '#175785'}}
            containerStyle={{position: 'absolute', top: (Dimensions.get('window').height * 0.018), left: (Dimensions.get('window').width * 0.4)}}
            src={this.props.currUser.image}
            size={(Dimensions.get('window').width * 0.2)}
            circle={true}
            onPress={() => this.choosePhoto() }
          />

        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.185), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({firstName: text})}
          placeholder={'First Name'}
          value={this.state.firstName}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.255), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({lastName: text})}
          placeholder={'Last Name'}
          value={this.state.lastName}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.32), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({gender: text})}
          placeholder={'Gender'}
          value={this.state.gender}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.387), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({city: text})}
          placeholder={'City'}
          value={this.state.city}
          multiline={true}
        />
        <TextInput
          style={{position: 'absolute', top: (Dimensions.get('window').height * 0.45), left: (Dimensions.get('window').width * 0.18), height: 42, borderColor: 'gray', borderWidth: 0, height: 34, width: (Dimensions.get('window').width), fontSize: 12}}
          onChangeText={(text) => this.setState({state: text})}
          placeholder={'State'}
          value={this.state.state}
          multiline={true}
        />
        <Icon name="ios-contact" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.178)}} size={29} color="#175785" />
        <Icon name="ios-contact-outline" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.252)}} size={29} color="#175785" />
        <Icon name="ios-contacts" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.034), top: (Dimensions.get('window').height * 0.317)}} size={29} color="#175785" />
        <Icon name="ios-list" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.044), top: (Dimensions.get('window').height * 0.375)}} size={37} color="#175785" />
        <Icon name="ios-pin" style={{position: 'absolute', left: (Dimensions.get('window').width * 0.044), top: (Dimensions.get('window').height * 0.443)}} size={31} color="#175785" />
        <View style={{top: (Dimensions.get('window').height * 0.05)}}>
          <View style={{ top: (Dimensions.get('window').height * 0.11), backgroundColor: '#d7d7d7', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.18), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.25), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.31), backgroundColor: '#eee', height: 1 }} />
          <View style={{ left: (Dimensions.get('window').width * 0.13), top: (Dimensions.get('window').height * 0.38), backgroundColor: '#eee', height: 1 }} />
          <View style={{ top: (Dimensions.get('window').height * 0.45), backgroundColor: '#d7d7d7', height: 1 }} />
          <Button
            onPress={() => this.updateProfile()}
            color={'#fff'}
            backgroundColor={'#175785'}
            style={{top: (Dimensions.get('window').height * 0.47), width: (Dimensions.get('window').width * 0.8), left: (Dimensions.get('window').width * 0.1)}}
            radius={5}>
            Done
          </Button>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);