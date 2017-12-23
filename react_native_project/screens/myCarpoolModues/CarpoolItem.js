// external modules

import React from 'react';

import { Text, StyleSheet, Platform } from 'react-native';

import { View } from 'react-native-animatable';

import PropTypes from 'prop-types';

import Panel from 'react-native-panel';

import { Icon, Button } from 'react-native-elements';


// own modules

const GLOBALS = require('../../globals');


// class

class CarpoolItem extends React.Component {
  static propTypes = {
    carpool: PropTypes.object.isRequired,
    active:  PropTypes.bool.isRequired,

    onSetActive: PropTypes.func,
    onDelete:    PropTypes.func
  } 

  renderHeader () {
    const { carpool, active } = this.props
    
    return(
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
          >{carpool.CarpoolName}</Text>
        </View>

        <View
          style={styles.settingsContainer}
        >
          <Icon
            name={'check-circle'}
            size={40}
            color={(active) ? '#4CAF50' : 'white'}
            style={styles.settings}
          />
        </View>
      </View>
    );
  }

  render () {
    const { carpool, onSetActive, onDelete } = this.props
    const isAdmin = (GLOBALS.Creator[carpool.key] != null)

    return(
      <View
        animation={'slideInDown'}
        delay={0}
        duration={300}
      >
        <Panel
          header={() => this.renderHeader()}
        >
          <View 
            style={styles.dropdownFlex}
          >
            <View
              style={styles.dropdown}
            >
              <Button 
                title={'SET AS ACTIVE'}
                fontWeight={'bold'}
                fontSize={18}
                color={'#1976D2'}
                buttonStyle={styles.dropButton}
                containerViewStyle={styles.buttonFlex}
                onPress={() => onSetActive(carpool.key)}
              />
              <Button 
                title={ (isAdmin) ? 'DELETE' : 'LEAVE'}
                fontWeight={'bold'}
                fontSize={18}
                color={'#1976D2'}
                buttonStyle={styles.dropButton}
                containerViewStyle={styles.buttonFlex}
                onPress={() => onDelete(carpool, isAdmin)}
              />
            </View>
          </View>
        </Panel>
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
  dropdownFlex: {
    height: 60
  },
  dropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    marginBottom: 10
  },
  dropButton: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  buttonFlex: {
    flex: 1
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

export default CarpoolItem;