// external modules

import React, { PropTypes } from 'react';

import { StyleSheet, Text, Platform } from 'react-native';

import { View } from 'react-native-animatable';

import { Icon } from 'react-native-elements';


// own modules

import StatView from './ItemStatistics';


// class
 
class FillingsItem extends React.Component {
  static propTypes = {
    // identification
    id:             PropTypes.number.isRequired,
    // upper part
    isPayed:        PropTypes.bool.isRequired,
    date:           PropTypes.string.isRequired,
    total:          PropTypes.number.isRequired,
    // lower part
    tripmeter:      PropTypes.number.isRequired,
    avgConsumption: PropTypes.number.isRequired,
    fuelPrice:      PropTypes.number.isRequired,
    drivenDays:     PropTypes.number.isRequired,
    carpoolMembers: PropTypes.number.isRequired
  }

  _getPersonalPrice = (totalPrice, personCount, doRound) => {
    let personalPrice = (totalPrice / personCount);

    if (doRound) {
      personalPrice = Math.round(personalPrice);
    }

    return personalPrice.toFixed(2);
  }
  
  render () {
    const { id, date, total, tripmeter, avgConsumption, fuelPrice, drivenDays, carpoolMembers } = this.props
    
    return (
      <View
        animation={'slideInUp'}
        delay={0}
        duration={300}
        style={styles.container}
      >
        <View
          style={[styles.top, styles.debug]}
        >
          <Text
            style={[styles.date, styles.debug]}
          >{date}</Text>
          
          <Text
            style={[styles.personalPrice, styles.debug]}
          >{this._getPersonalPrice(total, carpoolMembers, true)} € <Text style={styles.personalPriceSuffix}>P.P.</Text></Text>

          <Text
            style={[styles.total, styles.debug]}
          >{total} €</Text>

          <Icon 
            type='material'
            color='white'
            size={25}
            name='mode-edit'
            style={[styles.edit, styles.debug]}
            iconStyle={{margin: 5}}
            onPress={() => ''}
          />
        </View>

        <View 
          style={styles.divider}
        >
          <View style={styles.seperator}/>
          <View style={styles.seperatorText}>
            <Text style={[styles.font, styles.seperatorCaption]}>BASED ON</Text>
            <Text style={[styles.font, styles.seperatorCaption]}>{carpoolMembers} PEOPLE DROVE</Text>
          </View>
          <View style={styles.seperator}/>
        </View>

        <View
          style={styles.bottom}
        >
          <StatView
            outerStyle={[styles.stats, styles.debug]}
            tripmeter={tripmeter}
            avgConsumption={avgConsumption}
            fuelPrice={fuelPrice}
            drivenDays={drivenDays}
            carpoolMembers={carpoolMembers}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    flex: 1,

    // box-shadow
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    minHeight: 40,
    margin: 5
  },
  date: {
    textAlign: 'left',
    flex: 4,
    fontSize: 23,
    color: '#303030',
    alignSelf: 'center',
    paddingLeft: 10
  },
  personalPrice: {
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 4,
    fontSize: 28,
    alignSelf: 'center',
    color: '#303030'
  },
  personalPriceSuffix: {
    fontSize: 13,
    color: '#9E9E9E'
  },
  total: {
    textAlign: 'right',
    marginRight: 10,
    flex: 3,
    fontSize: 20,
    alignSelf: 'center',
    color: '#303030'
  },
  edit: {
    borderRadius: 25,
    margin: 5,
    padding: 5,
    backgroundColor: '#1976D2'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  seperator: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#1976D2'
  },
  seperatorText: {
    flexDirection: 'column'
  },
  seperatorCaption: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9E9E9E',
    textAlign: 'center'
  },
  stats: {
    margin: 5
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  },


  debug: {
    // set border with to '1' to debug UI-flex
    borderWidth: 0,
    borderColor: '#000'
  }
})

export default FillingsItem;