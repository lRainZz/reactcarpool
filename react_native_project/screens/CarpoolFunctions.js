// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

const GLOBALS = require('../globals');

import moment from 'moment';

import sha256 from 'sha256';

//own modules

import Header from '../ApplicationHeader';

import { stringify } from 'querystring';


class CarpoolFunctions extends React.Component { 

  _getNewId = () => {
    let Time = (new Date).getTime();
    let Id = sha256(String((Math.round(Math.random() * 1000000) + Time))); //generates Key from random value and epoche timestamp
    return Id 
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
          UserCarpoolKEY = this._getNewId();
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

  checkForInvOrJoin = async (InvOrJoin) => 
  {
    try
    {
      let Export = [];
      let MaxCounter = 0;
      let Counter = 0;
      //Check if Carpool exists

      firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
      .then((snapshot) =>
      {
        Promise.all(snapshot.forEach((childSnapshot) => {
          if (childSnapshot.child(InvOrJoin).val() == '1'){
            MaxCounter++;
          }
        })).then(
          response =>
          {
            firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
            .then((snapshot) =>
            {
              snapshot.forEach((childSnapshot) => {
                if (childSnapshot.child(InvOrJoin).val() == '1'){
                  CarpoolKey = snapshot.child(childSnapshot.key).child("CarpoolKey").val();
                  UserCarpoolKey = childSnapshot.key;
                  CurrentDate = snapshot.child(childSnapshot.key).child("Date").val();
                  //Get Creator
                  firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
                  .then((snapshot2) =>
                  {
                    snapshot2.forEach((childSnapshot2) => {
                      if (childSnapshot2.child('Creator').val() == '1'){
                        CreatorKey = snapshot2.child(childSnapshot2.key).child("UserKey").val();
                        //Get Name of Creator
                        firebase.database().ref('/Users/' + CreatorKey).once('value')
                        .then((snapshot3) =>
                        {
                          let Fullname = snapshot3.val().FullName;
                          firebase.database().ref('/Carpools/' + CarpoolKey).once('value')
                          .then((snapshot4) =>
                          {
                            let CarpoolName = snapshot4.val().CarpoolName;
                            //let MaxPlace = snapshot4.val().MaxPlace;
                            //console.log(Fullname + ' from Carpool "' + CarpoolName + '" has invited you.');

                            let CarpoolObject = {};
                            CarpoolObject.CarpoolKey = CarpoolKey;
                            CarpoolObject.CarpoolName = CarpoolName;
                            CarpoolObject.Fullname = Fullname;
                            CarpoolObject.UserCarpoolKey = UserCarpoolKey;
                            CarpoolObject.Date = CurrentDate;

                            Counter++;
                            Export.push(CarpoolObject);
                            if(Counter == MaxCounter)
                            {
                              console.log(Export);
                              return Export;
                            }
                          });
                        });
                      }
                    });
                  });
                }
              });
            });
          }
        );
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

  _compareFillings = async () => {
    try
    {
      let FirebaseIds = [];
      let GlobalIds = [];
      firebase.database().ref().child('Fillings').once('value')
      .then((FillingList) => {
        Promise.all(FillingList.forEach((FillingListItem) => {
          let Id = FillingListItem.child('Id').val();
          FirebaseIds.push(Id);
        })).then(
          response => {
            let GlobalsObject = {};
            let Filling = {};
            let FillingId;

            GlobalsObject = GLOBALS.Fillings;
            let GlobalsArray = Object.entries(GlobalsObject);

            GlobalsArray.forEach(FillingArray => {
              Filling = FillingArray[1];
              FillingId = Filling.id;
              if (FirebaseIds.indexOf(FillingId) !== '-1'){
                // Add Filling to Firebase
                firebase.database().ref('Fillings/' + FillingId).set({
                  id: FillingId,
                  CarpoolKey: Filling.CarpoolKey,
                  tripmeter: Filling.tripmeter,
                  consumption: Filling.consumption,
                  fuelPrice: Filling.fuelPrice,
                  drivenDays: Filling.drivenDays,
                  date: Filling.date,
                });
              }
            });
          }
        );
      });      
    } catch(error) {
      console.log(error.message);
    }
  }
//---------------------------------------------------------------------------------------------------------------------------

  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Test_Carpools'  
        />
        <Button
          onPress={this.joinCarpool.bind(this, '-L-vet94Duh-qAQgxdwo'/*CarpoolKey von dem Carpool dem der Benutzer joinen will*/)}
          title="Ask to join Carpool"
          color="green"
        />
        <Button
          onPress={this.checkForInvOrJoin.bind(this, 'Invite')}
          title="Check for invite"
          color="orange"
        />
        <Button
          onPress={this.checkForPlace.bind(this, '-L-vet94Duh-qAQgxdwo'/*CarpoolKey von dem die verfügbaren Plätze rausgesucht werden sollen*/)}
          title="Check if Carpool has a place left"
          color="green"
        />
        <Button
          onPress={this._compareFillings.bind(this)}
          title="Add missing Fillings"
          color="orange"
        />
      </Container>
    );
  }
}

export default CarpoolFunctions;