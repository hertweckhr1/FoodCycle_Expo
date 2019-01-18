import React, {Component} from 'react';
import { Text, View } from 'react-native';
import { MapView } from 'expo';


class FindNearYou extends Component {
  render() {
    return (
        <MapView
          style={{ width: 600, height: 400 }}
          initialRegion={{
            latitude: 47.608013,
            longitude: -122.335167,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
    )
  }
}

export { FindNearYou };
