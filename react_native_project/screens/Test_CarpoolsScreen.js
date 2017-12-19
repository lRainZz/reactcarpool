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

  getCarpools = () =>
  {
    try
    {
      let Export = [];

      let CarpoolKey;
      let CarpoolName;
      let MaxPlace;

      firebase.database().ref().child('Carpools').once('value')
      .then((CarpoolList) =>
      {
        Promise.all(CarpoolList.forEach(async (CarpoolListItem) =>
        {
          CarpoolKey = CarpoolListItem.child('key').val();
          CarpoolName = CarpoolListItem.child('CarpoolName').val();
          MaxPlace = CarpoolListItem.child('MaxPlace').val();

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

                        let ExportObject = {};
                        ExportObject.CarpoolKey = CarpoolKey;
                        ExportObject.CarpoolName = CarpoolName;
                        ExportObject.CreatorKey = CreatorObject.CreatorKey;
                        ExportObject.CreatorName = CreatorObject.CreatorName;
                        ExportObject.FreePlace = FreePlace;
                        console.log(ExportObject);
                        Export.push(ExportObject);
                      }
                    );
                  });
                });
              }
            });
          });
        }));
      }).then(
        response =>
        {
          console.log(Export);
          return Export;
        }        
      );
    }catch(error)
    {
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