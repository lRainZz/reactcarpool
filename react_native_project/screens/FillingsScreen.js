// external modules

import React from 'react';

import { Text, StyleSheet, ScrollView, Platform ,View, FlatList } from 'react-native';

import { Fab, Icon } from 'native-base';

import Modal from 'react-native-simple-modal';


//own modules

import FillingsItem from './fillingsModules/Item';

import ModalView from './fillingsModules/ModalView';


// class

class FillingsScreen extends React.Component {
  
  state = {
    addFillingsVisible: false,

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

  _addNewFilling =  (fillingObject) => {

  }

  render () {
    const { fillingsArray, addFillingsVisible, fabVisible } = this.state
    const fillingsAvailable = ((fillingsArray.length > 0 ))

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
              data={fillingsArray}
              renderItem={({item}) => 
                <FillingsItem
                  ref={(ref) => this.CurrentItemRef = ref}
                  id={item.id}
                  date={item.date}
                  total={this._getTotalPrice(item.consumption, item.tripmeter, item.fuelPrice)}
                  tripmeter={item.tripmeter}
                  avgConsumption={item.consumption}
                  fuelPrice={item.fuelPrice}
                  drivenDays={item.drivenDays}
                  carpoolMembers={4}
                />
              }
            />
          )}
        </ScrollView>

        <Fab
          style={styles.fab}
          onPress={() => this.setState({addFillingsVisible : true})}
        >
          <Icon
            name='add'
            color='white'
          />
        </Fab>
        <Modal 
          open={addFillingsVisible}
          modalDidClose={() => this.setState({addFillingsVisible : false})}
        />
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
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;