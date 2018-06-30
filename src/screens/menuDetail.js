import React, { Component } from 'react';
import { ScrollView, TextInput, Text, View, Picker, Button, Alert } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';

class MenuDetail extends Component {
  constructor(props)
  {
    super(props);
    this.state = { 
      quantity: 1
    }
  }

  addToCart = ()=>{
    //TODO: add to cart
    Alert.alert('Add to cart: ' + this.props.navigation.state.params.name + '..' + this.state.quantity);
  }

  render() {
    const { name, image, price, id } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: image}}
          featured
          title={`${name}`}
          caption={price}
        />
        <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
          <Text> Quantity: </Text>
          <Picker
            selectedValue={this.state.quantity}
            style={{ height: 50}}
            onValueChange={(itemValue, itemIndex) => this.setState({quantity: itemValue})}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
          </Picker>
          <Button
            onPress={this.addToCart}
            title="Add to cart"
            color="#841584"
          />
        </View>
      </ScrollView>
    );
  }
}

export default MenuDetail;
