import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import tailwind from 'twrnc';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {FadeInUp} from 'react-native-reanimated';
import Header from '../../components/header';
import {toINRString} from '../../utils/methods';
import Clipboard from '@react-native-community/clipboard';
import {useToast} from 'react-native-toast-notifications';

export const CouponsList = [
  {cartValue: 999, off: '5%', code: 'HUNGRY5', value: 5},
  {cartValue: 1999, off: '10%', code: 'OFF10', value: 10},
  {cartValue: 2999, off: '20%', code: 'FLAT20', value: 20},
  {cartValue: 3999, off: '40%', code: 'MEGAOFF', value: 40},
];

const Coupons = props => {
  const insets = useSafeAreaInsets();
  const toast = useToast();

  function copyString(code) {
    Clipboard.setString(code);
    toast.hideAll();
    toast.show('Code coppied');
  }

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
        {CouponsList.map(coupon => (
          <View
            style={[
              tailwind`bg-rose-500 my-2 p-3 rounded-xl flex-row items-center justify-between`,
            ]}>
            <View>
              <Text style={[tailwind`text-xl font-extrabold	text-white`]}>
                Flat {coupon.off} Off
              </Text>
              <Text style={[tailwind`text-base font-extrabold	text-white`]}>
                *Order above {toINRString(coupon.cartValue) + '/-'}
              </Text>
            </View>
            <View style={[tailwind`flex justify-center items-center	`]}>
              <Text style={[tailwind`text-xl font-extrabold	text-balck`]}>
                {coupon.code}
              </Text>
              <TouchableOpacity
                style={[
                  tailwind`ring-4	border-solid border-2 border-dotted px-1`,
                ]}
                onPress={() => copyString(coupon.code)}>
                <Text style={[tailwind`text-sm	text-balck`]}>Copy code</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default Coupons;
