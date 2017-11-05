// external modules:

import React from 'react';

import { Constants } from 'expo';

import { StyleSheet, View } from 'react-native';

import Toast from 'react-native-simple-toast';

// own modules:

import DrawNav from './navigation/DrawNav';

import Login from './screens/LoginTestScreen';


// class:

class CarpoolApp extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
    isAppReady: false
  }

  _doLogin = (email, password) => {
    // debug
    checkpasswordToUser = true; //Function Call needed for Authentication
    usernameInDatabase = true; //Check for existing User

    //Firebase-Conn---------------------------------------------------------
    
    //Firebase-Conn---------------------------------------------------------

    // start loading for animation
    this.setState({ isLoading: true })

    if (usernameInDatabase) 
    {
      if (checkpasswordToUser) 
      {

        // grant login
        this.setState({ 
          isAppReady: true,
          isLoggedIn: true,
          isLoading: false
        })

      } else 
      {
        // stop loading
        this.setState({
          isLoading: false
        });
        Toast.show('I can\'t remember my passwords either :/');
      }
    } else 
    {
      // stop loading
      this.setState({
        isLoading: false
      });
      Toast.show('Seems like you\'re new here.');
    }
  }

  _doSignup = (email, password, fullName) => {
    
    // start loading for animation
    this.setState({ isLoading: true })
    
    // save data to db

    if (newUserSuccess) {
      this.setState({ 
        isAppReady: true,
        isLoggedIn: true,
        isLoading: false
      })
    } else {
      // stop loading
      this.setState({
        isLoading: false
      });
      Toast.show('Somthing wen\'t wrong. Try again.');
    }
  }

  
  render () {
    
    var statusBarColor;

    if (this.state.isAppReady) {
      statusBarColor = styles.inAppColor
    } else {
      statusBarColor = styles.loginColor
    }
    
    return (
      <View style= {{flex: 1}}>
        <View style = {[styles.statusBarEscapeAndroid, statusBarColor]} />

        {(this.state.isAppReady) && (
          <DrawNav />
        )}

        {(!this.state.isAppReady) && (
          <Login 
            login={this._doLogin}
            signup={this._doSignup}
            isLoggedIn={this.state.isLoggedIn}
            isLoading={this.state.isLoading}
            onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
          />
        )}
      </View>      
    );
  }
}

const styles = StyleSheet.create({
  statusBarEscapeAndroid: {
    height: Constants.statusBarHeight,
  },
  loginColor: {
    backgroundColor: '#ff00ba'
  },
  inAppColor: {
    backgroundColor:'#1976D2'
  }
});

export default CarpoolApp;