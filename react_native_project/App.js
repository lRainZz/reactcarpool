import React from 'react';

import { DrawerNavigator } from 'react-navigation';

import Panel from 'react-native-panel'; 

import { Constants } from 'expo';

import { 
  Container, 
  Content, 
  List, 
  ListItem 
} from 'native-base';
 
import { 
  CheckBox,
  Icon 
} from 'react-native-elements';

import { 
  StyleSheet,
  Text,
  View,
  // Platform,
  ScrollView,
  Image
} from 'react-native';

class CarpoolApp extends React.Component {
  render () {
    return (
      <View style = { styles.statusBarEscapeAndroid }>
        {/* TODO: own class for application header, use in every screen*/}
        <View style={styles.applicationHeader}>
          <Icon
            style={styles.applicationHeaderButton}
            type='material'
            color='white'
            name='list'
            // onPress={() => this.props.navigation.navigate('DrawerToggle')}
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
  
  state = {
    cbxStateImperialUnits: false,
    cbxStateStartInLast:   false
  }  
  
  render() {
    const imperialChecked = this.state.cbxStateImperialUnits;
    const startInChecked  = this.state.cbxStateStartInLast; 
    
    return (
      <ScrollView>
        
        <Panel
          header='Generic'
          style={styles.optionHeader}
        >
          <CheckBox 
            left
            iconRight
            style={styles.optionCheckbox}
            title='Use imperial units'
            checked={this.state.cbxStateImperialUnits}
            onPress={() => this.setState({cbxStateImperialUnits: !imperialChecked})}
          />

          <CheckBox 
            left
            iconRight
            style={styles.optionCheckbox}
            title='Start in last used carpool'
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
    );
  }
}


const routes = ['Home', 'Options'];

class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          {/* sidebar top background */}
          <Image
            source={require('./res/react_carpool_sidebar_bg.png')}
            style={{
              height: 120,
              width: 370,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>

            {/* sidebar logo */}
            <Image
              square
              style={{ height: 80, width: 80 }}
              source={require('./res/react_carpool_logo.png')}
            />
          </Image>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}

const DrawNav = DrawerNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Options: {
      screen: OptionsScreen,
    }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

const styles = StyleSheet.create({
  statusBarEscapeAndroid: {
    marginTop: Constants.statusBarHeight,
    flex: 1
  },
  applicationHeader: {
    height: 60,
    padding: 10,
    backgroundColor: '#1976D2'
  },
  optionHeader: {
    marginLeft: 20,
    marginTop: 10
  },
  optionCheckbox: {
    color: '#fff'
  },
  applicationHeaderButton: {
    
  }
});

export default CarpoolApp;