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
  Button,
  Picker
} from 'react-native';
import { List, ListItem, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { CartService }  from '../services/cart';
import { ApiService }  from '../services/api';

class Checkout extends Component {
  constructor(props)
  {
    super(props);
    this.state = { 
      isLoading: false
    }
  }

  CheckOut = async () =>{
    this.setState({
      isLoading: true
    });

    //Validate form
    if(!this.state.name || !this.state.phone){
      return Alert.alert(
        'Please fill your information to process checkout!'
      )
    }

    //Call api
    var cartService = new CartService();
    var cart = await cartService.getCart()
    
    ApiService.checkOut(this.state.name, this.state.phone, cart).then((responseJson)=>{
      this.setState({
        isLoading: false
      });

      Alert.alert(
        'Check out successfully',
        'Your order was sent to us, we will contact you as soon as we can. Thanks for your support!'
      );
      cartService.setCart([]);

      this.props.navigation.navigate('Menu');
    });
  }

  render() {
    return (
      <View style={styles.MainContainer}>
          <View>
            <Text>Input your information to below input:</Text>
            <FormLabel>Your name</FormLabel>
            <FormInput onChangeText={(value) => this.setState({name: value})}/>
            
            <FormLabel>Your phone number</FormLabel>
            <FormInput onChangeText={(value) => this.setState({phone: value})}/>
          </View>
          <View style={styles.CartBottom}>
            <Button style={styles.CartItemButtonStyle} title="Process order"  onPress={this.CheckOut}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer :{
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
});

export default Checkout;
