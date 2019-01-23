import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';

class FindByProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // loading: false,
      data: this.props.screenProps.donations,
      error: null,
    };

    this.arrayholder = this.props.screenProps.donations;
  }


  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    console.log(this.arrayholder);
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item['product_description'].toUpperCase()} ${item['product_type'].toUpperCase()}`;
      console.log(itemData)
      const textData = text.toUpperCase();
      console.log(textData)
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
      />
    );
  };

  render() {
    return (
      <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={`${item['product_description']}: ${item['product_type']}`}
              subtitle={item['product_measurement']}
              containerStyle={{ borderBottomWidth: 0 }}
            />
          )}
          KeyExtractor={item => item['id']}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </List>
    );
  }
}
export { FindByProduct };
