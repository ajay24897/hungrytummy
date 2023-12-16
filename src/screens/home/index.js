import React from 'react';
import {View, StatusBar, TextInput} from 'react-native';
import tw from 'twrnc';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Navbar from '../../components/navbar';
import Categories from './categories';
import SearchMeal from './searchMeal';

function HomeScreen(props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={tw`flex-1 mt-${insets.top}px mx-2`}>
      <StatusBar barStyle="dark-content" />
      <Navbar {...props} />
      <SearchMeal navigation={props.navigation} />
      <Categories navigation={props.navigation} />
    </View>
  );
}

export default HomeScreen;
