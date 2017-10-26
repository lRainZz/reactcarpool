// external modules

import React from 'react';

import { TabNavigator } from 'react-navigation';


// own modules

import FillingsScreen from '../screens/FillingsScreen';

import StatisticsScreen from '../screens/StatisticsScreen';

import MembersScreen from '../screens/MembersScreen';


// class

const TabNav = TabNavigator (
  {
    Fillings: {
      screen: FillingsScreen
    },
    Statistics: {
      screen: StatisticsScreen
    },
    Memebers: {
      screen: MembersScreen
    }
  },
  {

  }
);

export default TabNav;