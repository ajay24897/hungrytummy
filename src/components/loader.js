import {View, Text} from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import LottieView from 'lottie-react-native';
import {responsiveHeight} from 'react-native-responsive-dimensions';

export default function Loader() {
  return (
    <View style={tailwind`flex-1 justify-center items-center`}>
      <LottieView
        source={require('../assets/lottie/make_food.json')}
        autoPlay
        loop
        style={{
          width: '100%',
          height: responsiveHeight(20),
        }}
      />
    </View>
  );
}
