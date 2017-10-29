// external modules

import React from 'react';

import {AsyncStorage, Button, Text, View } from 'react-native';
import { Container, Content, List, ListItem, Body, Right } from 'native-base';


//own modules


// class

class FillingsScreen extends React.Component {
  render () {
    return (
      <Container>
        <ScrollView>
          <Container>
            <Content>
              <List>
                
              <OptionItem 
                  optionText='Use imperial units'
                  optionHint='E.g. use mph instead of kph'
                  onToggleOption={(value) => this.setState
                  (
                    {imperialState: value }
                  )}
                  optionValue={AsyncStorage.getItem('imperialState')}
                  optionItemOnPress={() => this.setState
                    (
                      { imperialState: !this.state.imperialState }
                    )}
                />
                <Text>Fillings go here1</Text>
                <Button
                  title='Set'
                  onPress=
                  {
                    () => 
                    {
                      AsyncStorage.setItem('imperialState', 'test');
                    }
                  }
                />
                <Button
                  title='Get'
                  onPress=
                    {
                      () => 
                      {
                      alert(await AsyncStorage.getItem('imperialState'));
                      }
                    }
                />
              </List>
            </Content>
          </Container>
        </ScrollView>
      </Container>
    );
  }
}

export default FillingsScreen;