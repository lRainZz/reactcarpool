// external modules:

import React from 'react';

import { FlatList, ScrollView, StyleSheet, Text, View, Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import * as firebase from 'firebase';

import PropTypes from 'prop-types'


// own modules:

const GLOBALS = require('../globals');

import Header from '../ApplicationHeader';


// class:

class InvitesScreen extends React.Component {
  state = {
    inviteArray: null
  }

  componentWillMount () {
    let invites = Object.entries(GLOBALS.Invites)
    let loadArray = []

    invites.forEach(
      inviteArray => {
        invite = inviteArray[1]
        loadArray.push(invite)
      }
    )

    console.log(loadArray)

    this.setState({inviteArray: loadArray})
  }

  _answerInvOrJoin = (CarpoolObject, Accept) => //Accept is true or false
  {
    let CarpoolKey = CarpoolObject.CarpoolKey;
    let UserCarpoolKey = CarpoolObject.UserCarpoolKey;

    if (Accept){
      firebase.database().ref('UserCarpools/' + UserCarpoolKey).update({
        Invite: '0',
        Join: '0'
      });

        JSONExport_Carpool = {
          [CarpoolKey]: {
            key: CarpoolKey,
            CarpoolName: CarpoolObject.CarpoolName,
            MaxPlace: CarpoolObject.MaxPlace
          }
        }

        JSONExport_UserCarpools = {
          [UserCarpoolKey]: {
            key: UserCarpoolKey,
            CarpoolKey: CarpoolKey,
            UserKey: GLOBALS.UserKey,
            Invite: '0',
            Join: '0',
            Creator: '0',
            Date: CarpoolObject.CurrentDate
          }
        }
      
      //Set globals
      GLOBALS.Carpools = {...GLOBALS.Carpools, ...JSONExport_Carpool};
      GLOBALS.UserCarpools = {...GLOBALS.UserCarpools, ...JSONExport_UserCarpools};
    }else{
      firebase.database().ref('UserCarpools').child(UserCarpoolKey).remove();
    }

    let invites = GLOBALS.Invites
    delete invites[CarpoolKey]
    GLOBALS.Invites = invites

    let stateInvites = this.state.inviteArray

    stateInvites.forEach(
      invite => {
        if (invite.CarpoolKey === CarpoolKey) {
          let index = stateInvites.indexOf(invite)

          stateInvite.splice(index, 1)
        }
      }
    )

    this.setState({inviteArray: stateInvites})
  }

  render () {

    const { inviteArray } = this.state
    const inviteAvailable = (inviteArray.length !== 0)
    const containerFlex = (inviteAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    return (
      <View
        style={{flex: 1}}
      >
        <Header
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Invites'
        />

        <View
          style={[styles.container, containerFlex]}
        >
          {(!inviteAvailable) && (
            <Text
              style={[styles.font, styles.emptyText]}
            >{'NO INVITES YET'}</Text>
          )}

          {(inviteAvailable) && (
            <ScrollView>
              <FlatList
                style={styles.listContainer}
                extraData={this.state}
                data={inviteArray}
                keyExtractor={item => item.CarpoolKey}
                renderItem={({item}) => 
                  <InviteItem
                    joinFunction={(carpool, accept) => this._answerInvOrJoin(carpool, accept)}
                    carpool={item}
                  />
                }
              />
            </ScrollView>
          )}
        </View>
      </View>
    );
  }
      
}

class InviteItem extends React.Component {
  static propTypes = {
    joinFunction: PropTypes.func,
    carpool:      PropTypes.object
  }
  
  _handleJoin = (accept) => { 
    this.props.joinFunction(this.props.carpool, accept)
  }
  
  render () {
    
    const { carpool } = this.props
    return (
      <View
      animation={'slideInDown'}
      delay={0}
      duration={300}
      >
        <View
          style={styles.headerContainer}
        >
          <View
            style={styles.settingsContainer}
          >
            <Icon
              name={'clear'}
              size={40}
              color={'#F44336'}
              style={styles.settings}
              onPress={() => this._handleJoin(false)}
            />
          </View>

          <View
            style={styles.titleContainer}
          >
            <Text
              style={[styles.font, styles.headerText]}
            >{carpool.CarpoolName}</Text>
          </View>

          <View
            style={styles.settingsContainer}
          >
            <Icon
              name={'done'}
              size={40}
              color={'#4CAF50'}
              style={styles.settings}
              onPress={() => this._handleJoin(true)}
            />
          </View>
        </View>
        <View 
          style={styles.seperator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  emptyText: {
    textAlign: 'center',
    color: '#9E9E9E',
    fontSize: 30
  },

  headerContainer: {
    height: 80,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9E9E9E',
    textAlign: 'center'
  },
  titleContainer: {
    flex: 9
  },
  settingsContainer: {
    flex: 2
  },
  iconContainer: {
    flex: 2
  },
  seperator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    backgroundColor: '#1976D2'
  },
  font: {
    fontFamily: Platform.OS == 'android' ? 'Roboto' : ''
  }
});

export default InvitesScreen;
