// external modules

import React, { PropTypes } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';


// own modules

import ModalInput from './InputComponent';

// class

class ModalView extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.function,
    onCancel: PropTypes.function
  }
  
  state = {
    filling: {
      'id'         : null, // any
      'tripmeter'  : null, // number
      'consumption': null, // number
      'fuelPrice'  : null, // number
      'drivenDays' : null, // number
      'date'       : null  // string
    }
  }
  
  render () {
    const { onSubmit, onCancel } = this.props
    const { filling } = this.state

    const distanceUnit = (/* optionImperial*/ true) ? 'KM': 'MI'
    const volumeUnit   = (/* optionImperial*/ true) ? 'L' : 'GAL'
    const priceUnit    = (/* optionImperial*/ true) ? '€' : '$'
    const dayUnit      = 'DAYS' // (/* optionImperial*/ true) ? 'Tagen' : 'days'

    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          {/* 
            5 inputs:
              tripmeter,
              consumption,
              fuelprice,
              drivenDays,
              date (datePicker)
          */}

          <ModalInput 
            bottomSeperator={true}
            placeholder={'760'}
            keyboardType={'numeric'}
            title={'DRIVEN DISTANCE:'}
            titleStyle={styles.inputText}
            inputSuffix={distanceUnit}
            returnKeyType={'next'}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'7.3'}
            keyboardType={'numeric'}
            title={'AVERAGE FUEL CONSUMPTION:'}
            titleStyle={styles.inputText}
            inputSuffix={volumeUnit + '/' + distanceUnit}
            returnKeyType={'next'}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'1.329'}
            keyboardType={'numeric'}
            title={'FUEL PRICE:'}
            titleStyle={styles.inputText}
            inputSuffix={priceUnit + '/' + volumeUnit}
            returnKeyType={'next'}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'4'}
            keyboardType={'numeric'}
            title={'DAYS DRIVEN:'}
            titleStyle={styles.inputText}
            inputSuffix={dayUnit}
            returnKeyType={'done'}
          />

          <ModalInput
            title={'DATE OF FILLING:'}
            titleStyle={styles.inputText}
            customInput={<Text>Hello World</Text>}
          />

        </View>

        <View
          style={[styles.buttonContainer, styles.debug]}
        >
          <Button 
            title='CANCEL'
            fontWeight='bold'
            fontSize={18}
            onPress={onCancel}
            containerViewStyle={styles.buttonBase}
            buttonStyle={styles.button}
          />
          <Button 
            title='ADD'
            fontWeight='bold'
            fontSize={18}
            onPress={() => onSubmit(filling)}
            containerViewStyle={styles.buttonBase}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10
  },
  contentContainer: {
    flex: 11
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 5
  },
  buttonBase: {
    flex: 1
  },
  button: {
    flex: 1,
    backgroundColor: '#1976D2'
  },
  inputText: {
    marginHorizontal: 5,
    color: '#303030',
    fontWeight: 'bold'
  },



  debug: {
    borderWidth: 0,
    borderColor: '#000'
  }
})

export default ModalView;