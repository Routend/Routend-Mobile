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
var ImagePicker = require('react-native-image-picker');
var moment = require('moment');

let iOptions = {
  title: 'Select Avatar',
  allowsEditing: true,
  mediaType: 'photo'
};

let options = {
  keyPrefix: "images/",
  bucket: "routend",
  region: "us-west-1",
  accessKey: "",
  secretKey: "",
  successActionStatus: 201
}

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 2,
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

  componentWillMount() {
    var that = this;
  }

  componentDidMount() {
    this.fetchMsgs()
    console.log(this.state.messageList);
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: '#404d5b', fontWeight: 'bold'}}>Gnus</Text>
                <View style={{justifyContent: 'center', top: 5, marginBottom: (Dimensions.get('window').height * 0.02), alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
                  <TouchableOpacity onPress={() => { this.props.navigator.replace(Router.getRoute('social')) }}>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Friend List</Text>
                  </TouchableOpacity>
                  <Text style={{color: "#D8D8D8"}}>   |   </Text>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Messages</Text>
                </View>
            </View>
          <MessageList
            headerContent={<Text style={{textAlign:'center', fontSize: 8, padding: 10, backgroundColor: '#eee'}}>CURRENT MESSAGES</Text>}
            items={this.state.messageList}
            // footerContent={<Text style={{textAlign:'center', fontSize: 8, padding: 10, backgroundColor: '#eee'}}>END</Text>}
            onPress={(row) => this.props.navigator.replace(Router.getRoute('privatemsg', {name: this.state.messageList[row.index].user, idSender: this.state.messageList[row.index].id}))}
          />
      </View>
     );
    }
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
    currentImg: state.getImage,
    newImg: state.newImage,
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);