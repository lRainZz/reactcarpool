// external modules

import React, { Component } from 'react'

import { Dimensions, StyleSheet, KeyboardAvoidingView } from 'react-native'

import { Text, View } from 'react-native-animatable'

import PropTypes from 'prop-types';


// own modules

import LoginButton from './loginComponents/LoginButton'

import LoginInput from './loginComponents/LoginInput'


// class

class Signup extends Component {
  static propTypes = {
    isLoading:        PropTypes.bool.isRequired,
    onSignupPress:    PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    password: '',
    fullName: '',
    zipCode: ''
  }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300),
        this.aniViewRef.fadeOut(300)
      ])
    }
  }

  render () {
    const { email, password, fullName, zipCode } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    const isValid = email !== '' && password !== '' && fullName !== '' && zipCode !== ''
    return (
      <KeyboardAvoidingView
        keyboardVerticalOffset={-80}
        behavior={'padding'}
      >
        <View
          animation={'slideInUp'}
          duration={100}
          delay={0}
          ref={(ref) => this.aniViewRef = ref}

          style={styles.loginSignup}
        >
          <View style={styles.container}>
            <View style={styles.form} ref={(ref) => this.formRef = ref}>
              <LoginInput
                ref={(ref) => this.zipCodeInputRef = ref}
                placeholder={'ZipCode'}
                editable={!isLoading}
                returnKeyType={'next'}
                blurOnSubmit={false}
                withRef={true}
                onSubmitEditing={() => this.FullNameInputRef.focus()}
                onChangeText={(value) => this.setState({ zipCode: value })}
                isEnabled={!isLoading}
              />
              <LoginInput
                ref={(ref) => this.FullNameInputRef = ref}
                placeholder={'Full name'}
                editable={!isLoading}
                returnKeyType={'next'}
                blurOnSubmit={false}
                withRef={true}
                onSubmitEditing={() => this.emailInputRef.focus()}
                onChangeText={(value) => this.setState({ fullName: value })}
                isEnabled={!isLoading}
              />
              <LoginInput
                ref={(ref) => this.emailInputRef = ref}
                placeholder={'Email'}
                keyboardType={'email-address'}
                editable={!isLoading}
                returnKeyType={'next'}
                blurOnSubmit={false}
                withRef={true}
                onSubmitEditing={() => this.passwordInputRef.focus()}
                onChangeText={(value) => this.setState({ email: value })}
                isEnabled={!isLoading}
              />
              <LoginInput
                ref={(ref) => this.passwordInputRef = ref}
                placeholder={'Password'}
                editable={!isLoading}
                returnKeyType={'done'}
                secureTextEntry={true}
                withRef={true}
                onChangeText={(value) => this.setState({ password: value })}
                isEnabled={!isLoading}
              />
            </View>
            <View style={styles.footer}>
              <View ref={(ref) => this.buttonRef = ref} animation={'fadeIn'} duration={600} delay={400}>
                <LoginButton
                  onPress={() => onSignupPress(email, password, fullName, zipCode)}
                  isEnabled={isValid}
                  isLoading={isLoading}
                  buttonStyle={styles.createAccountButton}
                  textStyle={styles.createAccountButtonText}
                  text={'Create Account'}
                />
              </View>
              <Text
                ref={(ref) => this.linkRef = ref}
                style={styles.loginLink}
                onPress={onLoginLinkPress}
                animation={'fadeIn'}
                duration={600}
                delay={400}
              >
                {'Already have an account?'}
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width * 0.1
  },
  form: {
    marginTop: 20,
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  createAccountButton: {
    backgroundColor: 'white'
  },
  createAccountButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  loginLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  },
  loginSignup: {
    backgroundColor: '#1976D2',
    borderColor: '#fff',
    borderWidth: 1
  }
})

export default Signup;