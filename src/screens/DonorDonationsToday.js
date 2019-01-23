import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native' ;
import { H1, Container, Button, Thumbnail, Body, Left, Right, Content, List, ListItem, Text } from 'native-base';
import moment from "moment";

class DonorDonationsToday extends Component {

  render() {
    const { navigation } = this.props;
    const donorID = navigation.getParam('donorID', 'NO-ID');

    const { user, donations, users } = this.props.screenProps
    const filteredDonations = donations.filter(donation => donation['user'] === donorID)
    const today = moment(new Date()).format("YYYY-MM-DD")
    const donationsToday = filteredDonations.filter(donation =>
      moment(donation['pickup_starttime']).format("YYYY-MM-DD") == today);
    const donationsAvailableToday = donationsToday.filter(donation =>
      donation['status'] == 'posted').sort(donation => donation['product_description'])


    const thisUser = (id) => {
      if (id == null) {
        return ""
      } else {
        const rightUser = users.find(user => user['id'] == id)['company_name'];
        return rightUser
      }
    }

    if (donationsAvailableToday.length == 0) {
      return (
        <Container>
          <View style={styles.titleView}>
            <H1 style={styles.headerText}>{thisUser(donorID)} Donations</H1>
          </View>
          <View>
            <Text style={styles.noticeText}>There are currently no available donations at this location.</Text>
          </View>
        </Container>
      )
    } else {
      return (
        <ScrollView>
          <Container>
            <Content>
              <View style={styles.titleView}>
                <H1 style={styles.headerText}>{thisUser(donorID)} Donations Today</H1>
                <Text note style={styles.subTitle}>Donations in List: {donationsAvailableToday.length}</Text>
              </View>
              <List dataArray={donationsAvailableToday}
               renderRow={(donation) =>
                 <ListItem thumbnail>

                   <Body>
                     <Text style={styles.text}>{donation['product_description']}</Text>
                     <Text note style={styles.text}>Type: {donation['product_type']}</Text>
                     <Text style={styles.text} note numberOfLines={1}>Pick Up: {moment(donation['pickup_starttime']).format("hh:mm a")} to {moment(donation['pickup_endtime']).format("hh:mm a")}</Text>
                   </Body>
                   <Right>
                     <View style={{flexDirection: 'column'}}>
                       <Button style={styles.button}
                         onPress={() => this.props.screenProps.updateDonationCallback(user['id'], donation['id'])}>
                         <Text style={styles.buttonText}>Pick Up</Text>
                       </Button>
                       <Button style={styles.button}
                         onPress={() => this.props.navigation.navigate('DoneeDonationDetail', {donationID: donation['id']})}>
                         <Text style={styles.buttonText}>See Details</Text>
                       </Button>
                     </View>
                   </Right>
                 </ListItem>
               }>
              </List>
            </Content>
          </Container>
        </ScrollView>
      );
    }
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
  noticeText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    paddingTop: 20,
    paddingBottom: 10,
    color: '#FF4500',
  },
  button: {
    backgroundColor: 'tomato',
    marginBottom: 5,
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Futura',
  },
  buttonText: {
    fontFamily: 'Futura',
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  subTitle: {
    fontFamily: 'Futura',
    textAlign: 'center'
  }

})

export { DonorDonationsToday };
