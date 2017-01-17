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
  accessKey: "API KEY",
  secretKey: "API KEy",
  successActionStatus: 201
}

const list = [
  {
    name: 'Kanye East',
    avatar_url: 'http://i0.kym-cdn.com/photos/images/newsfeed/000/470/860/69d.jpeg',
    subtitle: 'East Asia'
  },
  {
    name: 'Kanye West',
    avatar_url: 'http://www.relatably.com/m/img/kanye-west-memes-tumblr/kanye-west.jpg',
    subtitle: 'The OG'
  },
  {
    name: 'Steve Graves',
    avatar_url: 'http://i0.kym-cdn.com/entries/icons/original/000/020/253/gravescigar.jpg',
    subtitle: 'League of Legos'
  },
  {
    name: 'Michael Dwyer',
    avatar_url: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk0NjM2MTE5M15BMl5BanBnXkFtZTcwODIxMzcyNw@@._V1_UX214_CR0,0,214,317_AL_.jpg',
    subtitle: ('Magneto FTWWWWWWWWWWWWWWWWWWWWWWWWWWWWW'.slice(0, 20) + '...')
  },
  {
    name: 'Kanye South',
    avatar_url: 'http://i1.kym-cdn.com/photos/images/facebook/000/273/972/7b3.jpg',
    subtitle: 'South West'
  },
  {
    name: 'Kanye North',
    avatar_url: 'http://www.freakingnews.com/pictures/81000/Kanye-West-Chin-Head--81349.jpg',
    subtitle: 'North Pole'
  }
]

class Social extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      profileImg: 'http://aios2-staging.agentimage.com/j/jmlirealtor.com/htdocs/wp-content/uploads/2014/10/default-photo.jpg',
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
    var that = this;
    this.props.fetchImage(this.state.userId)
    .done(function() {
      console.log('after fetch image inside done', that.props.currentImg);
      that.setState({
        profileImg: that.props.currentImg,
      })
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
          name: (Math.random().toString(36).substr(2, 10) + ".jpg"),
          type: "image/jpg"
        }

        RNS3.put(file, options).then(response => {
          // if (response.status !== 201)
          //   throw new Error("Failed to upload image to S3");
          console.log(response.body);
          that.props.postImage(that.state.userId, response.body.postResponse.location)
          .done(function() {
            that.setState({
              profileImg: that.newImage
            });
          });
        });
      // }
    })
  }

  render() {
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
                  <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('messages')) }}>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Messages</Text>
                  </TouchableOpacity>
                </View>
            </View>
          <List containerStyle={{marginBottom: 20}}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                onPress={() => console.log('something')}
                avatar={l.avatar_url}
                key={i}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
          </List>
      </View>
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
    currentImg: state.getImage,
    newImg: state.newImage
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Social);
