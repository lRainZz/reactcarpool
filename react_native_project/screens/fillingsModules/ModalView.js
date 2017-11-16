// external modules

import React, { PropTypes } from 'react';

import { View, Text, TextInput, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Platform, KeyboardAvoidingView } from 'react-native';

import { Button } from 'react-native-elements';

import DatePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';


// own modules

const GLOBALS = require ('../../globals');

import ModalInput from './InputComponent';


// class

class ModalView extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.function,
    onCancel: PropTypes.function,

    editFilling: PropTypes.object
  }
  
  state = {
    filling: this.props.editFilling || 
    {
      'id'         : null, // any
      'tripmeter'  : null, // number
      'consumption': null, // number
      'fuelPrice'  : null, // number
      'drivenDays' : null, // number
      'date'       : null  // string
    },

    isDateTimePickerVisible: false
  }

  _showDatePicker = () => {this.setState({isDateTimePickerVisible: true})}

  _hideDatePicker = () => {this.setState({isDateTimePickerVisible: false})}

  _saveDateToFilling = (date) => {
    let updateFilling = this.state.filling

    updateFilling.date = moment(date).format('DD.MM.YYYY')

    this.setState({filling: updateFilling, isDateTimePickerVisible: false})
  }

  _updateFilling = (key, value) => {
    let updateFilling = this.state.filling

    updateFilling[key] = value

    this.setState({filling: updateFilling})
  }
  
  render () {
    const { onSubmit, onCancel, editFilling } = this.props
    const { filling, isDateTimePickerVisible } = this.state
    const Touchable = (Platform.OS == 'android') ? TouchableNativeFeedback : TouchableOpacity
    const imperial = GLOBALS.UseImperialUnits

    const distanceUnit    = (imperial) ? 'KM'   : 'MI'
    const volumeUnit      = (imperial) ? 'L'    : 'GAL'
    const consumptionUnit = (imperial) ? 'L/KM' : 'MPG'
    const priceUnit       = (imperial) ? '€'    : '$'
    const dayUnit         = 'DAYS' // (/* optionImperial*/ true) ? 'Tagen' : 'days'

    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          <ModalInput 
            bottomSeperator={true}
            placeholder={'760'}
            keyboardType={'numeric'}
            title={'DRIVEN DISTANCE:'}
            titleStyle={styles.inputText}
            inputSuffix={distanceUnit}
            returnKeyType={'next'}
            onChangeText={(text) => this._updateFilling('tripmeter', text)}
            value={(filling.tripmeter === null) ? '' : String(filling.tripmeter)}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'7.3'}
            keyboardType={'numeric'}
            title={'AVERAGE FUEL CONSUMPTION:'}
            titleStyle={styles.inputText}
            inputSuffix={consumptionUnit}
            returnKeyType={'next'}
            onChangeText={(text) => this._updateFilling('consumption', text)}
            value={(filling.consumption === null) ? '' : String(filling.consumption)}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'1.329'}
            keyboardType={'numeric'}
            title={'FUEL PRICE:'}
            titleStyle={styles.inputText}
            inputSuffix={priceUnit + '/' + volumeUnit}
            returnKeyType={'next'}
            onChangeText={(text) => this._updateFilling('fuelPrice', text)}
            value={(filling.fuelPrice === null) ? '' : String(filling.fuelPrice)}
          />

          <ModalInput 
            bottomSeperator={true}
            placeholder={'4'}
            keyboardType={'numeric'}
            title={'DAYS DRIVEN:'}
            titleStyle={[styles.inputText, styles.debug]}
            inputSuffix={dayUnit}
            returnKeyType={'done'}
            onChangeText={(text) => this._updateFilling('drivenDays', text)}
            value={(filling.drivenDays === null) ? '' : String(filling.drivenDays)}
          />

          <ModalInput
            bottomSeperator={true}
            title={'DATE OF FILLING:'}
            titleStyle={[styles.inputText, styles.debug]}
            customInput={
              <View
                style={[styles.dateContainer, styles.debug]}
              >
                <Touchable
                  onPress={this._showDatePicker}
                  style={[styles.touchable, styles.debug]}
                >
                  <Text
                    style={[styles.dateText, styles.debug]}
                  >{filling.date}<Text
                    style={styles.dateSuffix}
                  >{(filling.date == null) ? 'SELECT A DATE' : ' DATE'}</Text></Text>
                </Touchable>
                <DatePicker 
                  isVisible={isDateTimePickerVisible}
                  onConfirm={this._saveDateToFilling}
                  onCancel={this._hideDatePicker}
                />
              </View>
            }
          />

        </View>

        <View
          style={[styles.buttonContainer, styles.debug]}
        >
          <Button 
            title={'CANCEL'}
            fontWeight={'bold'}
            fontSize={18}
            color={'#1976D2'}
            onPress={onCancel}
            containerViewStyle={styles.buttonBase}
            buttonStyle={styles.button}
          />
          <Button 
            title={(editFilling === null) ? 'ADD' : 'UPDATE'}
            fontWeight={'bold'}
            fontSize={18}
            color={'#1976D2'}
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
    backgroundColor: '#fff',
    color: '#1976D2'
  },
  inputText: {
    marginHorizontal: 5,
    color: '#303030',
    fontWeight: 'bold'
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center'
  },  
  touchable: {
    flex: 1
  }, 
  dateText: {
    fontSize: 20,
    color: 'black',
    textAlign: 'right'
  },  
  dateSuffix: {
    fontSize: 20,
    color: '#9E9E9E',
    textAlign: 'right',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
  },  



  debug: {
    borderWidth: 0,
    borderColor: '#000'
  }
})

export default ModalView;