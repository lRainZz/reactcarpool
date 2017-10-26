// external modules

import React from 'react';

import { DrawerNavigator } from 'react-navigation';


// own modules

import HomeScreen from '../screens/HomeScreen';

import OptionsScreen from '../screens/OptionsScreen';

import CarpoolsScreen from '../screens/CarpoolsScreen';

import SideBar from './SideBar';


// class

const DrawNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Carpools: {
      screen: CarpoolsScreen
    },
    Options: {
      screen: OptionsScreen
    }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

export default DrawNav;