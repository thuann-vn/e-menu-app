import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  FlatList,
  Alert, 
  ActivityIndicator, 
  Platform,
  StyleSheet,
  TouchableOpacity,
  Button,
  Picker
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { CartService }  from '../services/cart';
import { ApiService }  from '../services/api';

class Cart extends Component {
  constructor(props)
  {
    super(props);
    this.state = { 
      isLoading: true
    }
  }
  
  LoadCart = async()=>{
    var cartService = new CartService();
    var cart = await cartService.getCart();
    this.setState({
      isLoading: false,
      dataSource: cart
    }, function() {});
  }

  CartItemDelete = async(item)=>{
    var cartService = new CartService();
    var cart = await cartService.removeItem(item);
    this.setState({
      isLoading: false,
      dataSource: cart
    });
  }

  CartQuantityUpdate = async (itemData, itemValue)=>{
    var cartService = new CartService();
    var cart = await cartService.updateItemQuantity(itemData.item, itemValue);
    this.setState({
      isLoading: false,
      dataSource: cart
    });
  }
  
  CheckOut = async () =>{
    this.props.navigation.navigate('Checkout');
  }

  componentDidMount = async() => {
    this.props.navigation.addListener('willFocus', (route) => {
      this.LoadCart();
    });
  }

  renderCartItem = (itemData) =>{
    return (
      <View style={styles.CartItemStyle}>
        <Image style={{ height: 120,  width : 120}} source={{ uri: itemData.item.image }} resizeMode='cover' />
        <View style={styles.CartItemDetailStyle}>
          <Text style={styles.CartItemNameStyle}> {itemData.item.name} </Text>
          <Text style={styles.CartItemPriceStyle}> Price: {itemData.item.price} </Text>
          <Picker
            selectedValue={itemData.item.quantity}
            onValueChange={async(itemValue, itemIndex) => {itemData.item.quantity = itemValue; await this.CartQuantityUpdate(itemData, itemValue)}}>
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
          <Text style={styles.CartItemPriceStyle}> Total: {itemData.item.price * itemData.item.quantity} </Text>
          <Button style={styles.CartItemButtonStyle} title="Delete" color="#841584" onPress={this.CartItemDelete.bind(this, itemData.item)} />
        </View>
      </View>
    );
  }

  render() {
    if(this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.MainContainer}>
        <FlatList
            data={ this.state.dataSource }
            renderItem={ this.renderCartItem}
            keyExtractor={(item, index) => index}
          />
          <View style={styles.CartBottom}>
            <Button style={styles.CartItemButtonStyle} title="Check out"  onPress={this.CheckOut}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  CartBottom: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0
  },
  CartItemStyle: {
    flex:1,
    flexDirection: 'row'
  },
  CartItemDetailStyle: {
    padding: 10,
    paddingTop: 0,
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  CartItemNameStyle: {
    fontSize: 24
  },
  CartItemPriceStyle: {
    fontSize: 18,
    fontWeight:'700'
  },
  CartItemButtonStyle: {
    width: 60,
    margin: 20
  }
});

export default Cart;
