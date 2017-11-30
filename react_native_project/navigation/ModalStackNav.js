// external modules

import React from 'react';

import { StackNavigator } from 'react-navigation';


// own modules

import DrawNav from './DrawNav';

import LoginScreen from '../screens/LoginScreen';

import AddFillingsStack from '../screens/AddFillingsStack';


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
      screen: AddFillingsStack
    }
  },
  {
    headerMode: 'screen'
  }
)

export default ModalStackNav;