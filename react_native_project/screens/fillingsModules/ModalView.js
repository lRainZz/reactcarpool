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
        <Text>Hello World</Text>

        <View
          style={styles.buttonContainer}
        >
          <Button 
            title='CANCEL'
            onPress={onCancel}
          />
          <Button 
            title='ADD'
            onPress={() => onSubmit(filling)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row'
  }
})

export default ModalView;