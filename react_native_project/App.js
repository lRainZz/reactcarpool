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

  _FirebaseLoginFunction = async (email, password) => {
    //Firebase-Conn---------------------------------------------------------

    var UserInDataBase;
    var PasswordTrue;

    try{
      await firebase.database().ref().child('Users').orderByChild('Email').equalTo(email).once('value', function(snap) {
        if (snap.val()){
          snap.forEach(function(childSnapshot) {
            var SnapshotKey = childSnapshot.key;
            var Userkey = snap.child(SnapshotKey).child("key").val();
            UserInDataBase = true;
            if (password == snap.child(SnapshotKey).child("Password").val()){
              PasswordTrue = true;
            } else{
              PasswordTrue = false;
            }
          });
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
    // start loading for animation
    this.setState({ isLoading: true })
    
    this._FirebaseLoginFunction(email, sha256(password))
  }



  _FirebaseSignupFunction = async (email, password, fullName, zipCode) => {
    //Firebase-Conn---------------------------------------------------------
    var newUserSuccess;
    try{
      await firebase.database().ref().child('Users').orderByChild('Email').equalTo(email).once('value', function(snap) {
        if (snap.val()){
          console.log('Email in Use');
          newUserSuccess = false;
        }else{
          //do Sign up
          // Get a key for a new User.
          var key = firebase.database().ref().push().key;
          firebase.database().ref('Users/' + key).set({
            key: key,
            Password: password,
            Email: email,
            FullName: fullName,
            ZipCode: zipCode
          });
          newUserSuccess = true;
        }
      });
      this._SignupFunction(newUserSuccess);
    } catch(error){
      console.error(error);
    }
    //Firebase-Conn---------------------------------------------------------   
  }

  
  _SignupFunction = (newUserSuccess) => {
    if (newUserSuccess) 
    {
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
      Toast.show('This Email is already in use.');
    }
  }

  _doSignup = (email, password, fullName, zipCode) => {

    // start loading for animation
    this.setState({ isLoading: true })    
    
    this._FirebaseSignupFunction(email, sha256(password), fullName, zipCode)
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