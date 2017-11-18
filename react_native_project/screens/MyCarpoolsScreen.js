// external modules

import React from 'react';

import { ScrollView, FlatList, Text } from 'react-native';


// own modules

import CarpoolItem from './myCarpoolModues/CarpoolItem'


// class

class MyCarpoolsScreen extends React.Component {
  state = {
    carpoolsArray: 
    [
      {
        id:     '0',
        member: '4',
        name:   'I\'m a carpool'
      },
      {
        id:     '1',
        member: '3',
        name:   'Nicest carpool EUW'
      }
    ]
  }
  
  render () {
    const { carpoolsArray } = this.state
    
    return(
      <ScrollView>
        <FlatList
          data={carpoolsArray}
          renderItem={({item}) => 
            <CarpoolItem 
              title={item.name}
            />
          }
        />
      </ScrollView>
    );
  }
}

export default MyCarpoolsScreen;