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
      CurrentDate = firebase.database.ServerValue.TIMESTAMP;
      firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
        key: UserCarpoolKEY,
        CarpoolKey: KEY,
        UserKey: GLOBALS.UserKey,
        Invite: '0',
        Join: '0',
        Creator: '1',
        Date: CurrentDate,
      });

      //Generate Files in global.js
      JSONExport_Carpool = {
        KEY: {
          key: KEY,
          MaxPlace: MaxPlace
        }
      }

      JSONExport_UserCarpools = {
        UserCarpoolKEY: {
          key: UserCarpoolKEY,
          CarpoolKey: KEY,
          UserKey: GLOBALS.UserKey,
          Invite: '0',
          Join: '0',
          Creator: '1',
          Date: CurrentDate
        }
      }

      JSONExport_Creator = {
        CarpoolKey: {

        }
      }
      //Set globals
      GLOBALS.Carpools = (GLOBALS.Carpools + JSONExport_Carpool);
      GLOBALS.UserCarpools = (GLOBALS.UserCarpools + JSONExport_UserCarpools);
      GLOBALS.Creator = (GLOBALS.Creator + JSONExport_Creator);
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
                CurrentDate = firebase.database.ServerValue.TIMESTAMP;
                firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
                  key: UserCarpoolKEY,
                  CarpoolKey: CarpoolKey,
                  UserKey: InviteKEY,
                  Invite: '1',
                  Join: '0',
                  Creator: '0',
                  Date: CurrentDate,
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

  joinCarpool = async (CarpoolKey) => 
  {
    try
    {
      var isInvitable = true;
      //Check if Carpool exists
      await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
      .then((snapshot) =>
      {
        if (snapshot.val()){
          // Get a key for a new UserCarpool.
          UserCarpoolKEY = firebase.database().ref().push().key;
          CurrentDate = firebase.database.ServerValue.TIMESTAMP;
          firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
            key: UserCarpoolKEY,
            CarpoolKey: CarpoolKey,
            UserKey: GLOBALS.UserKey,
            Invite: '0',
            Join: '1',
            Creator: '0',
            Date: CurrentDate,
          });          
        }else{
          console.log('This Carpool does not exist.');
        }
      });
    }catch(error)
    {
      console.error(error);
    }
  }

  checkForInvite = async () => 
  {
    try
    {
      //Check if Carpool exists
      await firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
      .then((snapshot) =>
      {
        snapshot.forEach(async function(childSnapshot) {
          if (childSnapshot.child('Invite').val() == '1'){
            CarpoolKey = snapshot.child(childSnapshot.key).child("CarpoolKey").val();
            UserCarpoolKey = childSnapshot.key;
            //Get Creator
            await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
            .then((snapshot2) =>
            {
              snapshot2.forEach(async function(childSnapshot2) {
                if (childSnapshot2.child('Creator').val() == '1'){
                  CreatorKey = snapshot2.child(childSnapshot2.key).child("UserKey").val();
                  //Get Name of Creator
                  await firebase.database().ref('/Users/' + CreatorKey).once('value')
                  .then((snapshot3) =>
                  {
                    let Fullname = snapshot3.val().FullName
                    console.log(Fullname + ' has invited you.');



                    // YES - NO Frage:
                    let AcceptInvite = true; // oder false bei Einladungsablehnung
                    if (AcceptInvite){                      
                      firebase.database().ref('UserCarpools/' + UserCarpoolKey).update({
                        Invite: '0'
                      });
                    }else{
                      firebase.database().ref('UserCarpools').child(UserCarpoolKey).remove();
                    }



                  });
                }
              });
            });
          }
        });
      });      
    }catch(error)
    {
      
    }
  }

  CheckForJoin = async () => 
  {
    try
    {
      let CarpoolArray = [];
      let InviteArray = [];
      let counter = 1;
      GLOBALS.Creator.forEach(function(element) {
        CarpoolArray[counter] = element.key;
        counter = counter + 1;
      });
      //Check if Carpool exists
      CarpoolArray.forEach(async function(CarpoolElement) {
        await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolElement.key).once('value')
        .then((snapshot) =>
        {
          let InviteCounter = 1;
          snapshot.forEach(function(childSnapshot) {
            if (childSnapshot.child('Join').val() == '1'){
              InviteArray[InviteCounter] = childSnapshot;
              InviteCounter = InviteCounter + 1;
            }
          });
        });
      });
      
      console.log(InviteArray[0]);
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

  checkForPlace = async () => 
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
          onPress={this.inviteToCarpool.bind(this,'Test1'/*Email von dem Einzuladenden*/, '-KytZuneengE6c24VYlB'/*CarpoolKey von dem Carpool in den der Benutzer eingeladen werden soll*/)}
          title="Invite someone to carpool"
          color="green"
        />
        <Button
          onPress={this.joinCarpool.bind(this, '-KytZuneengE6c24VYlB'/*CarpoolKey von dem Carpool dem der Benutzer joinen will*/)}
          title="Ask to join Carpool"
          color="green"
        />
        <Button
          onPress={this.checkForInvite.bind(this)}
          title="Check for invite"
          color="orange"
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
        <Button
          onPress={this.checkForPlace.bind(this)}
          title="Check if Carpool has a place left"
          color="red"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;