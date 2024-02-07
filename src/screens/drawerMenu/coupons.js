import {View} from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {FadeInUp} from 'react-native-reanimated';
import Header from '../../components/header';

const Coupons = props => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[tailwind`flex flex-1`]}>
      <Animated.View
        entering={FadeInUp.delay(400).duration(500).springify()}
        style={[tailwind`flex mx-4 flex-1 mt-${insets.top}px`]}>
        <Header
          onBackPress={() => props.navigation.navigate('HomeScreen')}
          title={'Coupons'}
          onPressMenu={() => props.navigation.openDrawer()}
        />
      </Animated.View>
    </View>
  );
};

export default Coupons;
