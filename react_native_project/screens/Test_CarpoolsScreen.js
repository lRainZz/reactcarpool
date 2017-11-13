// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

//own modules

import Header from '../ApplicationHeader';


// class

class FirebaseScreen extends React.Component { 
  
  doSomething(value)
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Test_Carpools'  
        />
        <Button
          onPress={this.doSomething.bind(this, 'test')}
          title="Do something!"
          color="green"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;