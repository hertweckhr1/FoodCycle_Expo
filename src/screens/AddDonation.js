// Doner needs to automatically be user logged in in axios post request
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  ScrollView,
  Picker
} from 'react-native';
import axios from 'axios';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Icon } from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';


class AddDonation extends Component {
  // donor should be user signed in
  state = {
    productType: '',
    productDescription: '',
    measurement: '',
    quantity: '',
    pickupDetails: '',
    pickupStartTime: '',
    pickupEndTime: '',
    error: '',
    isStartTimePickerVisible: false,
    isEndTimePickerVisible: false,
    productOptions: ["Meat or Fish", "Produce", "Dairy", "Beverages",
      "Chilled or Frozen", "Shelf Stable"],
    measurementOptions: ["lb", "crates", "liters", "gallons", "bags", "pieces"],
  };

  handleStartDatePicked = (datetime) => {
    // console.log('A date has been picked:');
    // console.log(datetime.toString());
    // console.log(typeof datetime)
    const newDate = new Date(datetime)
    // console.log(newDate);
    // const formattedDate = datetime.toString()
    this.setState({
      isStartTimePickerVisible: false,
      pickupStartTime: newDate
    })

  };

  resetState = () => {
    this.setState({
      productType: "",
      productDescription: '',
      measurement: "",
      quantity: '',
      pickupDetails: '',
      pickupStartTime: '',
      pickupEndTime: '',
      error: '',
      isStartTimePickerVisible: false,
      isEndTimePickerVisible: false,
      productOptions: ["Meat or Fish", "Produce", "Dairy", "Beverages",
        "Chilled or Frozen", "Shelf Stable", ""],
      measurementOptions: ["lb", "crates", "liters", "gallons", "bags", "pieces", ""],

    });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    await this.props.screenProps.addDonationCallback(this.state);
    console.log("3");
    await this.resetState();
    await this.resetDropdown.select(-1)
    await this.resetDropdownType.select(-1)


  }

  showStartTimePicker = () => this.setState({ isStartTimePickerVisible: true });
  hideStartTimePicker = () => this.setState({ isStartTimePickerVisible: false });

  handleEndDatePicked = (datetime) => {
    const newDate = new Date(datetime)
    this.setState({
      isEndTimePickerVisible: false,
      pickupEndTime: newDate
    })
  };

  showEndTimePicker = () => this.setState({ isEndTimePickerVisible: true });
  hideEndTimePicker = () => this.setState({ isEndTimePickerVisible: false });


  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Add Donation</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Product Type</Text>
            <ModalDropdown ref={ (ref) => this.resetDropdownType = ref }
              textStyle={{color: 'gray', padding: 30, fontFamily: 'Futura'}}
              dropdownStyle={{height: 210}}
              dropdownTextStyle={{color: 'black', backgroundColor: '#9ACD32',
                width:130, textAlign: 'center', fontFamily: 'Futura'}}
              dropdownTextHighlightStyle={{backgroundColor: 'tomato'}}
              defaultValue="Please choose..."
              options={this.state.productOptions}
              value={this.state.productOptions}
              onSelect={ value => this.setState({ productType: (String(this.state.productOptions[value]) )})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Product Description</Text>
            <TextInput style={styles.inputs}
                placeholder="Product Description"
                underlineColorAndroid='transparent'
                value={this.state.productDescription}
                onChangeText={ productDescription => this.setState({ productDescription })}/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Measurement</Text>
            <ModalDropdown ref={ (ref) => this.resetDropdown = ref }
              dropdownStyle={{height: 210}}
              textStyle={{color: 'gray', padding: 30, fontFamily: 'Futura'}}
              dropdownTextStyle={{color: 'black', backgroundColor: '#9ACD32',
                width:80, textAlign: 'center', fontFamily: 'Futura'}}
              dropdownTextHighlightStyle={{backgroundColor: 'tomato'}}
              value={this.state.measurement}
              onSelect={ value => this.setState({ measurement: (String(this.state.measurementOptions[value]) )})}
              options={this.state.measurementOptions}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Quantity</Text>
            <TextInput style={styles.inputs}
                placeholder="Quantity"
                underlineColorAndroid='transparent'
                value={this.state.quantity}
                onChangeText={quantity => this.setState({ quantity })}/>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.dateText}>Pickup Details</Text>
            <TextInput style={styles.inputs}
                placeholder="Pick Up Details"
                underlineColorAndroid='transparent'
                value={this.state.pickupDetails}
                onChangeText={pickupDetails => this.setState({ pickupDetails })}/>
          </View>
          <View style={styles.outsideDateContainer}>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Start Time</Text>
              <Text style={styles.dateInnerText}>{this.state.pickupStartTime.toString().slice(4,21)}</Text>
              <TouchableOpacity style={styles.button} onPress={this.showStartTimePicker}>
                <Icon style={styles.dateIcon} name="calendar" size={40} color='white' />
              </TouchableOpacity>
              <DateTimePicker
                cancelTextIOS={'Exit'}
                confirmTextIOS={'OK'}
                cancelTextStyle={{color: 'red', fontSize: 20}}
                confirmTextStyle={{color: 'blue', fontSize: 20}}
                isVisible={this.state.isStartTimePickerVisible}
                onConfirm={this.handleStartDatePicked}
                onCancel={this.hideStartTimePicker}
                mode={'datetime'}
                is24Hour={true}
              />
            </View>
            <View style={styles.dateContainer}>
              <View style={styles.dateTextContainer}>
                <Text style={styles.dateText}>End Time</Text>
                <Text style={styles.dateInnerText}>{this.state.pickupEndTime.toString().slice(4,21)}</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={this.showEndTimePicker}>
                <Icon style={styles.dateIcon} name="calendar" size={40} color='white' />
              </TouchableOpacity>
              <DateTimePicker
                cancelTextIOS={'Exit'}
                confirmTextIOS={'OK'}
                cancelTextStyle={{color: 'red', fontSize: 20}}
                confirmTextStyle={{color: 'blue', fontSize: 20}}
                isVisible={this.state.isEndTimePickerVisible}
                onConfirm={this.handleEndDatePicked}
                onCancel={this.hideEndTimePicker}
                mode={'datetime'}
                is24Hour={false}
              />
            </View>
          </View>

          <Text style={styles.errorTextStyle}>{this.state.error}</Text>

          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.onSubmit}
          >
            <Text style={styles.loginText}>Add Donation</Text>
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
    padding: 20,
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
      width:350,
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
      fontFamily: 'Futura',
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
    justifyContent: 'center',
    fontFamily: 'Futura'
  },
  errorTextStyle: {
    fontSize: 12,
    alignSelf: 'center',
    color: 'blue',
    padding: 5,
    fontFamily: 'Futura'
  },
  outsideDateContainer: {
    flexDirection: 'row',
  },
  dateContainer: {
    flex: 1,
    // alignItems: 'center',
    width: 350,
    height: 120,
  },
  dateTextContainer: {
    flexDirection: 'column',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15,
    position: 'absolute',
    right: 0,
  },
  dateIcon: {
    color: 'white',
    textAlign: 'center',
  },
  dateText: {
    fontFamily: 'Futura',
    paddingBottom: 15,
    paddingLeft: 20,
    paddingTop: 20,
    paddingRight: 20,
    fontWeight: 'bold',
  },
  dateInnerText: {
    // justifyContent: 'center',
    fontFamily: 'Futura',
    paddingTop: 25,
    padding:10,
  },
});

export { AddDonation };
