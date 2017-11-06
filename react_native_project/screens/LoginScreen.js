// external modules:

import React, { PropTypes } from 'react';

import { TouchableHighlight, Dimensions, KeyboardAvoidingView, LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native'

import { Image, View } from 'react-native-animatable'

import Toast from 'react-native-simple-toast';


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
    login: PropTypes.func.isRequired
  }

  state = {
    visibleScreen: null,
    boredomCount: 0
  }

  _onScreenChange = async (nextScreen) => {
    await this._setVisibleScreen(nextScreen)
    await this.logoRef.bounceIn(800)
    this.setState({boredomCount: (this.state.boredomCount + 1)})
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

    if (this.state.boredomCount >= 14) {
      this.setState({boredomCount: 0})
      Toast.show('A little bit bored, are we?', Toast.LONG);
    }

    return(
      <TouchableHighlight
        onPress={() => this._onScreenChange(null)}
        style={{flex: 1}}
        activeOpacity={100}
      >
        <Image 
          source={react_carpool_login_background}
          style={styles.loginPage}
        >
          <View
            animation={'bounceIn'}
            duration={1200}
            delay={0}
            style={styles.logoView}

            ref={(ref) => this.logoRef = ref}
          >
            <Image
              animation={'pulse'}
              duration={5000}
              delay={0}
              iterationCount={'infinite'}

              style={styles.logo}
              source={react_carpool_logo}
            />
          </View>
          {(!visibleScreen && !isLoggedIn) && (
            <OpeningScreen
              onCreateAccountPress={() => this._onScreenChange('signup')}
              onSignInPress={() => this._onScreenChange('login')}
            />
          )}
            {(visibleScreen === 'signup') && (
              <SignupScreen
                ref={(ref) => this.formRef = ref}
                onLoginLinkPress={() => this._onScreenChange('login')}
                onSignupPress={signup}
                isLoading={isLoading}
              />
            )}
            {(visibleScreen === 'login') && (
              <LoginScreen
                ref={(ref) => this.formRef = ref}
                onSignupLinkPress={() => this._onScreenChange('signup')}
                onLoginPress={login}
                isLoading={isLoading}
              />
            )}
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
  }
})

export default Login;