import React, { Component } from 'react';
import { View, Text } from 'react-native';

class DonationDetail extends Component {
  render(){
    console.log('Here we are!')

    const { navigation } = this.props;
    const donationID = navigation.getParam('donationID');

    // console.log(this.props)
    return(
      <View>
        <Text>Donation Detail</Text>
        <Text>{donationID}</Text>
      </View>
    )
  }
}

export { DonationDetail };
