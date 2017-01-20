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

const users = [
 {
    name: 'Gym - 1.5 Hours',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Home - 10 Hours',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Work - 8 Hours',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Restaurants - 2 Hours',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
 {
    name: 'Total Hours - 21.5 Hours',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 },
]

class LogScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentWillMount() {
  //   console.log('log screen', this.props);
  // }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>STATISTICS</Text>),
      backgroundColor: '#175785',
    },
  }

  render() {

    return (
      <ScrollView>
        <View style={{justifyContent: 'center', alignItems: 'center', top: 5}}>
          <View style={{justifyContent: 'center', top: 5, alignItems: 'center', flexDirection: 'row', width: 195, height: 40, borderRadius: 3, backgroundColor: '#fff', borderColor: '#D8D8D8', borderWidth: 1, shadowColor: '#D8D8D8',shadowRadius: 0.03, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 1, },}}>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Logs</Text>
              <Text style={{color: "#D8D8D8"}}>   |   </Text>
              <TouchableOpacity onPress={() => { this.props.navigator.push(Router.getRoute('stats')) }}>
              <Text style={{fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>Graphs</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container} >

          <Text style={styles.chart_title}>Time Spent Today</Text>

          <Divider
            color={'#eee'}
          />
          <View></View>
          <Card
          title='Gym'
          image={{uri: 'https://vrhotels.co.nz/quadrant-hotels-suites/wp-content/uploads/sites/2/2014/05/Gym.jpg'}}>
          <Text style={{marginBottom: 10}}>
            You spent 1 hour at the Gym
          </Text>
        </Card>
          <Card
          title='Work'
          image={{uri: 'http://e2b-consulting.com/wp-content/uploads/2015/03/business_6349227Lge.jpg'}}>
          <Text style={{marginBottom: 10}}>
            You spent 7.4 hours at Work
          </Text>
        </Card>
          <Card
          title='Restaurants'
          image={{uri: 'http://cosmopolitanaprts.com/wp-content/uploads/2016/01/restaurant-939435_960_720.jpg'}}>
          <Text style={{marginBottom: 10}}>
            You spent 2 hours at Restaurants
          </Text>
        </Card>
          <Card
          title='SUMMARY'>
          {
          users.map((u, i) => {
          return (
            <ListItem
              key={i}
              roundAvatar
              title={u.name}
              hideChevron={true}
              leftIcon={{name: 'cloud-queue'}}
              />
              )
            })
          }
        </Card>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'whitesmoke',
    marginTop: 10,
  },
  chart_title : {
    justifyContent: 'center',
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 14,
    backgroundColor:'white',
    color: '#404d5b',
    opacity: 0.8,
    fontWeight:'bold',
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    currLogs: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogScreen);