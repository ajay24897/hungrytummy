import {View, Text, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import tailwind from 'twrnc';
import {Bars3Icon} from 'react-native-heroicons/solid';
import {ShoppingCartIcon} from 'react-native-heroicons/outline';

import {responsiveHeight} from 'react-native-responsive-dimensions';

function Navbar({navigation}) {
  return (
    <View style={tailwind`flex-row m-2 justify-between items-center`}>
      <View>
        <Text style={tailwind`font-bold text-lg text-amber-500`}>Hungry</Text>
        <Text style={tailwind`font-bold text-amber-500`}>Tummy</Text>
      </View>
      <View style={tailwind`flex-row`}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={tailwind`mr-2`}>
          <ShoppingCartIcon size={responsiveHeight(4)} color={'#f59e0b'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Bars3Icon size={responsiveHeight(4)} color={'#f59e0b'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(Navbar);
