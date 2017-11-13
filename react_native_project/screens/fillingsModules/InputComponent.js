// external modules

import React, { PropTypes } from 'react';

import { Text, TextInput, View, StyleSheet, Platform } from 'react-native';


// own modules


// class


class InputComponent extends React.Component {
  static propTypes = {
    topSeperator:    PropTypes.bool,
    bottomSeperator: PropTypes.bool,

    title:      PropTypes.string.isRequired,
    titleStyle: PropTypes.object,

    inputSuffix: PropTypes.string,

    customInput: PropTypes.object
  }

  state = {
    isFocused: false
  }

  render () {
    const { inputSuffix, title, titleStyle, customInput, ...otherProps } = this.props
    const { isFocused } = this.state

    const topSeperator    = (false || this.props,topSeperator)
    const bottomSeperator = (false || this.props.bottomSeperator)
    const borderColor     = isFocused ? 'white' : 'rgba(255,255,255,0.4)'
    

    focus = () => this.textInputRef.focus()

    return (
      <View
        style={styles.container}
      >
        {(topSeperator) && (
          <View
            style={styles.seperator}
          />
        )}

        <View
          style={styles.content}
        >
          <Text
            style={[titleStyle, styles.font]}
          >{title}</Text>

          {customInput}

          {(!customInput) && (
            <View
              style={styles.inputContainer}
            >
              <TextInput
                ref={(ref) => this.textInputRef = ref}
                autoCapitalize={'none'}
                autoCorrect={false}
                style={styles.textInput}
                maxLength={32}
                underlineColorAndroid={'transparent'}
                placeholderTextColor={'rgba(255,255,255,0.4)'}
                selectionColor={'black'}
                onFocus={() => this.setState({ isFocused: true })}
                onBlur={() => this.setState({ isFocused: false })}
                {...otherProps}
              />
              <Text
                style={[styles.inputSuffix, styles.font]}
              >{inputSuffix}</Text>
            </View>
          )}
        </View>

        {(bottomSeperator) && (
          <View
            style={styles.seperator}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content:{
    flex: 1,
    justifyContent: 'center'
  },
  seperator: {
    borderColor: '#1976D2',
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    alignSelf: 'center',
    width: '100%'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  inputSuffix: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9E9E9E',
    alignSelf: 'center'
  },
  textInput: {
    flex: 1,
    color: 'black',
    fontSize: 20,
    textAlign: 'right',
    alignSelf: 'center',
    marginHorizontal: 5
  },
  font: {
    fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''
  },

})

export default InputComponent;