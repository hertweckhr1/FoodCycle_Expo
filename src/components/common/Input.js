import React from 'react';
import { TextInput, View, Text } from 'react-native';

// autoCorrect=false makes it so autocorrect does not pop up when use is typing
// secureTextEntry takes a boolean:
// if true, then it will have secure text entry for passwords(won't show password)

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}

// inputStyle and labelStyle are siblings
// giving flex to both in styles, shows how much they will take up since they are right next to each other
// inputStyle will take up 2/3 while labelStyle will take up 1/3
const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  }
};

export { Input };
