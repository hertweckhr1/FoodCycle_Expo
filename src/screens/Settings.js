import React from 'react';
import { ScrollView, StyleSheet, TouchableHighlight } from 'react-native'
import { Container, Left, Right, Content, ListItem, Text, Separator } from 'native-base';
import NavigationService from '../components/NavigationService';

class Settings extends React.Component {
  render() {
    console.log(JSON.stringify({test: true, props: this.props}, null, 2))
    console.log(this.props.screenProps.user)
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
              <Text style={styles.passwordText}>Change Password</Text>
            </ListItem>
            <Separator bordered>
              <Text>LOGOUT</Text>
            </Separator>
            <ListItem>
              <TouchableHighlight style={styles.buttonContainer}
                onPress={() => NavigationService.navigate('Home')}>
                  <Text>Logout</Text>
              </TouchableHighlight>
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
    fontFamily: 'Futura'
  },
  passwordText: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontFamily: 'Futura',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
})

export { Settings };
