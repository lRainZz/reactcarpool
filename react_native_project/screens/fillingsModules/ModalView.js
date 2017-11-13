// external modules

import React, { PropTypes } from 'react';

import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';


// own modules


// class

class ModalView extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.function,
    onCancel: PropTypes.function
  }
  
  state = {
    filling: {
      'id'         : 2,// null, // any
      'tripmeter'  : 820, // null, // number
      'consumption': 7.2, // null, // number
      'fuelPrice'  : 1.329, // null, // number
      'drivenDays' : 4, // null, // number
      'date'       : '15.01.2017' // null  // string
    }
  }
  
  render () {
    const { onSubmit, onCancel } = this.props
    const { filling } = this.state

    return (
      <View
        style={styles.container}
      >
        <View
        style={styles.contentContainer}
        >
          {/* 5 inputs:
              tripmeter,
              consumption,
              fuelprice,
              drivenDays,
              date (datePicker)
          
            use loginInput
          */}

          <View>
            
          </View>



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

  debug: {
    borderWidth: 1,
    borderColor: '#000'
  }
})

export default ModalView;