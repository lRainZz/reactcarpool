// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

const GLOBALS = require('../globals');

import moment from 'moment';

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

class Test_CarpoolScreen extends React.Component { 
  
  createNewCarpool = async (CarpoolName, MaxPlace) => 
  {
    try
    {      
      // Get a key for a new Carpool.
      KEY = firebase.database().ref().push().key;
      firebase.database().ref('Carpools/' + KEY).set({
        key: KEY,
        CarpoolName: CarpoolName,
        MaxPlace: MaxPlace
      });
      
      // Get a key for a new UserCarpool.
      UserCarpoolKEY = firebase.database().ref().push().key;
      date = new Date();
      CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
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
          CarpoolKey: KEY
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
                date = new Date();
                CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
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
          date = new Date();
          CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
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
            CurrentDate = snapshot.child(childSnapshot.key).child("Date").val();
            //Get Creator
            await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
            .then((snapshot2) =>
            {
              snapshot2.forEach(async function(childSnapshot2) {
                if (childSnapshot2.child('Creator').val() == '1'){
                  CreatorKey = snapshot2.child(childSnapshot2.key).child("UserKey").val();
                  //Get Name of Creator
                  await firebase.database().ref('/Users/' + CreatorKey).once('value')
                  .then(async function(snapshot3) 
                  {
                      let Fullname = snapshot3.val().FullName;
                    await firebase.database().ref('/Carpools/' + CarpoolKey).once('value')
                    .then((snapshot4) =>
                    {
                      let CarpoolName = snapshot4.val().CarpoolName;
                      let MaxPlace = snapshot4.val().MaxPlace;
                      console.log(Fullname + ' from Carpool "' + CarpoolName + '" has invited you.');
  
  
                      // YES - NO Frage: 
                      let AcceptInvite = true; // oder false bei Einladungsablehnung
                      if (AcceptInvite){
                        firebase.database().ref('UserCarpools/' + UserCarpoolKey).update({
                          Invite: '0'
                        });
  
                        //Generate Files in global.js
                        //await firebase.database().ref().child('Carpools').orderByChild('key').equalTo(CarpoolKey).once('value')
                        // .then((snapshot5) =>
                        // {
                          // var CarpoolName = snapshot5.val().CarpoolName;
                          // var MaxPlace = snapshot5.val().MaxPlace;
  
                          JSONExport_Carpool = {
                            CarpoolKey: {
                              key: CarpoolKey,
                              CarpoolName: CarpoolName,
                              MaxPlace: MaxPlace
                            }
                          }
  
                          JSONExport_UserCarpools = {
                            UserCarpoolKey: {
                              key: UserCarpoolKey,
                              CarpoolKey: CarpoolKey,
                              UserKey: GLOBALS.UserKey,
                              Invite: '0',
                              Join: '0',
                              Creator: '0',
                              Date: CurrentDate
                            }
                          }
                        // });
                        
                        //Set globals
                        GLOBALS.Carpools = (GLOBALS.Carpools + JSONExport_Carpool);
                        GLOBALS.UserCarpools = (GLOBALS.UserCarpools + JSONExport_UserCarpools);
                      }else{
                        firebase.database().ref('UserCarpools').child(UserCarpoolKey).remove();
                      }
                      // Ende der YES-NO-Frage

                    });
                  });
                }
              });
            });
          }
        });
      });      
    }catch(error)
    {
      console.log(error);
    }
  }

  CheckForJoin = async () => 
  {
    try
    {
      await firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
      .then((snapshot) =>
      {
        let counter = 1;
        let CarpoolArray = [];
        let InviteArray = [];
        let InviteUserCarpoolArray = [];
        let InviteDateArray = [];
        snapshot.forEach(async function(childSnapshot) {
          if (childSnapshot.child('Creator').val() == '1'){
            CarpoolArray[counter] = childSnapshot.child('CarpoolKey').val()
            counter = counter +1;
          }
        });
        CarpoolArray.forEach(async function(CarpoolElement) {
          await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolElement).once('value')
          .then((snapshot1) =>
          {
            let InviteCounter = 1;
            snapshot1.forEach(function(childSnapshot1) {
              if (childSnapshot1.child('Join').val() == '1'){
                InviteArray[InviteCounter] = childSnapshot1.child('UserKey').val();
                InviteUserCarpoolArray[InviteCounter] = childSnapshot1.child('key').val();
                InviteDateArray[InviteCounter] = childSnapshot1.child('Date').val();
                InviteCounter = InviteCounter + 1;
              }
            });
            InviteCounter = 1;
            InviteArray.forEach(async function(InviteElement) {
              await firebase.database().ref().child('Users').orderByChild('key').equalTo(InviteElement).once('value')
              .then(async function(snapshot2) 
              {
                UserName = snapshot2.child(InviteElement).child("FullName").val();
                console.log(UserName + ' wants to join your Carpool');

                                     
                // YES - NO Frage:
                let AcceptJoin = true; // oder false bei Ablehnung
                UserCarpoolKey = InviteUserCarpoolArray[InviteCounter];
                CurrentDate = InviteDateArray[InviteCounter];
                if (AcceptJoin){
                  firebase.database().ref('UserCarpools/' + UserCarpoolKey).update({
                    Join: '0'
                  });

                  //Generate Files in global.js
                  await firebase.database().ref().child('Carpools').orderByChild('key').equalTo(CarpoolElement).once('value')
                  .then((snapshot4) =>
                  {
                    var CarpoolName = snapshot4.val().CarpoolName;

                    JSONExport_Carpool = {
                      CarpoolElement: {
                        key: CarpoolElement,
                        CarpoolName: CarpoolName,
                        MaxPlace: snapshot4.child(CarpoolElement).child("MaxPlace").val()
                      }
                    }

                    JSONExport_UserCarpools = {
                      UserCarpoolKey: {
                        key: UserCarpoolKey,
                        CarpoolKey: CarpoolElement,
                        UserKey: InviteElement,
                        Invite: '0',
                        Join: '0',
                        Creator: '0',
                        Date: CurrentDate
                      }
                    }
                  });
                  
                  //Set globals
                  GLOBALS.Carpools = (GLOBALS.Carpools + JSONExport_Carpool);
                  GLOBALS.UserCarpools = (GLOBALS.UserCarpools + JSONExport_UserCarpools);
                }else{
                  firebase.database().ref('UserCarpools').child(UserCarpoolKey).remove();
                }
              });
              InviteCounter = InviteCounter + 1;
            });
          });
        });
      });
    }catch(error)
    {
      console.log(error);
    }
  }

  checkForPlace = async (CarpoolKey) => 
  {
    try
    {
      await firebase.database().ref('/Carpools/' + CarpoolKey).once('value')
      .then(async function(snapshot)
      {        
        MaxPlace = snapshot.val().MaxPlace;
        CurrentPlaceTaken = 0;
        await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
        .then((snapshot1) =>
        {
          snapshot1.forEach((childSnapshot) => {
            CurrentPlaceTaken = CurrentPlaceTaken + 1;
          });
        });
        FreePlace = (MaxPlace - CurrentPlaceTaken);
        console.log('There are ' + FreePlace + ' place(s) left.');
      });      
    }catch(error)
    {
      console.log(error);
    }
  }
  
  leaveCarpool = async (CarpoolKey) => 
  {
    try
    {
      await firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
      .then((snapshot) =>
      {
        snapshot.forEach(async function(childSnapshot){
          if (childSnapshot.child('CarpoolKey').val() == CarpoolKey){
            if (childSnapshot.child('Creator').val() == '1'){
              let FirstDate = '0';
              let FirstUserCarpoolKey;
              await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
              .then((snapshot1) =>
              {
                snapshot1.forEach(childSnapshot1 => {
                  if (childSnapshot1.child('Creator').val() == '0'){
                    if (FirstDate == '0'){
                      FirstDate = childSnapshot1.child('Date').val();
                      FirstUserCarpoolKey = childSnapshot1.key;
                    }else{
                      if (childSnapshot1.child('Date').val() < FirstDate){
                        FirstDate = childSnapshot1.child('Date').val();
                        FirstUserCarpoolKey = childSnapshot1.key;
                      }
                    }
                  }
                });                
                firebase.database().ref('UserCarpools/' + FirstUserCarpoolKey).update({
                  Creator: '1'
                });
                firebase.database().ref('UserCarpools').child(childSnapshot.key).remove();
              });
            }else{
              firebase.database().ref('UserCarpools').child(childSnapshot.key).remove();
            }
          }
        });        
      });
    }catch(error)
    {
      console.log(error);
    }
  }

  deleteCarpool = async (CarpoolKey) => 
  {
    try
    {
      await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
      .then((snapshot) =>
      {
        snapshot.forEach(childSnapshot => {
          firebase.database().ref('UserCarpools').child(childSnapshot.key).remove();
        });
        firebase.database().ref('Carpools').child(CarpoolKey).remove();
      });
    }catch(error)
    {
      console.log(error);
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
          onPress={this.createNewCarpool.bind(this, 'CarpoolName'/*Name des Carpools*/,  '4'/*max. Sitzplatzanzahl*/)}
          title="Create new Carpool"
          color="green"
        />
        <Button
          onPress={this.inviteToCarpool.bind(this,'Test1'/*Email von dem Einzuladenden*/, '-L-164BY6hrEuOYDY-XN'/*CarpoolKey von dem Carpool in den der Benutzer eingeladen werden soll*/)}
          title="Invite someone to carpool"
          color="green"
        />
        <Button
          onPress={this.joinCarpool.bind(this, '-L-164BY6hrEuOYDY-XN'/*CarpoolKey von dem Carpool dem der Benutzer joinen will*/)}
          title="Ask to join Carpool"
          color="green"
        />
        <Button
          onPress={this.checkForInvite.bind(this)}
          title="Check for invite"
          color="green"
        />
        <Button
          onPress={this.CheckForJoin.bind(this)}
          title="Check for join intention"
          color="green"
        />
        <Button
          onPress={this.checkForPlace.bind(this, '-L-164BY6hrEuOYDY-XN'/*CarpoolKey von dem die verfügbaren Plätze rausgesucht werden sollen*/)}
          title="Check if Carpool has a place left"
          color="green"
        />
        <Button
          onPress={this.leaveCarpool.bind(this, '-L-164BY6hrEuOYDY-XN'/*CarpoolKey der verlassen werden soll*/)}
          title="Leave Carpool"
          color="green"
        />
        <Button
          onPress={this.deleteCarpool.bind(this, '-L-164BY6hrEuOYDY-XN'/*CarpoolKey der gelöscht werden soll*/)}
          title="Delete Carpool"
          color="green"
        />
      </Container>
    );
  }
}

export default Test_CarpoolScreen;