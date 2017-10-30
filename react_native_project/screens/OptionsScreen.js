// external modules:

import React from 'react';

import { Container, Content, List, ListItem, Body, Right } from 'native-base';

import { AsyncStorage, ScrollView, StyleSheet, Text, Platform, Switch } from 'react-native';

import Panel from 'react-native-panel';

import { CheckBox } from 'react-native-elements';


// own modules:

import Header from '../ApplicationHeader';


// class:

class OptionsScreen extends React.Component {
  state = {
    imperialState:    false,
    startInLastState: false,
    autoPaymentState: false,
    darkThemeState:   false
  };

  render() {
    return (
      <Container>
        <Header
          onHeadButtonPress={() => this.props.navigation.navigate('DrawerToggle')}
          title='Options'
        />

        <ScrollView>
          <Container>
            <Content>
              <List>
                <OptionItem 
                  optionText='Use imperial units'
                  optionHint='E.g. use mph instead of kph'
                  onToggleOption={(value) => this.setState
                  (
                    {imperialState: value }, () => 
                    {
                      AsyncStorage.setItem('imperialState', this.state.imperialState);
                    }
                  )}
                  optionValue={AsyncStorage.getItem('imperialState')}
                  optionItemOnPress={() => this.setState
                    (
                      { imperialState: !this.state.imperialState },() => 
                      {
                        AsyncStorage.setItem('imperialState', this.state.imperialState);
                      }
                    )}
                />
                <OptionItem 
                  optionText='Start in last used carpool'
                  optionHint='Set the last used carpool as homescreen'
                  onToggleOption={(value) => this.setState
                  (
                    {startInLastState: value }, () => 
                    {
                      AsyncStorage.setItem('startInLastState', this.state.startInLastState);
                    }
                  )}
                  optionValue={AsyncStorage.getItem('startInLastState')}
                  optionItemOnPress={() => this.setState
                    (
                      { startInLastState: !this.state.startInLastState },() => 
                      {
                        AsyncStorage.setItem('startInLastState', this.state.startInLastState);
                      }
                    )}
                />
                <OptionItem 
                  optionText='Automatic payment notification'
                  optionHint='When price is calculated, automitcally send out notifications'
                  onToggleOption={(value) => this.setState
                  (
                    {autoPaymentState: value }, () => 
                    {
                      AsyncStorage.setItem('autoPaymentState', this.state.autoPaymentState);
                    }
                  )}
                  optionValue={AsyncStorage.getItem('autoPaymentState')}
                  optionItemOnPress={() => this.setState
                    (
                      { autoPaymentState: !this.state.autoPaymentState },() => 
                      {
                        AsyncStorage.setItem('autoPaymentState', this.state.autoPaymentState);
                      }
                    )}
                />
                <OptionItem 
                  optionText='Use dark theme'
                  optionHint=''
                  onToggleOption={(value) => this.setState
                  (
                    {darkThemeState: value }, () => 
                    {
                      AsyncStorage.setItem('darkThemeState', this.state.darkThemeState);
                    }
                  )}
                  optionValue={AsyncStorage.getItem('darkThemeState')}
                  optionItemOnPress={() => this.setState
                    (
                      { darkThemeState: !this.state.darkThemeState },() => 
                      {
                        AsyncStorage.setItem('darkThemeState', this.state.darkThemeState);
                      }
                    )}
                />
              </List>
              {/* iteratively not possible right now, because render is called multiple times an fucks up the onValueChange
                <List
                  dataArray={options}
                  renderRow={data => {
                    return (
                      <ListItem>
                        <Body>
                          <Text 
                            style={styles.optionText}
                          >
                            {data[0]}
                          </Text>
                          <Text 
                            style={styles.optionHint}
                          >
                            {data[1]}
                          </Text>
                        </Body>
                        <Right>
                          <Switch
                            onValueChange={(value) => this.setState({imperialState: value})}
                            value={this.state[data[2]]}
                          />
                        </Right>
                      </ListItem>
                      
                    );
                  }}
                /> */}
            </Content>
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

class OptionItem extends React.Component {
  render () {
    return (
      <ListItem
        onPress={this.props.optionItemOnPress}
      >
        <Body>
          <Text 
            style={[styles.optionText, styles.font]}
          >
            {this.props.optionText}
          </Text>
          <Text 
            style={[styles.optionHint, styles.font]}
          >
            {this.props.optionHint}
          </Text>
        </Body>
        <Right>
          <Switch 
            onValueChange={this.props.onToggleOption}
            value={this.props.optionValue}
          />
        </Right>
    </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  optionText: {
    marginLeft: 10,
    fontSize: 22,
    color: '#303030'
  },
  optionHint: {
    marginLeft: 20,
    fontSize: 15,
    color: '#9E9E9E'
  },
  font: {
    fontFamily: Platform.OS == 'android' ? 'Roboto' : ''
  }
});

export default OptionsScreen;