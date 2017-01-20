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
import { List, ListItem } from 'react-native-elements';
import { ProfileHeader } from 'react-native-uikit';
import Router from '../navigation/Router';
import { RNS3 } from 'react-native-aws3';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var ImagePicker = require('react-native-image-picker');

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
    }
  }

  static route = {
    navigationBar: {
      visible: false,
      // title: (<Text style={{color: 'white', fontSize: 15}}>Friend List</Text>),
      // backgroundColor: '#175785'
    },
  }

  componentWillMount() {
    console.log(this.props);
    var that = this;

    this.props.fetchMatches(this.state.userId)
    .then(function() {
              that.setState({
                ready: true
              })
    })
  }

  // componentDidMount() {
  // }

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
                <View style={{justifyContent: 'center', top: 5, alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Friend List</Text>
                  <Text style={{color: "#D8D8D8"}}>   |   </Text>
                  <TouchableOpacity onPress={() => { this.props.navigator.replace(Router.getRoute('messages')) }}>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Messages</Text>
                  </TouchableOpacity>
                </View>
            </View>
          <List containerStyle={{marginBottom: 20}}>
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
    getMatches: state.getMatches,
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
    // matchProfile: state.getProfile,
    // matchStatus: state.getStatus,
    // matchImage: state.getImage,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Social);