// external modules

import React from 'react';

import { View, StyleSheet, Text, Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import PropTypes from 'prop-types';


// own modules

import ValueUnit from './valueUnit';


// class

class FillingsItemStatistic extends React.Component {
  static propTypes = {
    filling: PropTypes.object.isRequired

  }

  render () {
    const { filling, outerStyle } = this.props

    const distanceUnit = (/* optionImperial*/ true) ? 'KM': 'MI'
    const volumeUnit   = (/* optionImperial*/ true) ? 'L' : 'GAL'
    const priceUnit    = (/* optionImperial*/ true) ? '€' : '$'
    const dayUnit      = 'DAYS' // (/* optionImperial*/ true) ? 'Tagen' : 'days'

    return (
      <View 
        style={styles.container}
      >
        <ValueUnit 
          containerStyle={styles.section}
          
          firstValueDesc={'a distance of '}
          firstValue={filling.tripmeter}
          firstUnit={distanceUnit}

          secondValueDesc={'with an avg. '}
          secondValue={filling.consumption}
          secondUnit={volumeUnit + '/' + distanceUnit}
        />

        <View style={styles.seperator} />

        <ValueUnit
          containerStyle={styles.section}

          firstValueDesc={'in '}
          firstValue={filling.drivenDays}
          firstUnit={dayUnit}
          
          secondValueDesc={'for '}
          secondValue={filling.fuelPrice}
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
    borderColor: '#1976D2',
    marginBottom: 5
  }
})

export default FillingsItemStatistic;