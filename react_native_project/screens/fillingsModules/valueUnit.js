// external modules

import React, { PropTypes } from 'react';

import { View, StyleSheet, Text, Platform } from 'react-native';


// own moduels


// class

class ValueUnitContainer extends React.Component {
  static propTypes = {
    firstValue:  PropTypes.number,
    secondValue: PropTypes.number,

    firstUnit:   PropTypes.string,
    secondUnit:  PropTypes.string,

    firstValueDesc:  PropTypes.string,
    secondValueDesc: PropTypes.string,

    containerStyle: PropTypes.object
  } 
  
  render() {   
    const { firstValue, firstUnit, secondValue, secondUnit, containerStyle, firstValueDesc, secondValueDesc } = this.props

    return (
      <View
        style={[containerStyle, styles.container]}
      >

        <View
          style={[styles.descriptionContainer, styles.debug]}
        >
          <Text
            style={[styles.font, styles.unitText]}
          >{firstValueDesc}</Text>
          <Text
            style={[styles.font, styles.unitText]}
          >{secondValueDesc}</Text>
        </View>

        <View
          style={[styles.valueContainer, styles.debug]}
        >
          <Text
            style={[styles.font, styles.valueText]}
          >{firstValue}</Text>
          <Text
            style={[styles.font, styles.valueText]}         
          >{secondValue}</Text>
        </View>

        <View
          style={[styles.unitContainer, styles.debug]}
        >
          <Text
            style={[styles.font, styles.unitText]}
          >{firstUnit}</Text>
          <Text
            style={[styles.font, styles.unitText]}
          >{secondUnit}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
container: {
  flexDirection: 'row'
},
descriptionContainer: {
  flex: 6
},
valueContainer: {
  flex: 3
},
unitContainer: {
  flex: 3,
  // pin text to bottom:
  justifyContent: 'space-between'
},
valueText: {
  textAlign: 'right',
  fontSize: 14,
  color: '#303030',
  fontWeight: 'bold'
},
unitText: {
  textAlign: 'left',
  fontSize: 14,
  color: '#9E9E9E',
  fontWeight: 'bold',
  marginLeft: 5,
},
font: {
  fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
},


debug: {
  // set border with to '1' to debug UI-flex
  borderWidth: 0,
  borderColor: '#000'
}

})

export default ValueUnitContainer;