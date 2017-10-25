// external modues:
import React from 'react';

import { Text, Platform } from 'react-native';

//own modules:


// class:

class Label extends React.Component {
  render () {
    return(
      <Text 
        {...this.props}
        style={{fontFamily: (Platform.OS == 'android') ? 'Roboto' : ''}}
        >
        </Text>
    );
  }
}



export default Label;