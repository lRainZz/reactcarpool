// external modules

import React, { Component, PropTypes } from 'react'

import { StyleSheet, Dimensions } from 'react-native'

import { Text, View } from 'react-native-animatable'


// own modules

import LoginButton from './loginComponents/LoginButton';

// class

class Opening extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired
  }

  render () {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={300} duration={400}>
          <LoginButton
            text={'Create Account'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
        <View style={styles.separatorContainer} animation={'zoomIn'} delay={400} duration={400}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View animation={'zoomIn'} delay={500} duration={400}>
          <LoginButton
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
      </View>
    )
  }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.1,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: '#9600ff',
    borderWidth: 1,
    borderColor: '#fff'
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 18
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#fff'
  },
  separatorOr: {
    color: '#fff',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: '#0220ff',
    borderWidth: 1,
    borderColor: '#fff'
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 18
  }
})

export default Opening;