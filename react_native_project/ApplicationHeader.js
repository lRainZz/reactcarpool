// external modules.

import React from 'react';

import { View, StyleSheet, Text, Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import { Button } from 'native-base';


// own modules:


// class:

export default class ApplicationHeader extends React.Component {
  render () {
    return (
      <View style={styles.head}>
        <Button
          transparent
          onPress={() => this.props.onHeadButtonPress()}
        >
          <Icon
            type='material'
            color='white'
            size={40}
            name='menu'
          />
        </Button>
        <Text
          style={styles.title}
        >{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: {
    height: 60,
    padding: 10,
    backgroundColor: '#1976D2',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    paddingLeft: 20,
    fontSize: 30,
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  } 
});