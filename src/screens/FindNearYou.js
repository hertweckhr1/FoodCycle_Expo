import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';



class FindNearYou extends Component {
  state = {
    markers: [],
  }
  componentDidMount() {
    const { user, donations, users } = this.props.screenProps
    const first_donation = donations[0];
    const rightUser = users.find(user => user['id'] == first_donation['donee']);
    const key = 'AIzaSyA88aLue_PRkIpUxIAHFiD7e7Mg5MfXagY';
    const address = `${rightUser['street_address']} ${rightUser['city']} ${rightUser['state']} ${rightUser['zip']}`;
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
    const correctURL = encodeURI(URL);
    axios
    .get(correctURL)
    .then(response => {
      console.log(response.data.results[0].geometry.location)
    })
  }


  render() {
    return (
      <View>
        <MapView
          style={{ width: 600, height: 400 }}
          provider="google"
          showsUserLocation={true}
          initialRegion={{
            latitude: 47.608013,
            longitude: -122.335167,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
        <MapView.Marker
          coordinate={{latitude: 47.6153,longitude: -122.3111,}}
          title={"Central Coop"}
          description={"Bananas: 40 lb"}
        />
        </MapView>
      </View>
    )
  }
}

export { FindNearYou };
