// external modules:

import React from 'react';

import { Container, Content, List, ListItem, Body, Right } from 'native-base';

import { AsyncStorage, ScrollView, StyleSheet, Text, Platform, Switch, View } from 'react-native';

import Panel from 'react-native-panel';

import { CheckBox } from 'react-native-elements';

const GLOBALS = require('../globals');

import * as firebase from 'firebase';

import moment from 'moment'


// own modules:

import Header from '../ApplicationHeader';


// class:

class OptionsScreen extends React.Component {
  
  componentDidMount = async () => { //componentDidMount is triggered onInit ==> Warning: do not change the FunctionName: "componentDidMount"
    try{
      await firebase.database().ref('/Users/' + GLOBALS.UserKey).once('value')
        .then((snap) => {
          if (snap.val()){
            firebase.database().ref('/Options/' + GLOBALS.UserKey).once('value')
              .then((snapshot) =>
              {
                //Get from Firebase
                UseImperialUnits = (snapshot.val() && snapshot.val().UseImperialUnits) || false;
                UseLastCarpool = (snapshot.val() && snapshot.val().UseLastCarpool) || false;
                UseAutoPayment = (snapshot.val() && snapshot.val().UseAutoPayment) || false;
                UseDarkTheme = (snapshot.val() && snapshot.val().UseDarkTheme) || false;
                //Set globals
                GLOBALS.Options.UseImperialUnits = UseImperialUnits;
                GLOBALS.Options.UseLastCarpool = UseLastCarpool;
                GLOBALS.Options.UseAutoPayment = UseAutoPayment;
                GLOBALS.Options.UseDarkTheme = UseDarkTheme;
                date = new Date();
                GLOBALS.Options.ChangeFlag = moment(date).format('YYYY-MM-DD HH:mm:ss');
                this.setState({
                  UseImperialUnits: UseImperialUnits,
                  UseLastCarpool: UseLastCarpool,
                  UseAutoPayment: UseAutoPayment,
                  UseDarkTheme: UseDarkTheme,
                });
              });
          }else{
            //No Connection
            UseImperialUnits = GLOBALS.Options.UseImperialUnits;
            UseLastCarpool = GLOBALS.Options.UseLastCarpool;
            UseAutoPayment = GLOBALS.Options.UseAutoPayment;
            UseDarkTheme = GLOBALS.Options.UseDarkTheme;
            date = new Date();
            GLOBALS.Options.ChangeFlag = moment(date).format('YYYY-MM-DD HH:mm:ss');
            this.setState({
              UseImperialUnits: UseImperialUnits,
              UseLastCarpool: UseLastCarpool,
              UseAutoPayment: UseAutoPayment,
              UseDarkTheme: UseDarkTheme,
            });
          }
      });
      //this.callSetter();
    } catch(error){
      console.error(error);
    }
  }
  
  render () {
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
                onToggleOption={(value) => this.setStorageUseImperialUnits(value)}
                optionValue={GLOBALS.Options.UseImperialUnits} //Important: This is the same Variable as "UseImperialUnits"
                optionItemOnPress=
                {
                  () => this.setState({ "UseImperialUnits": GLOBALS.Options.UseImperialUnits}) //Important: This is the same Variable as "UseImperialUnits"
                }
              />
                <OptionItem
                  optionText='Start in last used carpool'
                  optionHint='Set the last used carpool as homescreen'
                  onToggleOption={(value) => this.setStorageUseLastCarpool(value)}
                  optionValue={GLOBALS.Options.UseLastCarpool} //Important: This is the same Variable as "UseLastCarpool"
                  optionItemOnPress=
                  {
                    () => this.setState({ "UseLastCarpool": GLOBALS.Options.UseLastCarpool}) //Important: This is the same Variable as "UseLastCarpool"
                  }
                />
                <OptionItem
                  optionText='Automatic payment notification'
                  optionHint='When price is calculated, automitcally send out notifications'
                  onToggleOption={(value) => this.setStorageUseAutoPayment(value)}
                  optionValue={GLOBALS.Options.UseAutoPayment} //Important: This is the same Variable as "UseAutoPayment"
                  optionItemOnPress=
                  {
                    () => this.setState({ "UseAutoPayment": GLOBALS.Options.UseAutoPayment}) //Important: This is the same Variable as "UseAutoPayment"
                  }
                />
                <OptionItem
                  optionText='Use dark theme'
                  optionHint=''
                  onToggleOption={(value) => this.setStorageUseDarkTheme(value)}
                  optionValue={GLOBALS.Options.UseDarkTheme} //Important: This is the same Variable as "UseDarkTheme"
                  optionItemOnPress=
                  {
                    () => this.setState({ "UseDarkTheme": GLOBALS.Options.UseDarkTheme}) //Important: This is the same Variable as "UseDarkTheme"
                  }
                />
              </List>
            </Content>
          </Container>
        </ScrollView>
      </Container>
    );
  }
      
  
  setStorageUseImperialUnits = (value) =>
  {
    //this.setState({value});
    try 
    { 
      date = new Date();
      CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
      GLOBALS.Options.UseImperialUnits = value;
      GLOBALS.Options.ChangeFlag = CurrentDate;
      this.setState({UseImperialUnits: value});
      firebase.database().ref('Options/' + GLOBALS.UserKey).update({
        UseImperialUnits: value,
        ChangeFlag: CurrentDate
      });
    } catch (error) 
    { 
      console.error(error);
    }
  }

  setStorageUseLastCarpool = (value) =>
  {
    //this.setState({value}); 
    try 
    { 
      date = new Date();
      CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
      GLOBALS.Options.UseLastCarpool = value;
      GLOBALS.Options.ChangeFlag = CurrentDate;
      this.setState({UseLastCarpool: value});
      firebase.database().ref('Options/' + GLOBALS.UserKey).update({
        UseLastCarpool: value,
        ChangeFlag: CurrentDate
      });
    } catch (error) 
    { 
      console.error(error);
    }
  }
  
  setStorageUseAutoPayment = (value) =>
  {
    //this.setState({value}); 
    try 
    { 
      date = new Date();
      CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
      GLOBALS.Options.UseAutoPayment = value;
      GLOBALS.Options.ChangeFlag = CurrentDate;
      this.setState({UseAutoPayment: value});
      firebase.database().ref('Options/' + GLOBALS.UserKey).update({
        UseAutoPayment: value,
        ChangeFlag: CurrentDate
      });
    } catch (error) 
    { 
      console.error(error);
    }
  }
  
  setStorageUseDarkTheme = (value) =>
  {
    //this.setState({value}); 
    try 
    { 
      date = new Date();
      CurrentDate = moment(date).format('YYYY-MM-DD HH:mm:ss');
      GLOBALS.Options.UseDarkTheme = value;
      GLOBALS.Options.ChangeFlag = CurrentDate;
      this.setState({UseDarkTheme: value});
      firebase.database().ref('Options/' + GLOBALS.UserKey).update({
        UseDarkTheme: value,
        ChangeFlag: CurrentDate
      });
    } catch (error) 
    { 
      console.error(error);
    }
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
