// external modules

import React from 'react';

import { Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import { TabNavigator, StackNavigator, Text } from 'react-navigation';


// own modules

import MyCarpoolsScreen from '../screens/MyCarpoolsScreen';

import AvailableCarpoolsScreen from '../screens/AvailableCarpoolsScreen';


// class

const TabNavCarpool = TabNavigator (
    {
      MyCarpools: {
        screen: MyCarpoolsScreen,
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
      AvailableCarpools: {
        screen: AvailableCarpoolsScreen,
        navigationOptions: {
          tabBarIcon: 
          <Icon 
            type='material'
            color='white'
            size={40}
            name='group-add'
            // name='public'
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
  
  
  export default TabNavCarpool;