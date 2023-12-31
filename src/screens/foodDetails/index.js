import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import tailwind from 'twrnc';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
} from 'react-native-reanimated';
import {
  ClockIcon,
  UsersIcon,
  FireIcon,
  ArrowUturnLeftIcon,
  StarIcon,
} from 'react-native-heroicons/solid';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {toINRString} from '../../utils/methods';

function FoodDetails(props) {
  const {strMealThumb, strMeal, idMeal} = props.route.params;
  const [mealDetails, setMealDetails] = useState({});

  useEffect(() => {
    getMealDetails();
  }, [idMeal]);

  async function getMealDetails() {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`,
      );
      setMealDetails(res.data.meals[0]);
    } catch {
      err => console.log(err);
    }
  }

  async function handleAddToCart() {
    const value = await AsyncStorage.getItem('cart');

    let cartdetails = value ? JSON.parse(value) : [];
    cartdetails.push({
      strMealThumb,
      strMeal,
      idMeal,
      count: 1,
      price: (+idMeal.slice(-1) + 2) * 100,
    });

    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartdetails));
    } catch (e) {
      console.log(e);
      // saving error
    }
  }
  return (
    <>
      <ScrollView
        style={[tailwind`flex-1`]}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={[
            tailwind`bg-slate-100 p-2 rounded-full absolute`,
            {top: responsiveWidth(12), left: responsiveWidth(6), zIndex: 100},
          ]}>
          <ArrowUturnLeftIcon size={responsiveHeight(3.5)} color={'#f59e0b'} />
        </TouchableOpacity>

        <Animated.Image
          source={{uri: strMealThumb}}
          style={[
            tailwind`rounded-2xl`,
            {
              width: '100%',
              height: responsiveHeight(45),
              borderRadius: responsiveHeight(4),
            },
          ]}
          sharedTransitionTag={strMeal}
        />
        <View style={tailwind`my-3`}>
          <>
            <Animated.Text
              entering={FadeInDown.delay(200).duration(500)}
              style={tailwind`text-center text-xl`}>
              {strMeal}
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(200).stiffness(500).duration(500)}
              style={tailwind`text-center text-2xl mb-2 font-bold`}>
              {toINRString((+idMeal.slice(-1) + 2) * 100)}
            </Animated.Text>
          </>
          <View style={tailwind`flex-row justify-evenly mt-8 items-center`}>
            <Animated.View
              style={tailwind`flex items-center bg-amber-400 rounded-full p-3`}
              entering={FadeInLeft.delay(400).duration(500)}>
              <View style={tailwind`bg-slate-100 p-2 rounded-full`}>
                <ClockIcon color={'#000'} size={responsiveHeight(4)} />
              </View>
              <Text style={tailwind` text-xl font-bold mt-2`}>
                {(+idMeal.slice(-1) + 1) * 10}
              </Text>
              <Text style={tailwind`text-sm mb-2`}>Minutes</Text>
            </Animated.View>

            <Animated.View
              style={tailwind`flex items-center bg-amber-400 rounded-full p-3`}
              entering={FadeInUp.delay(500).duration(500)}>
              <View style={tailwind`bg-slate-100 p-2 rounded-full`}>
                <StarIcon color={'#000'} size={responsiveHeight(4)} />
              </View>
              <Text style={tailwind` text-xl font-bold mt-2`}>
                {Math.floor(Math.random() * (5 - 3 + 1)) + 3} / 5
              </Text>
              <Text style={tailwind`text-sm mb-2`}>Ratting</Text>
            </Animated.View>

            <Animated.View
              style={tailwind`flex items-center bg-amber-400 rounded-full p-3`}
              entering={FadeInUp.delay(500).duration(500)}>
              <View style={tailwind`bg-slate-100 p-2 rounded-full`}>
                <UsersIcon color={'#000'} size={responsiveHeight(4)} />
              </View>
              <Text style={tailwind` text-xl font-bold mt-2`}>
                {Math.round(idMeal.slice(-1) / 4) + 1}
              </Text>
              <Text style={tailwind`text-sm mb-2`}>Serving</Text>
            </Animated.View>

            <Animated.View
              style={tailwind`flex items-center bg-amber-400 rounded-full p-3`}
              entering={FadeInRight.delay(400).duration(500).springify()}>
              <View style={tailwind`bg-slate-100 p-2 rounded-full`}>
                <FireIcon color={'#000'} size={responsiveHeight(4)} />
              </View>
              <Text style={tailwind` text-xl font-bold mt-2`}>
                {idMeal.slice(-2) * 10}
              </Text>
              <Text style={tailwind`text-sm mb-2`}>Calories</Text>
            </Animated.View>
          </View>
          <View style={tailwind`mx-4`}>
            {Object.keys(mealDetails).length !== 0 && (
              <>
                <Animated.Text
                  style={tailwind`text-xl font-semibold mt-10 mb-3`}
                  entering={FadeInLeft.delay(500).duration(500)}>
                  Ingredients
                </Animated.Text>
                {Array.from(Array(20)).map(
                  (_, i) =>
                    mealDetails[`strIngredient${i + 1}`] && (
                      <Animated.View
                        style={tailwind`flex flex-row`}
                        entering={FadeInLeft.delay((6 + i) * 100).duration(500)}
                        key={i}>
                        <Text style={[tailwind`text-lg`]}>{' - '}</Text>
                        <Text style={[tailwind`text-lg`, {flex: 1}]}>
                          {mealDetails[`strIngredient${i + 1}`]}
                          <Text style={tailwind`text-lg ml-2`}>
                            {' '}
                            {mealDetails[`strMeasure${i + 1}`]}
                          </Text>
                        </Text>
                      </Animated.View>
                    ),
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
      <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
        <TouchableOpacity
          style={[
            tailwind`py-4 mb-5 text-center bg-amber-400 mx-auto rounded-full mt-2`,
            {width: '70%'},
          ]}
          onPress={handleAddToCart}>
          <Text
            style={[
              tailwind`text-center  font-medium`,
              {fontSize: responsiveFontSize(3)},
            ]}>
            Add to cart
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

export default FoodDetails;
