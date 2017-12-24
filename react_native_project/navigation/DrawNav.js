// external modules

import React from 'react';

import { DrawerNavigator } from 'react-navigation';


// own modules

import HomeScreen from '../screens/HomeScreen';

import OptionsScreen from '../screens/OptionsScreen';

import CarpoolsScreen from '../screens/CarpoolsScreen';

import CarpoolFunctions from '../screens/CarpoolFunctions';

import InvitesScreen from '../screens/InvitesScreen'

import SideBar from './SideBar';


// class

const DrawNav = DrawerNavigator(
  {
    Home: {
      screen:({screenProps, navigation}) => 
        <HomeScreen 
          screenProps={{rootNavigation: screenProps.rootNavigation}} 
          navigation={navigation} 
        />
    },
    Carpools: {
      screen: ({screenProps, navigation}) => 
        <CarpoolsScreen 
          screenProps={{rootNavigation: screenProps.rootNavigation}} 
          navigation={navigation}  
        />
    },
    Invites: {
      screen: InvitesScreen
    },
    Options: {
      screen: OptionsScreen
    },
    Test_Carpools: {
      screen: CarpoolFunctions
    }
  },
  {
    contentComponent: props => <SideBar {...props} />,
    // debug:
    initialRouteName: 'Home'
  }
);

export default DrawNav;