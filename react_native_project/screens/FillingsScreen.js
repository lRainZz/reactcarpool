// external modules

import React from 'react';

import { AsyncStorage, Button, Text, StyleSheet, ScrollView, Platform, FlatList, KeyboardAvoidingView } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';

import sha256 from 'sha256';

import * as firebase from 'firebase';


//own modules

import FillingsItem from './fillingsModules/FillingsItem';

const GLOBALS = require('../globals');


// class

class FillingsScreen extends React.Component { 
  state = {
    addFillingsVisible: false,
    fabVisible: true,

    editFilling: null,

    inputFilling: false,
    inputFillingObject: null,

    fillingsArray: null
      // [
      //   {  
      //     "id"         : 1,
      //     'tripmeter'  : 1000,
      //     'consumption': 7.0,
      //     'fuelPrice'  : 1.309,
      //     'drivenDays' : 4,
      //     'date'       : '08.01.2017'
      //   },
      //   {
      //     'id'         : 0,
      //     'tripmeter'  : 860,
      //     'consumption': 7.3,
      //     'fuelPrice'  : 1.309,
      //     'drivenDays' : 4,
      //     'date'       : '01.01.2017'
      //   }
      // ]
  }

  componentWillMount () {
    this._loadFillingsFromGlobals()
  }

  _loadFillingsFromGlobals = () => {
    console.log(GLOBALS.Fillings)
    let allFillingsObject = Object.entries(GLOBALS.Fillings)
    let loadArray         = [];
    let activeCarpool     = GLOBALS.Options.ActiveCarpoolId

    //console.log(GLOBALS.Fillings)

    allFillingsObject.forEach(
        fillingArray => {
          filling = fillingArray[1]
          //console.log(filling.CarpoolKey + ' : ' + activeCarpool)
          
          if (filling.CarpoolKey === activeCarpool) {
            loadArray.unshift(filling)
          }
        }
    )

    this.setState({fillingsArray: loadArray})
  }

  _getTotalPrice = (avgConsumption, tripLength, fuelPrice) => {
    let totalPrice = ((tripLength / 100) * avgConsumption * fuelPrice);

    return totalPrice.toFixed(2);
  }

  _asyncAddFilling = async() => {
    
    await this._getInputFilling();

    if (this.state.inputFilling) {
      await this._getInputFillingObject();
      this._addFilling(this.state.inputFillingObject)
    }
  }

  _getInputFilling = async() => {
    let inputFilling = await AsyncStorage.getItem('inputFilling');
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputFilling');
    // string to bool
    inputFilling = (inputFilling == 'true');
    this.setState({inputFilling: inputFilling})
  }

  _getInputFillingObject = async() => {
    let inputFillingObject = await AsyncStorage.getItem('inputFillingObject')
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputFillingObject');
    inputFillingObject = JSON.parse(inputFillingObject);
    this.setState({inputFillingObject: inputFillingObject})
  }

  _addFilling = (fillingObject) => {
    let fillings = this.state.fillingsArray
    let index = null
    let update = false

    // documentation disapproves use of for...in
    // for (var filling in fillings) {
    for (var i1 = 0; i1 < fillings.length; i1++) {  
      let currentFilling = fillings[i1]
      
      if ((currentFilling.id == fillingObject.id) && fillingObject.id != null) {
        index = fillings.indexOf(currentFilling)
        fillings[index] = fillingObject
        update = true
        console.log('update')
        console.log('Update Object: ' + fillingObject.id + ' list match: ' + currentFilling.id)
        break;
      }
    }
    
    if (!update) {
      fillingObject.id = this._getNewId();
      fillings.unshift(fillingObject);
    }

    let carpoolId = GLOBALS.Options.ActiveCarpoolId

    this._addOrUpdateFirebaseGlobals(carpoolId, fillingObject, update)

    this.setState({fillingsArray: fillings})
  }

  _deleteFilling = (filling) => {
    let fillings = this.state.fillingsArray
    let index    = fillings.indexOf(filling)

    fillings.splice(index, 1)

    this._removeFirebaseGlobals(filling.id)

    this.setState({fillingsArray: fillings})
  }

  _showAddFillings = async(updateFilling) => {
    let asyncUpdate       = false;
    let asyncUpdateObject = {};

    if (GLOBALS.Options.ActiveCarpoolId == null) {
      Toast.show('Please join or create a carpool first and set one as "active".')
    } else {

      // "!= null" not type of null
      if (updateFilling != null) {
        asyncUpdate       = true;
        asyncUpdateObject = updateFilling;
      } else {
        asyncUpdate = false;
      }

      try {
        await AsyncStorage.setItem('updateFilling', String(asyncUpdate));
        await AsyncStorage.setItem('updateFillingsObject', asyncUpdateObject == null ? '' : JSON.stringify(asyncUpdateObject));
        this.props.screenProps.rootNavigation.navigate('AddFillings', {
          onGoBack: () => this._asyncAddFilling(),
        });
      } catch (error) {
        console.log('ERR writing asyncUpdate: ' + error.message)
      }
    }
  }

// All Functions--------------------------------------------------------------------------------------
  _getNewId = () => {
    let Time = (new Date).getTime();
    let Id = sha256(String((Math.round(Math.random() * 1000000) + Time))); //generates Key from random value and epoche timestamp
    return Id 
  }

  _addOrUpdateFirebaseGlobals = async(CarpoolKey, Filling, update) => {
    let Connected
    
    for (tryCount = 0; tryCount <= 3; tryCount++) {
      firebase.database().ref().child('.info/connected').on('value', function(connectedSnap) {
        if (connectedSnap.val() === true) {
          tryCount = 99
          Connected = true;
        } else {
          Connected = false;
        }
      });
    }

    try {
      if(Connected){
        if (update) {
          firebase.database().ref('Fillings/' + Filling.id).update({
            CarpoolKey:  CarpoolKey,
            tripmeter:   Filling.tripmeter,
            consumption: Filling.consumption,
            fuelPrice:   Filling.fuelPrice,
            drivenDays:  Filling.drivenDays,
            date:        Filling.date,
          });
        } else {
          // Add Filling to Firebase
          firebase.database().ref('Fillings/' + Filling.id).set({
            id:          Filling.id,
            CarpoolKey:  CarpoolKey,
            tripmeter:   Filling.tripmeter,
            consumption: Filling.consumption,
            fuelPrice:   Filling.fuelPrice,
            drivenDays:  Filling.drivenDays,
            date:        Filling.date,
          });
        }  
      }
    } catch(error) {
      console.log(error.message)
    }
    
    //Generate Files in global.js
    JSONExport_Filling = {
      [id]: {
        id:          Filling.id,
        CarpoolKey:  CarpoolKey,
        tripmeter:   Filling.tripmeter,
        consumption: Filling.consumption,
        fuelPrice:   Filling.fuelPrice,
        drivenDays:  Filling.drivenDays,
        date:        Filling.date
      }
    }

    //Set globals
    GLOBALS.Fillings = {...GLOBALS.Fillings, ...JSONExport_Filling}

    console.log('Adding filling, FirebaseGLOBALS done: ' + JSON.stringify(JSONExport_Filling))
  }

  _removeFirebaseGlobals = (filling) => {
    let Connected
    
    for (tryCount = 0; tryCount <= 3; tryCount++) {
      firebase.database().ref().child('.info/connected').on('value', function(connectedSnap) {
        if (connectedSnap.val() === true) {
          tryCount = 99
          Connected = true;
        } else {
          Connected = false;
        }
      });
    }

    try {
      if(Connected){
        firebase.database().ref('Fillings').child(filling.id).remove()
        console.log('Delete filling: ' + filling.id)
      }
    } catch(error) {
      console.log(error.message)
    }

    let globalFillings = GLOBALS.Fillings
    delete globalFillings[filling.id]
    GLOBALS.Fillings = globalFillings
  }
  // All Functions--------------------------------------------------------------------------------------

  render () {
    const { fillingsArray, addFillingsVisible, fabVisible, editFilling } = this.state
    const fillingsAvailable = (fillingsArray !== null)
    const fabVisibleStyle   = (fabVisible) ? {} : {height: 0, width: 0}
    const containerFlex = (fillingsAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    return (
      <View
        style={[styles.container, containerFlex]}
      >
        {(!fillingsAvailable) && (
          <Text
            style={[styles.font, styles.emptyText]}
          >{'NO FILLINGS YET'}</Text>
        )}

        {(fillingsAvailable) && (
          <ScrollView>
            <FlatList
              style={styles.listContainer}
              extraData={this.state}
              data={fillingsArray}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <FillingsItem
                  filling={item}
                  total={this._getTotalPrice(item.consumption, item.tripmeter, item.fuelPrice)}
                  carpoolMembers={4}
                  onPressDelete={(filling) => this._deleteFilling(filling)}
                  onPressEdit={(filling) => this._showAddFillings(filling)}
                  editFilling={editFilling}
                />
              }
            />
          </ScrollView>
        )}

        <Fab
          style={[styles.fab, fabVisibleStyle]}
          onPress={() => this._showAddFillings()}
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
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 30
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;