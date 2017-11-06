// external modules:

import React from 'react';

import { Constants } from 'expo';

import { StyleSheet, View } from 'react-native';

import Toast from 'react-native-simple-toast';

// own modules:

import DrawNav from './navigation/DrawNav';

import Login from './screens/LoginScreen';

import sha256 from 'sha256';

console.disableYellowBox = true;


//Firebase---------------------------------------------------------------------------------
import * as firebase from 'firebase';
//Initialize Firebase
const firebaseConfig  = {
  apiKey: "AIzaSyDtR2LpBDSbEISKF_iv562aj7rYmBuXovA",
  authDomain: "fahrgemeinschaft-22833.firebaseapp.com",
  databaseURL: "https://fahrgemeinschaft-22833.firebaseio.com",
  storageBucket: "fahrgemeinschaft-22833.appspot.com"
};
firebase.initializeApp(firebaseConfig);

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();

// Get a reference to the database service
var database = firebase.database();
//-----------------------------------------------------------------------------------------


// class:

class CarpoolApp extends React.Component {
  state = {
    isLoggedIn: false,
    isLoading: false,
    isAppReady: false
  }

  _FirebaseFuncton = async (email, password) => {
    //Firebase-Conn---------------------------------------------------------
    try{
      await firebase.database().ref().child('Users').orderByChild('Email').equalTo(email).once('value', function(snap) {
        if (snap.val()){
          var FirebaseSnapshot = snap.val();
          var Userkey = FirebaseSnapshot.User.key;
          UserInDataBase = true;
          if (password == FirebaseSnapshot.User.Password){
            PasswordTrue = true;
          } else{
            PasswordTrue = false;
          }
        }else{
          UserInDataBase = false;
        }
      });
      this._LoginFunction(UserInDataBase, PasswordTrue);
    } catch(error){
      console.error(error);
    }
    //Firebase-Conn---------------------------------------------------------   
  }

  _LoginFunction = (UserInDataBase, PasswordTrue) => {
    if (UserInDataBase) 
    {
      if (PasswordTrue) 
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


  _doLogin = (email, password) => {

    var UserInDataBase;
    var PasswordTrue;

    // start loading for animation
    this.setState({ isLoading: true })
    
    this._FirebaseFuncton(email, sha256(password))
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