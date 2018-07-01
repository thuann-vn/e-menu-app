import React, { Component } from 'react';
import { ScrollView, TextInput, Text, View, Picker, Button, Alert, AsyncStorage } from 'react-native';
import { Tile, List, ListItem } from 'react-native-elements';
import { CartService }  from '../services/cart';

class MenuDetail extends Component {
  constructor(props)
  {
    super(props);
    this.state = { 
      quantity: 1
    }
  }

  getParams = ()=>{
    const { name, image, price, _id } = this.props.navigation.state.params;
    return {
      id: _id,
      name: name,
      image: image,
      price: price
    }
  }

  addToCart = async ()=>{
    var cart = new CartService();
    var item = this.getParams();
    item.quantity = this.state.quantity;
    await cart.addItem(item);
    
    Alert.alert(
      'Added to cart',
      'Your food and drink was added to cart, would you like to check out now?',
      [
        {text: 'I want buy more', onPress: () => this.props.navigation.navigate('Menu')},
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => this.props.navigation.navigate('Cart')},
      ],
      { cancelable: false }
    )
  }

  render() {
    const item = this.getParams();
    return (
      <ScrollView>
        <Tile
          imageSrc={{ uri: item.image}}
          featured
          title={`${item.name}`}
          caption={item.price.toString()}
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
