// external modules

import React from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';


//own modules

import Header from '../ApplicationHeader';


// class

class CapoolsScreen extends React.Component {
  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Carpools'  
        />
        <Text>Carpools go here</Text>
      </Container>
    );
  }
}

export default CapoolsScreen;