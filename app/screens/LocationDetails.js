import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, ArticleText, Button, GalleryOffset, AvatarHeader, RatingBox, DateItem } from 'react-native-uikit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var moment = require('moment');

class LocationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>ACTIVITY</Text>),
      backgroundColor: '#25272A',
    },
  }

  componentWillMount() {
    var that = this;
    this.props.fetchLocationDetails(this.props.route.params.placeId)
    .done(function() {
      if (that.props.currLocation.result.opening_hours === undefined) {
        that.props.currLocation.result.opening_hours = {
          weekday_text: ['Opening Hours Unavailable.']
        }
      }
      if (that.props.currLocation.result.reviews === undefined) {
        that.props.currLocation.result.reviews = [
          {author_name: 'Routend', time: 0, rating: 5, text: 'Reviews are unavailable for this location.'}
        ]
      }
      if (that.props.currLocation.result.photos === undefined) {
        that.state.locationImages = [];
        that.setState({
          ready: true
        })
      } else {
      that.state.locationImages = [
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${that.props.currLocation.result.photos[0].photo_reference}&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU`,
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${that.props.currLocation.result.photos[1].photo_reference}&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU`, `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${that.props.currLocation.result.photos[2].photo_reference}&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU`,
            ];
      that.setState({
        ready: true,
      })
    }
    })
  }

  // componentDidMount() {
  // }

  render() {
    if (this.state.ready == false) {
      return (
        <View></View>
      )
    } else {
    return (
      <ScrollView
        style={styles.container}
        >
        <View style={{left: (Dimensions.get('window').width * 0.11), top: (Dimensions.get('window').height * 0.00), bottom: (Dimensions.get('window').height * 0.05)}}>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 15, color: '#404d5b', fontWeight: 'bold'}}>{this.props.currLocation.result.name}</Text>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 11, color: '#404d5b', fontWeight: 'bold'}}>{this.props.currLocation.result.formatted_phone_number}</Text>
          <Text style={{top: (Dimensions.get('window').width * 0.02), fontSize: 11, color: '#404d5b', fontWeight: 'bold'}}>{this.props.currLocation.result.formatted_address}</Text>
        </View>

        <View style={{top: (Dimensions.get('window').width * 0.03)}}>
          <GalleryOffset
            imagesArray={this.state.locationImages}
            display={'row'}
          />
        </View>

           <View style={{alignItems: 'center', justifyContent: 'center', width: (Dimensions.get('window').width * 0.95), top: (Dimensions.get('window').height * 0.03), paddingVertical: (Dimensions.get('window').height * 0.01), borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, }, left: (Dimensions.get('window').width * 0.022)}}>
          <Text style={{fontWeight: 'bold', opacity: 0.9}}>Opening Hours</Text>
          {
            this.props.currLocation.result.opening_hours.weekday_text.map((l, i) => (
              <Text style={{fontSize: 12}} key={i}>{l}
              </Text>
            ))
          }
          </View>
          {
            this.props.currLocation.result.reviews.map((l, i) => (
          <View key={i} style={{width: (Dimensions.get('window').width * 0.95), top: (Dimensions.get('window').height * 0.03), borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, }, left: (Dimensions.get('window').width * 0.022)}}>
            <AvatarHeader src={'http:' + l.profile_photo_url}
              heading={l.author_name}
              timestamp={(l.time * 1000)}
              circle={true}
              backgroundColor={'#fff'}
              height={(Dimensions.get('window').height * 0.08)}
              gutter={10}
            />
            <RatingBox rating={l.rating} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.044), left: (Dimensions.get('window').width * 0.2)}}/>
            <View style={{paddingHorizontal: 15, paddingBottom: 5}}>
            <Text style={{fontSize: 13}}>{l.text}</Text>
            </View>
          </View>
            ))
          }
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
          <View style={{height: (Dimensions.get('window').height * 0.14)}}>
          </View>
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currLocation: state.mLocationDetails,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetails);