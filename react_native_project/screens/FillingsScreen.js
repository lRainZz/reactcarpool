// external modules

import React from 'react';

import { Text, StyleSheet, ScrollView, Platform, FlatList } from 'react-native';

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
    // newest item always in first place -> use unshift array to add items
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

  _addNewFilling = (fillingObject) => {
    let incomplete = false;
      
    if (   
        (fillingObject.tripmeter   == null)
     || (fillingObject.consumption == null)
     || (fillingObject.fuelPrice   == null)
     || (fillingObject.drivenDays  == null)
     || (fillingObject.date        == null)
        ) {
      incomplete = true;
    }

    if (!incomplete) {
      let fillings = this.state.fillingsArray;

      fillings.unshift(fillingObject);
      
      this.setState({addFillingsVisible: false, fillingsArray: fillings});
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

  render () {
    const { fillingsArray, addFillingsVisible, fabVisible } = this.state
    const fillingsAvailable = ((fillingsArray.length > 0 ))
    const fabVisibleStyle   = (fabVisible) ? {} : {height: 0, width: 0}

    return (
      <View
        style={styles.container}
      >
        <ScrollView>
          {(!fillingsAvailable) && (
            <View />
          )}

          {(fillingsAvailable) && (
            <FlatList
              style={styles.listContainer}
              extraData={this.state}
              data={fillingsArray}
              renderItem={({item}) => 
                <FillingsItem
                  filling={item}
                  total={this._getTotalPrice(item.consumption, item.tripmeter, item.fuelPrice)}
                  carpoolMembers={4}
                  onPressDelete={(filling) => this._deleteFilling(filling)}
                />
              }
            />
          )}
        </ScrollView>

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
          <ModalView 
            onSubmit={(filling) => this._addNewFilling(filling)}
            onCancel={() => this.setState({addFillingsVisible: false})}
          />
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
    // borderRadius: 10,
    backgroundColor: '#fff'
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;