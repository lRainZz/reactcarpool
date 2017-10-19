import React from 'react';

import StackNavigator from 'react-navigation';

import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar 
} from 'react-native';

export default class App extends React.Component {
  render () {
    return <StackNav />;
  }

}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render () {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="goto profiles"
        onPress={()=> 
          navigate('Profile', { name: 'Profiles'})
        }
      />
    );

  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'Profiles',
  };
  render () {
    const { navigate } = this.props.navigation;
    return (
      <Text style={styles.headline}>This is a profile screen</Text>
    );
  }
}

const StackNav = StackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
    color: '#787878',
    fontSize: 30
  }
});
