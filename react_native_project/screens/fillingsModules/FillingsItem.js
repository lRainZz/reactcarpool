// external modules

import React from 'react';

import { StyleSheet, Text, Platform } from 'react-native';

import { View } from 'react-native-animatable';

import { Icon } from 'react-native-elements';

import Swipeout from 'react-native-swipeout';

import PropTypes from 'prop-types';


// own modules

import StatView from './ItemStatistics';


// class
 
class FillingsItem extends React.Component {
  static propTypes = {
    filling:        PropTypes.object.isRequired,
    
    // isPayed:        PropTypes.bool.isRequired,
    total:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    carpoolMembers: PropTypes.number.isRequired,

    onPressEdit:    PropTypes.func,
    onPressDelete:  PropTypes.func
  }

  state = {
    currentItem: null
  }

  _getPersonalPrice = (totalPrice, personCount, doRound) => {
    let personalPrice = (totalPrice / personCount);

    if (doRound) {
      personalPrice = Math.round(personalPrice);
    }

    return personalPrice.toFixed(2);
  }
  
  render () {
    const { carpoolMembers, onPressEdit, onPressDelete, total, filling } = this.props

    const SwipeDelete = [
      {
        onPress: () => onPressDelete(filling),
        backgroundColor: '#fff',
        component: 
          <View
            style={styles.deleteContainer}
          >
            <Icon 
              name='delete-forever'
              type='material'
              size={30}
              style={styles.delete}
              color='white'
            />
          </View>
      }
    ]
    
    return (
      <Swipeout
        right={SwipeDelete}
        autoClose={true}
        backgroundColor={'#fff'}
      >
        <View
          animation={'slideInDown'}
          delay={0}
          duration={300}
          style={styles.container}
        >
          <View
            style={[styles.top, styles.debug]}
          >
            <Text
              style={[styles.date, styles.debug]}
            >{filling.date}</Text>
            
            <Text
              style={[styles.personalPrice, styles.debug]}
            >{this._getPersonalPrice(total, carpoolMembers, true)} € <Text style={styles.personalPriceSuffix}>P.P.</Text></Text>

            <Text
              style={[styles.total, styles.debug]}
            >{total} €</Text>

            <Icon 
              type='material'
              color='white'
              size={25}
              name='mode-edit'
              style={styles.edit}
              iconStyle={{margin: 5}}
              onPress={() => onPressEdit(filling)}
            />
          </View>

          <View 
            style={styles.divider}
          >
            <View style={styles.seperator}/>
            <View style={styles.seperatorText}>
              <Text style={[styles.font, styles.seperatorCaption]}>BASED ON</Text>
              <Text style={[styles.font, styles.seperatorCaption]}>{carpoolMembers} PEOPLE DROVE</Text>
            </View>
            <View style={styles.seperator}/>
          </View>

          <View
            style={styles.bottom}
          >
            <StatView
              filling={filling}
            />
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    margin: 5,
    justifyContent: 'center',
    flex: 1,

    // box-shadow
    //ios
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // android
    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    minHeight: 40
  },
  date: {
    textAlign: 'left',
    flex: 4,
    fontSize: 18,
    color: '#303030',
    alignSelf: 'center',
    paddingLeft: 10
  },
  personalPrice: {
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 5,
    fontSize: 25,
    alignSelf: 'center',
    color: '#303030'
  },
  personalPriceSuffix: {
    fontSize: 13,
    color: '#9E9E9E'
  },
  total: {
    textAlign: 'right',
    marginRight: 10,
    flex: 3,
    fontSize: 18,
    alignSelf: 'center',
    color: '#303030'
  },
  edit: {
    borderRadius: 25,
    margin: 5,
    marginRight: 10,
    padding: 5,
    backgroundColor: '#1976D2'
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10
  },
  seperator: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#1976D2'
  },
  seperatorText: {
    flexDirection: 'column'
  },
  seperatorCaption: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9E9E9E',
    textAlign: 'center'
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  },
  deleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  delete: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 35 
  },

  debug: {
    // set border with to '1' to debug UI-flex
    borderWidth: 0,
    borderColor: '#000'
  }
})

export default FillingsItem;