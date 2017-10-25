// external modules:

import React from 'react';

import { Container } from 'native-base';

import { ScrollView, StyleSheet, Text, Platform } from 'react-native';

import Panel from 'react-native-panel';

import { CheckBox } from 'react-native-elements';


// own modules:

import Header from './ApplicationHeader';


// class:

class OptionsScreen extends React.Component {
  state = {
    cbxStateImperialUnits: false,
    cbxStateStartInLast:   false
  }  

  render() {
    const imperialChecked = this.state.cbxStateImperialUnits;
    const startInChecked  = this.state.cbxStateStartInLast; 
      
    return (
      <Container>
        <Header 
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Options'
        />
        
        <ScrollView>
          <Panel
            header='General'
            style={styles.optionHeader}
          >
            <CheckBox 
              left
              iconRight
              style={styles.optionCheckbox}
              title='Use imperial units'
              textStyle={[styles.checkboxText, styles.font]}
              checked={this.state.cbxStateImperialUnits}
              onPress={() => this.setState({cbxStateImperialUnits: !imperialChecked})}
            />

            <CheckBox 
              left
              iconRight
              style={styles.optionCheckbox}
              title='Start in last used carpool'
              textStyle={styles.checkboxText}
              checked={this.state.cbxStateStartInLast}
              onPress={() => this.setState({cbxStateStartInLast: !startInChecked})}
            />
          </Panel>  
        
          <Panel
            header='Specific'
            style={styles.optionHeader}
          >
            <Text>I'm an option</Text>
          </Panel>
          
          <Panel
            header='Other'
            style={styles.optionHeader}
          >
            <Text>I'm an option</Text>
          </Panel>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  optionCheckbox: {
    padding: 10
  },
  optionHeader: {
    marginLeft: 20,
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 15
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  }
});

export default OptionsScreen;