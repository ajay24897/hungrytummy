import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import tailwind from 'twrnc';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Masonry from '@react-native-seoul/masonry-list';

export default function MasonryLayout({
  meals,
  navigation,
  onPressMeal = () => {},
}) {
  return (
    <Masonry
      data={meals}
      style={[tailwind`pb-20`]}
      showsVerticalScrollIndicator={false}
      renderItem={({item, i}) => (
        <TouchableOpacity
          style={[tailwind`flex justify-center items-center mx-2`]}
          onPress={() => {
            onPressMeal();
            navigation.navigate('FoodDetails', {...item});
          }}>
          <Animated.Image
            entering={FadeInDown.delay(i * 150)}
            source={{uri: item?.strMealThumb}}
            style={[
              tailwind`rounded-2xl`,
              {
                width: responsiveWidth(46),
                height:
                  i % 2 === 0 ? responsiveHeight(25) : responsiveHeight(30),
              },
            ]}
            sharedTransitionTag={item.strMeal}
          />
          <Animated.Text
            entering={FadeInDown}
            numberOfLines={1}
            style={[tailwind`text-center m-2`]}>
            {item.strMeal}
          </Animated.Text>
        </TouchableOpacity>
      )}
    />
  );
}
