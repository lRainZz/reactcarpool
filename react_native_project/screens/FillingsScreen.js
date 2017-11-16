// external modules

import React from 'react';

import { Button, Text, StyleSheet, ScrollView, Platform, FlatList, KeyboardAvoidingView } from 'react-native';

import { Fab, Icon } from 'native-base';

import { View } from 'react-native-animatable';

import Modal from 'react-native-simple-modal';

import Toast from 'react-native-simple-toast';


//own modules

import FillingsItem from './fillingsModules/Item';

import ModalView from './fillingsModules/ModalView';


// class

class FillingsScreen extends React.Component { 
  state = {
    addFillingsVisible: false,
    fabVisible: true,

    editFilling: null,

    // live init as null
    // fillingsArray: null
    fillingsArray:
      [
        {  
          'id'         : 1,
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

  _showFillingsModal = () => this.setState({ fillingsModalVisible: true})

  _hideFillingsModal = () => this.setState({ fillingsModalVisible: false})

  _getTotalPrice = (avgConsumption, tripLength, fuelPrice) => {
    let totalPrice = ((tripLength / 100) * avgConsumption * fuelPrice);

    return totalPrice.toFixed(2);
  }

  _addFilling = (fillingObject) => {
    let incomplete = false;  
    let fillings = this.state.fillingsArray
    let index = null
    let update = false

    if (    
        (fillingObject.tripmeter  == null) 
    || (fillingObject.consumption == null) 
    || (fillingObject.fuelPrice   == null) 
    || (fillingObject.drivenDays  == null) 
    || (fillingObject.date        == null) 
      ) { 
      incomplete = true; 
    }

    if (!incomplete) {

      // documentation disapproves use of for...in
      // for (var filling in fillings) {
      for (var i1 = 0; i1 < fillings.length; i1++) {  
        let currentFilling = fillings[i1]
        
        if (currentFilling.id == fillingObject.id) {
          index = fillings.indexOf(currentFilling)
          fillings[index] = fillingObject
          update = true
          break;
        }
      }
      
      if (!update) {
        fillings.unshift(fillingObject);
      }
      
      this.setState({addFillingsVisible: false, fillingsArray: fillings, editFilling: null});
    } else {
      Toast.show('Please insert all values to continue.', Toast.LONG);
    }
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
                    onPressEdit={(filling) => this._updateFilling(filling)}
                    editFilling={editFilling}
                  />
                }
              />
            </ScrollView>
          )}

        <Fab
          style={[styles.fab, fabVisibleStyle]}
          onPress={() => this.setState({addFillingsVisible : true, fabVisible: false})}
        >
          <Icon
            name='add'
            color='white'
          />
        </Fab>

          <Modal 
            open={addFillingsVisible}
            modalDidClose={() => this.setState({addFillingsVisible : false, fabVisible: true})}
            modalStyle={styles.modalContainer}
          >
            <KeyboardAvoidingView
              style={{flex: 1}}
              keyboardVerticalOffset={50}
              behavior={'padding'}
            >
              <ModalView
                editFilling={editFilling} 
                onSubmit={(filling) => this._addFilling(filling)}
                onCancel={() => this.setState({addFillingsVisible: false})}
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