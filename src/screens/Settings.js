import React from 'react';
import { ScrollView, View, StyleSheet, TouchableHighlight } from 'react-native'
import { Container, Left, Button, Right, Content, ListItem, Text, Separator } from 'native-base';
import NavigationService from '../components/NavigationService';

class Settings extends React.Component {
  render() {
    // console.log(JSON.stringify({test: true, props: this.props}, null, 2))
    // console.log(this.props.screenProps.user)
    const user = this.props.screenProps.user
    return (
      <ScrollView>
        <Container>
          <Content>
            <Separator bordered>
              <Text>MY INFO</Text>
            </Separator>
            <ListItem last>
              <Left>
                <Text style={styles.fieldText}>Company Name</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['company_name']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>Point of Contact</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['point_of_contact']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>Email</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['email']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>User Status</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>Doner</Text>
              </Right>
            </ListItem>
            <Separator bordered>
              <Text>ADDRESS</Text>
            </Separator>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>Street Address</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['street_address']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>Street Address2</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['street_address2']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>City</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['city']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>State</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['state']}</Text>
              </Right>
            </ListItem>
            <ListItem>
              <Left>
                <Text style={styles.fieldText}>Zip</Text>
              </Left>
              <Right>
                <Text style={styles.personalText}>{user['zip']}</Text>
              </Right>
            </ListItem>
            <Separator bordered>
              <Text>PASSWORD</Text>
            </Separator>
            <ListItem>
              <Button style={{backgroundColor: 'black', height: 35}}>
                  <Text style={{fontFamily: 'Futura', color: 'white'}}>Change Password</Text>
              </Button>
            </ListItem>
            <Separator bordered>
              <Text>LOGOUT</Text>
            </Separator>
            <ListItem>
              <Button style={{backgroundColor: 'black', height: 35}}
                onPress={() => this.props.navigation.navigate('Welcome')}>
                  <Text style={{fontFamily: 'Futura', color: 'white'}}>Logout</Text>
              </Button>
            </ListItem>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  fieldText: {
    fontFamily: 'Futura',
    fontSize: 14,
    fontWeight: 'bold',
  },
  personalText: {
    fontFamily: 'Futura',
    textAlign: 'right',
  },

})

export { Settings };
