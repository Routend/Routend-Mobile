import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import Router from '../navigation/Router';
import { withNavigation } from '@exponent/ex-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

class PrivateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: 2,
      userName: 'D Beast',
      otherUser: this.props.route.params.idSender,
      otherName: this.props.route.params.name,
    };
    // this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this.storeMessages = this.storeMessages.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    console.log('did mount', this.props);
    this.state.roomId = [this.state.userId, this.state.otherUser].sort(function(a, b) {
      return a-b;
    }).join('-');
    // client side, setup socket io client and room with id 1-2
    // this.socket = SocketIOClient('http://localhost:3000');
    // jsonp false to fix debug issues
    this.socket = SocketIOClient('http://138.197.202.196:3000', {jsonp: false});
    this.socket.emit('join', {id: this.state.roomId});
    // listen to message event for received messages.
    this.socket.on('message', this.onReceivedMessage);
    // this.determineUser();
  }

  componentWillUnmount() {
    this.socket.removeListener('message');
  }

  onReceivedMessage(messages) {
    this.storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */

  onSend(messages=[]) {
    messages[0].roomId = this.state.roomId;
    messages[0].otherName = this.state.otherName;
    messages[0].otherId = this.state.otherUser;
    messages[0].currName = this.state.userName;
    this.socket.emit('message', messages[0]);
    // this.socket.emit('message', {id: '1-2'}, messages[0]);
    // this.socket.to('1-2').emit('message', messages[0]);
    this.storeMessages(messages);
  }

   static route = {
     navigationBar: {
       title(params) {
         return (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>{params.name.toUpperCase()}</Text>);
       },
       backgroundColor: '#25272A',
       renderLeft() {
        return (<NavigationBackButton />);
       }
     }
   }

  render() {
    var user = { _id: (this.state.userId || -1), name: (this.props.currUser.first_name + ' ' + this.props.currUser.last_name), avatar: this.props.currUser.image };

    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
    );
  }

  storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}

@withNavigation class NavigationBackButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.navigator.replace(Router.getRoute('messages'))}>
        <Image
          style={{left: (Dimensions.get('window').width * 0.03), top: (Dimensions.get('window').height * 0.023), width: (Dimensions.get('window').width * 0.04), height: (Dimensions.get('window').height * 0.02)}}
          source={require('../../node_modules/@exponent/ex-navigation/src/ExNavigationAssets').backIcon}
        />
      </TouchableOpacity>
    );
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
    currUser: state.currentUserDetails[state.currentUserDetails.length - 1],
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateMessage);