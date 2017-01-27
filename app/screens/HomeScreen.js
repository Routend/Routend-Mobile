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
import styles from '../stylesheets/HomeStyles.js';
import moment from 'moment';

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
      title: (<Image style={{height: (Dimensions.get('window').width * 0.11), width: (Dimensions.get('window').width * 0.11)}} source={require('../assets/RoutendNav.png')}></Image>),
      backgroundColor: '#175785'
    },
  }

  componentWillMount() {
    var that = this;
    BackgroundGeolocation.on('location', function(location) {
    });
    BackgroundGeolocation.on("geofence", function(geofence) {
    });
    BackgroundGeolocation.configure({
      desiredAccuracy: 100,
      stationaryRadius: 25,
      distanceFilter: 40,
      stopTimeout: 1,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      url: 'http://107.170.226.9:3000/coordinates?id_users=' + that.state.userId,
      autoSync: true,
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
        });
      }
    });

    var that = this;
    this.state.currentStart = moment(this.state.date + ' 00').unix();
    this.state.currentEnd = moment(this.state.date + ' 24').unix();
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
      that.props.fetchPlaces(that.state.userId).done(function() {
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
                loiteringDelay: 30000,
            }, function() {
            }, function(error) {
            });
        }
        that.props.fetchLocationMatches(that.state.userId)
        .done(function() {
              that.setState({
                ready: true,
              });
              that.props.getCurrentUser(that.state.userId);
        });
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
        <View style={styles.mainView}>
          <View style={styles.topView}>
            <MapView.Animated
                showsUserLocation={true}
                style={styles.mapView}
                initialRegion={this.state.currentPosition}
                showsCompass={true}
                >
              {this.state.tracked.map(marker =>
                <MapView.Marker
                pinColor={'#939393'}
                  key={marker.id}
                  coordinate={marker.coordinates}
                  title={marker.name}
                  description={'Category: ' + marker.category}
                />
              )}
              {this.props.mLocations.map(marker =>
                <MapView.Marker
                  pinColor={'red'}
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
          <View style={styles.bar}>
            <View style={styles.barView}>
              <DatePicker
                style={styles.datePicker}
                date={this.state.date}
                mode="date"
                placeholder="Select Date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate={this.state.today}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={dateDetails}
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
                    that.setState({
                      test: line});
                    that.props.fetchPlaces(that.state.userId).done(function() {
                      that.state.tracked = [];
                      for (var i = 0; i < that.props.places.length; i++) {
                        that.state.tracked.push({id: that.props.places[i].id, name: that.props.places[i].name, category: that.props.places[i].category, coordinates: {latitude: that.props.places[i].lat, longitude: that.props.places[i].lng}});
                        }
                      });
                    });
                  }}
                />
                <View style={styles.barDivider}>
                  <Text style={styles.barText}> | </Text>
                </View>
                <View style={styles.trackView}>
                  <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('tracklocation')) }}>
                  <Text style={styles.trackText}>Track a Place</Text>
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

let dateDetails = {
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