import React, { Component } from 'react';
import { StyleSheet, View, Flatlist, ScrollView } from 'react-native' ;
import { H1, Container, Button, Thumbnail, Body, Left, Right, Content, List, ListItem, Text } from 'native-base';
import { SearchBar } from 'react-native-elements';
import moment from 'moment';

class FindByProduct extends Component {
    constructor(props) {
    super(props);

    const donations = this.props.screenProps.donations
    const today = moment(new Date()).format("YYYY-MM-DD")
    const donationsToday = donations.filter(donation =>
      moment(donation['pickup_starttime']).format("YYYY-MM-DD") == today);
    const donationsAvailableToday = donationsToday.filter(donation =>
      donation['status'] == 'posted')

    this.state = {
      // loading: false,
      data: donationsAvailableToday,
      error: null,
    };

    this.arrayholder = donationsAvailableToday;
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item['product_description'].toUpperCase()} ${item['product_type'].toUpperCase()}`;
      console.log(itemData)
      const textData = text.toUpperCase();
      console.log(textData)
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    const { user, donations, users } = this.props.screenProps

    const thisUser = (id) => {
      if (id == null) {
        return ""
      } else {
        const rightUser = users.find(user => user['id'] == id)['company_name'];
        return rightUser
      }
    }

    return (
      <ScrollView>
        <Container>
          <Content>
            <View style={styles.titleView}>
              <H1 style={styles.headerText}>Donations Available Today</H1>
            </View>
            <View>
              {this.renderHeader()}
            </View>
            <List dataArray={this.state.data}
             renderRow={(donation) =>
               <ListItem thumbnail>

                 <Body>
                   <Text style={styles.text}>{donation['product_description']}</Text>
                   <Text note style={styles.text}>Type: {donation['product_type']}</Text>
                   <Text note style={styles.text}>Donor: {thisUser(donation['user'])}</Text>
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
    marginBottom: 7,
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'Futura',
  },
  buttonText: {
    fontFamily: 'Futura',
    color: 'white',
    fontSize: 12,
  },
  subTitle: {
    fontFamily: 'Futura',
    textAlign: 'center',
  }

})

export { FindByProduct };
