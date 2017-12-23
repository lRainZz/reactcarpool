// external modules

import React from 'react';

import { AsyncStorage, ScrollView, FlatList, Text, Platform, StyleSheet } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';

import { NavigationActions } from 'react-navigation';

import sha256 from 'sha256';

import * as firebase from 'firebase';


// own modules

const GLOBALS = require('../globals')

import CarpoolItem from './myCarpoolModues/CarpoolItem'


// class

class MyCarpoolsScreen extends React.Component {
  state = {
    carpoolsArray: null,
    // [
    //   {
    //     id:     '0',
    //     member: '4',
    //     name:   'I\'m a carpool',
    //     icon:   ''
    //   },
    //   {
    //     id:     '1',
    //     member: '3',
    //     name:   'Nicest carpool EUW',
    //     icon:   ''
    //   }
    // ],
    editCarpool: null,
    activeCarpool: null,
    addCarpoolsVisible: false,
    fabVisible: true,

    inputCarpool: false,
    inputCarpoolObject: null
  }
  
  _carpoolIsActive = (id) => {
    let active = false;
    
    if (id == this.state.activeCarpool) {
      active = true
    }

    return active;
  }

  _setActiveCarpool = (id) => {
    GLOBALS.Options.ActiveCarpoolId = id
    console.log(GLOBALS.Options.ActiveCarpoolId)

    let Key = this._getNewId();

    firebase.database().ref().child('ActiveCarpool').orderByChild('UserKey').equalTo(GLOBALS.UserKey).once('value')
    .then((ActiveCarpoolSnapshot) =>
    {
      if (ActiveCarpoolSnapshot.val()){
        firebase.database().ref('ActiveCarpool/' + Key).update({
          CarpoolKey:  id
        });
      }else{
        firebase.database().ref('ActiveCarpool/' + Key).set({
          key:          Key,
          CarpoolKey:  id,
          UserKey:   GLOBALS.UserKey
        });
      }
    });    

    this.setState({activeCarpool: id})
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

  _getNewId = () => {
    let Time = (new Date).getTime();
    let Id = sha256(String((Math.round(Math.random() * 1000000) + Time))); //generates Key from random value and epoche timestamp
    return Id 
  }

  _deleteCarpool = (carpool, doDelete) => {
    
    if (doDelete) {
      this.deleteCarpool(carpool.CarpoolKey)
    } else {
      this.leaveCarpool(carpool.CarpoolKey)
    }

    let carpools = this.state.carpoolsArray
    let index    = carpools.indexOf(carpool)

    carpools.splice(index, 1)

    this.setState({carpoolsArray: carpools})
  }

  componentWillMount () {
    let allCarpoolsObject = Object.entries(GLOBALS.Carpools)
    let loadArray         = [];

    allCarpoolsObject.forEach(
        carpoolsArray => {
          carpool = carpoolsArray[1]
          loadArray.unshift(carpool)
        }
    )

    this.setState({
      activeCarpool: GLOBALS.Options.ActiveCarpoolId, 
      carpoolsArray: loadArray
    })
  }

  _updateCarpool = (updateCarpool) => {
    this.setState({editCarpool: updateCarpool, addCarpoolsVisible: true})
  }

  _asyncAddCarpool = async () => {
    await this._getInputCarpool();
    
    if (this.state.inputCarpool) {
      await this._getInputCarpoolObject();
      this._addCarpool(this.state.inputCarpoolObject)
    }
  }

  _getInputCarpool = async () => {
    let inputCarpool = await AsyncStorage.getItem('inputCarpool');
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputCarpool');
    // string to bool
    inputCarpool = (inputCarpool == 'true');
    this.setState({inputCarpool: inputCarpool})
  }

  _getInputCarpoolObject = async () => {
    let inputCarpoolObject = await AsyncStorage.getItem('inputCarpoolObject')
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputCarpoolObject');
    inputCarpoolObject = JSON.parse(inputCarpoolObject);
    this.setState({inputCarpoolObject: inputCarpoolObject})
  }

  _addCarpool = (carpoolObject) => {
    let carpools   = this.state.carpoolsArray

    // this works because fillings is an array starting at 0
    // object to be added gets a new id, one higher as the highest in fillings
    carpoolObject.id = carpools.length;
    carpools.push(carpoolObject);
    
    this.setState({carpoolsArray: carpools});
  }

  render () {
    const { carpoolsArray, fabVisible, addCarpoolsVisible, editCarpool } = this.state
    const carpoolsAvailable = (carpoolsArray !== null)
    const containerFlex = (carpoolsAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    return(
      <View
        style={[styles.container, containerFlex]}
      >

        {(!carpoolsAvailable) && (
          <Text
            style={[styles.font, styles.emptyText]}
          >{'NO CARPOOLS IN HERE'}</Text>
        )}

        {(carpoolsAvailable) && (
          <ScrollView>
            <FlatList
              data={carpoolsArray}
              extraData={this.state}
              keyExtractor={item => item.key}
              renderItem={({item}) => 
                <CarpoolItem 
                  carpool={item}
                  active={this._carpoolIsActive(item.key)}
                  onSetActive={(key) => this._setActiveCarpool(key)}
                  onDelete={(carpool, doDelete) => this._deleteCarpool(carpool, doDelete)}
                />
              }
            />
          </ScrollView>
        )}

        <Fab
          style={styles.fab}
          onPress={() => this.props.screenProps.rootNavigation.navigate('CreateCarpool', {
            onGoBack: () => this._asyncAddCarpool(),
          })}
          >
          <Icon
            name='add'
            color='white'
          />
        </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    backgroundColor: '#1976D2'
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

export default MyCarpoolsScreen;