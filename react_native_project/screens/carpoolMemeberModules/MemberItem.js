// external modules

import React from 'react';

import { Text, StyleSheet, Platform } from 'react-native';

import { View } from 'react-native-animatable';

import PropTypes from 'prop-types';

import { Icon, Button } from 'react-native-elements';


// own modules

const GLOBALS = require('../../globals');


// class

class MemberItem extends React.Component {
  static propTypes = {
    member: PropTypes.object.isRequired,
    isAdmin:  PropTypes.bool.isRequired,
  } 


  render () {
    const { member, isAdmin } = this.props

    return(
      <View
        animation={'slideInDown'}
        delay={0}
        duration={300}
      >
        <View
          style={styles.headerContainer}
        >
          <View
            style={styles.iconContainer}
          >

          </View>

          <View
            style={styles.titleContainer}
          >
            <Text
              style={[styles.font, styles.headerText]}
            >{member.name}</Text>
          </View>

          <View
            style={styles.settingsContainer}
          >
            <Icon
              name={'stars'}
              size={40}
              color={(isAdmin) ? '#FBC02D' : 'white'}
              style={styles.settings}
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
    color: '#9E9E9E'
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
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
})

export default MemberItem;