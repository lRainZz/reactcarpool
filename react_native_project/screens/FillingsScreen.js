// external modules

import React from 'react';

import {AsyncStorage, Button, Text } from 'react-native';
import { Container, Content, List, ListItem, Body, Right } from 'native-base';


//own modules


// class

class FillingsScreen extends React.Component {
  render () {
    return (
      <Container>
        <Text>Fillings go here</Text>

        <Button
          onPress=
          {
            () => 
            {
              AsyncStorage.setItem('imperialState', 'test');
            }
          }
          title="Set"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <Button
          onPress=
          {
            () => 
            {
            alert(await AsyncStorage.getItem('imperialState'));
            }
          }
          title="Get"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </Container>
    );
  }
}

export default FillingsScreen;