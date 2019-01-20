import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';

// {this.state.markers.map((marker, index) => (
//   <MapView.Marker
//       key={index}
//       coordinate={marker['marker']}
//     />
//   ))}

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
        markers.push({latitude, longitude})
      })
      .catch(() => {
        console.log('load marker error');
      });
    }

    this.setState({
      markers,
      isLoaded: true,
    })
  };

  renderMarkers = () => {
      return this.state.markers.map((marker, index) => {
          const coords = {marker};
          console.log(marker['marker'])
          return (
            <MapView.Marker
              key={index}
              coordinate={coords['marker']}
            />
          );
        });
  }

  render() {
    console.log(this.state.userMarker['latitude'])
    console.log(this.state.userMarker['longitude'])
    return (
      <View>
        <MapView
          style={{ width: 400, height: 400 }}
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
          coordinate={this.state.userMarker}
          title={"My Location"}
          // description={"Bananas: 40 lb"}
        />

        { this.state.isLoaded && this.renderMarkers()}


        </MapView>
      </View>
    )
  }
}

export { FindNearYou };
