import {
  Modal,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import tailwind from 'twrnc';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import axios from 'axios';
import MasonryLayout from '../../components/masonryLayout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Loader from '../../components/loader';

export default function SearchMeal({navigation}) {
  const [seachText, setSeachText] = useState('');
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    loading: false,
    hasLoadedOnce: false,
  });
  const [searchedMeal, setSearchedMeal] = useState('');
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  useFocusEffect(() => {
    if (meals.length > 0) {
      setShowModal(true);
    }
  });

  async function searchMealData() {
    if (seachText?.trim()?.length > 0) {
      setError('');
      setMeals([]);
      setSearchedMeal(seachText);
      try {
        setLoadingStatus({loading: true, hasLoadedOnce: true});
        const res = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${seachText}`,
        );
        setMeals(res.data.meals ?? []);
        setLoadingStatus({loading: false, hasLoadedOnce: true});
      } catch {
        error => {
          setLoadingStatus({loading: false, hasLoadedOnce: true});
        };
      }
    } else {
      // setSearchedMeal('');
      setError('Please enter the meal or ingrediants');
      // setMeals([]);
    }
  }

  function handleClose() {
    setMeals([]);
    setSeachText('');
    setShowModal(false);
    setLoadingStatus({});
    setError('');
  }

  return (
    <>
      <Text style={[tailwind`mx-2 font-bold text-xl`]}>Are you Hungry?</Text>
      <Text style={[tailwind`mx-2 text-lg`]}>Let's Order, Eat & Repeat</Text>
      <View
        style={tailwind`flex-row m-2 justify-between items-center rounded-full`}>
        <TouchableOpacity
          style={tailwind`bg-slate-200 px-3 py-4 rounded-full flex-1`}
          onPress={() => {
            setShowModal(true);
          }}>
          <Text style={tailwind`text-gray-500`}>
            Search cake, pizza, pasta...
          </Text>
        </TouchableOpacity>

        <Modal visible={showModal} transparent={true}>
          <View
            style={[
              tailwind`flex-1 mt-${insets.top}px bg-white shadow-xl px-2`,
              {borderRadius: responsiveHeight(5)},
            ]}>
            <TouchableOpacity
              onPress={handleClose}
              style={tailwind`mt-5 ml-auto mr-5`}>
              <XMarkIcon size={responsiveHeight(3)} color={'#000'} />
            </TouchableOpacity>
            <View
              style={tailwind`flex-row m-2 justify-between items-center rounded-full`}>
              <TextInput
                style={tailwind`bg-slate-200 px-3 py-4 justify-between items-center rounded-full flex-1 mr-2`}
                value={seachText}
                onChangeText={text => setSeachText(text)}
                placeholder="Search cake, pizza, pasta..."
                placeholderTextColor={'gray'}
                onSubmitEditing={searchMealData}
              />
              <TouchableOpacity onPress={searchMealData}>
                <MagnifyingGlassIcon
                  color={'#000'}
                  size={responsiveHeight(4)}
                />
              </TouchableOpacity>
            </View>
            {error?.length > 0 && (
              <Text style={[tailwind`text-red-500 mx-2`]}>{error}</Text>
            )}
            {!meals?.length &&
              !loadingStatus.loading &&
              loadingStatus.hasLoadedOnce && (
                <Text style={[tailwind`text-lg my-2`]} numberOfLines={1}>
                  No results for{' '}
                  <Text style={[tailwind`text-lg my-2 text-amber-500`]}>
                    {searchedMeal}
                  </Text>
                </Text>
              )}
            {meals?.length > 0 && (
              <>
                <Text style={[tailwind`text-lg my-2`]} numberOfLines={1}>
                  Result for{' '}
                  <Text style={[tailwind`text-lg my-2 text-amber-500`]}>
                    {searchedMeal}
                  </Text>
                </Text>
                <MasonryLayout
                  meals={meals}
                  navigation={navigation}
                  animationType="slide"
                  onPressMeal={() => setShowModal(false)}
                />
              </>
            )}
            {loadingStatus.loading && <Loader />}

            {!meals?.length &&
              !loadingStatus.loading &&
              loadingStatus.hasLoadedOnce && (
                <View style={[tailwind`flex-1 items-center`]}>
                  <LottieView
                    source={require('../../assets/lottie/cat.json')}
                    autoPlay
                    loop
                    style={{
                      width: '100%',
                      height: responsiveHeight(30),
                      marginTop: responsiveHeight(10),
                    }}
                  />
                  <Text
                    style={[
                      tailwind`mt-10 text-2xl text-center text-amber-400 font-bold`,
                    ]}>
                    oops, Meal not found
                  </Text>
                  <Text style={[tailwind`mt-2 text-lg text-center `]}>
                    let's search some different meal
                  </Text>
                </View>
              )}

            {!meals?.length && !loadingStatus.hasLoadedOnce && (
              <View style={[tailwind`flex justify-center items-center`]}>
                <LottieView
                  source={require('../../assets/lottie/search_meal.json')}
                  autoPlay
                  loop
                  style={{
                    width: '100%',
                    height: responsiveHeight(30),
                    marginTop: responsiveHeight(10),
                  }}
                />
                <Text
                  style={[
                    tailwind`mt-10 text-2xl text-center text-amber-400 font-bold`,
                  ]}>
                  Search Meals
                </Text>
                <Text style={[tailwind`mt-2 text-lg text-center `]}>
                  Load up your tummy with yummy meals 😋
                </Text>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </>
  );
}
