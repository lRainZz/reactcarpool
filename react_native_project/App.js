import React from 'react';

import { DrawerNavigator } from 'react-navigation';

import { 
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

export default class CarpoolApp extends React.Component {
  render () {
    return (
      <View style = { styles.statusBarEscapeAndroid }>
        <DrawNav />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
  };

  render() {
    return (
        <Text>I'm a homescreen!</Text>
    );
  }
}

class OptionsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Options',
  };
  
  render() {
    return (
      <Text>I'm an options screen!</Text>
    );
  }
}

const DrawNav = DrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Opttions: {
    screen: OptionsScreen,
  }
});

const styles = StyleSheet.create({
  statusBarEscapeAndroid: {
    marginTop: (Platform.OS == 'android') ? 24 : 0,
    flex: 1
  }
});
