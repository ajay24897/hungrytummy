import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {ArrowUturnLeftIcon, Bars3Icon} from 'react-native-heroicons/solid';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import tailwind from 'twrnc';

export default function Header(props) {
  const {title, onBackPress, onPressMenu} = props;
  return (
    <View style={tailwind`flex-row justify-between items-center mb-4`}>
      <TouchableOpacity onPress={onBackPress}>
        <ArrowUturnLeftIcon color={'#f59e0b'} size={responsiveHeight(4)} />
      </TouchableOpacity>

      <Text style={tailwind`text-amber-500 text-2xl font-bold`}>{title}</Text>
      <TouchableOpacity
        style={{width: responsiveHeight(4)}}
        onPress={onPressMenu}>
        <Bars3Icon color={'#f59e0b'} size={responsiveHeight(4)} />
      </TouchableOpacity>
    </View>
  );
}
