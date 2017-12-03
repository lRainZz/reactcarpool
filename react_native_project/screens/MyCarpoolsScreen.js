// external modules

import React from 'react';

import { AsyncStorage, ScrollView, FlatList, Text, Platform, StyleSheet } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';

import { NavigationActions } from 'react-navigation';


// own modules

const GLOBALS = require('../globals')

import CarpoolItem from './myCarpoolModues/CarpoolItem'


// class

class MyCarpoolsScreen extends React.Component {
  state = {
    carpoolsArray: 
    [
      {
        id:     '0',
        member: '4',
        name:   'I\'m a carpool',
        icon:   ''
      },
      {
        id:     '1',
        member: '3',
        name:   'Nicest carpool EUW',
        icon:   ''
      }
    ],
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

    this.setState({activeCarpool: GLOBALS.Options.ActiveCarpoolId})
  }

  _deleteCarpool = (carpool) => {
    let carpools = this.state.carpoolsArray
    let index    = carpools.indexOf(carpool)

    carpools.splice(index, 1)

    this.setState({carpoolsArray: carpools})
  }

  componentWillMount () {
    this.setState({activeCarpool: GLOBALS.Options.ActiveCarpoolId})
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
    const fabVisibleStyle   = (fabVisible) ? {} : {height: 0, width: 0}
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
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <CarpoolItem 
                  carpool={item}
                  active={this._carpoolIsActive(item.id)}
                  onSetActive={(id) => this._setActiveCarpool(id)}
                  onDelete={(carpool) => this._deleteCarpool(carpool)}
                />
              }
            />
          </ScrollView>
        )}

        <Fab
          style={[styles.fab, fabVisibleStyle]}
          // onPress={() => this.setState({addCarpoolsVisible : true, fabVisible: false})}
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
  modalContainer: {
    height: 250,
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
})

export default MyCarpoolsScreen;