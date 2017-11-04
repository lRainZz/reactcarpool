// external modules:

import React from 'react';

import { StyleSheet, Image, Keyboard, Dimensions, View, KeyboardAvoidingView } from 'react-native';

import { Constants } from 'expo';

import { Container, Form, Item, Input, Label } from 'native-base';

import { Button } from 'react-native-elements';

import sha256 from 'sha256';


// own modules:


// class:

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    hash: ''
  }
  
  render () {
    return(
      <Container
        onPress={()=> Keyboard.dismiss()}
      >
        <View style = {styles.statusBarEscapeAndroid} />
        <Image
          source={require('../res/react_carpool_login_background.png')}
          style={styles.backgroundImage}
        >
          <Container
            style={styles.loginTop}
          >
            <Image
              square 
              source={require('../res/react_carpool_logo.png')}
              style={styles.logo}
            />
          </Container>

          <KeyboardAvoidingView
            behavior='padding'
            style={styles.loginBottom}
          >
            <Form
              style={styles.loginForm}
            >
              <Item
                floatingLabel
                rounded='true'
                style={[styles.loginItem, styles.shadow]}
              >
                <Label
                  // native-base label only suport inline style....
                  style={{
                    marginLeft: 20,
                    fontSize: 14
                    }}
                > Username</Label>
                <Input 
                  style={styles.loginInput}
                  onChangeText={(value) => this.setState({username: value})}
                />
              </Item>

              <Item
                floatingLabel
                rounded='true'
                style={[styles.loginItem, styles.shadow]}
              >
                <Label
                  // native-base label only suport inline style....
                  style={{
                    marginLeft: 20,
                    fontSize: 14
                    }}
                >Password</Label>
                <Input 
                  style={styles.loginInput}
                  secureTextEntry={true}
                  onChangeText={(value) => this.setState({
                    password: value,
                    hash: sha256(value)
                  })}
                />
              </Item>
            </Form>

            <Button 
                title= 'Login'
                color='#fff'
                backgroundColor= '#0220ff'
                fontSize={20}
                buttonStyle={[styles.loginButton, styles.shadow]}
                onPress={() => alert(this.state.username + ':' + this.state.hash)}
              />
          </KeyboardAvoidingView>
        </Image>
      </Container>
    );
  }
}

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

const styles = StyleSheet.create ({
  loginTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginBottom: {
    flex: 3,
    justifyContent: 'center'
  },
  backgroundImage: {
    width: width,
    height: height
  },
  logo: {
    height: 180, 
    width: 180 
  },
  loginForm: {
    width: '90%',
    alignItems: 'center',
  },
  loginItem: {
    backgroundColor: '#fff',
    alignSelf: 'center'
  },
  loginLabel: {
    marginLeft: 30
  },
  loginButton: {
    height: 60,
    borderRadius: 30,
    marginTop: 15,
    marginBottom: 15
  },
  statusBarEscapeAndroid: {
    height: Constants.statusBarHeight + 1, // '+ 1' fix for border bug
    backgroundColor: '#ff00ba',
  },
  loginInput: {
    marginLeft: 30,
    fontSize: 18
  },
  shadow: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    elevation: 3
  }
});

export default Login;