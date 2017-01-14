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
import { MessageList } from 'react-native-uikit'
import { ProfileHeader } from 'react-native-uikit';
import Router from '../navigation/Router';
import { RNS3 } from 'react-native-aws3';
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
  accessKey: "AKIAJWY6M2HTAUWIVJ4Q",
  secretKey: "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",
  successActionStatus: 201
}

export default class Messages extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
      // title: (<Text style={{color: 'white', fontSize: 15}}>Messages</Text>),
      // backgroundColor: '#175785'
    },
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
    ImagePicker.showImagePicker(iOptions, (response) => {
      console.log('Response = ', response);

      // if (response.didCancel) {
      //   console.log('User cancelled image picker');
      // }
      // else if (response.error) {
      //   console.log('ImagePicker Error: ', response.error);
      // }
      // else if (response.customButton) {
      //   console.log('User tapped custom button: ', response.customButton);
      // }
      // else {
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
          if (response.status !== 201)
            throw new Error("Failed to upload image to S3");
          console.log(response.body);
          /**
           * {
           *   postResponse: {
           *     bucket: "your-bucket",
           *     etag : "9f620878e06d28774406017480a59fd4",
           *     key: "uploads/image.png",
           *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
           *   }
           * }
           */
        });
      // }
    })
  }

  render() {
    return (
      <View
        style={styles.container}>
          <ProfileHeader
          profileImg={'http://images.hngn.com/data/thumbs/full/50109/650/0/0/0/arrow.png'}
          backgroundImg={'http://download.4-designer.com/files/20130905/Creative-graphics-background-vector-material-49766.jpg'}
          onPress={() => { this.choosePhoto() }}
          />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 15, color: '#404d5b', fontWeight: 'bold'}}>Gnus</Text>
                <View style={{justifyContent: 'center', top: 5, alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
                  <TouchableOpacity onPress={() => { this.props.navigator.pop() }}>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Friend List</Text>
                  </TouchableOpacity>
                  <Text style={{color: "#D8D8D8"}}>   |   </Text>
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Messages</Text>
                </View>
            </View>
          <MessageList
            headerContent={<Text style={{textAlign:'center', fontSize: 20, padding: 10, backgroundColor: '#eee', marginBottom: 3}}>HEADER CONTENT</Text>}
            items={[
              {id:0, active:false, user: 'Jon Snow', title: 'Winter is Coming', message: 'Hey Rob, have you seen the weather report on tv ?', timestamp: 1460223614421},
              {id:1, active:true, user: 'Ric Lowe', title: 'Guess what I found?', message: 'Hey Rob, checkout this story ?', timestamp: 1460221614421},
              {id:2, active:true ,user: 'Jon Snow', title: 'title 3', message: 'Hey Rob, have you seen the weather report on tv ?', timestamp: 1460227614421},
            ]}
            footerContent={<Text style={{textAlign:'center', fontSize: 20, padding: 10, backgroundColor: '#eee'}}>FOOTER CONTENT</Text>}
            onPress={(id) => this.props.navigator.push(Router.getRoute('privatemsg'))}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});