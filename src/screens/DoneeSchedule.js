import React, {Component} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native' ;
import { H1, Container, Button, Thumbnail, Body, Left, Right, Content, List, ListItem, Text } from 'native-base';
import moment from 'moment';

class DoneeSchedule extends Component {
  render() {
    const { user, donations, users } = this.props.screenProps
    const filteredDonations = donations.filter(donation => donation['donee'] === user['id'])

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
            <H1 style={styles.headerText}>{user['company_name']}: Picked-Up Donations</H1>
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
                <H1 style={styles.headerText}>{user['company_name']} Picked-Up Donations</H1>
              </View>
              <List dataArray={filteredDonations}
               renderRow={(donation) =>
                 <ListItem thumbnail>
                   <Left>
                     <Text>{moment(donation['pickup_starttime']).format("MMM Do")}</Text>
                   </Left>
                   <Body>
                     <Text>{donation['product_type']}: {donation['product_description']}</Text>
                     <Text note numberOfLines={1}>Donor: {thisUser(donation['user'])}</Text>
                   </Body>
                   <Right>
                     <Button transparent>
                       <Text>{donation['status']}</Text>
                     </Button>
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
  }

})

export { DoneeSchedule }
