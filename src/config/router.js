import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Menu from '../screens/menu';
import MenuDetail from '../screens/menuDetail';
import Cart from '../screens/cart';
import Checkout from '../screens/checkout';
import CartService from '../services/cart'

export const MenuStack = StackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      title: 'Foods & Drinks',
    },
  },
  Details: {
    screen: MenuDetail,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
});


export const CartStack = StackNavigator({
  Cart: {
    screen: Cart,
    navigationOptions: {
      title: 'Cart',
    },
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: ({ navigation }) => ({
      title: `Checkout`,
    }),
  },
});

export const Tabs = TabNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: {
      tabBarLabel: 'Menu',
    },
  },
  Cart: {
    screen: CartStack,
    navigationOptions: {
      tabBarLabel: 'Cart',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});