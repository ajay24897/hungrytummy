import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Header from '../../components/header';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MinusIcon, PlusIcon, TrashIcon} from 'react-native-heroicons/solid';

export default function Cart(props) {
  const insets = useSafeAreaInsets();

  const [cartData, setCartData] = useState([]);
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
  }

  return (
    <View style={[tailwind`flex mx-4 flex-1 mt-${insets.top}px`]}>
      <Header
        onBackPress={() => props.navigation.goBack()}
        title={'Cart'}
        onPressMenu={() => props.navigation.openDrawer()}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={[{flex: 1}]}
        data={cartData}
        keyExtractor={item => item.strMealThumb}
        renderItem={({item, index}) => (
          <View style={tailwind`flex-row my-3`}>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('FoodDetails', {...item})
              }>
              <Image
                resizeMode="contain"
                source={{uri: item.strMealThumb}}
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
              <Text style={tailwind`ml-4 text-lg`}>{item.price}</Text>
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
      {cartData?.length > 0 && (
        <Animated.View
          entering={FadeInDown.delay(400).duration(500).springify()}>
          <TouchableOpacity
            style={[
              tailwind`py-4 mb-5 text-center bg-amber-400 mx-auto rounded-full mt-2`,
              {width: '70%'},
            ]}
            onPress={() => {}}>
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
    </View>
  );
}
