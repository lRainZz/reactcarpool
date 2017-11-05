// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';

import sha256 from 'sha256';


//own modules

import Header from '../ApplicationHeader';



//Firebase---------------------------------------------------------------------------------
  //Initialize Firebase
  const firebaseConfig  = {
    apiKey: "AIzaSyDtR2LpBDSbEISKF_iv562aj7rYmBuXovA",
    authDomain: "fahrgemeinschaft-22833.firebaseapp.com",
    databaseURL: "https://fahrgemeinschaft-22833.firebaseio.com",
    storageBucket: "fahrgemeinschaft-22833.appspot.com"
  };
  firebase.initializeApp(firebaseConfig );

  // Create a reference with .ref() instead of new Firebase(url)
  // const rootRef = firebase.database().ref();
  // const itemsRef = rootRef.child('items');

  // Get a reference to the database service
  var database = firebase.database();
//-----------------------------------------------------------------------------------------


// class

class FirebaseScreen extends React.Component { 
  
  createUser(Password, Email, FirstName, LastName, ZipCode, City)
  {
    try
    {
      firebase.auth().createUserWithEmailAndPassword(Email, Password).catch(function(error) 
      {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    }catch(error)
    {
      alert('error');
      console.error(error);
    }
  }
    
  writeUserData(Password, Email, FirstName, LastName, ZipCode, City) 
  {
    // Write UserData
    try
    {
      // Get a key for a new User.
      var key = firebase.database().ref().push().key;
      firebase.database().ref('Users/' + key).set({
        Password: Password,
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        ZipCode: ZipCode,
        City: City
      });
    } catch(error)
    {
      alert('error');
      console.error(error);
    }
  }

  readUserData()
  {
    // Read Username or Object
    try
    {
      var UserID = firebase.auth().currentUser.uid;
      firebase.database().ref('/Users/' + UserID).once('value').then(function(snapshot) 
      {
        var Email = (snapshot.val() && snapshot.val().Email) || 'Anonymous';
        alert(Email);
      });
    } catch(error)
    {
      alert('error');
      console.error(error);
    }
  }

  updateUserData(Password, Email, FirstName, LastName, ZipCode, City) 
  {
    // Update users
    try
    {
      var UserID = firebase.auth().currentUser.uid;
      var userData = {
        Password: Password,
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        ZipCode: ZipCode,
        City: City
      };
    
      // Write the new user's data simultaneously in multiple lists.
      var updates = {};
      //updates['/users/' + newUserKey] = userData; --If syncronous second Update on other Table is necessary
      updates['/Users/' + UserID + '/'] = userData;
    
      return firebase.database().ref().update(updates);
    } catch(error)
    {
      alert('error');
      console.error(error);
    }
  }

  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Firebase'  
        />
        <Text>Firebase go here</Text>
        <Button
          onPress={this.createUser.bind(this, sha256('Password'), 'Email', 'FirstName', 'LastName', 'ZipCode', 'City')}
          title="Create!"
          color="green"
        />
        <Button
          onPress={this.writeUserData.bind(this, sha256('Password'), 'Email', 'FirstName', 'LastName', 'ZipCode', 'City')}
          title="Set!"
          color="blue"
        />
        <Button
          onPress={this.readUserData.bind(this)}
          title="Get!"
          color="orange"
        />
        <Button
          onPress={this.updateUserData.bind(this, sha256('Updated_Password'), 'Updated_Email', 'Updated_FirstName', 'Updated_LastName', 'Updated_ZipCode', 'Updated_City')}
          title="Update!"
          color="red"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;