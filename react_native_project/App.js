// external modules:

import React from 'react';

import { Constants } from 'expo';

import { StyleSheet } from 'react-native';

import Toast from 'react-native-simple-toast';

import { View } from 'react-native-animatable';


// own modules:

import DrawNav from './navigation/DrawNav';

import ModalStackNav from './navigation/ModalStackNav';

import Login from './screens/LoginScreen';

import sha256 from 'sha256';

console.disableYellowBox = true;

import moment from 'moment'


const GLOBALS = require('./globals');


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
//firebase.database().goOffline();

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();

// Get a reference to the database service
var database = firebase.database();
//-----------------------------------------------------------------------------------------


// class:

class CarpoolApp extends React.Component {
  KEY = '';

  state = {
    isLoggedIn: false,
    isLoading: false,
    isAppReady: false,
    
    // debug:
    //isAppReady: true
  }

  _FirebaseLoginFunction = async (email, password) => {
    //Firebase-Conn---------------------------------------------------------

    var UserInDataBase;
    var PasswordTrue;

    try{
      let Connected;

      for (tryCount = 0; tryCount <= 3; tryCount++) {
        firebase.database().ref().child('.info/connected').on('value', function(connectedSnap) {
          if (connectedSnap.val() === true) {
            tryCount = 99
            Connected = true;
          } else {
            Connected = false;
          }
        });
      }
      
      if(Connected){
        await firebase.database().ref().child('Users').orderByChild('Email').equalTo(email).once('value')
        .then(async function(snap) 
        {
          if (snap.val()){
            snap.forEach(async function(childSnapshot) {
              var SnapshotKey = childSnapshot.key;
              var Userkey = snap.child(SnapshotKey).child("key").val();
              var Password = snap.child(SnapshotKey).child("Password").val();
              var Email = snap.child(SnapshotKey).child("Email").val();
              var FullName = snap.child(SnapshotKey).child("FullName").val();
              var ZipCode = snap.child(SnapshotKey).child("ZipCode").val();

              UserInDataBase = true;
              if (password == snap.child(SnapshotKey).child("Password").val()){
                PasswordTrue = true;
                GLOBALS.UserKey = Userkey;
                
                JSONExport_Users = {
                  UserKey: {
                    key: Userkey,
                    Password: Password,
                    Email: Email,
                    FullName: FullName,
                    ZipCode: ZipCode
                  }
                } 
                //Set globals
                GLOBALS.Users = {...GLOBALS.Users, ...JSONExport_Users};


                await firebase.database().ref('/Options/' + Userkey).once('value')
                .then(async function(OptionsSnap) 
                {
                  let UseImperialUnits= OptionsSnap.val().UseImperialUnits;
                  let UseAutoPayment= OptionsSnap.val().UseAutoPayment;
                  let UseLastCarpool= OptionsSnap.val().UseLastCarpool;
                  let UseDarkTheme= OptionsSnap.val().UseDarkTheme;

                  JSONExport_Options = {
                    UserKey: {
                      UseImperialUnits: UseImperialUnits,
                      UseAutoPayment: UseAutoPayment,
                      UseLastCarpool: UseLastCarpool,
                      UseDarkTheme: UseDarkTheme
                    }
                  } 
                  //Set globals
                  GLOBALS.Options.UseImperialUnits = UseImperialUnits;
                  GLOBALS.Options.UseLastCarpool = UseLastCarpool;
                  GLOBALS.Options.UseAutoPayment = UseAutoPayment;
                  GLOBALS.Options.UseDarkTheme = UseDarkTheme;
                  GLOBALS.UserOptions = {...GLOBALS.UserOptions, ...JSONExport_Options}; 


                  await firebase.database().ref().child('UserCarpools').orderByChild('UserKey').equalTo(Userkey).once('value')
                  .then((snapshot2) =>
                  {
                    snapshot2.forEach(async function(childSnapshot2) {
                      CarpoolKey = snapshot2.child(childSnapshot2.key).child("CarpoolKey").val();                  
                      await firebase.database().ref().child('Carpools').orderByChild('key').equalTo(CarpoolKey).once('value')
                      .then(async function(snapshot3)
                      {
                        var MaxPlace = snapshot3.val().MaxPlace;
                        var CarpoolName = snapshot3.val().CarpoolName;
                        //Generate Files in global.js: Carpools
                        JSONExport_Carpool = {
                          KEY: {
                            key: CarpoolKey,
                            MaxPlace: MaxPlace,
                            CarpoolName: CarpoolName
                          }
                        }
                        //Set globals
                        GLOBALS.Carpools = {...GLOBALS.Carpools, ...JSONExport_Carpool};
                        await firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
                        .then((snapshot4) =>
                        {
                          snapshot4.forEach(async function(childSnapshot3) {
                            var UserCarpoolKEY = childSnapshot3.child('key').val();
                            var CurrentDate = childSnapshot3.child('Date').val();
                            JSONExport_UserCarpools = {
                              UserCarpoolKEY: {
                                key: UserCarpoolKEY,
                                CarpoolKey: CarpoolKey,
                                UserKey: GLOBALS.UserKey,
                                Invite: '0',
                                Join: '0',
                                Creator: '1',
                                Date: CurrentDate
                              }
                            }
                            //Set globals
                            GLOBALS.UserCarpools = {...GLOBALS.UserCarpools, ...JSONExport_UserCarpools};
                            if (childSnapshot3.child('Creator').val() == '1'){
                              JSONExport_Creator = {
                                CarpoolKey: {
                                  CarpoolKey: CarpoolKey
                                }
                              }
                              //Set globals
                              GLOBALS.Creator = {...GLOBALS.Creator, ...JSONExport_Creator};
                            }
                          });
                        });
                      });
                    });
                  });
                });
              } else{
                PasswordTrue = false;
              }
            });
          }else{
            UserInDataBase = false;
          }
        });
      this._LoginFunction(UserInDataBase, PasswordTrue);
      }else{
        //Offline ----------------------------------
        let UserPassword;
        if (GLOBALS.UserKey == ''){
          Toast.show('Connection required for first Login');
        }else{
          GLOBALS.Users.forEach(UsersJson => {
            if(UsersJson.Email == email){
              UserInDataBase = true;
              if(UsersJson.Password == password){
                PasswordTrue = true;
                GLOBALS.UserKey = Userkey;
              }else{
                PasswordTrue = false;
              }
            }else{
              UserInDataBase = false;
            }
          });
        }
      }
      this.setState({
        isLoading: false
      })
    } catch(error){
      console.error(error);
    }
    //Firebase-Conn---------------------------------------------------------   
  }

  _LoginFunction = (UserInDataBase, PasswordTrue) => {
    if (UserInDataBase) {
      if (PasswordTrue) {
        // grant login
        this.setState({ 
          isAppReady: true,
          isLoggedIn: true,
          isLoading: false
        })

      } else  {
        
        // stop loading
        this.setState({
          isLoading: false
        });
        Toast.show('I can\'t remember my passwords either :/');
      
      }
    } else {

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
          KEY = firebase.database().ref().push().key;
          firebase.database().ref('Users/' + KEY).set({
            key: KEY,
            Password: password,
            Email: email,
            FullName: fullName,
            ZipCode: zipCode
          });
          //Set globals default
          date = new Date();
          CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
          GLOBALS.Options.UseImperialUnits = false;
          GLOBALS.Options.UseLastCarpool = false;
          GLOBALS.Options.UseAutoPayment = false;
          GLOBALS.Options.UseDarkTheme = false;
          GLOBALS.Options.ChangeFlag = CurrentDate;
          firebase.database().ref('Options/' + KEY).set({
            UseImperialUnits: false,
            UseLastCarpool: false,
            UseAutoPayment: false,
            UseDarkTheme: false,
            ChangeFlag: CurrentDate,
          });
          GLOBALS.UserKey = KEY;
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
          <View
            style={{flex: 1}}
            animation={'fadeIn'}
            delay={0}
            duration={1000}
          >
            <ModalStackNav />
            {/*<DrawNav />*/}
          </View>
        )}

        {(!this.state.isAppReady) && (
          <Login 
            login={this._doLogin}
            signup={this._doSignup}
            isLoggedIn={this.state.isLoggedIn}
            isLoading={this.state.isLoading}
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