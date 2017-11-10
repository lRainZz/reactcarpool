// external modules

import React from 'react';

import { Text, StyleSheet, Platform ,View, FlatList, Button } from 'react-native';

import { Container } from 'native-base';

import FloatingButton from 'react-native-action-button';


//own modules

import FillingsItem from './fillingsModules/Item';


// class

class FillingsScreen extends React.Component {
  
  state = {
    // array representing fillings with: odometer, tripmeter, price, quantity, fuel sort, driven days
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

  render () {
    const { fillingsArray } = this.state
    const fillingsAvailable = ((fillingsArray.length > 0 ))

    return (
      <Container>

        {(!fillingsAvailable) && (
          <View />
        )}

        {(fillingsAvailable) && (
          <FlatList
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

        {/* TODO: use fab from react-native-elements/base */}
        <FloatingButton
          buttonColor='#1976D2'
          style={[/*styles.floatingButton, styles.font*/]}
          onPress={() => alert(noFillings)}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  floatingButton: {
    fontSize: 20
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;