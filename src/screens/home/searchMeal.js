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

export default function SearchMeal({navigation}) {
  const [seachText, setSeachText] = useState('');
  const [meals, setMeals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState({
    loading: false,
    hasLoadedOnce: false,
  });

  const insets = useSafeAreaInsets();

  useFocusEffect(() => {
    if (meals.length > 0) {
      setShowModal(true);
    }
  });

  async function searchMealData() {
    if (seachText?.trim().length > 0) {
      setMeals([]);
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
      setMeals([]);
    }
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
          <Text>Search meals</Text>
        </TouchableOpacity>

        <Modal visible={showModal} transparent={true}>
          <View
            style={[
              tailwind`flex-1 mt-${insets.top}px bg-white shadow-xl px-2`,
              {borderRadius: responsiveHeight(5)},
            ]}>
            <TouchableOpacity
              onPress={() => {
                setMeals([]);
                setSeachText('');
                setShowModal(false);
              }}
              style={tailwind`mt-5 ml-auto mr-5`}>
              <XMarkIcon size={responsiveHeight(3)} color={'#000'} />
            </TouchableOpacity>
            <View
              style={tailwind`flex-row m-2 justify-between items-center rounded-full`}>
              <TextInput
                style={tailwind`bg-slate-200 px-3 py-4 justify-between items-center rounded-full flex-1 mr-2`}
                value={seachText}
                onChangeText={text => setSeachText(text)}
                placeholder="Search meals"
                placeholderTextColor={'#000'}
                onSubmitEditing={searchMealData}
              />
              <TouchableOpacity onPress={searchMealData}>
                <MagnifyingGlassIcon
                  color={'#000'}
                  size={responsiveHeight(4)}
                />
              </TouchableOpacity>
            </View>
            {meals?.length > 0 && (
              <MasonryLayout
                meals={meals}
                navigation={navigation}
                animationType="slide"
                onPressMeal={() => setShowModal(false)}
              />
            )}
            {loadingStatus.loading && <ActivityIndicator />}

            {!meals?.length &&
              !loadingStatus.loading &&
              loadingStatus.hasLoadedOnce && <Text>No Meal found</Text>}

            {!meals?.length && !loadingStatus.hasLoadedOnce && (
              <Text>Search Meal</Text>
            )}
          </View>
        </Modal>
      </View>
    </>
  );
}
