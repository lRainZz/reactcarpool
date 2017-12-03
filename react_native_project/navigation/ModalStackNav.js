// external modules

import React from 'react';

import { StackNavigator } from 'react-navigation';


// own modules

import DrawNav from './DrawNav';

import LoginScreen from '../screens/LoginScreen';

import AddFillingsStack from '../screens/fillingsModules/AddFillingsStack';

import CreateCarpoolStack from '../screens/myCarpoolModues/CreateCarpoolStack';


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
    },
    CreateCarpool: {
      screen: CreateCarpoolStack
    }
  },
  {
    headerMode: 'screen'
  }
)

export default ModalStackNav;