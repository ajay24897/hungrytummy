import {FlatList, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from 'twrnc';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import Header from '../../components/header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import moment from 'moment';
import {toINRString} from '../../utils/methods';

const MyOrders = props => {
  const insets = useSafeAreaInsets();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getOrders() {
      let prevOrder = await AsyncStorage.getItem('orders');
      setOrders(prevOrder ? JSON.parse(prevOrder).reverse() : []);
    }

    getOrders();
  }, []);

  return (
    <View style={[tailwind`flex flex-1`]}>
      <Animated.View
        entering={FadeInUp.delay(400).duration().springify()}
        style={[tailwind`flex mx-4 flex-1 mt-${insets.top}px`]}>
        <Header
          onBackPress={() => props.navigation.navigate('HomeScreen')}
          title={'My Orders'}
          onPressMenu={() => props.navigation.openDrawer()}
        />
        <FlatList
          data={orders}
          renderItem={({item, index}) => (
            <MealOrderView meal={item} index={index} />
          )}
          style={[tailwind`flex flex-1`]}
        />
      </Animated.View>
    </View>
  );
};

function MealOrderView({meal, index}) {
  console.log(meal);
  return (
    <View style={[tailwind`flex`]}>
      <Animated.Text
        style={[tailwind`mb-2 text-base text-amber-600`]}
        entering={FadeInUp.delay(index * 500).springify()}>
        {moment(meal.date).format('Do MMM YYYY, h:mm a')}
      </Animated.Text>

      {meal.cartData.map(({strMeal, count, price, strMealThumb}) => (
        <View style={[tailwind`flex flex-row mb-5`]}>
          <Animated.Image
            entering={FadeInUp.delay(index * 500).springify()}
            source={{uri: strMealThumb}}
            style={[
              tailwind`rounded-lg mr-4`,
              {width: responsiveWidth(12), height: responsiveWidth(12)},
            ]}
          />
          <Animated.View
            entering={FadeInUp.delay(index * 500).springify()}
            style={[tailwind`flex justify-evenly`]}>
            <Text style={[tailwind]}>{strMeal}</Text>
            <Text>
              {count} X {toINRString(+price)}
            </Text>
            {/* <Text>Total : {meal.total}</Text> */}
          </Animated.View>
        </View>
      ))}
    </View>
  );
}

export default MyOrders;
