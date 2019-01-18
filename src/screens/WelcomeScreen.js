import React from 'react';
import { View, Image, CheckBox } from 'react-native';
import LoginForm from '../components/LoginForm'

class WelcomeScreen extends React.Component {

  render() {
    console.log(JSON.stringify(this.props, null, 2))
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/food-cycle.png')} />
        <LoginForm navigation={this.props.navigation}
          screenProps={{loginUserCallback: this.props.screenProps.loginUserCallback}} />
      </View>
    );
  }
}


export { WelcomeScreen };
