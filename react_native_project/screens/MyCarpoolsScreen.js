// external modules

import React from 'react';

import { ScrollView, FlatList, Text, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';

import { NavigationActions } from 'react-navigation';


// own modules

const GLOBALS = require('../globals')

import CarpoolItem from './myCarpoolModues/CarpoolItem'

import ModalView from './myCarpoolModues/ModalView';


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
    fabVisible: true
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

  _addCarpool = (carpoolObject) => {
    let incomplete = false;  
    let carpools   = this.state.carpoolsArray
    let index      = null
    let update     = false

    if (carpoolObject.name   == null) { 
      incomplete = true; 
    }

    if (!incomplete) {

      // documentation disapproves use of for...in
      // for (var carpools in carpools) {
      for (var i1 = 0; i1 < carpools.length; i1++) {  
        let currentFilling = carpools[i1]
        
        if (currentFilling.id == carpoolObject.id) {
          index = carpools.indexOf(currentFilling)
          carpools[index] = carpoolObject
          update = true
          break;
        }
      }
      
      if (!update) {
        carpools.push(carpoolObject);
      }
      
      this.setState({addFillingsVisible: false, fillingsArray: carpools, editFilling: null});
    } else {
      Toast.show('Your carpool needs a name, at least.', Toast.LONG);
    }
  }

  _showAddFilling = (editCarpool) => {    
    // alert(this.screenProps)
    this.props.screenProps.rootNavigation.navigate('AddFillings')

    GLOBALS.addCarpool = editCarpool
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
          onPress={() => this.setState({addCarpoolsVisible : true, fabVisible: false})}
          >
          <Icon
            name='add'
            color='white'
          />
        </Fab>

        <Modal 
          open={addCarpoolsVisible}
          modalDidClose={() => this.setState({addCarpoolsVisible : false, fabVisible: true})}
          modalStyle={styles.modalContainer}
        >
          <KeyboardAvoidingView
            style={{flex: 1}}
            keyboardVerticalOffset={50}
            behavior={'padding'}
          >
            <ModalView
              editCarpool={editCarpool}
              onSubmit={(carpool) => this._addCarpool(carpool)}
              onCancel={() => this.setState({addCarpoolsVisible: false})}
            />

            </KeyboardAvoidingView>
        </Modal> 
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
    // flex: 1,
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