import React from 'react';
import {
  ScrollView,
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
import ImagePicker from 'react-native-image-picker';
import { RNS3 } from 'react-native-aws3';
import styles from '../stylesheets/ProfileStyles.js';

let iOptions = {
  title: 'Select Avatar',
  allowsEditing: true,
  mediaType: 'photo'
};

let options = {
  keyPrefix: "images/",
  bucket: "routend",
  region: "us-west-1",
  accessKey: "API_KEY_HERE",
  secretKey: "API_KEY_HERE",
  successActionStatus: 201
}

class ProfileSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      firstName: this.props.currUser.first_name,
      lastName: this.props.currUser.last_name,
      gender: this.props.currUser.gender,
      city: this.props.currUser.city,
      state: this.props.currUser.state,
      image: this.props.currUser.image,
      status: this.props.currUser.status,
    }
  }

  static route = {
    navigationBar: {
      title: (<Text style={styles.header}>PROFILE SETTINGS</Text>),
      backgroundColor: '#175785',
    },
  }

  choosePhoto() {
    var that = this;
    ImagePicker.showImagePicker(iOptions, (response) => {
        let source;
        source = { uri: 'data:image/jpeg;base64,' + response.data };
        let file = {
          uri: source,
          name: (Math.random().toString(36).substr(2, 15) + ".jpg"),
          type: "image/jpg"
        }
        RNS3.put(file, options).then(response => {
          that.props.postImage(that.state.userId, response.body.postResponse.location)
          .done(function() {
            that.setState({
              profileImg: response.body.postResponse.location
            });
          });
        });
    });
  }

  updateProfile() {
    this.props.postProfile(this.state.userId, this.state.firstName, this.state.lastName, this.state.gender, this.state.city, this.state.state, this.state.image, this.state.status)
    .done(function() {
      AlertIOS.alert('Success', 'Your profile has been updated!');
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <TouchableOpacity onPress={() => this.choosePhoto()} style={styles.profile}><Text style={styles.profileText}>CHANGE</Text></TouchableOpacity>
          <Avatar
            style={styles.avatar}
            containerStyle={styles.avatarContainer}
            src={this.props.currUser.image}
            size={(Dimensions.get('window').width * 0.2)}
            circle={true}
            onPress={() => this.choosePhoto() }
          />
          <TextInput
            style={styles.firstName}
            onChangeText={(text) => this.setState({firstName: text})}
            placeholder={'First Name'}
            value={this.state.firstName}
            multiline={true}
          />
          <TextInput
            style={styles.lastName}
            onChangeText={(text) => this.setState({lastName: text})}
            placeholder={'Last Name'}
            value={this.state.lastName}
            multiline={true}
          />
          <TextInput
            style={styles.gender}
            onChangeText={(text) => this.setState({gender: text})}
            placeholder={'Gender'}
            value={this.state.gender}
            multiline={true}
          />
          <TextInput
            style={styles.city}
            onChangeText={(text) => this.setState({city: text})}
            placeholder={'City'}
            value={this.state.city}
            multiline={true}
          />
          <TextInput
            style={styles.state}
            onChangeText={(text) => this.setState({state: text})}
            placeholder={'State'}
            value={this.state.state}
            multiline={true}
          />
          {
            icons.map((l, i) => (
              <Icon key={i} name={l.name} style={l.style} size={l.size} color="#175785" />
            ))
          }
        <View style={styles.topView}>
          {
            views.map((l, i) => (
              <View key={i} style={l} />
            ))
          }
          <Button
            onPress={() => this.updateProfile()}
            color={'#fff'}
            backgroundColor={'#175785'}
            style={styles.submitButton}
            radius={5}>
            Done
          </Button>
        </View>
      </ScrollView>
    );
  }
}

let icons = [
  {name: 'ios-contact', style: styles.firstIcon, size: 29},
  {name: 'ios-contact-outline', style: styles.lastIcon, size: 29},
  {name: 'ios-contacts', style: styles.genderIcon, size: 29},
  {name: 'ios-list', style: styles.cityIcon, size: 37},
  {name: 'ios-pin', style: styles.stateIcon, size: 31}
];

let views = [styles.secondView, styles.thirdView, styles.fourthView,
styles.fifthView, styles.sixthView, styles.seventhView];

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);