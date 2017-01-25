import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  AlertIOS,
} from 'react-native';
import { Avatar, ArticleText, Divider, Button } from 'react-native-uikit';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Router from '../navigation/Router';
import styles from '../stylesheets/DetailStyles.js';

class MatchDetails extends React.Component {
  static route = {
    navigationBar: {
      title: (<Text></Text>),
      backgroundColor: '#25272A',
    },
  }

  componentWillMount() {
    console.log('will', this.props)
  }

  addMatch() {
    var that = this;
    this.props.postUserMatch(this.props.route.params.currUserId, this.props.route.params.matchUserId)
    .then(function() {
      AlertIOS.alert('Success', 'Your match has been added!');
      that.props.navigator.replace(Router.getRoute('matches'));
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        >
        <View style={styles.mainView}>
          <Text style={styles.matchText}>YOU'VE MATCHED WITH SOMEONE!</Text>
        </View>
        <View style={styles.secondView}>
          <View style={styles.thirdView}>
            <Avatar
              src={this.props.route.params.currUserImg}
              size={(Dimensions.get('window').width * 0.36)}
              circle={true}
            />
            <Text style={styles.userName}>{this.props.route.params.currUserName}</Text>
          </View>
          <View style={styles.fourthView}>
            <Avatar
              src={this.props.route.params.image}
              size={(Dimensions.get('window').width * 0.36)}
              circle={true}
            />
            <Text style={styles.userName2}>{this.props.route.params.name}</Text>
          </View>
        </View>

           <View style={styles.box}>
           <Divider
            color={'#eee'}
          />
          <ArticleText
            username={this.props.route.params.name}
            text={this.props.route.params.status}
            style={styles.status}
          />
          <Divider
            color={'#eee'}
          />
          </View>
          <View style={styles.matchView}>
          <Button
            color={'#fff'}
            onPress={() => this.addMatch()}
            backgroundColor={'#26a69a'}
            style={styles.accept}
            radius={5}>
            Accept
          </Button>
          <Button
            color={'#fff'}
            onPress={() => this.props.navigator.replace(Router.getRoute('matches'))}
            backgroundColor={'#25272A'}
            style={styles.reject}
            radius={5}>
            Reject
          </Button>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MatchDetails);