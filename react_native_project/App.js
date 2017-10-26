// external modules:

import React from 'react';

import { Constants } from 'expo';

import { StyleSheet, View } from 'react-native';


// own modules:

import DrawNav from './navigation/DrawNav';


// class:

class CarpoolApp extends React.Component {
  render () {
    return (
      <View style= {{flex: 1}}>
        <View style = {styles.statusBarEscapeAndroid} />
        <DrawNav />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statusBarEscapeAndroid: {
    height: Constants.statusBarHeight,
    backgroundColor: '#1976D2',
  }
});

export default CarpoolApp;