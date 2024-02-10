import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tw from 'twrnc';

const menuItems = [
  {name: 'Home', screen: 'HomeScreen'},
  {name: 'Cart', screen: 'Cart'},
  {name: 'My Orders', screen: 'MyOrders'},
  {name: 'Coupons', screen: 'Coupons'},
];

function DrawerLayout(props) {
  return (
    <View style={tw`flex-1`}>
      <Text style={[tw`pt-10 text-2xl text-gray-700 mt-5 mx-5`]}>
        Hey Foodie
      </Text>

      <View style={tw`mx-5 my-5`}>
        {menuItems.map(menu => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(menu.screen)}>
            <Text style={tw`my-2 text-lg`}>{menu.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default DrawerLayout;
