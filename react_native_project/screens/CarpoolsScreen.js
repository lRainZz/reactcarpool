// external modules

import React from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';


//own modules

import Header from '../ApplicationHeader';

import TabNavCarpool from '../navigation/TabNavCarpool'


// class

class CapoolsScreen extends React.Component {
  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Carpools'  
        />
        <TabNavCarpool screenProps={{rootNavigation: this.props.screenProps.rootNavigation}}/>
      </Container>
    );
  }
}

export default CapoolsScreen;