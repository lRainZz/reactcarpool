// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text, Button} from 'react-native';

import * as firebase from 'firebase';


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
    
  writeUserData(userId, name, email) 
  {
    // Write UserData
    try
    {
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
      });
    } catch(error)
    {
      console.error(error);
    }
  }

  readUserData()
  {
    // Read Username or Object
    try
    {
      var userId = '1'; //firebase.auth().currentUser.uid;
      firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) 
      {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        alert(username);
      });
    } catch(error)
    {
      console.error(error);
    }
  }

  updateUserData(userId, username, email) 
  {
    // Update users
    try
    {
      var userData = {
        username: username,
        email: email
      };
    
      // Get a key for a new User.
      var newUserKey = firebase.database().ref().child('users').push().userId;
      
    
      // Write the new user's data simultaneously in multiple lists.
      var updates = {};
      //updates['/users/' + newUserKey] = userData;
      updates['/users/' + userId + '/'] = userData;
    
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
          onPress={this.writeUserData.bind(this,'1' /*firebase.auth().currentUser.uid;*/,'Test','test@gmail.com')}
          title="Set!"
          color="blue"
        />
        <Button
          onPress={this.readUserData.bind(this)}
          title="Get!"
          color="orange"
        />
        <Button
          onPress={this.updateUserData.bind(this, '1' /*firebase.auth().currentUser.uid;*/, 'UpdatedUsername','UpdatedEmail')}
          title="Update!"
          color="red"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;