import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, ArticleText, Divider, Button } from 'react-native-uikit';

// {this.props.route.params.name}

export default class MatchDetails extends React.Component {
  // state = {
  //   fontLoaded: false,
  // };

  static route = {
    navigationBar: {
      title: (<Text></Text>),
      backgroundColor: '#25272A',
    },
  }

  componentDidMount() {
    console.log('matchdetails', this.props);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 15, color: '#404d5b', fontWeight: 'bold'}}>YOU'VE MATCHED WITH SOMEONE!</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', top: (Dimensions.get('window').width * 0.05)}}>
          <View style={{padding: (Dimensions.get('window').width * 0.026), justifyContent: 'center', alignItems: 'center'}}>
            <Avatar
              src={'http://images.hngn.com/data/thumbs/full/50109/650/0/0/0/arrow.png'}
              size={(Dimensions.get('window').width * 0.36)}
              circle={true}
              onPress={() => console.log('pressed')}
            />
            <Text style={{fontSize: 13.5, fontWeight: 'bold', opacity: 0.8}}>Gnus</Text>
          </View>
          <View style={{padding: (Dimensions.get('window').width * 0.025), justifyContent: 'center', alignItems: 'center'}}>
            <Avatar
              src={'http://assets.nydailynews.com/polopoly_fs/1.1369168.1370966034!/img/httpImage/image.jpg_gen/derivatives/article_750/transformers.jpg'}
              size={(Dimensions.get('window').width * 0.36)}
              circle={true}
              onPress={() => console.log('pressed')}
            />
            <Text style={{fontSize: 13.5, fontWeight: 'bold', opacity: 0.8}}>Megan</Text>
          </View>
        </View>

           <View style={{alignItems: 'center', justifyContent: 'center', width: (Dimensions.get('window').width * 0.95),top: (Dimensions.get('window').height * 0.05), borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, }, left: (Dimensions.get('window').width * 0.022)}}>
           <Divider
            color={'#eee'}
          />
          <ArticleText
            username={'Megan'}
            text={'Feeling great! Excited to explore new places with other people!'}
            onPress={() => console.log('pressed')}
            style={{width: (Dimensions.get('window').width * 0.8), justifyContent: 'center'}}
          />
          <Divider
            color={'#eee'}
          />
          </View>
          <View style={{top: (Dimensions.get('window').height * 0.060), left: (Dimensions.get('window').width * 0.02)}}>
          <Button
            color={'#fff'}
            backgroundColor={'#26a69a'}
            style={{width: (Dimensions.get('window').width * 0.96)}}
            radius={5}>
            Accept
          </Button>
          <Button
            color={'#fff'}
            backgroundColor={'#25272A'}
            style={{width: (Dimensions.get('window').width * 0.96), bottom: (Dimensions.get('window').height * 0.01)}}
            radius={5}>
            Reject
          </Button>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: (Dimensions.get('window').height * 0.05)
  },
});