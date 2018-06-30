import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Menu from '../screens/menu';
import Settings from '../screens/Settings';
import MenuDetail from '../screens/menuDetail';
import Cart from '../screens/cart';

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

export const Tabs = TabNavigator({
    Menu: {
    screen: MenuStack,
    navigationOptions: {
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor }) => <Icon name="list" size={35} color={tintColor} />,
    },
  },
  Cart: {
    screen: Cart,
    navigationOptions: {
      tabBarLabel: 'Cart'
    },
  },
});

export const SettingsStack = StackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: {
      title: 'Settings',
    },
  },
});

export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Settings: {
    screen: SettingsStack,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});