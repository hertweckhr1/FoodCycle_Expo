import React from 'react';
import { View } from 'react-native';

//  props.children - the component from album detail automatically gets rendered here
const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  )
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    elevation: 5,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,

  }
};

export { Card };
