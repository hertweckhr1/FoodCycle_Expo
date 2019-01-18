import React from 'react';
import { View, ActivityIndicator } from 'react-native';

// size={size || 'large'} => if we get a prop for size use it, otherwise default to large

const Spinner = ({ size }) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} />
    </View>
  );
};

// flex: 1 => fills up entire screen
// justifycontent and align itmes centers item vertically and horizontally
const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
}

export { Spinner };
