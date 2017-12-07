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

class InviteMemberView extends React.Component {
  static propTypes = {
    onSubmit:    PropTypes.any,
    onCancel:    PropTypes.any
  }
  
  state = {
    member: {
      name: null
    },
    isFocused: false
  }

  _updateMember = (key, value) => {
    let updateMember = this.state.member

    updateMember[key] = value

    this.setState({member: updateMember})
  }
  
  render () {
    const { onSubmit, onCancel, editCarpool } = this.props
    const { member } = this.state

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

              returnKeyType={'done'}
              onChangeText={(text) => this._updateMember('name', text)}
              value={(member.name === null) ? '' : String(member.name)}
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
            title={'INVITE'}
            fontWeight={'bold'}
            fontSize={18}
            color={'#1976D2'}
            onPress={() => onSubmit(member)}
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
    flex: 9
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
  }
})

export default InviteMemberView;