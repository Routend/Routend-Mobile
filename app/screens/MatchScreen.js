import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import { Avatar, ReviewCell, RatingBox } from 'react-native-uikit';
import Router from '../navigation/Router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import styles from '../stylesheets/MatchStyles.js';

class MatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: global.id,
      ready: false,
    }
  }

  static route = {
    navigationBar: {
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>SOCIAL</Text>),
      backgroundColor: '#175785',
    },
  }

  componentWillMount() {
    var that = this;
    this.props.fetchLocationMatches(this.state.userId)
    .then(function() {
      that.props.fetchMatchSuggestions(that.state.userId)
      .then(function() {
        var counter = 0;
        var profiles = [];
        for(var i = 0; i < that.props.mUsers.length; i++) {
          fetch(`http://107.170.226.9:3000/profiles?id_users=${that.props.mUsers[i][1]}`)
          .then((resp) => resp.json())
          .then(resp => {
            counter++;
            if (resp[0] !== undefined) {
              profiles.push(resp[0]);
            }
            if (counter === that.props.mUsers.length) {
              that.state.totalMatches = profiles;
                that.setState({
                ready: true,
              })
            }
          })
        }
      })
    })
  }

  render() {
    if (this.state.ready === false) {
      return (
        <View></View>
      )
    } else {
      return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text style={styles.newMatch}>NEW MATCHES</Text>
        <View style={styles.mainView}>
        {
            this.state.totalMatches.map((l, i) => (
            <View key={i} style={styles.matches}>
              <Avatar
                src={l.image}
                size={(Dimensions.get('window').width * 0.21)}
                circle={true}
                onPress={() => { this.props.navigator.replace(Router.getRoute('matchdetails', {name: (l.first_name + ' ' + l.last_name.substr(0, 1) + '.'), status: l.status, image: l.image, currUserName: this.props.currUser.first_name, currUserId: this.props.currUser.id_users, currUserImg: this.props.currUser.image, matchUserId: l.id_users}))}}
              />
              <Text style={styles.firstName}>{l.first_name}</Text>
            </View>
            ))
        }
        </View>
        <View style={styles.locationMatch}>
        <Text style={styles.activityText}>ACTIVITY SUGGESTIONS</Text>
        {
            this.props.mLocations.map((l, i) => (
            <View key={i} style={styles.location}>
              <ReviewCell
                title={l.name}
                description={l.address}
                src={(l.image || 'https://techpur.com/wp-content/plugins/facebook-share-like-popup-viralplus/default.jpg')}
                onPress={() => { this.props.navigator.replace(Router.getRoute('locationdetails', {placeId: l.placeId, currUserId: this.props.currUser.id_users})) }}
                rating={0}
                outOf={0}
              />
              <RatingBox rating={l.rating} outOf={5} style={styles.locationStar}/>
            </View>
            ))
          }
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
    mLocations: state.mLocations,
    mUsers: state.mUserDetails,
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchScreen);