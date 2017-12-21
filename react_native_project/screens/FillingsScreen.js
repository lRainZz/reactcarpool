// external modules

import React from 'react';

import { AsyncStorage, Button, Text, StyleSheet, ScrollView, Platform, FlatList, KeyboardAvoidingView } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';

import sha256 from 'sha256';


//own modules

import FillingsItem from './fillingsModules/FillingsItem';


// class

class FillingsScreen extends React.Component { 
  state = {
    addFillingsVisible: false,
    fabVisible: true,

    editFilling: null,

    inputFilling: false,
    inputFillingObject: null,

    // live init as null
    // fillingsArray: null
    fillingsArray:
      [
        {  
          "id"         : 1,
          'tripmeter'  : 1000,
          'consumption': 7.0,
          'fuelPrice'  : 1.309,
          'drivenDays' : 4,
          'date'       : '08.01.2017'
        },
        {
          'id'         : 0,
          'tripmeter'  : 860,
          'consumption': 7.3,
          'fuelPrice'  : 1.309,
          'drivenDays' : 4,
          'date'       : '01.01.2017'
        }
      ]
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
        break;
      }
    }
    
    if (!update) {
      // this works because fillings is an array starting at 0
      // object to be added gets a new id, one higher as the highest in fillings
      fillingObject.id = fillings.length;
      fillings.unshift(fillingObject);
    }

    this.setState({fillingsArray: fillings})
  }

  _deleteFilling = (filling) => {
    let fillings = this.state.fillingsArray
    let index    = fillings.indexOf(filling)

    fillings.splice(index, 1)

    this.setState({fillingsArray: fillings})
  }

  _updateFilling = (updateFilling) => {
    this.setState({editFilling: updateFilling, addFillingsVisible: true})
  }

  _showAddFillings = async(updateFilling) => {
    let asyncUpdate       = false;
    let asyncUpdateObject = {};

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

// All Functions--------------------------------------------------------------------------------------
  _getNewId = async() => {
    let Time = (new Date).getTime();
    let Id = sha256((Math.round(Math.random() * 1000000) + Time)); //generates Key from random value and epoche timestamp
    console.log(Key);    
  }

  _addToFirebase = async(CarpoolKey, Filling) => {
    // Add Filling to Firebase
    firebase.database().ref('Fillings/' +Id).set({
      id: Filling.Id,
      CarpoolKey: CarpoolKey,
      tripmeter: Filling.tripmeter,
      consumption: Filling.consumption,
      fuelPrice: Filling.fuelPrice,
      drivenDays: Filling.drivenDays,
      date: Filling.date,
    });

    //Generate Files in global.js
    JSONExport_Filling = {
      Id: {
        id: ID,
        CarpoolKey: CarpoolKey,
        tripmeter: Filling.tripmeter,
        consumption: Filling.consumption,
        fuelPrice: Filling.fuelPrice,
        drivenDays: Filling.drivenDays,
        date: Filling.date
      }
    }

    //Set globals
    GLOBALS.Fillings = (GLOBALS.Fillings + JSONExport_Filling);
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