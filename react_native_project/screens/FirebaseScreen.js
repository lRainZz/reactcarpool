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

  // function writeUserData(userId, name, email) 
  // {
  //   try
  //   {
  //     alert('here');
  //     firebase.database().ref('users/' + userId).set({
  //       username: name,
  //       email: email
  //     });
  //   } catch(error)
  //   {
  //     console.error(error);
  //   }
  // }
//-----------------------------------------------------------------------------------------


// class

class FirebaseScreen extends React.Component {  
    
  writeUserData(userId, name, email) 
  {
    try
    {
      alert('here');
      firebase.database().ref('users/' + userId).set({
        username: name,
        email: email
      });
    } catch(error)
    {
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
          onPress={this.writeUserData.bind(this,'1','Test','test@gmail.com')}
          title="Just do it!"
          color="#841584"
        />
      </Container>
    );
  }
}

export default FirebaseScreen;