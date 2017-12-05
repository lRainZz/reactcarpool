// external modules

import React from 'react'

import { View } from 'react-native-animatable'

import { Text, StyleSheet } from 'react-native'

import PropTypes from 'prop-types'

import { Icon } from 'react-native-elements';


// own modules



// class

class AvailableCarpool extends React.Component {
  static propTypes = {
    onJoinClick: PropTypes.func,
    carpool:     PropTypes.object
  }
  
  render () {
    const { carpool, onJoinClick } = this.props

    return (
      <View
        animation={'slideInDown'}
        duration={300}
        delay={0}
        style={styles.container}
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
          >{carpool.name}</Text>
        </View>

        <View
          style={styles.settingsContainer}
        >
          <Icon
            name={'add'}
            size={40}
            color={'#1976D2'}
            style={styles.settings}
            onPress={() => onJoinClick(carpool)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#1976D2'
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
  }
})

export default AvailableCarpool;