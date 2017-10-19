import React from 'react';

import { StackNavigator } from 'react-navigation';

import { 
  StyleSheet, 
  Text, 
  Button
} from 'react-native';

export default class App extends React.Component {
  render () {
    return (<StackNav />);
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
  headline: {
    color: '#787878',
    fontSize: 30
  }
});
