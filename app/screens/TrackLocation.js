import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import {
//   ExponentLinksView,
// } from '@exponent/samples';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import DatePicker from 'react-native-datepicker';
var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');
import Router from '../navigation/Router';
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Button from 'apsl-react-native-button';
import { Button } from 'react-native-uikit';
import { Card } from 'react-native-uikit';

class TrackLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "2016-05-15",
      currentAddress: '',
      results: (<View>
        <Text></Text>
        </View>),
      currentCoordinates: 0,

    }
    // window.goBack = function() {
    //   this.props.navigator.pop();
    // }.bind(this);
  }



  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 15}}>Track a Place</Text>),
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


  searchPressed() {
      console.log('props', this.props);
      this.props.fetchCoord();
  }

  // _goBack() {
  //   console.log('goBack was clicked', this)
  //   // this.props.navigator.pop();
  //   this.props.navigator.push(Router.getRoute('home'));
  // }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

       <GooglePlacesAutocomplete
        // onChangeText={() => {this.setState({results: (<View></View>) })}}
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        // renderDescription={(row) => row.terms[0].value} // display street only
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log('data', data);
          console.log('details', details);
          // this.setState({
          //   currentAddress: details.name + ', Neighborhood: ' + details.address_components[2].short_name
          // });
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
                            marginBottom={0}
                            style={{marginTop: 1}}
                          />
                        </View>
                     )
              });
            });
          }


          this.setState({
            results:
            (
                <View style={{marginLeft: 20, marginRight: 15}}>
                  <Card
                    onPress={() => console.log('card pressed')}
                    title={'Location'}
                    src={'http://searchengineland.com/figz/wp-content/seloads/2014/08/local-search-map-pin-ss-1920-800x450.jpg'}
                    link={currentLocation}
                    radius={5}
                    marginBottom={0}
                    style={{marginTop: 1}}
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
              // marginLeft: 1,
              // marginRight: 1,
              // borderRadius: 3,
            backgroundColor: '#fafafa',
            borderTopColor: '#fcfcfc',
            borderBottomColor: '#fcfcfc',
            bottom: 15,
            // borderTopWidth: 0.1,
            // borderBottomWidth: 0.1,
          },
          textInput: {
            // marginLeft: 0,
            // marginRight: 0,
            // height: 50,
            // color: '#000',
            fontSize: 13,
            // fontStyle: 'italic',
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

          <View>
            {this.state.results}
         </View>
      <View style={[styles.card2, { backgroundColor: '#fff' }]}>
          <Text style={styles.title}>Save Location</Text>
          <Kohana
            style={{ backgroundColor: '#f7f7f7' }}
            label={'Name'}
            iconClass={FontAwesome}
            iconName={'circle-o-notch'}
            iconColor={'#f4d29a'}
            labelStyle={{ color: '#626262'}}
            inputStyle={{ color: '#000', fontSize: 14}}
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
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Button
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

/*
            <Button onPress={() => { this.props.navigator.push(Router.getRoute('home'))}}style={{backgroundColor: '#fcfcfc', top: 7, left: (Dimensions.get('window').width * 0.3), height: 35, width: 100, borderRadius: 2, borderColor: '#d3d3d3', shadowColor: '#000000', shadowRadius: 0.05, shadowOpacity: 0.6, shadowOffset: {height: 1, width: 2}}} textStyle={{fontSize: 10, fontWeight: 'bold'}}>
            SUBMIT
            </Button>
            */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: '#008ae6'
  },
  //   content: {
  //   // not cool but good enough to make all inputs visible when keyboard is active
  //   paddingBottom: 300,
  // },
  // card1: {
  //   paddingVertical: 16,
  // },
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

// <View>
//         <TouchableHighlight onPress={ () => this.searchPressed() }>
//         <Text>Fetch</Text>
//         </TouchableHighlight>
//         </View>
//         <View>
//         <Text>Count: {this.props.AppState.recipeCount}</Text>
//         <Text style={styles.title}>Search Location</Text>
//         </View>