import React from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

export default class PrivateMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      userId: 2
    };
    // this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    // client side, setup socket io client and room with id 1-2
    // this.socket = SocketIOClient('http://localhost:3000');
    this.socket = SocketIOClient('http://localhost:3000', {jsonp: false});
    this.socket.emit('join', {id: '1-2'});
    // listen to message event for received messages.
    this.socket.on('message', this.onReceivedMessage);
    // this.determineUser();
  }

  onReceivedMessage(messages) {
    console.log('message received', messages);
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */

  onSend(messages=[]) {
    this.socket.emit('message', messages[0]);
    // this.socket.emit('message', {id: '1-2'}, messages[0]);
    // this.socket.to('1-2').emit('message', messages[0]);
    this._storeMessages(messages);
  }

  static route = {
    navigationBar: {
      visible: true,
      title: (<Text style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>CHANNING TATUM</Text>),
      backgroundColor: '#175785'
    },
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

  _storeMessages(messages) {
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