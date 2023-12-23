import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo, useState} from 'react';
import tailwind from 'twrnc';
import {Bars3Icon} from 'react-native-heroicons/solid';
import {ShoppingCartIcon} from 'react-native-heroicons/outline';
import {ShoppingCartIcon as ShoppingCartIconSolid} from 'react-native-heroicons/solid';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

function Navbar({navigation}) {
  const [cartItemCount, setCartItemCount] = useState();

  useFocusEffect(() => {
    getCartData();
  });

  async function getCartData() {
    try {
      let data = await AsyncStorage.getItem('cart');
      setCartItemCount(JSON.parse(data)?.length ?? 0);
    } catch {}
  }
  return (
    <View style={tailwind`flex-row m-2 justify-between items-center`}>
      <View>
        <Text style={tailwind`font-bold text-lg text-amber-500`}>Hungry</Text>
        <Text style={tailwind`font-bold text-amber-500`}>Tummy</Text>
      </View>
      <View style={tailwind`flex-row relative`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={tailwind`mr-2`}>
          {cartItemCount > 0 ? (
            <>
              <ShoppingCartIconSolid
                size={responsiveHeight(4)}
                color={'#f59e0b'}
              />
              <Text
                style={[
                  tailwind`absolute text-base`,
                  {top: '0%', left: '35%'},
                ]}>
                {cartItemCount}
              </Text>
            </>
          ) : (
            <ShoppingCartIcon size={responsiveHeight(4)} color={'#f59e0b'} />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Bars3Icon size={responsiveHeight(4)} color={'#f59e0b'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(Navbar);
