import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DonationDetail extends Component {
  render(){
    console.log('Here we are!')
    // console.log(this.props)
    return(
      <View>
        <Text>Donation Detail</Text>
        <Text>{this.props.donorID}</Text>
      </View>
    )
  }
}

export { DonationDetail };
