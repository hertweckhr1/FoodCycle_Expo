// Import libraries for making a registerComponent
import React from 'react';
import { Text, View } from 'react-native'
//make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  )
};

const styles = {
  viewStyle: {
    flex: 1,
    backgroundColor: '#007aff',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 60,
    paddingTop: 15,
    elevation: 5,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white'
  }

};

//make the component availabel to other parts of the app
export { Header };
