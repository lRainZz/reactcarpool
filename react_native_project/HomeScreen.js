// external modules:

import React from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';


// own modules:

import Header from './ApplicationHeader';


// class:

class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Home'  
        />
        {/* do some homescreen things*/}
      </Container>
    );
  }
}

export default  HomeScreen;