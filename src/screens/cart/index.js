import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MinusIcon, PlusIcon, TrashIcon} from 'react-native-heroicons/solid';
import LottieView from 'lottie-react-native';
import {toINRString} from '../../utils/methods';
import {useToast} from 'react-native-toast-notifications';
import {CouponsList} from '../drawerMenu/coupons';

export default function Cart(props) {
  const insets = useSafeAreaInsets();

  const [cartData, setCartData] = useState([]);
  const [showApplyCouponInput, setShowApplyCouponInput] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const subtotal = cartData.reduce(
    (accumulator, item) => accumulator + item.count * item.price,
    0,
  );
  const couponDiscount =
    appliedCoupon?.value && subtotal > appliedCoupon.cartValue
      ? subtotal * (appliedCoupon?.value / 100)
      : 0;

  const finalSubTotal = subtotal - couponDiscount;
  const toast = useToast();

  const GST = finalSubTotal * 0.05;
  const shippingCharges = finalSubTotal > 5000 ? 0 : 100;
  const total = GST + finalSubTotal + shippingCharges;

  useEffect(() => {
    getCartData();
  }, []);

  async function getCartData() {
    try {
      let cartDetails = await AsyncStorage.getItem('cart');
      if (cartDetails) {
        setCartData(JSON.parse(cartDetails));
      }
    } catch (e) {}
  }

  async function updateItem(index, count) {
    const data = [...cartData];
    data[index] = {
      ...data[index],
      count,
    };
    setCartData([...data]);
    await AsyncStorage.setItem('cart', JSON.stringify(data));
  }

  async function removeItem(removeIndex) {
    const data = cartData.filter((_, index) => index !== removeIndex);
    setCartData([...data]);
    await AsyncStorage.setItem('cart', JSON.stringify(data));
    toast.show('Meal removed from cart successfully', {
      type: 'danger',
    });
  }

  async function placeOrder() {
    let prevOrder = await AsyncStorage.getItem('orders');
    if (prevOrder) {
      await AsyncStorage.setItem(
        'orders',
        JSON.stringify([
          ...JSON.parse(prevOrder),
          {date: new Date(), cartData, total},
        ]),
      );
    } else {
      await AsyncStorage.setItem(
        'orders',
        JSON.stringify([{date: new Date(), cartData, total}]),
      );
    }
    await AsyncStorage.removeItem('cart');

    props.navigation.push('OrderInProcess');
  }

  function handleSubmitCoupon() {
    let isCodeCorrect = CouponsList.findIndex(item => item.code === couponCode);
    if (
      couponCode &&
      isCodeCorrect >= 0 &&
      subtotal > CouponsList[isCodeCorrect].cartValue
    ) {
      setAppliedCoupon(CouponsList[isCodeCorrect]);
    } else {
      toast.show('Invalid coupon');
      setAppliedCoupon();
    }
    setShowApplyCouponInput(false);
    Keyboard.dismiss();
  }

  return (
    // <View style={[tailwind`flex flex-1`]}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[tailwind`flex flex-1`]}>
      <Animated.View
        entering={FadeInUp.delay(400).duration(500).springify()}
        style={[tailwind`flex mx-4 flex-1 mt-${insets.top}px`]}>
        <Header
          onBackPress={() => props.navigation.navigate('HomeScreen')}
          title={'Cart'}
          onPressMenu={() => props.navigation.openDrawer()}
        />
        {cartData?.length === 0 ? (
          <View style={[tailwind`flex items-center justify-center`, {flex: 1}]}>
            <LottieView
              source={require('../../assets/lottie/cat.json')}
              autoPlay
              loop
              style={{width: '100%', height: responsiveHeight(30)}}
            />
            <Text
              style={[
                tailwind`mt-10 text-2xl text-center text-amber-400 font-bold`,
              ]}>
              Your cart is empty
            </Text>
            <Text style={[tailwind`mt-2 text-lg text-center `]}>
              Let's have delicious meals 😋
            </Text>
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={[{flex: 1}]}
            data={cartData}
            // keyExtractor={item => item.strMealThumb}
            renderItem={({item, index}) => (
              <View style={tailwind`flex-row my-3`} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('FoodDetails', {...item})
                  }>
                  <Image
                    resizeMode="contain"
                    source={[
                      tailwind`rounded-2xl bg-zinc-300`,
                      {uri: item.strMealThumb},
                    ]}
                    style={[
                      {
                        width: responsiveWidth(25),
                        height: responsiveWidth(25),
                        borderRadius: responsiveWidth(5),
                      },
                    ]}
                  />
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <Text style={tailwind`ml-4 text-lg`} numberOfLines={1}>
                    {item.strMeal}
                  </Text>
                  <Text style={tailwind`ml-4 text-lg`}>
                    {toINRString(item.price)}
                  </Text>
                  <View style={tailwind`flex-row ml-4 items-center mt-2`}>
                    <TouchableOpacity
                      style={tailwind`bg-amber-300 p-1 rounded-lg`}
                      onPress={() =>
                        updateItem(index, item.count === 1 ? 1 : item.count - 1)
                      }>
                      <MinusIcon size={responsiveHeight(3)} color={'#fff'} />
                    </TouchableOpacity>
                    <Text style={tailwind`mx-4 text-lg`}>{item.count}</Text>
                    <TouchableOpacity
                      style={tailwind`bg-amber-400 p-1 rounded-lg`}
                      onPress={() =>
                        updateItem(index, item.count < 10 ? item.count + 1 : 10)
                      }>
                      <PlusIcon size={responsiveHeight(3)} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={tailwind`ml-auto`}
                      onPress={() => removeItem(index)}>
                      <TrashIcon
                        size={responsiveHeight(3)}
                        color={'rgb(64 64 64)'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </Animated.View>
      {cartData?.length > 0 && (
        <Animated.View
          entering={FadeInDown.delay(400).duration(500).springify()}
          style={[
            tailwind`border-2 rounded-2xl px-4 pt-4 border-gray-300  z-10`,
            {borderTopWidth: 2},
          ]}>
          <View style={tailwind`flex-row justify-between mb-2`}>
            <Text style={tailwind`text-sm`}>Subtotal</Text>
            {couponDiscount > 0 ? (
              <View style={tailwind`flex-row`}>
                <Text style={[tailwind`text-sm line-through	`]}>
                  {toINRString(subtotal)}
                </Text>
                <Text style={[tailwind`text-sm ml-1`]}>
                  {toINRString(subtotal - couponDiscount)}
                </Text>
              </View>
            ) : (
              <Text style={[tailwind`text-sm`]}>{toINRString(subtotal)}</Text>
            )}
          </View>

          <View style={tailwind`flex-row justify-between mb-2`}>
            <Text style={tailwind` text-sm`}>Shipping charges</Text>
            <Text style={tailwind`text-sm`}>
              {subtotal > 5000 ? 'Free' : toINRString(100)}
            </Text>
          </View>
          <View style={tailwind`flex-row justify-between mb-2`}>
            <Text style={tailwind` text-sm`}>GST</Text>
            <Text style={tailwind`text-sm`}>{toINRString(GST)} (5%)</Text>
          </View>
          {couponDiscount > 0 && (
            <>
              <View style={tailwind`flex-row justify-between`}>
                <Text style={tailwind` text-sm`}>Coupon discount</Text>
                <Text style={tailwind` text-sm`}>
                  {toINRString(couponDiscount)} ({appliedCoupon.off})
                </Text>
              </View>
              <Text style={tailwind` text-sm mb-2 text-rose-500`}>
                Note: Discount is applied on subtotal amount
              </Text>
            </>
          )}

          {showApplyCouponInput ? (
            <View style={tailwind`flex-row`}>
              <TextInput
                style={tailwind`border-2 border-slate-500 p-1 mb-2 rounded-md	flex-1`}
                placeholder="Add coupon"
                onChangeText={text => setCouponCode(text)}
                value={couponCode}
                onSubmitEditing={() => handleSubmitCoupon()}
              />
              <TouchableOpacity onPress={handleSubmitCoupon}>
                <Text style={tailwind`text-base mx-2 text-amber-500`}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={tailwind`mb-2`}
              onPress={() => setShowApplyCouponInput(true)}>
              <Text style={tailwind`text-amber-500`}>Apply Coupon</Text>
            </TouchableOpacity>
          )}
          <View
            style={[
              {borderTopWidth: 1, marginVertical: 4, borderColor: 'grey'},
            ]}
          />
          <View style={tailwind`flex-row justify-between mb-2`}>
            <Text style={tailwind` text-lg`}>Total</Text>
            <Text style={tailwind`text-lg`}>{toINRString(total)}</Text>
          </View>

          <TouchableOpacity
            style={[
              tailwind`py-4 mb-5 text-center bg-amber-400 mx-auto rounded-full mt-2`,
              {width: '70%'},
            ]}
            onPress={placeOrder}>
            <Text
              style={[
                tailwind`text-center  font-medium`,
                {fontSize: responsiveFontSize(3)},
              ]}>
              Place order
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </KeyboardAvoidingView>
  );
}
