// external modules

import React from 'react';

import { Text, StyleSheet, Platform ,View } from 'react-native';

import { Container } from 'native-base';

import FloatingButton from 'react-native-action-button';

import FillingsModal from 'react-native-modal'


//own modules


// class

class FillingsScreen extends React.Component {
  
  state = {
    fillingsModalVisible: true
  }

  _showFillingsModal = () => this.setState({ fillingsModalVisible: true})

  _hideFillingsModal = () => this.setState({ fillingsModalVisible: false})

  render () {
    return (
      <Container>
        <Text>Fillings go here</Text>
        <FloatingButton
          buttonColor='#1976D2'
          style={[/*styles.floatingButton, styles.font*/]}
          onPress={() => this._showFillingsModal()}
        />
        <FillingsModal
          isVisible={this.fillingsModalVisible}
          avoidKeyboard={true}
          children= {
          <View
            style={{flex: 1}}
          >
            <Text>Hello World</Text>
          </View>
          }
        >
          <View
            style={{flex: 1}}
          >
            <Text>Hello World</Text>
          </View>
        </FillingsModal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  floatingButton: {
    fontSize: 20
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default FillingsScreen;