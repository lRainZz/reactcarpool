// external modules

import React, { PropTypes } from 'react';

import { Text, TextInout, View, StyleSheet } from 'react-native';


// own modules


// class


class InputComponent extends React.Component {
  static propTypes = {
    topSeperator:    PropTypes.bool,
    bottomSeperator: PropTypes.bool,

    title:      PropTypes.string.isRequired,
    titleStyle: PropTypes.style,

    customInput: PropTypes.Component
  }

  state = {
    isFocused: false
  }

  render () {
    const { title, titleStyle, customInput, ...otherProps } = this.props

    const topSeperator    = false || this.props,topSeperator
    const bottomSeperator = false || this.props.bottomSeperator
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
        

        <View>
          <Text
            style={titleStyle}
          >{title}</Text>

          {(customInput) && (
            <customInput 
              {...otherProps}
            />
          )}

          {(!customInput) && (
            <TextInput
              ref={(ref) => this.textInputRef = ref}
              autoCapitalize={'none'}
              autoCorrect={false}
              style={[styles.textInput, { color }]}
              maxLength={32}
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'rgba(255,255,255,0.4)'}
              selectionColor={'white'}
              onFocus={() => this.setState({ isFocused: true })}
              onBlur={() => this.setState({ isFocused: false })}
              {...otherProps}
            />
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
    flex: 1
  },
  seperator: {
    flex: 1,
    borderColor: '#0220ff',
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    width: '90%'
  }

})

export default InputComponent;