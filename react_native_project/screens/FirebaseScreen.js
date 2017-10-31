// external modules

import React,  {Component} from 'react';

import { Container } from 'native-base';

import { Text } from 'react-native';

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
  const rootRef = firebase.database().ref();
  const itemsRef = rootRef.child('items');
//-----------------------------------------------------------------------------------------


// class

class FirebaseScreen extends React.Component {
  render () {
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Firebase'  
        />
        <Text>Firebase go here</Text>
      </Container>
    );
  }
}

export default FirebaseScreen;