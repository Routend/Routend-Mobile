import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
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
      userId: 3,
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
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>Routend</Text>),
      backgroundColor: '#175785'
    },
  }

  componentWillMount() {
    var that = this;

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

    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 100,
      stationaryRadius: 25,
      distanceFilter: 40,
      stopTimeout: 1,
      debug: true, // <-- enable for debug sounds & notifications
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
      url: 'http://107.170.226.9:3000/coordinates?id_users=' + that.state.userId,
      autoSync: true,         // <-- POST each location immediately to server
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("- Start success");
        });
      }
    });

    // this.state.date = moment().format("YYYY-MM-DD");
    this.state.currentStart = moment(this.state.date + ' 00').unix();
    this.state.currentEnd = moment(this.state.date + ' 24').unix();
    var that = this;
    this._setPosition();
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
            BackgroundGeolocation.addGeofence({
                identifier: that.props.places[i].name,
                radius: 30,
                latitude: that.props.places[i].lat,
                longitude: that.props.places[i].lng,
                notifyOnEntry: true,
                notifyOnExit: true,
                notifyOnDwell: false,
                loiteringDelay: 30000,  // 30 seconds
            }, function() {
                console.log('Successfully added geofence -');
            }, function(error) {
                console.warn("Failed to add geofence", error);
            });
        }
        BackgroundGeolocation.getGeofences(function(geofences) {
            for (var n= 0,len=geofences.length;n<len;n++) {
                console.log("Geofence: ", geofences[n].identifier, geofences[n].radius, geofences[n].latitude, geofences[n].longitude);
            }
        });
        // that.props.fetchLocationMatches(that.state.userId)
        // .done(function() {
              that.setState({
                ready: true,
              });
              that.props.getCurrentUser(that.state.userId);
        // });
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
              {this.props.mLocations.map(marker =>
                <MapView.Marker
                  pinColor={'green'}
                  key={marker.id}
                  coordinate={({latitude: marker.lat, longitude: marker.lng})}
                  title={marker.name}
                  description={'Suggested: ' + marker.category}
                />
              )}

              <MapView.Polyline
              coordinates={this.state.test}
              strokeWidth={3}
              strokeColor={'#3299ff'}
              />
          </MapView.Animated>
          <View style={{flex: 1.2, position: 'absolute', zIndex: 1, top: (Dimensions.get('window').height * 0.686)}}>
            <View style={{justifyContent: 'center', flexDirection: 'row', backgroundColor: '#fcfcfc', width: (Dimensions.get('window').width * 0.92), height: (Dimensions.get('window').height * 0.10), borderRadius: 3, left: (Dimensions.get('window').width * 0.04), borderWidth: 0.8, borderColor: '#d3d3d3', opacity: 0.97, shadowRadius: 0.03, shadowOpacity: 0.2, shadowOffset: { width: 1, height: 1, }, }}>
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
                        fontSize: 13, color: '#404d5b', fontWeight: 'bold'
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
                  <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Track a Place</Text>
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
    mLocations: state.mLocations,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);