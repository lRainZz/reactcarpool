// external modules:

import React from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';

import { TabNavigator } from 'react-navigation';


// own modules:

import Header from '../ApplicationHeader';

import TabNav from '../navigation/TabNavHome';


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
      </Container>
    );
  }
}

export default  HomeScreen;