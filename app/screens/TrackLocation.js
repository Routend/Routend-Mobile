import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  AlertIOS,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import Router from '../navigation/Router';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-uikit';

class TrackLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      date: "2016-05-15",
      currentAddress: '',
      results: (<View>
        <Text></Text>
        </View>),
      currentCoordinates: 0,
    }
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>TRACK A PLACE</Text>),
      backgroundColor: '#175785',
    },
  }

  componentDidMount() {
    console.log('props', this.props)
    this.setState({
      results: (<View>
        <Text>{this.state.currentAddress}</Text>
        </View>)
    });
  }

  submitLocation() {
    var that = this;
    this.props.postLocation(this.state.userId, this.state.name, this.state.category, this.state.placeId, this.state.image, this.state.address, this.state.rating, this.state.latitude, this.state.longitude)
    .then(() => { this.submitSuccess() });
  }

  submitSuccess() {
    AlertIOS.alert('Success', 'Location has been saved!');
    this.props.navigation.getNavigator('root').immediatelyResetStack([Router.getRoute('rootNavigation')], 0);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >

       <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        onPress={(data, details = null) => {
          console.log('data', data);
          console.log('details', details);
          this.state.latitude = details.geometry.location.lat;
          this.state.longitude = details.geometry.location.lng;
          this.state.placeId = details.place_id;
          this.state.address = details.formatted_address;
          this.state.rating = details.rating || 0;
          var currentLocation = '';
          var that = this;
          if (data.description === undefined) {
            currentLocation = data.formatted_address;
          }
          if (data.description !== undefined) {
            currentLocation = data.description;
          }

          if (details.photos !== undefined && details.photos[0].photo_reference !== undefined) {
          var photo = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + details.photos[0].photo_reference + '&key=AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU'
          fetch(photo)
          .done(function(data) {
            console.log('data from google places image fetch', data);
            that.state.image = data.url;
                that.setState({
                    results:
                    (
                        <View style={{marginLeft: 20, marginRight: 15}}>
                          <Card
                            onPress={() => console.log('card pressed')}
                            title={'Location'}
                            src={data.url}
                            link={currentLocation}
                            radius={5}
                            marginBottom={8}
                            style={{marginTop: 0}}
                          />
                        </View>
                     )
              });
            });
          }

          this.setState({
            results:
            (
                <View style={{marginLeft: 20, marginRight: 15, marginBottom: 10}}>
                  <Card
                    onPress={() => console.log('card pressed')}
                    title={'Location'}
                    src={'http://searchengineland.com/figz/wp-content/seloads/2014/08/local-search-map-pin-ss-1920-800x450.jpg'}
                    link={currentLocation}
                    radius={5}
                    marginBottom={8}
                    style={{marginTop: 0}}
                  />
                </View>
             )
          });
        }}
        getDefaultValue={() => {
          return ''; // text input default value
        }}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU',
          language: 'en', // language of the results
          // types: '(cities)', // default: 'geocode'
        }}
        styles={{
            textInputContainer: {
            backgroundColor: '#fafafa',
            borderTopColor: '#fcfcfc',
            borderBottomColor: '#fcfcfc',
            bottom: 15,
          },
          textInput: {
            fontSize: 13,
          },
          description: {
            fontWeight: 'bold',
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          poweredCountainer: {
            height: 0,
          },
          powered: {
            height: 0,
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current Location"
        nearbyPlacesAPI='GoogleReverseGeocoding' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          outputFormat: 'json',
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food',
        }}
        filterReverseGeocodingByTypes={['street_address']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        predefinedPlaces={[]}
      />

      <View style={[styles.card2, { backgroundColor: '#fff' }]}>
          <View>
            {this.state.results}
         </View>
          <Text style={styles.title}>Save Location</Text>
          <Kohana
            style={{ backgroundColor: '#f7f7f7' }}
            label={'Name'}
            iconClass={FontAwesome}
            iconName={'circle-o-notch'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#626262'}}
            inputStyle={{ color: '#000', fontSize: 14}}
            onChangeText={ (text) => {this.setState({name: text})} }
          />
          <Kohana
            style={[styles.input, { backgroundColor: '#f7f7f7' }]}
            label={'Category'}
            iconClass={FontAwesome}
            iconName={'archive'}
            iconColor={'#ddd'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#626262' }}
            inputStyle={{ color: '#000', fontSize: 14}}
            onChangeText={ (text) => {this.setState({category: text})} }
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button
              onPress={() => { this.submitLocation() }}
              color={'#fff'}
              backgroundColor={'#0094EA'}
              style={{top: 5, width: (Dimensions.get('window').width * 0.9)}}
              radius={5}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 14,
    fontWeight: 'bold',
    opacity: 0.8,
  },
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    AppState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackLocation);