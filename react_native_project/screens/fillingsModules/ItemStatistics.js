// external modules

import React from 'react';

import { View, StyleSheet, Text, Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import PropTypes from 'prop-types';


// own modules

import ValueUnit from './valueUnit';

const GLOBALS = require ('../../globals');


// class

class FillingsItemStatistic extends React.Component {
  static propTypes = {
    filling: PropTypes.object.isRequired

  }

  render () {
    const { filling, outerStyle } = this.props
    const imperial = GLOBALS.Options.UseImperialUnits

    const distanceUnit = (imperial) ? 'KM': 'MI'
    const volumeUnit   = (imperial) ? 'L' : 'GAL'
    const priceUnit    = (imperial) ? '€' : '$'
    const dayUnit      = 'DAYS' // (/* optionImperial*/ true) ? 'Tagen' : 'days'

    return (
      <View 
        style={styles.container}
      >
        <ValueUnit 
          containerStyle={styles.section}
          
          firstValueDesc={'a distance of '}
          firstValue={parseFloat(filling.tripmeter, 10)}
          firstUnit={distanceUnit}

          secondValueDesc={'with an avg. '}
          secondValue={parseFloat(filling.consumption, 10)}
          secondUnit={volumeUnit + '/' + distanceUnit}
        />

        <View style={styles.seperator} />

        <ValueUnit
          containerStyle={styles.section}

          firstValueDesc={'in '}
          firstValue={parseFloat(filling.drivenDays, 10)}
          firstUnit={dayUnit}
          
          secondValueDesc={'for '}
          secondValue={parseFloat(filling.fuelPrice, 10)}
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