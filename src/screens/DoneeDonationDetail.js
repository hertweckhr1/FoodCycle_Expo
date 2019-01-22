import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { H1, Button, Container } from 'native-base';
import moment from 'moment';

class DoneeDonationDetail extends Component {

  render(){
    console.log('Here we are!')
    const { navigation } = this.props;
    const donationID = navigation.getParam('donationID');
    const { user, donations, users } = this.props.screenProps
    const donation = donations.find(donation => donation['id'] == donationID)

    const thisUser = (id) => {
      if (id == null) {
        return ""
      } else {
        const rightUser = users.find(user => user['id'] == id)['company_name'];
        return rightUser
      }
    }

    return(
      <Container>
        <View style={styles.titleView}>
          <H1 style={styles.headerText}>Donation Details</H1>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Description:</Text>
          <Text style={styles.text}>{donation['product_description']}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Product Type:</Text>
          <Text style={styles.text}>{donation['product_type']}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Quantity:</Text>
          <Text style={styles.text}>{donation['quantity']}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Measurement:</Text>
          <Text style={styles.text}>{donation['product_measurement']}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Pickup Time:</Text>
          <Text style={styles.text}>{moment(donation['pickup_starttime']).format("hh:mm a")} to {moment(donation['pickup_endtime']).format("hh:mm a")}</Text>
        </View>
        <View style={styles.textView}>
          <Text style={styles.boldText}>Donee:</Text>
          <Text style={styles.text}>{thisUser(donation['donee'])}</Text>
        </View>

      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  titleView: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#D3D3D3',
    margin: 10,
  },
  textView: {
    flexDirection: 'row',
    margin: 15,
  },
  text: {
    fontFamily: 'Futura',
  },
  boldText: {
    fontFamily: 'Futura',
    fontWeight: 'bold',
    marginRight: 10,
  }
})

export { DoneeDonationDetail };
