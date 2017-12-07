// external modules

import React from 'react'

import { AsyncStorage, StyleSheet, KeyboardAvoidingView } from 'react-native'

import { View } from 'react-native-animatable'

import Toast from 'react-native-simple-toast'


// own modules

import AddFillingsView from './AddFillingsView'


// class

class AddFillingsStack extends React.Component {
  
  state = {
    editFilling: null,
    addUpdateText: 'ADD',
    asyncUpdate: false,
    asyncUpdateObject: null
  } 
  
  async componentWillMount() {
    
    await this._getAsyncUpdate();
    
    if (this.state.asyncUpdate) {
      await this._getAsyncUpdateObject();
      this.setState({editFilling: this.state.asyncUpdateObject, addUpdateText: 'UPDATE'})
    }
  }
  
  _getAsyncUpdate = async() => {
    let update = await AsyncStorage.getItem('updateFilling');
    // remove for next use of object transfer
    await AsyncStorage.removeItem('updateFilling');
    update = (update == 'true')
    this.setState({asyncUpdate: update})
  }

  _getAsyncUpdateObject = async () => {
    let updateObject = await AsyncStorage.getItem('updateFillingsObject');
    // remove for next use of object transfer
    await AsyncStorage.removeItem('updateFillingsObject');
    updateObject = JSON.parse(updateObject);
    this.setState({asyncUpdateObject: updateObject})
  }

  _setAsyncUpdateObject = async (updateObject) => {
    let incomplete = this._validateFilling(updateObject);

    if (incomplete) {
      Toast.show('Please insert all values to continue.', Toast.LONG);
    } else {
      await AsyncStorage.setItem('inputFilling', 'true');
      await AsyncStorage.setItem('inputFillingObject', JSON.stringify(updateObject));
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  }

  _validateFilling = (fillingObject) => {
    let incomplete = false;  

    if (    
        (fillingObject.tripmeter  == null) 
    || (fillingObject.consumption == null) 
    || (fillingObject.fuelPrice   == null) 
    || (fillingObject.drivenDays  == null) 
    || (fillingObject.date        == null) 
      ) { 
      incomplete = true; 
    }

    return incomplete;
  }

  render () {
    const { editFilling, addUpdateText } = this.state;

    return(
      <View
        animation={'fadeIn'}
        duration={200}
        delay={100}
        style={styles.container}
      >
        <KeyboardAvoidingView
          style={styles.avoidContainer}
          behavior={'padding'}
          keyboardVerticalOffset={-80}
        >
          <AddFillingsView 
            editFilling={editFilling}
            onSubmit={(filling) => this._setAsyncUpdateObject(filling)}
            onCancel={() => this.props.navigation.goBack()}
            submitText={addUpdateText}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10
    },
    avoidContainer: {
      flex: 1
    }
  }

);
export default AddFillingsStack;