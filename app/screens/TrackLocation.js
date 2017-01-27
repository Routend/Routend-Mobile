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
import Router from '../navigation/Router';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Button, Card } from 'react-native-uikit';
import styles from '../stylesheets/TrackingStyles.js';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

class TrackLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      currentAddress: '',
      results: (<View>
        <Text></Text>
        </View>),
    }
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>TRACK A PLACE</Text>),
      backgroundColor: '#175785',
    },
  }

  componentDidMount() {
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
          minLength={2}
          autoFocus={false}
          listViewDisplayed='auto'
          fetchDetails={true}
          onPress={(data, details = null) => {
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
                          <View style={styles.card1}>
                            <Card
                              title={'Location'}
                              src={data.url}
                              link={currentLocation}
                              radius={5}
                              marginBottom={8}
                              style={styles.cardStyle}
                            />
                          </View>
                       )
                });
              });
            }
            this.setState({
              results:
              (
                  <View style={styles.card2}>
                    <Card
                      title={'Location'}
                      src={'http://searchengineland.com/figz/wp-content/seloads/2014/08/local-search-map-pin-ss-1920-800x450.jpg'}
                      link={currentLocation}
                      radius={5}
                      marginBottom={8}
                      style={styles.cardStyle}
                    />
                  </View>
               )
            });
          }}
          getDefaultValue={() => {
            return '';
          }}
          query={{
            key: 'AIzaSyCQiHH0c64tBC6zOlwm7ViYpCulVVtSuSU',
            language: 'en',
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
          currentLocation={true}
          currentLocationLabel='Current Location'
          nearbyPlacesAPI='GoogleReverseGeocoding'
          GoogleReverseGeocodingQuery={{
            outputFormat: 'json',
          }}
          GooglePlacesSearchQuery={{
            rankby: 'distance',
            types: 'food',
          }}
          filterReverseGeocodingByTypes={['street_address']}
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
            labelStyle={styles.nameLabel}
            inputStyle={styles.nameInput}
            onChangeText={ (text) => {this.setState({name: text})} }
          />
          <Kohana
            style={[styles.input, { backgroundColor: '#f7f7f7' }]}
            label={'Category'}
            iconClass={FontAwesome}
            iconName={'archive'}
            iconColor={'#ddd'}
            iconColor={'#f4d29a'}
            labelStyle={styles.categoryLabel}
            inputStyle={styles.categoryInput}
            onChangeText={ (text) => {this.setState({category: text})} }
          />
          <View style={styles.buttonView}>
            <Button
              onPress={() => { this.submitLocation() }}
              color={'#fff'}
              backgroundColor={'#0094EA'}
              style={styles.button}
              radius={5}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    AppState: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackLocation);