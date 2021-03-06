// extneral modules:

import React from 'react';

import { Container, Content, List, ListItem } from 'native-base';

import { Image, Text, StyleSheet, Platform, Button } from 'react-native';


// own modules:


// class:

const routes = ['Home', 'Carpools','Options', 'Invites'];

class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>

          <Image
            source={require('../res/react_carpool_sidebar_background.png')}
            style={styles.background}>

            <Image
              square
              style={styles.logo}
              source={require('../res/react_carpool_logo.png')}
            />
          </Image>

          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}
                >
                  <Text
                    style={[styles.font, styles.navOptions]}
                  >{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    height: 200,
    width: null,
    resizeMode: 'stretch',
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: { 
    height: 160, 
    width: 160 
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto': ''
  },
  navOptions: {
    fontSize: 25,
    color: '#303030'
  }
});

export default SideBar;