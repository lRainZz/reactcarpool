// external modules:

import React from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';

import { TabNavigator } from 'react-navigation';


// own modules:

import Header from '../ApplicationHeader';

import TabNav from '../navigation/TabNav';


// class:

class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Home'  
        />

        <TabNav />
        {/* 
          TabNav for displaying carpools: 
          | Fillings | Statistics | Members | 

            Fillings - list of fillings with: odometer, tripmeter, price, quantity, fuel sort, driven days
                     - possibilty to note if members did only 3 of 4 trips etc.
                     - information who has paid, who hasn't

            Statistics - show price trend, trip distance trend, fuel consumption trend etc. (may base for archievements)

            Members - Overview of the current carpool members: name, picture, email etc.
        */}
      </Container>
    );
  }
}

export default  HomeScreen;