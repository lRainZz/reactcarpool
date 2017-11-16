// external modules

import React from 'react'

import { ActivityIndicator, StyleSheet, Text } from 'react-native'

import { View } from 'react-native-animatable'

import PropTypes from 'prop-types';


// own modules

import TouchableView from './TouchableView';


// class

const LoginButton = ({ onPress, isEnabled, isLoading, text, buttonStyle, textStyle, ...otherProps }) => {
  const onButtonPress = isEnabled && !isLoading ? onPress : () => null

  return (
    <View {...otherProps}>
      <TouchableView onPress={onButtonPress} style={[styles.button, buttonStyle]}>
        {(isLoading) && <ActivityIndicator style={styles.spinner} color={'grey'} />}
        {(!isLoading) && <Text style={[styles.text, textStyle]}>{text}</Text>}
      </TouchableView>
    </View>
  )
}

LoginButton.propTypes = {
  onPress:     PropTypes.func,
  isEnabled:   PropTypes.bool,
  isLoading:   PropTypes.bool,
  text:        PropTypes.string,
  buttonStyle: PropTypes.any,
  textStyle:   PropTypes.any
}

LoginButton.defaultProps = {
  onPress: () => null,
  isEnabled: true,
  isLoading: false
}

const styles = StyleSheet.create({
  button: {
    height: 42,
    borderWidth: 1,
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  spinner: {
    height: 26
  },
  text: {
    textAlign: 'center',
    fontWeight: '400',
    color: 'white'
  }
})

export default LoginButton;