// external modules:

import React from 'react';

import { DrawerNavigator } from 'react-navigation';

import { Constants } from 'expo';

import { StyleSheet, View } from 'react-native';


// own modules:

import HomeScreen from './HomeScreen';

import OptionsScreen from './OptionsScreen';

import SideBar from './SideBar';


// class:

// Main management class
class CarpoolApp extends React.Component {
  render () {
    return (
      // main view with status bar escape and main app navigation
      <View style= {{flex: 1}}>
        <View style = {styles.statusBarEscapeAndroid} />
        <DrawNav />
      </View>
    );
  }
}

// top level navigation
const DrawNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
      drawerLabel: 'Home'
    },
    Options: {
      screen: OptionsScreen,
      drawerLabel: 'Options'
    }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const styles = StyleSheet.create({
  statusBarEscapeAndroid: {
    height: Constants.statusBarHeight,
    backgroundColor: '#1976D2',
  }
});

export default CarpoolApp;