// external modules

import React from 'react'

import { AsyncStorage, StyleSheet } from 'react-native'

import { View } from 'react-native-animatable'

import Toast from 'react-native-simple-toast'


// own modules

import CreateCarpoolView from './CreateCarpoolView'


// class

class CreateCarpoolStack extends React.Component { 

  _setAsyncUpdateObject = async (updateObject) => {
    let valid = this._validateCarpool(updateObject);
    
    if (!valid) {
      Toast.show('The name of your carpool should be 5 characters, at least.', Toast.LONG);
    } else {
      await AsyncStorage.setItem('inputCarpool', 'true');
      await AsyncStorage.setItem('inputCarpoolObject', JSON.stringify(updateObject));
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  }

  _validateCarpool = (carpool) => {
    valid = false
    
    console.log(carpool.CarpoolName.length)

    if (carpool.CarpoolName.length > 4 ) {
      valid = true
    }

    return valid
  }
  
  render () {
    return(
      <View
        animation={'fadeIn'}
        duration={200}
        delay={100}
        style={styles.container}
      >
        <CreateCarpoolView 
          onSubmit={(carpool) => this._setAsyncUpdateObject(carpool)}
          onCancel={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }

})

export default CreateCarpoolStack;