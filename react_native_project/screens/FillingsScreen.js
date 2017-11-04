// external modules

import React from 'react';

import { Text, StyleSheet, Platform ,View } from 'react-native';

import { Container, Content, Header, Footer, Left, Boy, Right } from 'native-base';

import { Icon, Divider } from 'react-native-elements';

import FloatingButton from 'react-native-action-button';

import FillingsModal from 'react-native-modal'


//own modules


// class

class FillingsScreen extends React.Component {
  
  state = {
    fillingsModalVisible: true,
    // array representing fillings with: odometer, tripmeter, price, quantity, fuel sort, driven days
    fillingsStateArray: 
      {
        'filling_0': {
          'id'         : 0,
          'tripmeter'  : 1000,
          'consumption': 7.0,
          'fuelprice'  : 1.309,
          'drivendays' : 4,
          'date'       : '01.01.2017'
        },
        'filling_1': {
          'id'         : 1,
          'tripmeter'  : 1000,
          'consumption': 7.0,
          'fuelprice'  : 1.309,
          'drivendays' : 4,
          'date'       : '08.01.2017'
        }
      }
  }

  _showFillingsModal = () => this.setState({ fillingsModalVisible: true})

  _hideFillingsModal = () => this.setState({ fillingsModalVisible: false})

  getTotalPrice = (avgConsumption, tripLength, fuelPrice) => {
    let totalPrice = ((tripLength / 100) * avgConsumption * fuelPrice);

    return totalPrice;
  }

  getPersonalPrice = (totalPrice, personCount, doFloor) => {
    let personalPrice = (totalPrice / personCount);

    if (doFloor) {
      personalPrice = Math.floor(personalPrice);
    }

    return personalPrice;
  }

  render () {
    // let FillingsArray = this.state.fillingsStateArray.map(() => {});
    
    let thisFilling = this.state.fillingsStateArray.filling_0;

    return (
      <Container>
        {/*<Text>Fillings go here</Text>*/}
        {/* FillingsArray */}
        
        <FillingsItem
          fillingDate={thisFilling.date}
          fillingTotalPrice={this.getTotalPrice(thisFilling.consumption, thisFilling.tripmeter, thisFilling.fuelprice)}
          fillingPricePerPerson={this.getPersonalPrice(this.props.fillingTotalPrice, 4, true)}
          fillingTripmeter={thisFilling.tripmeter}
          fillingAvgConsumption={thisFilling.consumption}
          fillingFuelPrice={thisFilling.fuelprice}
          fillingDrivenDays={thisFilling.drivendays}
        />


        <FloatingButton
          buttonColor='#1976D2'
          style={[/*styles.floatingButton, styles.font*/]}
          onPress={() => this._showFillingsModal()}
        />
        <FillingsModal
          isVisible={this.fillingsModalVisible}
          avoidKeyboard={true}
          children= {
          <View
            style={{flex: 1}}
          >
            <Text>Hello World</Text>
          </View>
          }
        >
          <View
            style={{flex: 1}}
          >
            <Text>Hello World</Text>
          </View>
        </FillingsModal>
      </Container>
    );
  }
}

 // TODO: use native-base card for better design
class FillingsItem extends React.Component {
  render () {
    return (
      <Container
        style={styles.fillingsItemContainer}
      >
        <Container
          style={styles.fillingsItemHeader}
        >
          <Text
            style={styles.fillingsItemHeaderDate}
          >{this.props.fillingDate}</Text>
          <Text>
            {this.props.fillingPricePerPerson}
          </Text>
          
          <Text
            style={styles.fillingsItemTotal}
          >
      	    {this.props.fillingTotalPrice}
          </Text>
          <Icon 
            type='material'
            color='#303030'
            size={30}
            name='info'
            style={styles.fillingsItemIcon}
          />
        </Container>

        <Divider style={styles.fillingsItemDivider} />

        <Container
          style={styles.fillingsItemContent}
        >
          <Container
            style={styles.fillingsItemContentColumn}
          >
            <Text>{this.props.fillingTripmeter} km</Text>
            <Text>{this.props.fillingAvgConsumption} l/100 km</Text>
          </Container>
          <Container
            style={styles.fillingsItemContentColumn}
          >
            <Text>{this.props.fillingFuelPrice} €</Text>
          </Container>
          <Container
            style={styles.fillingsItemContentColumn}
          >
            <Text>{this.props.fillingDrivenDays} d</Text>
          </Container>
        </Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  floatingButton: {
    fontSize: 20
  },
  fillingsItemContainer: {
    backgroundColor: '#fff',
    maxHeight: 120,
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    borderColor: '#1976D2',
    borderWidth: 1
  },
  fillingsItemHeader: {
    flex: 2,
    flexDirection: 'row'
  },
  fillingsItemHeaderDate: {
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 25,
    color: '#303030'
  },
  fillingsItemIcon: {
    paddingRight: 10,
    paddingTop: 5
  },
  fillingsItemContent: {
    flexDirection: 'row',
    flex: 3
  },
  fillingsItemContentColumn: {
    
  },
  fillingsItemDivider: {
    backgroundColor: '#1976D2',
    marginHorizontal: 10
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;