import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// props.children => gives what's imbetween the component tags in the parent tag


const Button = ({ onPress, children }) => {
  const {buttonStyle, textStyle} = styles;

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Marker Felt'
  },
  buttonStyle: {
    // flex: 1 will fill the container
    // alignself tied to flexbox - streches to fill limits of container
    alignSelf: 'stretch',
    backgroundColor: "tomato",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 15,
    marginRight: 20,
    marginLeft: 20,
  }
}

export { Button };
