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
  Button
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { users } from '../config/data';
import { api }  from '../services/api';

class Menu extends Component {
  constructor(props)
    {
      super(props);
      this.state = { 
      isLoading: true
    }
  }

  onLearnMore = (user) => {
    this.props.navigation.navigate('Details', { ...user });
  };

  componentDidMount() {
    api.getMenuList().then((responseJson)=>{
      this.setState({
        isLoading: false,
        dataSource: responseJson
      }, function() {
        // In this block you can do something with new state.
      });
    });
  }

  renderSeperator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  menuItemClick = (item)=>{
    this.props.navigation.navigate('Details', { ...item });
  }

  renderMenuItem = (itemData)=>{
    return (
      <TouchableOpacity style={styles.MenuItemStyle} onPress={this.menuItemClick.bind(this, itemData.item)} >
        <Image style={{ height: 148,  width : 150}} source={{ uri: itemData.item.image }} resizeMode='cover' />
        <View style={styles.MenuItemDetailStyle}>
          <Text style={styles.MenuItemNameStyle}> {itemData.item.name} </Text>
          <Text style={styles.MenuItemPriceStyle}> Price: {itemData.item.price} </Text>
          <Button style={styles.MenuItemButtonStyle} title="View detail"  onPress={this.menuItemClick.bind(this, itemData.item)} />
        </View>
      </TouchableOpacity>
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
            ItemSeparatorComponent = {this.renderSeperator}
            renderItem={ this.renderMenuItem}
            keyExtractor={(item, index) => index}
          />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },
  MenuItemStyle: {
    padding: 10,
    fontSize: 18,
    flex:1,
    flexDirection: 'row'
  },
  MenuItemDetailStyle: {
    padding: 10,
    fontSize: 18,
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  MenuItemNameStyle: {
    fontSize: 24
  },
  MenuItemPriceStyle: {
    fontSize: 18,
    fontWeight:'700',
    marginBottom: 20
  },
  MenuItemButtonStyle: {
    width: 60,
    margin: 20
  }
});

export default Menu;
