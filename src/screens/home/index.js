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
    <View style={tw`flex-1 mt-${insets.top}px`}>
      <StatusBar barStyle="dark-content" />
      <Navbar {...props} />
      <SearchMeal navigation={props.navigation} />

      {/* <ScrollView style={tw`flex-1`}> */}
      <View style={tw`flex-1`}>
        <Categories navigation={props.navigation} />
        {/* <Text>Home Screen</Text>
          <Button
            onPress={() => props.navigation.navigate('FoodDetails')}
            title="View Details"
          />
          <Button title="Menu" onPress={() => props.navigation.openDrawer()} /> */}
      </View>
      {/* </ScrollView> */}
    </View>
  );
}

export default HomeScreen;
