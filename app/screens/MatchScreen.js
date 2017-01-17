import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, ReviewCell, RatingBox } from 'react-native-uikit';
import Router from '../navigation/Router';

export default class MatchScreen extends React.Component {
  // state = {
  //   fontLoaded: false,
  // };

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>SOCIAL</Text>),
      backgroundColor: '#175785',
    },
  }

  // componentDidMount() {
  //   Font.loadAsync({
  //     'space-mono': require('../containers/assets/fonts/SpaceMono-Regular.ttl'),
  //   });
  // }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text style={{left: (Dimensions.get('window').width * 0.03), top: (Dimensions.get('window').width * 0.02), fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>NEW MATCHES</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', top: (Dimensions.get('window').width * 0.04)}}>
          <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Avatar
            src={'http://assets.nydailynews.com/polopoly_fs/1.1369168.1370966034!/img/httpImage/image.jpg_gen/derivatives/article_750/transformers.jpg'}
            size={(Dimensions.get('window').width * 0.21)}
            circle={true}
            onPress={() => this.props.navigator.push(Router.getRoute('matchdetails', {name: 'testing'}))}
          />
          <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.8}}>Megan</Text>
          </View>
          <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Avatar
            src={'http://www.ablogtowatch.com/wp-content/uploads/2015/01/HYT-Skull-Watch-Ironman-design.jpg'}
            size={(Dimensions.get('window').width * 0.21)}
            circle={true}
            onPress={() => console.log('pressed')}
          />
          <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.8}}>Tony</Text>
          </View>
          <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Avatar
            src={'https://upload.wikimedia.org/wikipedia/en/1/17/Batman-BenAffleck.jpg'}
            size={(Dimensions.get('window').width * 0.21)}
            circle={true}
            onPress={() => console.log('pressed')}
          />
          <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.8}}>Bruce</Text>
          </View>
          <View style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
          <Avatar
            src={'https://media1.popsugar-assets.com/files/thumbor/rPbxHdtjHvjGAIPOx7fi84HUXmg/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/05/16/873/n/1922283/3fc51cb6_edit_img_image_41215924_1462860000_728/i/Daenerys-Prince-Promised-Game-Thrones.jpg'}
            size={(Dimensions.get('window').width * 0.21)}
            circle={true}
            onPress={() => console.log('pressed')}
          />
          <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.8}}>Dragon</Text>
          </View>
        </View>
        <View style={{top: (Dimensions.get('window').width * 0.05)}}>
        <Text style={{left: (Dimensions.get('window').width * 0.03), top: (Dimensions.get('window').width * 0.005), fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>ACTIVITY SUGGESTIONS</Text>
        <View style={{padding: (Dimensions.get('window').width * 0.03)}}>
        <ReviewCell
          title={'Chipotle'}
          description={'865 Market St C10, San Francisco, CA 94103, USA'}
          src={'https://lh5.googleusercontent.com/-TZ0b4mn-KdU/WAAyvGrlW1I/AAAAAAAAEp8/NRWexdAUWDcIdKsZ8kbEWVmWDB0gyhpZgCLIB/s1600-w400/'}
          onPress={() => { this.props.navigator.push(Router.getRoute('locationdetails', {name: 'testing'})) }}
          rating={0}
          outOf={0}
        />
        <RatingBox rating={3.7} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.01), left: (Dimensions.get('window').width * 0.025)}}/>
        </View>
        <View style={{padding: (Dimensions.get('window').width * 0.03)}}>
        <ReviewCell
          title={'McDonalds'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'}
          src={'https://lh5.googleusercontent.com/proxy/lvLgnhcoHke5BEhTG-bVydssje9jV_GytcBidVZh4ADXEuiybVwXN4mlIbgxxOKn2pF1uharMho8lAqGSXcMGKJMigr42UH_qZ1THp4bZplV7uyThhmwEtq38oAhKW7V5Y_6j46jAEkxkrewm9wrd_T4K2JBUw8=w271-h180'}
          onPress={() => console.log('pressed')}
          rating={4}
          outOf={5}
        />
        <RatingBox rating={2} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.01), left: (Dimensions.get('window').width * 0.025)}}/>
        </View>
        <View style={{padding: (Dimensions.get('window').width * 0.03)}}>
        <ReviewCell
          title={'Bouldering'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'}
          src={'https://lh5.googleusercontent.com/proxy/lvLgnhcoHke5BEhTG-bVydssje9jV_GytcBidVZh4ADXEuiybVwXN4mlIbgxxOKn2pF1uharMho8lAqGSXcMGKJMigr42UH_qZ1THp4bZplV7uyThhmwEtq38oAhKW7V5Y_6j46jAEkxkrewm9wrd_T4K2JBUw8=w271-h180'}
          onPress={() => console.log('pressed')}
          rating={4}
          outOf={5}
        />
        <RatingBox rating={3.5} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.01), left: (Dimensions.get('window').width * 0.025)}}/>
        </View>
        <View style={{padding: (Dimensions.get('window').width * 0.03)}}>
        <ReviewCell
          title={'Gaucho'}
          description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore'}
          src={'https://lh5.googleusercontent.com/proxy/lvLgnhcoHke5BEhTG-bVydssje9jV_GytcBidVZh4ADXEuiybVwXN4mlIbgxxOKn2pF1uharMho8lAqGSXcMGKJMigr42UH_qZ1THp4bZplV7uyThhmwEtq38oAhKW7V5Y_6j46jAEkxkrewm9wrd_T4K2JBUw8=w271-h180'}
          onPress={() => console.log('pressed')}
          rating={4}
          outOf={5}
        />
        <RatingBox rating={4.7} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.01), left: (Dimensions.get('window').width * 0.025)}}/>
        </View>
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