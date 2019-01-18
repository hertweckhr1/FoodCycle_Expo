// need to fix so the back button in navigation goes to welcome screen and not home page
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import CheckBox from 'react-native-check-box'
import axios from 'axios';

class SignUpForm extends Component {
  state = {
    email: '',
    password: '',
    isDoner: false,
    pointOfContact: '',
    companyName: '',
    streetAddress: '',
    streetAddress2: '',
    city: '',
    state: '',
    zip: '',
    isDonee: false,
    error: '',
  };

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  onSignUp = () => {
    console.log('Button Pressed!')
    const { email, password, isDoner, pointOfContact, companyName,
      streetAddress, streetAddress2, city, state, zip } = this.state
    const url = `http://127.0.0.1:8000/api/user/create/`;
    axios
      .post(url, {email, password, is_doner: isDoner,
        point_of_contact: pointOfContact, company_name: companyName,
        street_address: streetAddress, street_address2: streetAddress2,
        city, state, zip})
      .then(response => {
        console.log('API Sign Up success!');
        console.log(response);
        this.setState({
          email: '',
          password: '',
          isDoner: false,
          pointOfContact: '',
          companyName: '',
          streetAddress: '',
          streetAddress2: '',
          city: '',
          isDonee: false,
          state: '',
          zip: '',
          error: '',
        });
        this.props.navigation.navigate('Welcome')
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({ error: 'Sign Up attempt failed. Please fill out all fields.' })
      });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Sign Up Here</Text>

          <View style={styles.checkboxInputContainer}>
            <CheckBox style={styles.checkbox}
              onClick={()=>{
                this.setState({
                    isDoner: !this.state.isDoner
                })
              }}
              isChecked={this.state.isDoner}
              leftText={"Doner"}
            />
          </View>
          <View style={styles.checkboxInputContainer}>
            <CheckBox style={styles.checkbox}
              onClick={()=>{
                this.setState({
                    isDonee: !this.state.isDonee
                })
              }}
              isChecked={this.state.isDonee}
              leftText={"Donee"}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Email"
                underlineColorAndroid='transparent'
                onChangeText={email => this.setState({ email: email.toLowerCase() })}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Company Name"
                underlineColorAndroid='transparent'
                onChangeText={companyName => this.setState({ companyName })}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Point of Contact"
                underlineColorAndroid='transparent'
                onChangeText={pointOfContact => this.setState({ pointOfContact })}/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Street Address"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={streetAddress => this.setState({ streetAddress })}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Street Address2(optional)"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={streetAddress2 => this.setState({ streetAddress2 })}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="City"
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={city => this.setState({ city })}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="State"
                underlineColorAndroid='transparent'
                onChangeText={state => this.setState({ state})}/>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Zip"
                underlineColorAndroid='transparent'
                onChangeText={zip => this.setState({ zip })}/>
          </View>


          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                label="Password"
                value={this.state.password}
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={password => this.setState({password: password})}/>
          </View>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
            onPress={() => this.onSignUp()}
          >
            <Text style={styles.loginText}>Sign Up Now</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 50,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    paddingBottom: 30,
    fontFamily: 'Futura',
  },
  inputContainer: {
      borderBottomColor: 'gray',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:300,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  checkboxInputContainer : {
    borderBottomColor: 'gray',
    backgroundColor: 'tomato',
    borderRadius:30,
    borderBottomWidth: 1,
    width:300,
    height:45,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#1E1E1E',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
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
  loginButton: {
    backgroundColor: "tomato",
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorTextStyle: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'blue',
    padding: 10,
    textAlign: 'center'
  },
  checkbox: {
    flex: 1,
    padding: 10,
    height:45,
    marginLeft:16,
  }
});

export default SignUpForm;
