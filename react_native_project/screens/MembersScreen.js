// external modules

import React from 'react';

import { AsyncStorage, Text, ScrollView, StyleSheet, View, FlatList } from 'react-native';

import { Fab, Icon } from 'native-base';

import Toast from 'react-native-simple-toast'

import * as firebase from 'firebase';

import sha256 from 'sha256';



//own modules

import MemberItem from './carpoolMemeberModules/MemberItem'

const GLOBALS = require('../globals');


// class

class MembersScreen extends React.Component {
  state = {
    membersArray: null,
    // [
    //   {
    //     id: 0,
    //     name: 'John Doe'
    //   },
    //   {
    //     id: 1,
    //     name: 'Jane Doe'
    //   }
    // ],

    inputMember: false,
    inputMemberObject: null
  }

  componentWillMount () {
    let allCarpoolsObject = Object.entries(GLOBALS.UserCarpools)
    let allUsersObject    = Object.entries(GLOBALS.Users)
    let loadArray         = [];
    let activeCarpool     = GLOBALS.Options.ActiveCarpoolId
    let allow = false

    allCarpoolsObject.forEach(
      carpoolsArray => {
        carpool = carpoolsArray[1]
        if (carpool.CarpoolKey === activeCarpool) {
          let member = {}
          console.log(carpool)
          member.id      = carpool.UserKey
          member.isAdmin = (carpool.Creator == 1)

          // if this is me....
          if (member.id === GLOBALS.UserKey) {
            allow = member.isAdmin
          }

          allUsersObject.forEach(
            usersArray => {
              user = usersArray[1]
              if (member.id == user.key) {
                member.name = user.FullName
              }
            }
          )
          loadArray.unshift(member)
        }    
      }
    )

    this.setState({
      membersArray: loadArray,
      allowedToInvite: allow
    })
  }

  _asyncAddMember = async () => {
    await this._getInputMember();
    
    if (this.state.inputMember) {
      await this._getInputMemberObject();
      this._addMember(this.state.inputMemberObject)
    }
  }

  _getInputMember = async () => {
    let inputMember = await AsyncStorage.getItem('inputMember');
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputMember');
    // string to bool
    inputMember = (inputMember == 'true');
    this.setState({inputMember: inputMember})
  }

  _getInputMemberObject = async () => {
    let inputMemberObject = await AsyncStorage.getItem('inputMemberObject')
    // remove for next use of object transfer
    await AsyncStorage.removeItem('inputMemberObject');
    inputMemberObject = JSON.parse(inputMemberObject);
    this.setState({inputMemberObject: inputMemberObject})
  }

  _addMember = (member) => {
    let activeCarpool = GLOBALS.Options.ActiveCarpoolId

    this.inviteToCarpool(member.name, activeCarpool)
  }

  inviteToCarpool = async (InviteEmail, CarpoolKey) => 
  {
    try
    {
      var isInvitable = true;
      //Check if User exists
      await firebase.database().ref().child('Users').orderByChild('Email').equalTo(InviteEmail).once('value')
      .then((snapshot) =>
      {
        if (snapshot.val()){
          snapshot.forEach((childSnapshot) => {
            var InviteKEY = childSnapshot.key;
            //Check for all Users in Carpool
            firebase.database().ref().child('UserCarpools').orderByChild('CarpoolKey').equalTo(CarpoolKey).once('value')
            .then((snapshot2) =>
            {
              snapshot2.forEach((childSnapshot2) => {
                if (InviteKEY == childSnapshot2.child('UserKey').val()){
                  isInvitable = false;
                }
              })
              if (isInvitable){
                // Get a key for a new UserCarpool.
                UserCarpoolKEY = this._getNewId();
                date = new Date();
                CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
                firebase.database().ref('UserCarpools/' + UserCarpoolKEY).set({
                  key: UserCarpoolKEY,
                  CarpoolKey: CarpoolKey,
                  UserKey: InviteKEY,
                  Invite: '1',
                  Join: '0',
                  Creator: '0',
                  Date: CurrentDate,
                });
              }else{
                Toast.show('User is already a member of the carpool.')
              }
            });
          });
        }else{
          Toast.show('Email does not belong to an existing user.')      
        }
      });
    }catch(error)
    {
      console.error(error);
    }
  }

  _getNewId = () => {
    let Time = (new Date).getTime();
    let Id = sha256(String((Math.round(Math.random() * 1000000) + Time))); //generates Key from random value and epoche timestamp
    return Id 
  }

  
  render () {
    const { membersArray, allowedToInvite } = this.state
    const membersAvailable = (membersArray.length !== 0)
    const containerFlex = (membersAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    
    return (
      <View
        style={[styles.container, containerFlex]}
      >
        {(!membersAvailable) && (
          <Text
            style={[styles.font, styles.emptyText]}
          >{'NO MEMBERS IN HERE'}</Text>
        )}

        {(membersAvailable) && (
          <ScrollView>
            <FlatList
              data={membersArray}
              extraData={this.state}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <MemberItem 
                  member={item}
                  isAdmin={item.isAdmin}
                />
              }
            />
          </ScrollView>
        )}

        {(allowedToInvite) && (
          <Fab
            style={styles.fab}
            onPress={() => this.props.screenProps.rootNavigation.navigate('InviteMember', {
              onGoBack: () => this._asyncAddMember(),
            })}
            >
            <Icon
              name='person-add'
              color='white'
            />
          </Fab>
        )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    backgroundColor: '#1976D2'
  },
})

export default MembersScreen;