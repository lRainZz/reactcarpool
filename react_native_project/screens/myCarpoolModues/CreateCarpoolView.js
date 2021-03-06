// external modules

import React from 'react';

import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

import { Button } from 'react-native-elements';

import DatePicker from 'react-native-modal-datetime-picker';

import moment from 'moment';

import PropTypes from 'prop-types';


// own modules

const GLOBALS = require ('../../globals');


// class

class ModalView extends React.Component {
  static propTypes = {
    onSubmit:    PropTypes.any,
    onCancel:    PropTypes.any
  }
  
  state = {
    carpool: 
    {
      MaxPlace:    null, // number
      CarpoolName: null, // string
    },

    isFocused: false
  }

  _updateCarpool = (key, value) => {
    let updateCarpool = this.state.carpool

    updateCarpool[key] = value

    this.setState({carpool: updateCarpool})
  }
  
  render () {
    const { onSubmit, onCancel, editCarpool } = this.props
    const { carpool } = this.state

    return (
      <View
        style={styles.container}
      >
        <View
          style={styles.contentContainer}
        >
          <Text
            style={[styles.title, styles.font]}
          >{'NAME'}</Text>

          <View
            style={styles.inputContainer}
          >
            <TextInput
              ref={(ref) => this.textInputRef = ref}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={styles.textInput}
              maxLength={32}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'rgba(255,255,255,0.4)'}
              selectionColor={'black'}
              onFocus={() => this.setState({ isFocused: true })}
              onBlur={() => this.setState({ isFocused: false })}

              returnKeyType={'next'}
              onChangeText={(text) => this._updateCarpool('CarpoolName', text)}
              value={(carpool.CarpoolName === null) ? '' : String(carpool.CarpoolName)}
            />
          </View>

          <View
            style={styles.seperator}
          />
        </View>

        <View
          style={styles.contentContainer}
        >
          <Text
            style={[styles.title, styles.font]}
          >{'MAX PLACES'}</Text>

          <View
            style={styles.inputContainer}
          >
            <TextInput
              ref={(ref) => this.textInputRef = ref}
              autoCapitalize={'none'}
              keyboardType={'numeric'}
              autoCorrect={false}
              style={styles.textInput}
              maxLength={3}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'rgba(255,255,255,0.4)'}
              selectionColor={'black'}
              onFocus={() => this.setState({ isFocused: true })}
              onBlur={() => this.setState({ isFocused: false })}

              returnKeyType={'done'}
              onChangeText={(text) => this._updateCarpool('MaxPlace', text)}
              value={(carpool.MaxPlace === null) ? '' : String(carpool.MaxPlace)}
            />
          </View>

          <View
            style={styles.seperator}
          />
        </View>

        <View 
          style={styles.spacer}
        />

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
            title={'CREATE'}
            fontWeight={'bold'}
            fontSize={18}
            color={'#1976D2'}
            onPress={() => onSubmit(carpool)}
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
    flex: 2,
    justifyContent: 'center'
  },
  spacer: {
    flex: 7
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
    backgroundColor: '#fff'
  },
  seperator: {
    borderColor: '#1976D2',
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    width: '100%'
  },
  titleStyle: {
    marginHorizontal: 5,
    color: '#303030',
    fontWeight: 'bold'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    textAlign: 'right',
    alignSelf: 'center',
    marginHorizontal: 5
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  },


  debug: {
    borderWidth: 0,
    borderColor: '#000'
  }
})

export default ModalView;