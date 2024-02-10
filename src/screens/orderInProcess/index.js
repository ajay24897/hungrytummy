import {View, Text, BackHandler, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from 'twrnc';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';

const lottiviewStyle = {width: '100%', height: responsiveHeight(30)};
export default function OrderInProcess({navigation}) {
  const [state, setState] = useState('cooking');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {});
    return () => BackHandler.removeEventListener('hardwareBackPress');
  }, []);

  function handleAnimation() {
    if (state === 'cooking') {
      setState('onTheWay');
    } else if (state === 'onTheWay') {
      setState('openDoor');
    }
  }
  return (
    <View style={tailwind`flex-1 justify-center items-center bg-white`}>
      {state === 'cooking' && (
        <LottieView
          source={require('../../assets/lottie/cooking.json')}
          autoPlay
          loop={false}
          style={lottiviewStyle}
          onAnimationFinish={handleAnimation}
        />
      )}
      {state === 'onTheWay' && (
        <LottieView
          source={require('../../assets/lottie/riding_scooty.json')}
          autoPlay
          loop={false}
          style={lottiviewStyle}
          onAnimationFinish={handleAnimation}
        />
      )}
      {state === 'openDoor' && (
        <>
          <LottieView
            source={require('../../assets/lottie/delivery_men_came.json')}
            autoPlay
            loop={false}
            style={lottiviewStyle}
            onAnimationFinish={handleAnimation}
          />
          <View style={[tailwind`flex mt-20 `]}>
            <Text style={[tailwind`text-center mx-5 `]}>
              Your eagerly awaited order is now waiting for you at your doorstep
            </Text>
            <TouchableOpacity
              style={[
                tailwind`py-4 mt-5 text-center bg-amber-400 mx-auto rounded-full`,
              ]}
              onPress={() => navigation.navigate('MyOrders')}>
              <Text
                style={[
                  tailwind`text-center  font-medium px-10`,
                  {fontSize: responsiveFontSize(3)},
                ]}>
                View Order
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
