import React from 'react';

import { DrawerNavigator } from 'react-navigation';

import Panel from 'react-native-panel'; 
 
import { 
  CheckBox,
  Icon 
} from 'react-native-elements';

import { 
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView
} from 'react-native';

class CarpoolApp extends React.Component {
  render () {
    return (
      <View style = { styles.statusBarEscapeAndroid }>
        <View style={styles.applicationHeader}>
          <Icon
            style={styles.applicationHeaderButton}
            type='material'
            color='white'
            name='list'
            /* onPress={() => this.props.navigation.navigate('DrawerToggle') } */ 
          />
        </View>
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
      <ScrollView>
        
        <Panel
          header='Generic'
        >
          <CheckBox 
            left
            iconRight
            title='Use imperial units'
            checked={false} // {this.state.checked}
          />

          <CheckBox 
            left
            iconRight
            title='Start in last used carpool'
            checked={true} // {this.state.checked}
          />
        </Panel>  
        
        <Panel
          header='Specific'
        >
          <Text>I'm an option</Text>
        </Panel>
        
        <Panel
          header='Other'
        >
          <Text>I'm an option</Text>
        </Panel>
      </ScrollView>
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
  },
  applicationHeader: {
    height: 60,
    padding: 10,
    backgroundColor: '#1976D2'
  },
  applicationHeaderButton: {
    
  }
});

export default CarpoolApp;