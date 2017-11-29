// external modules

import React from 'react';

import { StackNavigator } from 'react-navigation';


// debug
import { View, Text } from 'react-native';

import DebugScreen from '../screens/DebugScreen';
// debug end

// own modules

import DrawNav from './DrawNav';

import LoginScreen from '../screens/LoginScreen';

// class

const ModalStackNav = StackNavigator (
  {
    Application: {
      screen: ({navigation}) => <DrawNav screenProps={{rootNavigation: navigation}}/>,
      navigationOptions: {
        header: null
      }
    },
    AddFillings: {
      screen: DebugScreen
    }
  },
  {
    headerMode: 'screen'
  }
)

export default ModalStackNav;