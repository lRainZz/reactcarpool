// external modules

import React from 'react';

import { StackNavigator } from 'react-navigation';


// own modules

import DrawNav from './DrawNav';

import LoginScreen from '../screens/LoginScreen';

import AddFillingsStack from '../screens/fillingsModules/AddFillingsStack';

import CreateCarpoolStack from '../screens/myCarpoolModues/CreateCarpoolStack';

import InviteMemberStack from '../screens/carpoolMemeberModules/InviteMemberStack'


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
      screen: AddFillingsStack,
      navigationOptions : {
        title: '  ADD FILLING',
        headerStyle: {
          backgroundColor: '#1976D2'
        },
        headerTitleStyle: {
          color: '#fff',
          alignSelf: 'center'
        },
        headerLeft: null
      }     
    },
    CreateCarpool: {
      screen: CreateCarpoolStack,
      navigationOptions: {
        title: '  CREATE CARPOOL',
        headerStyle: {
          backgroundColor: '#1976D2'
        },
        headerTitleStyle: {
          color: '#fff',
          alignSelf: 'center'
        },
        headerLeft: null
      }
    },
    InviteMember: {
      screen: InviteMemberStack,
      navigationOptions: {
        title: '  INVITE MEMBER',
        headerStyle: {
          backgroundColor: '#1976D2'
        },
        headerTitleStyle: {
          color: '#fff',
          alignSelf: 'center'
        },
        headerLeft: null
      }
    }
  },
  {
    headerMode: 'screen'
  }
)

export default ModalStackNav;