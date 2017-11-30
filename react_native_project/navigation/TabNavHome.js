// external modules

import React from 'react';

import { Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import { TabNavigator, StackNavigator, Text } from 'react-navigation';


// own modules

import FillingsScreen from '../screens/FillingsScreen';

import StatisticsScreen from '../screens/StatisticsScreen';

import MembersScreen from '../screens/MembersScreen';


// class

const TabNavHome = TabNavigator (
  {
    Fillings: {
      screen: ({screenProps}) => <FillingsScreen screenProps={{rootNavigation: screenProps.rootNavigation}}/>,
      navigationOptions: {
        tabBarIcon: 
        <Icon 
          type='material'
          color='white'
          size={40}
          name='local-gas-station'
        />
      }
    },
    Members: {
      screen: MembersScreen,
      navigationOptions: {
        tabBarIcon: 
        <Icon 
          type='material'
          color='white'
          size={40}
          name='group'
        />
      }
    },
    Statistics: {
      screen: StatisticsScreen,
      navigationOptions: {
        tabBarIcon: 
        <Icon 
          type='material'
          color='white'
          size={40}
          name='trending-up'
        />
      }
    }
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: false,
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: '#1976D2'
      },
      iconStyle: {
        width: 40,
        height: 40
      }
    }
  }
);


export default TabNavHome;