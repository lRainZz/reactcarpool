// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

//own modules

import Header from '../ApplicationHeader';


// class

class FirebaseScreen extends React.Component { 
  
  createNewCarpool()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  inviteToCarpool()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  joinCarpool()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  checkForInvite()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  CheckForJoin()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  acceptInvite()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  acceptJoin()
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  deleteCarpool()
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
        <Text backgroundColor="red">
          Red: Not implemented
        </Text>
        <Text backgroundColor="orange">
          Orange: Work in progress
        </Text>
        <Text backgroundColor="green">
          Green: Finished
        </Text>

        <Button
          onPress={this.createNewCarpool.bind(this)}
          title="Create new Carpool"
          color="orange"
        />
        <Button
          onPress={this.inviteToCarpool.bind(this)}
          title="Invite someone to carpool"
          color="red"
        />
        <Button
          onPress={this.joinCarpool.bind(this)}
          title="Ask to join Carpool"
          color="red"
        />
        <Button
          onPress={this.checkForInvite.bind(this)}
          title="Check for invite"
          color="red"
        />
        <Button
          onPress={this.CheckForJoin.bind(this)}
          title="Check for join intention"
          color="red"
        />
        <Button
          onPress={this.acceptInvite.bind(this)}
          title="Accept invite"
          color="red"
        />
        <Button
          onPress={this.acceptJoin.bind(this)}
          title="Accept join"
          color="red"
        />
        <Button
          onPress={this.deleteCarpool.bind(this)}
          title="Delete Carpool"
          color="red"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;