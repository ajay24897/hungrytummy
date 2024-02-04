import {View, Text, BackHandler} from 'react-native';
import React, {useEffect, useState} from 'react';
import tailwind from 'twrnc';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import LottieView from 'lottie-react-native';

export default function OrderInProcess() {
  const [state, setState] = useState('cooking');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      console.log('in');
    });
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
          style={{width: '100%', height: responsiveHeight(30)}}
          onAnimationFinish={handleAnimation}
        />
      )}
      {state === 'onTheWay' && (
        <LottieView
          source={require('../../assets/lottie/riding_scooty.json')}
          autoPlay
          loop={false}
          style={{width: '100%', height: responsiveHeight(30)}}
          onAnimationFinish={handleAnimation}
        />
      )}
      {state === 'openDoor' && (
        <LottieView
          source={require('../../assets/lottie/delivery_men_came.json')}
          autoPlay
          loop={false}
          style={{width: '100%', height: responsiveHeight(30)}}
          onAnimationFinish={handleAnimation}
        />
      )}
    </View>
  );
}
