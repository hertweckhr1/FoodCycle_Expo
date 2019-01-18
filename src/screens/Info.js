import React, { Component } from "react";
import { Container, H1, Content, Icon, Accordion,
  Text, View } from "native-base";
import {StyleSheet, ScrollView} from 'react-native';

const dataArray = [
  { title: "Who are Donors?", content: "Food markets, restaurants, and farms make up our largest number of donors." },
  { title: "What food can you donate?", content: "Produce, meats/fish, shelf-stable items and dairy" },
  { title: "Who is picking up your food?", content: "Foodbanks and non profits in the area are our major donees.  However if there are other groups in need, we will not keep them from aid." },
  { title: "Can I log my donations while for filing taxes?", content: "Yes please do! Your user history for donations will always be available" },
  { title: "Quality Required of Donated Items", content: "If you wouldn't eat it don't send it!" },
  { title: "Can I put items available for multiple days?", content: "If items will still be good after multiple days, feel free to extend it for more days!" }

];

class Info extends Component {

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "tomato",
        borderBottomColor: "white",
        borderBottomWidth: 10,}}>
      <Text style={{ fontWeight: "600", color: "white", fontFamily: "Futura",  }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18, color: "white" }} name="remove-circle" />
          : <Icon style={{ fontSize: 18, color: "white" }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "white",
          padding: 10,
          paddingBottom: 20,
          fontFamily: "Futura",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    return (
      <ScrollView>
        <Container>
          <H1 style={styles.headerText}>Q & A</H1>
          <Content padder style={{ backgroundColor: "white" }}>
            <Accordion
              dataArray={dataArray}
              animation={true}
              expanded={true}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
<br/>

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    fontFamily: 'Futura',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  }
})


export { Info };
