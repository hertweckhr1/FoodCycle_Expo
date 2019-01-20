import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, Button, TouchableHighlight} from 'react-native';
import { H1 } from 'native-base';
import { MapView } from 'expo';
import axios from 'axios';

// {this.state.markers.map((marker, index) => (
//   <MapView.Marker
//       key={index}
//       coordinate={marker['marker']}
//     />
//   ))}

// ISSUE WITH ONPRESS FOR MARKERS:
// https://github.com/react-native-community/react-native-maps/issues/1132

class FindNearYou extends Component {
  state = {
    isLoaded: false,
    userMarker: {},
    markers: [],
  }

  async componentDidMount() {
    await this.loadUserMarker();
    await this.loadDonationMarkers();
  }

  loadUserMarker = async () => {
    const { user } = this.props.screenProps
    // const first_donation = donations[0];
    // const rightUser = users.find(user => user['id'] == first_donation['donee']);
    const key = 'AIzaSyA88aLue_PRkIpUxIAHFiD7e7Mg5MfXagY';
    const address = `${user['street_address']} ${user['city']} ${user['state']} ${user['zip']}`;
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    const correctURL = encodeURI(URL);

    await axios
    .get(correctURL)
    .then(response => {
      const latitude = response.data.results[0].geometry.location['lat']
      const longitude = response.data.results[0].geometry.location['lng']
      const { userMarker } = this.state
      this.setState({
        userMarker: {latitude, longitude}
      })
    })
    .catch(() => {
      console.log('load marker error');
    });
  };

  loadDonationMarkers = async () => {
    const { donations, users } = this.props.screenProps
    let markers = [];
    for(const donation of donations){
      const rightUser = users.find(user => user['id'] == donation['user']);
      const key = 'AIzaSyA88aLue_PRkIpUxIAHFiD7e7Mg5MfXagY';
      const address = `${rightUser['street_address']} ${rightUser['city']} ${rightUser['state']} ${rightUser['zip']}`;
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
      const correctURL = encodeURI(URL);

      await axios
      .get(correctURL)
      .then(response => {
        const latitude = response.data.results[0].geometry.location['lat']
        const longitude = response.data.results[0].geometry.location['lng']
        const coordinates = { marker: {latitude, longitude},
          donorName: rightUser['company_name'], donorStreetAddress: rightUser['street_address'],
          donorID: rightUser['id']}
        console.log(coordinates['coordinates'])
        markers.push(coordinates)
      })
      .catch(() => {
        console.log('load marker error');
      });
    }

    this.setState({
      markers,
      isLoaded: true,
    })
    console.log(markers)
  };

  renderMarkers = () => {
      return this.state.markers.map((marker, index) => {
          return (
            <MapView.Marker
              key={index}
              coordinate={marker['marker']}
              title={marker['donorName']}
              description={marker['donorStreetAddress']}
              onPress={(e) => {e.stopPropagation(); this.onMarkerPress(marker['donorID'])}}
            />
          );
        });
  }

  onMarkerPress= (donorID) => {
    console.log('MARKER WAS CLICKED!')
    console.log(donorID)
    this.props.navigation.navigate('DonorDonationsToday');
  }

  render() {
    console.log(this.state.userMarker['latitude'])
    console.log(this.state.userMarker['longitude'])
    return (
      <View>
        <View style={styles.titleView}>
          <H1 style={styles.headerText}>Find Donations By Map</H1>
          <Text style={styles.mapText}>Select donor location marker for specific donations offered today</Text>
          <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text>Register</Text>
          </TouchableHighlight>
        </View>
        <MapView
          style={{ width: 400, height: 600 }}
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            latitude: this.state.userMarker.latitude,
            longitude: this.state.userMarker.longitude,
            latitudeDelta: 0.10,
            longitudeDelta: 0.10,
          }}
        >
        <MapView.Marker
          key={100000}
          coordinate={this.state.userMarker}
          title={"My Location"}
          pinColor={'#0000ff'}
        />


        { this.state.isLoaded && this.renderMarkers()}


        </MapView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mapText: {
    fontFamily: 'Futura',
    textAlign: 'center',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleView: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  calloutText: {
    fontFamily: 'Futura',
    padding: 15,
  },
  customView: {
    height: 100,
  }
})

export { FindNearYou };
