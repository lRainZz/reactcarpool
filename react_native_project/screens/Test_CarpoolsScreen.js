// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

const GLOBALS = require('../globals');

import moment from 'moment';

//own modules

import Header from '../ApplicationHeader';
import { stringify } from 'querystring';


class Test_CarpoolScreen extends React.Component { 

  getCarpools = async () =>
  {
    try
    {
      let Export = [];

      let CarpoolKey;
      let CarpoolName;
      let MaxPlace;

      await firebase.database().ref().child('Carpools').once('value')
      .then(async (CarpoolList) =>
      {
        Promise.all(CarpoolList.forEach(async (CarpoolListItem) => // CarpoolList
        {
          CarpoolKey = CarpoolListItem.child('key').val();
          CarpoolName = CarpoolListItem.child('CarpoolName').val();
          MaxPlace = CarpoolListItem.child('MaxPlace').val();

          const FreePlace = await this.getFreePlace(CarpoolKey, MaxPlace); // vor getExportObject();

          const CreatorObject = await this.getCreator(CarpoolKey); // vor getExportObject();

          const ExportObject = await this.getExportobject(CreatorObject, CarpoolKey, CarpoolName, FreePlace); // nach  getFreePlace(); und getCreator();

          Export.push(ExportObject); // nach getExportObject();
        })).then(
          response =>
          {
            return Export;
          }
        );
      });
    }catch(error)
    {
      console.log(error.message);
    }
  }

  getCreator = (CarpoolKey) => // die funzt einwandfrei
  {
    try
    {
      firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
      .then((UserCarpoolList) =>
      {
        UserCarpoolList.forEach((UserCarpoolListItem) => 
        {
          if (UserCarpoolListItem.child('Creator').val() == '1')
          {
            let UserKey = UserCarpoolListItem.child('UserKey').val();
            firebase.database().ref('/Users/' + UserKey).once('value')
            .then((User) =>
            {
              let CreatorObject = {};
              CreatorObject.CreatorKey = UserKey;
              CreatorObject.CreatorName = User.val().FullName;
              return CreatorObject;
            });
          }
        });
      });
    }catch(error){
      console.log(error.message);
    }
  }

  getFreePlace = (CarpoolKey, MaxPlace) => // die funzt einwandfrei
  {
    try
    {
      firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
      .then((UserCarpoolList) =>
      {
        let CurrentPlaceTaken = 0;
        Promise.all(UserCarpoolList.forEach((UserCarpoolListItem) =>
        {
          CurrentPlaceTaken++;
        })).then(
          response =>
          {
            let FreePlace = (MaxPlace - CurrentPlaceTaken);
            return FreePlace;
          }
        );
      });
    }catch(error){
      console.log(error.message);
    }
  }

  getExportobject = (CreatorObject, CarpoolKey, CarpoolName, FreePlace) => //triggert leider momentan zur selben zeit wie die oberen zwei Funktionen
  {
    try
    {
      let ExportObject = {};
      ExportObject.CarpoolKey = CarpoolKey;
      ExportObject.CarpoolName = CarpoolName;
      ExportObject.CreatorKey = CreatorObject.CreatorKey;
      ExportObject.CreatorName = CreatorObject.CreatorName;
      ExportObject.FreePlace = FreePlace;
      console.log('Export: FreePlace: ' + ExportObject.FreePlace);
      console.log('Export: Creator: ' + ExportObject.CreatorName);
      console.log('Export: Carpool: ' + ExportObject.CarpoolName);
      return ExportObject;
    }catch(error){
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
          onPress={() => this.getCarpools()}
          title="Get Carpools"
          color="orange"
        />
      </Container>
    );
  }
}

export default Test_CarpoolScreen;