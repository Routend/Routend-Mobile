import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Router from '../navigation/Router';
import { Divider } from 'react-native-uikit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Card, ListItem } from 'react-native-elements';
import styles from '../stylesheets/LogStyles.js';
import moment from 'moment';

class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      ready: false,
    }
  }

  componentWillMount() {
    this.state.catImages = {
      Gym: 'https://vrhotels.co.nz/quadrant-hotels-suites/wp-content/uploads/sites/2/2014/05/Gym.jpg',
      Work: 'http://www.r-partnerslawfirm.com/IMG/arton11.jpg',
      Restaurants: 'http://cosmopolitanaprts.com/wp-content/uploads/2016/01/restaurant-939435_960_720.jpg',
      'Night Life': 'http://mogujatosama.rs/sites/default/files/images/Fashion-Forward-Fridays_med(1).jpg',
      School: 'http://pacioli.crw.it/images/iacf1.jpg',
      Home: 'https://home-security-systems.bestreviews.net/files/happy-family-home.jpg',
      Mall: 'http://www.trbimg.com/img-55d66cc8/turbine/la-fi-century-city-mall-20150821'
    }
    var that = this;
    this.props.getUserStats(this.state.userId)
    .then(function() {
      that.state.totalHours = 0;
      for (var i = 0; i < that.props.currLogs.length; i++) {
        that.state.totalHours = that.state.totalHours + that.props.currLogs[i].time_spent;
      }
      that.setState({
        ready: true
      })
    })
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>STATISTICS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {
    if (this.state.ready === false) {
      return (
        <View></View>
      )
    } else {
    return (
      <ScrollView>
        <View style={styles.mainView}>
          <View style={styles.bar}>
              <Text style={styles.log}>Logs</Text>
              <Text style={styles.divider}>   |   </Text>
              <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('stats')) }}>
              <Text style={styles.graph}>Graphs</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container} >

          <Text style={styles.chart_title}>Time Spent Today</Text>

          <Divider
            color={'#eee'}
          />
          <View></View>
        {
          this.props.currLogs.map((l, i) => {
          return (
            <Card
              key={i}
              title={l.category}
              image={{uri: this.state.catImages[l.category]}}>
              <Text style={styles.logText}>
                You spent {(new Date(l.time_spent * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]} Hours at {l.category}
              </Text>
            </Card>
              )
            })
          }
          <Card
          title='SUMMARY'>
          {
          this.props.currLogs.map((u, i) => {
          return (
            <ListItem
              key={i}
              roundAvatar
              title={((u.category + ' - ' + (new Date(u.time_spent * 1000)).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0]) + ' Hours')}
              hideChevron={true}
              leftIcon={{name: 'access-time'}}
              />
              )
            })
          }
          <ListItem
            title={'Total Hours Spent - ' + (this.state.totalHours / 3600)}
            hideChevron={true}
            leftIcon={{name: 'favorite'}}
            />
        </Card>
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
    currLogs: state.userStats
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogScreen);