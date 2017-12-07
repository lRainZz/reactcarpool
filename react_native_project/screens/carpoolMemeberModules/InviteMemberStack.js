// external modules

import React from 'react'

import { View } from 'react-native-animatable'

import { AsyncStorage, StyleSheet } from 'react-native'

import Toast from 'react-native-simple-toast'


// own modules

import InviteMemberView from './InviteMemberView'


// class

class InviteMemberStack extends React.Component {
  
  _setAsyncUpdateObject = async (member) => {
    let valid = this._validateMember(member);
    
    if (!valid) {
      Toast.show('The person you\'re rtying to invite could not be found.', Toast.LONG);
    } else {
      await AsyncStorage.setItem('inputMember', 'true');
      await AsyncStorage.setItem('inputMemberObject', JSON.stringify(member));
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }
  }
  
  _validateMember = (member) => {
    valid = true

    // check in firebase for member
    // valid true

    return valid
  }

  render () {
    return(
      <View
        animation={'fadeIn'}
        duration={300}
        delay={0}
        style={styles.container}
      >
        <InviteMemberView
          onSubmit={(member) => this._setAsyncUpdateObject(member)}
          onCancel={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  }
})

export default InviteMemberStack