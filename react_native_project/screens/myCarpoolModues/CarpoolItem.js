// external modules

import React from 'react';

import { Text, StyleSheet } from 'react-native';

import { View } from 'react-native-animatable';

import PropTypes from 'prop-types';

import Panel from 'react-native-panel';

import { Icon, Button } from 'react-native-elements';


// own modules


// class

class CarpoolItem extends React.Component {
  static propTypes = {
    title: PropTypes.string
  } 

  renderHeader () {
    const { title } = this.props
    
    return(
      <View
        style={styles.headerContainer}
      >
        <Icon
          name={'settings'}
          size={40}
          color={'white'}
        />
        <Text
          style={styles.headerText}
        >{title}</Text>

      </View>
    );
  }

  render () {
    const { title } = this.props

    return(
      <View
        animation={'slideInDown'}
        delay={0}
        duration={300}
      >
        <Panel
          header={() => this.renderHeader()}
        >
          <Button/>
        </Panel>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    padding: 5,
    backgroundColor: '#303030',
    flexDirection: 'row',
  },
  headerText: {
    color: '#fff'
  }
})

export default CarpoolItem;