import React, { Component } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import NavigationService from './NavigationService'

class FoodCycle extends Component {
  state = {
    user: {},
    donations: [],
    token: '',
    users: [],
  }

  loadUsers = () => {
    const userURL = 'http://127.0.0.1:8000/api/user/donee-info/'
    axios
    .get(userURL, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log('Loaded Users');
      const userList = response.data.map(user => {
        return user;
      })
      this.setState({
        users: userList
      });
    })
    .catch(error => {
      console.log('users load error');
      console.log(error);
    });
  };

  loadDonations = () => {
    const donationURL = 'http://127.0.0.1:8000/api/donation/donations/'
    axios
    .get(donationURL, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log('Loaded Donations');
      const donationList = response.data.map(donation => {
        return donation;
      })
      this.setState({
        donations: donationList
      });
    })
    .catch(error => {
      console.log(error);
      console.log('donation load error');
    });
  };

  addDonation = (newDonation) => {
    console.log('Here we go')
    console.log(newDonation)
    const {productType, productDescription, measurement, quantity, pickupDetails, pickupEndTime, pickupStartTime } = newDonation
    console.log(newDonation['productType'])
    const apiPayLoad = {
      user: this.state.user['id'], product_type: productType, product_description: productDescription,
      product_measurement: measurement, quantity: quantity, pickup_details: pickupDetails,
      pickup_starttime: pickupStartTime, pickup_endtime: pickupEndTime
    };
    console.log(apiPayLoad)
    axios
    .post('http://127.0.0.1:8000/api/donation/donations/', apiPayLoad, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log('added donation!');
      console.log(response);
      const { donations } = this.state
      donations.push(response.data);

      this.setState({
        donations,
      })
      NavigationService.navigate('DonationSchedule');

    })
    .catch((error) => {
      console.log('donation adding error')
      console.log(error);
    })
  }

  decideUser = () => {
    if (this.state.user['is_doner']) {
      NavigationService.navigate('Dashboard', { user: this.state.user });
    } else {
      NavigationService.navigate('DoneeDashboard', { user: this.state.user });
    }
  }

  onLogIn = (email, password) => {
    console.log('Button Pressed!');
    console.log(email)
    // const { , password } = this.state
    const url = `http://127.0.0.1:8000/api/user/token/`;
    const userURL = `http://127.0.0.1:8000/api/user/me/`
    axios
      .post(url, {email, password})
      .then(response => {
        console.log('API login success!');
        console.log("Token " + response.data['token'])
        this.setState({
          token: response.data['token']
        })
        console.log(this.state.token)
        axios
          .get(userURL, { headers: { Authorization: "Token " + this.state.token}})
          .then(response => {
            console.log('I got the user info!')
            // console.log(response.data)
            this.setState({
              user: response.data,
              error: '',
            });
            console.log(this.state.user)
            this.loadDonations();
            this.loadUsers();
            this.decideUser();

          })
          .catch(error => {
            console.log('error!');
            this.setState({
              error: 'Incorrect username or password. Please try again.',
            });
          });
      })
      .catch(error => {
        console.log(error.response.data.errors);
        this.setState({
          error: 'Incorrect username or password. Please try again.',
        });
      });
  }

  render() {
    const screenProps = {
      loginUserCallback: this.onLogIn,
      donations: this.state.donations,
      user: this.state.user,
      users: this.state.users,
      addDonationCallback: this.addDonation,
      error: this.state.error
    }
    return <Navigation screenProps={screenProps}/>;
  }
}

export default FoodCycle;
