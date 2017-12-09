// external modules

import React from 'react';

import { View, Text, StyleSheet, Platform, ScrollView, FlatList } from 'react-native'

import Toast from 'react-native-simple-toast'


// own modules

import AvailableCarpool from './availableCarpoolsModules/AvailableCarpool'

// class

class AvailableCarpoolsScreen extends React.Component {
  state = {
    carpoolsArray: null 
    // // debug:
    // [
    //   {
    //     id:     '0',
    //     member: '4',
    //     name:   'I\'m a carpool',
    //     icon:   ''
    //   },
    //   {
    //     id:     '1',
    //     member: '3',
    //     name:   'Nicest carpool EUW',
    //     icon:   ''
    //   }
    // ]
  }

  componentWillMount () {
    // load carpools
  }

  _sendJoinRequest = (carpool) => {
    // send join request

    Toast.show('A join request has been sent.', Toast.LONG)
  }
  
  render () {
    const carpoolsAvailable = (carpoolsArray !== null)
    const { carpoolsArray } = this.state
    const containerFlex = (carpoolsAvailable) ? { } : {justifyContent: 'center', alignItems: 'center'}

    return(
      <View
        style={[styles.container, containerFlex]}
      >

        {(!carpoolsAvailable) && (
          <View>
            <Text
              style={[styles.font, styles.emptyText]}
            >{'NO CARPOOLS IN HERE'}</Text>
            <Text
              style={[styles.font, styles.emptyText]}
            >{'MAYBE TRY RELOADING THE PAGE'}</Text>
          </View>
        )}

        {(carpoolsAvailable) && (
          <ScrollView>
            <FlatList
              data={carpoolsArray}
              extraData={this.state}
              keyExtractor={item => item.id}
              renderItem={({item}) => 
                <AvailableCarpool
                  carpool={item}
                  onJoinClick={(carpool) => this._sendJoinRequest(carpool)}
                />
              }
            />
          </ScrollView>
        )}

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
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
})

export default AvailableCarpoolsScreen;