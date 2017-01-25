import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';
import { List, ListItem, Card } from 'react-native-elements';
import { ProfileHeader } from 'react-native-uikit';
import Router from '../navigation/Router';
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var ImagePicker = require('react-native-image-picker');
import styles from '../stylesheets/SocialStyles.js';

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

class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 3,
      ready: false,
      profileImg: this.props.currUser.image,
      status: this.props.currUser.status
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  componentWillMount() {
    var that = this;
    this.props.fetchMatches(this.state.userId)
    .then(function() {
      that.setState({
        ready: true
      })
    })
  }


  updateStatus() {
    this.props.postProfile(this.props.currUser.id_users, this.props.currUser.first_name, this.props.currUser.last_name, this.props.currUser.gender, this.props.currUser.city, this.props.currUser.state, this.props.currUser.image, this.state.status)
    .done(function() {
      AlertIOS.alert('Success', 'Your status has been updated!');
    })
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
          console.log(response.body);
          that.props.postImage(that.state.userId, response.body.postResponse.location)
          .done(function() {
            that.setState({
              profileImg: response.body.postResponse.location
            });
          });
        });
    })
  }

  render() {
    if (this.state.ready === false) {
      return (
        <View></View>
      )
    } else {
    return (
      <View
        style={styles.container}>
          <ProfileHeader
          profileImg={this.state.profileImg}
          backgroundImg={'http://download.4-designer.com/files/20130905/Creative-graphics-background-vector-material-49766.jpg'}
          onPress={() => { this.choosePhoto() }}
          />
            <View style={styles.mainView}>
              <Text style={styles.user}>{this.props.currUser.first_name}</Text>
                <View style={styles.bar}>
                  <Text style={styles.friendList}>Friend List</Text>
                  <Text style={styles.line}>   |   </Text>
                  <TouchableOpacity onPress={() => { this.props.navigator.replace(Router.getRoute('messages')) }}>
                  <Text style={styles.message}>Messages</Text>
                  </TouchableOpacity>
                </View>
            </View>
            <Card
              title='STATUS'
              titleStyle={styles.cardTitle}
              dividerStyle={styles.divider}
              containerStyle={styles.cardContainer}
              >
            </Card>
            <TextInput
              style={styles.textInput}
              onChangeText={(text) => this.setState({status: text})}
              placeholder={"What's your status?"}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity onPress={() => this.updateStatus()} style={styles.touchable}><Text style={styles.update}>UPDATE</Text></TouchableOpacity>
          <List containerStyle={styles.listContainer}>
          {
            this.props.getMatches.map((l, i) => (
              <ListItem
                roundAvatar
                onPress={ () => this.props.navigator.replace(Router.getRoute('privatemsg', {name: (l.first_name + ' ' + l.last_name), idSender: l.id_users})) }
                avatar={l.image}
                key={i}
                title={l.first_name}
                subtitle={l.status}
              />
            ))
          }
          </List>
      </View>
    );
  }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currentImg: state.getImage,
    newImg: state.newImage,
    getMatches: state.getMatches,
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Social);