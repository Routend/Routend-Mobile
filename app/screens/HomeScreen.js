import React from 'react';
// import Exponent from 'exponent';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

// import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Router from '../navigation/Router';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import MapView from 'react-native-maps';
import BackgroundGeolocation from "react-native-background-geolocation";
var moment = require('moment');

// (<Image style={{height: 30, width: 100}} source={{uri: 'http://servicevirtualization.com/wp-content/uploads/2015/09/testing_graphic.jpg'}}></Image>)

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment().format("YYYY-MM-DD"),
      today: moment().format("YYYY-MM-DD"),
      currentStart: 0,
      currentEnd: 0,
      userId: global.id,
      position: '',
      ready: false,
      tracked: [],
      test: [],
      currentPosition: {
              latitude: 0,
              longitude: 0,
              latitudeDelta: 0,
              longitudeDelta: 0,
            },
    }
  }
  static route = {
    navigationBar: {
      visible: true,
      title: (<Text style={{color: 'white', fontSize: 15}}>Routend</Text>),
      backgroundColor: '#175785'
    },
  }

  componentWillMount() {

    console.log(this.props.navigator);

    BackgroundGeolocation.on('location', function(location) {
      console.log('- Location changed test: ', location);
    });

    BackgroundGeolocation.on("geofence", function(geofence) {
      console.log('geofence', geofence);
      fetch('http://posttestserver.com/post.php?dir=yisusfence', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(geofence)
      })
      .then((response) => response)
        .then((data) => {
          console.log('post data', data);
        })
        .catch((error) => {
          console.warn(error);
        }).done();
    });

    // Now configure the plugin.
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 40,
      // Activity Recognition
      stopTimeout: 1,
      // Application config
      debug: true, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      // HTTP / SQLite config
      url: 'http://posttestserver.com/post.php?dir=yisuslocation',
      autoSync: true,         // <-- POST each location immediately to server
      // params: {               // <-- Optional HTTP params
      //   "auth_token": "maybe_your_server_authenticates_via_token_YES?"
      // }
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });

    BackgroundGeolocation.addGeofence({
        identifier: "Home",
        radius: 50,
        latitude: 37.7966940,
        longitude: -122.3980750,
        notifyOnEntry: true,
        notifyOnExit: true,
        notifyOnDwell: false,
        loiteringDelay: 30000,  // 30 seconds
    }, function() {
        console.log("Successfully added geofence - 440 davis court");
    }, function(error) {
        console.warn("Failed to add geofence", error);
    });

    BackgroundGeolocation.addGeofence({
        identifier: "Powell Bart",
        radius: 50,
        latitude: 37.784406,
        longitude: -122.408331,
        notifyOnEntry: true,
        notifyOnExit: true,
        notifyOnDwell: false,
        loiteringDelay: 30000,  // 30 seconds
    }, function() {
        console.log("Successfully added geofence - Powell bart");
    }, function(error) {
        console.warn("Failed to add geofence", error);
    });

    BackgroundGeolocation.addGeofence({
        identifier: "Hack Reactor",
        radius: 50,
        latitude: 37.783692,
        longitude: -122.408967,
        notifyOnEntry: true,
        notifyOnExit: true,
        notifyOnDwell: false,
        loiteringDelay: 30000,  // 30 seconds
    }, function() {
        console.log("Successfully added geofence - Hack Reactor");
    }, function(error) {
        console.warn("Failed to add geofence", error);
    });

    BackgroundGeolocation.addGeofence({
        identifier: "BOA Fin",
        radius: 50,
        latitude: 37.793686,
        longitude: -122.397602,
        notifyOnEntry: true,
        notifyOnExit: true,
        notifyOnDwell: false,
        loiteringDelay: 30000,  // 30 seconds
    }, function() {
        console.log("Successfully added geofence - BOA Fin");
    }, function(error) {
        console.warn("Failed to add geofence", error);
    });

    BackgroundGeolocation.addGeofence({
        identifier: "Bird Park",
        radius: 50,
        latitude: 37.795364,
        longitude: -122.397957,
        notifyOnEntry: true,
        notifyOnExit: true,
        notifyOnDwell: false,
        loiteringDelay: 30000,  // 30 seconds
    }, function() {
        console.log("Successfully added geofence - Bird Park corner");
    }, function(error) {
        console.warn("Failed to add geofence", error);
    });

    BackgroundGeolocation.getGeofences(function(geofences) {
        for (var n= 0,len=geofences.length;n<len;n++) {
            console.log("Geofence: ", geofences[n].identifier, geofences[n].radius, geofences[n].latitude, geofences[n].longitude);
        }
    });

    // BackgroundGeolocation.watchPosition(function(location) {
    //     console.log("- Watch position: ", location);
    // }, function(errorCode) {
    //     alert('An location error occurred: ' + errorCode);
    // }, {
    //     locationUpdateInterval: 5000    // <-- retrieve a location every 5s.
    // });

    // this.state.date = moment().format("YYYY-MM-DD");
    this.state.currentStart = moment(this.state.date + ' 00').unix();
    this.state.currentEnd = moment(this.state.date + ' 24').unix();
    var that = this;
    this._setPosition();
    // use for testing purpose
    // this.state.currentStart = 0;
    // this.state.currentEnd = 1483947200;
    // delete states above later
    this.props.fetchCoord(this.state.userId, this.state.currentStart, this.state.currentEnd)
    .done(function() {
      that.currentData = [];
      for (var i = 0; i < that.props.lines.length; i++) {
        that.currentData.push({id: i, coordinates: {latitude: that.props.lines[i].lat, longitude: that.props.lines[i].lng}})
      }
      that.state.test = that.currentData.map(function(item) {
      return item.coordinates;
      });
      // console.log('that.test', that.test)
      that.props.fetchPlaces(that.state.userId).done(function() {
        // that.state.tracked = [];
        for (var i = 0; i < that.props.places.length; i++) {
          that.state.tracked.push({id: that.props.places[i].id, name: that.props.places[i].name, category: that.props.places[i].category, coordinates: {latitude: that.props.places[i].lat, longitude: that.props.places[i].lng}});
        }
        that.setState({
          ready: true,
        });
        // console.log('that.tracked', that.tracked)
      })
    });

  }

  setCurrentPosition(position) {
    this.setState({
            currentPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }
        });
  }

  // componentDidMount() {
  //   setInterval(this._setPosition.bind(this), 5000);
  // }

  _setPosition() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
        this.setCurrentPosition(position);
    }, (error) => {
        alert(error)
    }, {timeout: 20000, maximumAge: 1000});
  }

  render() {
    var that = this;
    if (this.state.ready === false) {
      return (
        <View></View>
        )
    } else {
      return (
        <View style={{flex: 1, backgroundColor: '#f6f6f6'}}>
          <View style={{flex: 10}}>
            <MapView.Animated
                showsUserLocation={true}

                style={{flex: 13, zIndex: 0}}
                initialRegion={this.state.currentPosition}
                // followsUserLocation={true}
                showsCompass={true}
                >

              {this.state.tracked.map(marker =>
                <MapView.Marker
                  key={marker.id}
                  coordinate={marker.coordinates}
                  title={marker.name}
                  description={'Category: ' + marker.category}
                />
              )}

              <MapView.Polyline
              coordinates={this.state.test}
              strokeWidth={3}
              strokeColor={'#b2b2ff'}
              />
          </MapView.Animated>
          <View style={{flex: 1.2, position: 'absolute', zIndex: 1, top: (Dimensions.get('window').height * 0.686)}}>
            <View style={{justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fcfcfc', width: (Dimensions.get('window').width * 0.92), height: (Dimensions.get('window').height * 0.10), borderRadius: 2, left: (Dimensions.get('window').width * 0.04), borderWidth: 0.8, borderColor: '#d3d3d3', opacity: 0.97}}>
                <DatePicker
                    style={{height: 2000, width: 118, right: 8, top: (Dimensions.get('window').height * 0.015)}}
                    date={this.state.date}
                    mode="date"
                    placeholder="select date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate={this.state.today}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 8.3,
                        marginLeft: 0,
                        height: 23,
                      },
                      dateInput: {
                        marginLeft: 32,
                        borderWidth: 0,
                        height: 25
                      },
                      dateText: {
                        fontSize: 12
                      }
                    }}
                    onDateChange={(date) => {
                      var that = this;
                      var startDate = moment(date + ' 00').unix();
                      var endDate = moment(date + ' 24').unix();
                      console.log('startDate', startDate, 'endDate', endDate);
                      this.state.date = date;
                      this.props.fetchCoord(this.state.userId, startDate, endDate)
                      .done(function() {
                        that.currentData = [];
                        for (var i = 0; i < that.props.lines.length; i++) {
                          that.currentData.push({id: i, coordinates: {latitude: that.props.lines[i].lat, longitude: that.props.lines[i].lng}})
                        }
                        var line = that.currentData.map(function(item) {
                        return item.coordinates;
                        });
                        // that.state.test = that.currentData.map(function(item) {
                        // return item.coordinates;
                        // });
                        console.log('new coordinates for datepicker change', line);
                        that.setState({
                          test: line});
                        // console.log('that.test', that.test)
                        that.props.fetchPlaces(that.state.userId).done(function() {
                          that.state.tracked = [];
                          for (var i = 0; i < that.props.places.length; i++) {
                            that.state.tracked.push({id: that.props.places[i].id, name: that.props.places[i].name, category: that.props.places[i].category, coordinates: {latitude: that.props.places[i].lat, longitude: that.props.places[i].lng}});
                            // that.forceUpdate();
                          }
                          // that.setState({
                          //   ready: true,
                          // });
                        });
                      });
                    }}
                />
                <View style={{top: (Dimensions.get('window').height * 0.026)}}>
                <Text style={{fontSize: 20, fontWeight: '100',color: '#545454'}}> | </Text>
                </View>
                <View style={{top: (Dimensions.get('window').height * 0.035), left: (Dimensions.get('window').width * 0.035), height: 25, width: 100}}>
                <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('tracklocation')) }}>
                  <Text style={{fontSize: 12}}>Track a Place</Text>
                  </TouchableOpacity>
                </View>
              </View>
           </View>
        </View>
      </View>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    polylines: state.today,
    lines: state.testCount,
    places: state.trackedPlaces,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);