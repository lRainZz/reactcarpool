// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

const GLOBALS = require('../globals');

//own modules

import Header from '../ApplicationHeader';


// class

//Firebase by User-------------------------------------------------------------
// await firebase.database().ref('/Options/' + GLOBALS.UserKey).once('value')
// .then((snapshot) =>
// {
//    if (snap.val()){

//    }else{

//    }
// });
//------------------------------------------------------------------------------

//Firebase by Email-------------------------------------------------------------
// await firebase.database().ref().child('Users').orderByChild('Email').equalTo(email).once('value')
// .then((snapshot) =>
// {
//    if (snap.val()){

//    }else{

//    }
// });
//------------------------------------------------------------------------------

//Firebase set------------------------------------------------------------------
// firebase.database().ref('Users/' + KEY).set({
//   key: KEY,
//   Password: password
// });
//------------------------------------------------------------------------------

//Firebase update------------------------------------------------------------------
// firebase.database().ref('Options/' + GLOBALS.UserKey).update({
//   UseImperialUnits: value
// });
//------------------------------------------------------------------------------

class FirebaseScreen extends React.Component { 
  
  createNewCarpool = async (MaxPlace) => 
  {
    try
    {      
      // Get a key for a new Carpool.
      KEY = firebase.database().ref().push().key;
      firebase.database().ref('Carpools/' + KEY).set({
        key: KEY,
        MaxPlace: MaxPlace
      });
      
      // Get a key for a new UserCarpool.
      UserCarpoolKEY = firebase.database().ref().push().key;
      firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
        key: UserCarpoolKEY,
        CarpoolKey: KEY,
        UserKey: GLOBALS.UserKey,
        Invite: '0',
        Active: '1'
      });
    }catch(error)
    {
      console.error(error);
    }
  }

  inviteToCarpool = async (InviteEmail, CarpoolKey) => 
  {
    try
    {
      var isInvitable = true;
      //Check if User exists
      await firebase.database().ref().child('Users').orderByChild('Email').equalTo(InviteEmail).once('value')
      .then((snapshot) =>
      {
        if (snapshot.val()){
          snapshot.forEach(function(childSnapshot) {
            var InviteKEY = childSnapshot.key;
            //Check for all Users in Carpool
            firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
            .then((snapshot2) =>
            {
              snapshot2.forEach(function(childSnapshot2) {
                if (InviteKEY == childSnapshot2.child('UserKey').val()){
                  isInvitable = false;
                }
              })
              if (isInvitable){
                // Get a key for a new UserCarpool.
                UserCarpoolKEY = firebase.database().ref().push().key;
                firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
                  key: UserCarpoolKEY,
                  CarpoolKey: CarpoolKey,
                  UserKey: InviteKEY,
                  Invite: '1',
                  Active: '0'
                });
              }else{
                console.log('User is already in the Carpool');
              }
            });
          });
        }else{
          console.log('Email does not belong to a existing User!');          
        }
      });
    }catch(error)
    {
      console.error(error);
    }
  }

  joinCarpool = async () => 
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  checkForInvite = async () => 
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  CheckForJoin = async () => 
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  acceptInvite = async () => 
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  acceptJoin = async () => 
  {
    try
    {
      alert('Test successfull!');
    }catch(error)
    {
      
    }
  }

  deleteCarpool = async () => 
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
          onPress={this.createNewCarpool.bind(this, '4'/*max. Sitzplatzanzahl*/)}
          title="Create new Carpool"
          color="green"
        />
        <Button
          onPress={this.inviteToCarpool.bind(this,'Test1'/*Email von dem Einzuladenden*/, '-Kyolr1zp76cECXMhepV'/*CarpoolKey von dem Carpool in den der Benutzer eingeladen werden soll*/)}
          title="Invite someone to carpool"
          color="orange"
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