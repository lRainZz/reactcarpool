// external modules:

import React, { PropTypes } from 'react';

import { TouchableHighlight, Dimensions, KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'

import { Image, View } from 'react-native-animatable'


// own modules:

import react_carpool_logo from '../res/react_carpool_logo.png';

import react_carpool_login_background from '../res/react_carpool_login_background.png';

import OpeningScreen from './loginModules/Opening';

import SignupScreen from './loginModules/Signup';

import LoginScreen from './loginModules/Login';


// class:

class Login extends React.Component {

  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired
  }

  state = {
    visibleScreen: null // login | signup
  }

  componenWillUpdate (nextProps) {
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideLoginScreen()
    }
  }

  _hideLoginScreen = async () => {
      await this._setVisibleForm(null)
      await this.logoImgRef.fadeOut(800)
      this.props.onLoginAnimationCompleted()
  }

  _setVisibleScreen = async (visibleScreen) => {
    if (this.state.visibleScreen && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState({ visibleScreen })
  }

  render () {
    const { isLoggedIn, isLoading, signup, login } = this.props
    const { visibleScreen } = this.state
    const formStyle = (!visibleScreen) ? { borderWidth: 0 } : { borderWidth: 1 }

    return(
      <TouchableHighlight
        onPress={() => this._setVisibleScreen(null)}
        style={{flex: 1}}
        activeOpacity={100}
      >
        <Image 
          source={react_carpool_login_background}
          style={styles.loginPage}
        >
          <View
            animation={'fadeIn'}
            duration={1200}
            delay={200}
            style={styles.logoView}
          >
            <Image
              animation={'pulse'}
              duration={5000}
              delay={0}
              iterationCount={'infinite'}

              ref={(ref) => this.logoImgRef = ref}
              style={styles.logo}
              source={react_carpool_logo}
            />
          </View>
          {(!visibleScreen && !isLoggedIn) && (
            <OpeningScreen
              onCreateAccountPress={() => this._setVisibleScreen('signup')}
              onSignInPress={() => this._setVisibleScreen('login')}
            />
          )}
          <KeyboardAvoidingView
            keyboardVerticalOffset={-80}
            behavior={'padding'}
            style={[formStyle, styles.loginSignup]}
          >
            {(visibleScreen === 'signup') && (
              <SignupScreen
                animation={'slideInUp'}
                delay={0}
                duration={300}

                ref={(ref) => this.formRef = ref}
                onLoginLinkPress={() => this._setVisibleScreen('login')}
                onSignupPress={signup}
                isLoading={isLoading}
              />
            )}
            {(visibleScreen === 'login') && (
              <LoginScreen
                animation={'slideInUp'}
                delay={0}
                duration={300}

                ref={(ref) => this.formRef = ref}
                onSignupLinkPress={() => this._setVisibleScreen('signup')}
                onLoginPress={login}
                isLoading={isLoading}
              />
            )}
          </KeyboardAvoidingView>
        </Image>
      </TouchableHighlight>
    );
  }

}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create({
  loginPage: {
    flex: 1,
    flexDirection: 'column',
    width: width,
    height: height,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 15
  },
  logoView: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
  },
  logo: {
    flex: 1,
    width: 250,
    height: null,
    alignSelf: 'center',
    marginVertical: 30,
    resizeMode: 'contain'
  },
  loginSignup: {
    backgroundColor: '#1976D2',
    borderColor: '#fff'
  }
})

export default Login;