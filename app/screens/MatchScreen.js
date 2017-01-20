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

class MatchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 2,
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
    console.log('will mount', this.props)
    var that = this;
    // this.props.fetchLocationMatches(this.state.userId)
    // .then(function() {
      that.props.fetchMatchSuggestions(that.state.userId)
      .then(function() {
        console.log('mUsers', that.props)
                that.setState({
                ready: true,
              })
          // })
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
        <Text style={{left: (Dimensions.get('window').width * 0.03), top: (Dimensions.get('window').width * 0.02), fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>NEW MATCHES</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center', top: (Dimensions.get('window').width * 0.04)}}>
        {
            this.props.mUsers.map((l, i) => (
            <View key={i} style={{padding: 5, justifyContent: 'center', alignItems: 'center'}}>
              <Avatar
                src={l.image}
                size={(Dimensions.get('window').width * 0.21)}
                circle={true}
                onPress={() => { this.props.navigator.push(Router.getRoute('matchdetails', {name: (l.first_name + ' ' + l.last_name.substr(0, 1) + '.'), status: l.status, image: l.image, currUserName: this.props.currUser.first_name, currUserImg: this.props.currUser.image}))}}
              />
              <Text style={{fontSize: 12, fontWeight: 'bold', opacity: 0.8}}>{l.first_name}</Text>
            </View>
            ))
        }
        </View>
        <View style={{top: (Dimensions.get('window').width * 0.05)}}>
        <Text style={{left: (Dimensions.get('window').width * 0.03), top: (Dimensions.get('window').width * 0.005), fontSize: 13, color: '#404d5b', fontWeight: 'bold'}}>ACTIVITY SUGGESTIONS</Text>
        {
            this.props.mLocations.map((l, i) => (
            <View key={i} style={{padding: (Dimensions.get('window').width * 0.03)}}>
              <ReviewCell
                title={l.name}
                description={l.address}
                src={(l.image || 'http://assets.nydailynews.com/polopoly_fs/1.1369168.1370966034!/img/httpImage/image.jpg_gen/derivatives/article_750/transformers.jpg')}
                onPress={() => { this.props.navigator.push(Router.getRoute('locationdetails', {placeId: l.placeId})) }}
                rating={0}
                outOf={0}
              />
              <RatingBox rating={l.rating} outOf={5} style={{position: 'absolute', bottom: (Dimensions.get('window').height * 0.01), left: (Dimensions.get('window').width * 0.025)}}/>
            </View>
            ))
          }
        </View>
      </ScrollView>
    );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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