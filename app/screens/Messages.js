import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MessageList, ProfileHeader, Time } from 'react-native-uikit'
import Router from '../navigation/Router';
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import styles from '../stylesheets/MessageStyles.js';

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

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      messageList: [],
      ready: false,
      profileImg: this.props.currUser.image,
    }
  }

  static route = {
    navigationBar: {
      visible: false,
    },
  }

  componentDidMount() {
    this.fetchMsgs();
  }

  fetchMsgs() {
    var that = this;
    fetch(`http://138.197.202.196:3000/lastmessages?userId=${this.state.userId}`)
    .then((resp) => resp.json())
    .then(resp => {
      for (var i = 0; i < resp.length; i++) {
        that.state.messageList.push({
          id: resp[i].idSender,
          active: true,
          user: resp[i].nameSender,
          title: resp[i].text,
          timestamp: (moment(resp[i].createdAt).valueOf()),
          index: i,
        });
      }
    })
    .done(function() {
       that.setState({
        ready: true
      });
    })
  }

  renderRow (rowData, sectionID) {
    return (
      <ListItem
        roundAvatar
        key={sectionID}
        title={rowData.name}
        subtitle={rowData.subtitle}
        avatar={{uri:rowData.avatar_url}}
      />
    )
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
              <Text style={styles.name}>{this.props.currUser.first_name}</Text>
                <View style={styles.bar}>
                  <TouchableOpacity onPress={() => { this.props.navigator.replace(Router.getRoute('social')) }}>
                  <Text style={styles.friendList}>Friend List</Text>
                  </TouchableOpacity>
                  <Text style={styles.divider}>   |   </Text>
                  <Text style={styles.messages}>Messages</Text>
                </View>
            </View>
          <MessageList
            headerContent={<Text style={styles.header}></Text>}
            items={this.state.messageList}
            onPress={(row) => this.props.navigator.replace(Router.getRoute('privatemsg', {currName: (this.props.currUser.first_name + ' ' + this.props.currUser.last_name), name: this.state.messageList[row.index].user, idSender: this.state.messageList[row.index].id}))}
          />
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
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);