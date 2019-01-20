import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';



        // {this.renderMarkers()}
class FindNearYou extends Component {
  state = {
    isLoading: true,
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
      // console.log(response.data.results[0].geometry.location['lat'])
      const { userMarker } = this.state
      // markers.push({coordinates})
      this.setState({
        // isLoading: false,
        userMarker: {latitude, longitude}
      })

      // console.log(userMarker)
      // console.log(markers[0].coordinates)
    })
    .catch(error => {
      console.log('load marker error');
    });
  };

  loadDonationMarkers = async () => {
    const { donations, users } = this.props.screenProps
    console.log(donations.length)
    // const first_donation = donations[0];
    await donations.map((donation) => {
      console.log(donation['id'])
      console.log(donation['product_type'])
      const rightUser = users.find(user => user['id'] == donation['donee']);
      const key = 'AIzaSyA88aLue_PRkIpUxIAHFiD7e7Mg5MfXagY';
      const address = `${rightUser['street_address']} ${rightUser['city']} ${rightUser['state']} ${rightUser['zip']}`;
      const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
      const correctURL = encodeURI(URL);

      axios
      .get(correctURL)
      .then(response => {
        const latitude = response.data.results[0].geometry.location['lat']
        const longitude = response.data.results[0].geometry.location['lng']
        // console.log(coordinates)
        // console.log(response.data.results[0].geometry.location['lat'])
        const { markers } = this.state
        markers.push({latitude, longitude})
        this.setState({
          markers,
        })
        // markers.map((marker, index) => {
        //   return (
        //     <MapView.Marker
        //       key={index}
        //       coordinate={marker}
        //     />
        //   );
        // });
        // console.log(userMarker)
        // console.log(markers[0].coordinates)
      })
      .catch(error => {
        console.log('load marker error');
      });
    })
    this.setState({
      isLoading: false,
    })
  };

  renderMarkers = () => {
    console.log(this.state.markers)
    if (this.state.isLoading) {
      this.state.markers.map((marker, index) => {
          const coords = {marker};
          console.log('coordinates');
          console.log(coords['marker']);

          return (
            <MapView.Marker
              key={index}
              coordinate={coords['marker']}
            />
          );
        });
      }
  }

  render() {
    console.log('Ohhhhh Yeah')
    // console.log(this.state)
    return (
      <View>
        <MapView
          style={{ width: 400, height: 400 }}
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            latitude: this.state.userMarker.latitude,
            longitude: this.state.userMarker.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
        >
        <MapView.Marker
          coordinate={this.state.userMarker}
          title={"My Location"}
          // description={"Bananas: 40 lb"}
        />

        </MapView>
      </View>
    )
  }
}

export { FindNearYou };
