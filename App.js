import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import MapView, { PROVIDER_GOOGLE }  from 'react-native-maps'; // 0.19.0

import "prop-types"; // Supported builtin module

const styles = StyleSheet.create({
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});


export default class App extends Component {
  state = {
    messages: [],
  };
  
  renderCustomView = (props) => {
    if (props.currentMessage.location) {
      return (
        <View style={props.containerStyle}>
          <MapView
              provider={PROVIDER_GOOGLE}
              style={[styles.mapView]}
              region={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
            >
              <MapView.Marker
                coordinate={{
                latitude: props.currentMessage.location.latitude,
                longitude: props.currentMessage.location.longitude
                }}
              />
            </MapView>
        </View>
      );
    }
    return null
  }

  componentWillMount() {
    this.setState({ messages:  [
      // {
      //   _id: Math.round(Math.random() * 1000000),
      //   text: '#awesome',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: 'Developer',
      //   },
      // },
      {
        _id: Math.round(Math.random() * 1000000),
        text: '',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        image: 'https://i.imgur.com/agkAZoy.png',
        sent: true,
        received: true,
      },
      // {
      //   _id: Math.round(Math.random() * 1000000),
      //   text: 'Send me a picture!',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: 'Developer',
      //   },
      // },
      // {
      //   _id: Math.round(Math.random() * 1000000),
      //   text: '',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 2,
      //     name: 'React Native',
      //   },
      //   sent: true,
      //   received: true,
      //   location: {
      //     latitude: 48.864601,
      //     longitude: 2.398704
      //   },
      // },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Ok can you send me an image of what were looking at?',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Developer',
        },
      },
      {
        _id: Math.round(Math.random() * 1000000),
        text: 'Doctor I have an urgent request for patient Smith.',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
        },
        sent: true,
        received: true
      },
      // {
      //   _id: Math.round(Math.random() * 1000000),
      //   text: 'Doctor I have an urgent request for patient Smith.',
      //   createdAt: new Date(),
      //   user: {
      //     _id: 1,
      //     name: 'Developer',
      //   },
      // },
      {
        _id: Math.round(Math.random() * 1000000),
        text: "You are in a conversation with Nurse Ryan",
        createdAt: new Date(),
        system: true,
      },
    ]});
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
       messages={this.state.messages}
       onSend={(messages) => this.onSend(messages)}
       renderCustomView={this.renderCustomView}
       user={{
         _id: 1,
       }}
       parsePatterns={linkStyle => [
          {
            pattern: /#(\w+)/,
            style: { ...linkStyle, color: 'lightgreen' },
            onPress: props => alert(`press on ${props}`),
          },
        ]}
     />
    );
  }
}