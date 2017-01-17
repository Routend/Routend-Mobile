import React from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

export default class PrivateMessage extends React.Component {
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
    this.state.roomId = [this.state.userId, this.state.otherUser].sort(function(a, b) {
      return a-b;
    }).join('-');
    // client side, setup socket io client and room with id 1-2
    // this.socket = SocketIOClient('http://localhost:3000');
    // jsonp false to fix debug issues
    this.socket = SocketIOClient('http://localhost:3000', {jsonp: false});
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
     }
   }

  render() {
    var user = { _id: this.state.userId || -1 };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});