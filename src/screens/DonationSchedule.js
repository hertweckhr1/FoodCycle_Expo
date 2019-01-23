import React, {Component} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native' ;
import { H1, Container, Button, Badge, Thumbnail, Body, Left, Right, Content, List, ListItem, Text } from 'native-base';
import moment from "moment";

class DonationSchedule extends Component {
  render() {
    const { user, donations, users } = this.props.screenProps
    const filteredDonations = donations.filter(donation => donation['user'] === user['id'])
    console.log(user)
    const thisUser = (id) => {
      if (id == null) {
        return ""
      } else {
        const rightUser = users.find(user => user['id'] == id)['company_name'];
        return rightUser
      }
    }

    if (filteredDonations.length == 0) {
      return (
        <Container>
          <View style={styles.titleView}>
            <H1 style={styles.headerText}>{user['company_name']} Donations</H1>
          </View>
          <View>
            <Text style={styles.noticeText}>You have no donations logged yet</Text>
          </View>
        </Container>
      )
    } else {
      return (
        <ScrollView>
          <Container>
            <Content>
              <View style={styles.titleView}>
                <H1 style={styles.headerText}>{user['company_name']} Donations</H1>
              </View>
              <List dataArray={filteredDonations}
               renderRow={(donation) =>
                 <ListItem thumbnail>
                   <Left>
                     <Text style={styles.dateText}>{moment(donation['pickup_starttime']).format("MMM Do")}</Text>
                   </Left>
                   <Body>
                     <View style={styles.topLine}>
                       <Text style={styles.text}>{donation['product_description']}</Text>

                       <Badge style={{backgroundColor: 'black'}}>
                         <Text style={{fontFamily: 'Futura', fontSize: 12}}>{donation['status']}</Text>
                       </Badge>
                     </View>
                     <Text note>Type: {donation['product_type']} </Text>

                     <Text note numberOfLines={1} style={{ marginTop: 5 }}>Donee: {thisUser(donation['donee'])}</Text>
                     <View style={styles.donationButtonList}>
                       <Button style={styles.detailButton}
                          onPress={() => this.props.navigation.navigate('DonorDonationDetail', {donationID: donation['id']})}>
                         <Text style={styles.buttonText}>Details</Text>
                       </Button>
                       <Button style={styles.detailButton}
                          onPress={() => this.props.screenProps.deleteDonationCallback(donation['id'])}>
                         <Text style={styles.buttonText}>Delete</Text>
                       </Button>
                     </View>

                   </Body>
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
  detailButton: {
    backgroundColor: 'tomato',
    color: 'white',
    height: 25,
    width: 80,
    marginRight: 7,
    justifyContent: 'center',
  },
  donationButtonList: {
    flexDirection: 'row',
    marginTop: 5,
  },
  buttonText: {
    fontFamily: 'Futura',
    fontSize: 12,
    textAlign: 'center',
  },
  topLine: {
    flexDirection: 'row',
  },
  dateText: {
    fontFamily: 'Futura',
    fontWeight: 'bold',
    textAlignVertical: 'top',
  },
  badge: {
    backgroundColor: 'black',
    fontFamily: 'Futura',
  },
  text: {
    fontFamily: 'Futura'
  }
})

export { DonationSchedule }
