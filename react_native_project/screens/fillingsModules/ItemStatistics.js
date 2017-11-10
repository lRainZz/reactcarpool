// external modules

import React, { PropTypes } from 'react';

import { View, StyleSheet, Text, Platform } from 'react-native';

import { Icon } from 'react-native-elements';


// own modules

import ValueUnit from './valueUnit';

// class

class FillingsItemStatistic extends React.Component {
  static propTypes = {
    tripmeter:      PropTypes.number.isRequired,
    avgConsumption: PropTypes.number.isRequired,
    fuelPrice:      PropTypes.number.isRequired,
    drivenDays:     PropTypes.number.isRequired,
    carpoolMembers: PropTypes.number.isRequired,
    outerStyle:     PropTypes.style

  }

  render () {
    const { tripmeter, avgConsumption, fuelPrice, drivenDays, carpoolMembers, outerStyle } = this.props

    const distanceUnit = (/* optionImperial*/ true) ? 'KM': 'MI'
    const volumeUnit   = (/* optionImperial*/ true) ? 'L' : 'GAL'
    const priceUnit    = (/* optionImperial*/ true) ? '€' : '$'
    const dayUnit      = 'DAYS' // (/* optionImperial*/ true) ? 'Tagen' : 'days'

    return (
      <View 
        style={[outerStyle, styles.container]}
      >
        <ValueUnit 
          containerStyle={styles.section}
          
          firstValueDesc={'a distance of '}
          firstValue={tripmeter}
          firstUnit={distanceUnit}

          secondValueDesc={'with an avg. '}
          secondValue={avgConsumption}
          secondUnit={volumeUnit + '/' + distanceUnit}
        />

        <View style={styles.seperator} />

        <ValueUnit
          containerStyle={styles.section}

          firstValueDesc={'in '}
          firstValue={drivenDays}
          firstUnit={dayUnit}
          
          secondValueDesc={'for '}
          secondValue={fuelPrice}
          secondUnit={priceUnit + '/' + volumeUnit}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flexDirection: 'row',
  },
  section: {
    flex: 3,
    margin: 5,
  },
  seperator: {
    borderWidth: StyleSheet.hairlineWidth,
    width: StyleSheet.hairlineWidth,
    borderColor: '#1976D2'
  },
  sectionText: {
    color: '#303030', 
    fontSize: 20,
    textAlign: 'right'
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
})

export default FillingsItemStatistic;