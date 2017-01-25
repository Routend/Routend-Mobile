import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AlertIOS,
} from 'react-native';
import { Avatar, ArticleText, Button, GalleryOffset, AvatarHeader, RatingBox, DateItem } from 'react-native-uikit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var moment = require('moment');
import Router from '../navigation/Router';
import styles from '../stylesheets/LocationStyles.js';

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

  postLocation() {
    var that = this;
    this.props.postLocation(this.props.route.params.currUserId, this.props.currLocation.result.name, this.props.currLocation.result.types[0], this.props.currLocation.result.place_id, this.props.currLocation.result.photos[0].photo_reference, this.props.currLocation.result.formatted_address, this.props.currLocation.result.rating, this.props.currLocation.result.geometry.location.lat, this.props.currLocation.result.geometry.location.lng)
    .done(function() {
      AlertIOS.alert('Success', 'Your location has been added!');
      that.props.navigation.getNavigator('root').immediatelyResetStack([Router.getRoute('rootNavigation')], 0);
    })
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
        <View style={styles.topView}>
          <Text style={styles.nameView}>{this.props.currLocation.result.name}</Text>
          <Text style={styles.phoneView}>{this.props.currLocation.result.formatted_phone_number}</Text>
          <Text style={styles.addressView}>{this.props.currLocation.result.formatted_address}</Text>
        </View>
        <View style={styles.galleryView}>
          <GalleryOffset
            imagesArray={this.state.locationImages}
            display={'row'}
          />
        </View>
           <View style={styles.openingHours}>
          <Text style={styles.openingText}>Opening Hours</Text>
          {
            this.props.currLocation.result.opening_hours.weekday_text.map((l, i) => (
              <Text style={{fontSize: 12}} key={i}>{l}
              </Text>
            ))
          }
          </View>
          {
            this.props.currLocation.result.reviews.map((l, i) => (
          <View key={i} style={styles.review}>
            <AvatarHeader src={'http:' + l.profile_photo_url}
              heading={l.author_name}
              timestamp={(l.time * 1000)}
              circle={true}
              backgroundColor={'#fff'}
              height={(Dimensions.get('window').height * 0.08)}
              gutter={10}
            />
            <RatingBox rating={l.rating} outOf={5} style={styles.ratingBox}/>
            <View style={styles.reviewView}>
            <Text style={styles.reviewText}>{l.text}</Text>
            </View>
          </View>
            ))
          }
          <View style={styles.buttonView}>
          <Button
            color={'#fff'}
            onPress={() => this.postLocation()}
            backgroundColor={'#26a69a'}
            style={styles.buttonWidth}
            radius={5}>
            Accept
          </Button>
          <Button
            color={'#fff'}
            onPress={() => this.props.navigator.replace(Router.getRoute('matches'))}
            backgroundColor={'#25272A'}
            style={styles.buttonReject}
            radius={5}>
            Reject
          </Button>
          </View>
          <View style={styles.padding}>
          </View>
      </ScrollView>
    );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currLocation: state.mLocationDetails,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetails);