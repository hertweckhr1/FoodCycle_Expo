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

  loadUsers = async () => {
    const userURL = 'http://104.199.122.67:8000/api/user/donee-info/'
    await axios
    .get(userURL, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      const userList = response.data.map(user => {
        return user;
      })
      this.setState({
        users: userList
      });
    })
    .catch(error => {
      console.log('users load error');
    });
  };

  loadDonations = async () => {
    const donationURL = 'http://104.199.122.67:8000/api/donation/donations/'
    await axios
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
      console.log('donation load error');
    });
  };

  addDonation = async (newDonation) => {
    console.log('Here we go')
    console.log("1");
    // console.log(newDonation)

    const {productType, productDescription, measurement, quantity, pickupDetails, pickupEndTime, pickupStartTime } = newDonation
    console.log(newDonation['productType'])
    const apiPayLoad = {
      user: this.state.user['id'], product_type: productType, product_description: productDescription,
      product_measurement: measurement, quantity: quantity, pickup_details: pickupDetails,
      pickup_starttime: pickupStartTime, pickup_endtime: pickupEndTime
    };
    // console.log(apiPayLoad)
    await axios
    .post('http://104.199.122.67:8000/api/donation/donations/', apiPayLoad, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log("2");
      console.log('added donation!');
      // console.log(response);
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

  updateDonation = (doneeID, donationID) => {
    console.log('About to update donation')
    console.log(doneeID)
    console.log(donationID)

    const apiPayLoad = {
      donee: doneeID, status: 'picked-up'
    };
    // console.log(apiPayLoad)
    axios
    .patch(`http://104.199.122.67:8000/api/donation/donations/${donationID}/`, apiPayLoad, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log('updated donation!');
      console.log(response.data);
      const donationList = [...this.state.donations]
      // let thisDonation = donationList.find(donation => donation['id'] == donationID)

      donationList.forEach(donation => {
        if (donation['id'] == donationID) {
          donation['donee'] = doneeID;
          donation['status'] = 'picked-up'
        }
      });

      console.log(donationList)
      this.setState({
        donations: donationList
      })
      NavigationService.navigate('DoneeSchedule');

    })
    .catch((error) => {
      console.log('donation updating error')
      // console.log(error);
    })
  }

  deleteDonation = (donationID) => {
    console.log('About to delete donation')
    console.log(donationID)

    axios
    .delete(`http://104.199.122.67:8000/api/donation/donations/${donationID}/`, { headers: { Authorization: "Token " + this.state.token}})
    .then(response => {
      console.log('updated donation!');
      const donationList = [...this.state.donations]
      let deleteIndex = -1;
      console.log(donationList)

      donationList.forEach((donation, index) => {
        if (donation['id'] == donationID) {
          deleteIndex = index
        }
      });

      donationList.splice(deleteIndex, 1)

      this.setState({
        donations: donationList
      })
      NavigationService.navigate('DonationSchedule');

    })
    .catch((error) => {
      console.log('donation updating error')
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
    // console.log(email)
    // const { , password } = this.state
    const url = `http://104.199.122.67:8000/api/user/token/`;
    const userURL = `http://104.199.122.67:8000/api/user/me/`
    axios
      .post(url, {email, password})
      .then(response => {
        console.log('API login success!');
        // console.log("Token " + response.data['token'])
        this.setState({
          token: response.data['token']
        })
        // console.log(this.state.token)
        axios
          .get(userURL, { headers: { Authorization: "Token " + this.state.token}})
          .then(async (response) => {
            console.log('I got the user info!')
            // console.log(response.data)
            this.setState({
              user: response.data,
              error: '',
            });
            console.log(this.state.user)
            await this.loadDonations();
            await this.loadUsers();
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
        // console.log(error.response.data.errors);
        this.setState({
          error: 'Incorrect username or password. Please try again.',
        });
      });
  }

  render() {
    console.log(this.state.donations);
    const screenProps = {
      loginUserCallback: this.onLogIn,
      donations: this.state.donations,
      user: this.state.user,
      users: this.state.users,
      addDonationCallback: this.addDonation,
      error: this.state.error,
      updateDonationCallback: this.updateDonation,
      deleteDonationCallback: this.deleteDonation
    }
    return <Navigation screenProps={screenProps}/>;
  }
}

export default FoodCycle;
