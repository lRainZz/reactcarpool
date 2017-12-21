// external modules

import React from 'react';

import { View, Text, StyleSheet, Platform, ScrollView, FlatList } from 'react-native'

import Toast from 'react-native-simple-toast'

import * as firebase from 'firebase';


// own modules

import AvailableCarpool from './availableCarpoolsModules/AvailableCarpool'

import CarpoolFunctions from './CarpoolFunctions'

// class

class AvailableCarpoolsScreen extends React.Component {
  state = {
    carpoolsArray: null 
    // // debug:
    // [
    //   {
    //     CarpoolKey:  '0',
    //     FreePlace:   2,
    //     CarpoolName: 'I\'m a carpool',
    //     CreatorKey:  '',
    //     CreatorName: ''
    //   },
    // ]
  }

  getCarpools = async () => {
    try
    {
      let CarpoolMax = 0;
      let CarpoolCounter = 0;
      let Export = [];

      let CarpoolKey;
      let CarpoolName;
      let MaxPlace;

      firebase.database().ref().child('Carpools').once('value')
      .then((CarpoolList1) => {
        Promise.all(CarpoolList1.forEach((CarpoolListItem1) => {
          CarpoolMax++;
        })).then(
          response => {
            firebase.database().ref().child('Carpools').once('value')
            .then((CarpoolList) => {
              Promise.all(CarpoolList.forEach((CarpoolListItem) => {
                CarpoolCounter++;
                CarpoolKey = CarpoolListItem.child('key').val();
                CarpoolName = CarpoolListItem.child('CarpoolName').val();
                MaxPlace = CarpoolListItem.child('MaxPlace').val();

                firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
                .then((UserCarpoolList) => {
                  UserCarpoolList.forEach((UserCarpoolListItem) => {
                    if (UserCarpoolListItem.child('Creator').val() == '1') {
                      let UserKey = UserCarpoolListItem.child('UserKey').val();
                      firebase.database().ref('/Users/' + UserKey).once('value')
                      .then((User) => {
                        let CreatorObject = {};
                        CreatorObject.CreatorKey = UserKey;
                        CreatorObject.CreatorName = User.val().FullName;
                        
                        firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
                        .then((UserCarpoolList) => {
                          let CurrentPlaceTaken = 0;
                          Promise.all(UserCarpoolList.forEach((UserCarpoolListItem) => {
                            CurrentPlaceTaken++;
                          })).then(
                            response => {
                              let FreePlace = (MaxPlace - CurrentPlaceTaken);

                              if(FreePlace > 0) {
                                let ExportObject = {};
                                ExportObject.CarpoolKey = CarpoolKey;
                                ExportObject.CarpoolName = CarpoolName;
                                ExportObject.CreatorKey = CreatorObject.CreatorKey;
                                ExportObject.CreatorName = CreatorObject.CreatorName;
                                ExportObject.FreePlace = FreePlace;
                                Export.push(ExportObject);

                                if (CarpoolCounter == CarpoolMax) {
                                  console.log('GetCarpools: ' + Export)
                                  // return Export
                                  this.setState({carpoolsArray: Export})
                                }
                              }                              
                            }
                          );
                        });
                      });
                    }
                  });
                });
              }));
            });
          });
      });      
    } catch(error) {
      console.log(error.message);
    }
  }

  async componentWillMount() {
    await this.getCarpools()
  }

  // implement pull down to refresh

  _sendJoinRequest = (carpool) => {
    // send join request

    Toast.show('A join request has been sent.', Toast.LONG)
  }
  
  render () {
    const carpoolsAvailable = (carpoolsArray !== null)
    const { carpoolsArray } = this.state
    const containerFlex = (carpoolsAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    return(
      <View
        style={[styles.container, containerFlex]}
      >

        {(!carpoolsAvailable) && (
          <View>
            <Text
              style={[styles.font, styles.emptyText]}
            >{'NO CARPOOLS IN HERE'}</Text>
            <Text
              style={[styles.font, styles.emptyText]}
            >{'MAYBE TRY RELOADING THE PAGE'}</Text>
          </View>
        )}

        {(carpoolsAvailable) && (
          <ScrollView>
            <FlatList
              data={carpoolsArray}
              extraData={this.state}
              keyExtractor={item => item.CarpoolKey}
              renderItem={({item}) => 
                <AvailableCarpool
                  carpool={item}
                  onJoinClick={(carpool) => this._sendJoinRequest(carpool)}
                />
              }
            />
          </ScrollView>
        )}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 30
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
})

export default AvailableCarpoolsScreen;