// external modules

import React from 'react';

import { AsyncStorage, Text, ScrollView, StyleSheet, View, FlatList } from 'react-native';

import { Fab, Icon } from 'native-base';


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

    allCarpoolsObject.forEach(
        carpoolsArray => {
          carpool = carpoolsArray[1]
          if (carpool.CarpoolKey === activeCarpool) {
            let member = {}
            console.log(carpool)
            member.id      = carpool.UserKey
            member.isAdmin = (carpool.Creator == 1)

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
      membersArray: loadArray
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
    let members   = this.state.membersArray

    // this works because fillings is an array starting at 0
    // object to be added gets a new id, one higher as the highest in fillings
    member.id = members.length;
    members.push(member);

    console.log(member.name)
    
    this.setState({membersArray: members});
  }
  
  render () {
    const { membersArray } = this.state
    const membersAvailable = (membersArray !== null)
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