import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import tailwind from 'twrnc';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import MasonryLayout from '../../components/masonryLayout';
import Loader from '../../components/loader';

function Categories({navigation}) {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    getMeals();
  }, []);

  async function fetchCategories() {
    try {
      const res = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setCategories([...res.data.categories]);
    } catch {
      error => console.log(error);
    }
  }

  async function getMeals(category = 'Beef') {
    setMeals([]);
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      fetchCategories();
      setMeals(res.data.meals ?? []);
      setIsLoading(false);
    } catch {
      err => {
        setIsLoading(false);
      };
    }
  }

  return (
    <>
      <View style={[tailwind`m-2`]}>
        <Text style={[tailwind`text-xl mb-2`]}>Categories</Text>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={item => item.strCategory}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[tailwind`flex justify-center items-center mx-1`]}
              onPress={() => {
                setSelectedCategory(item.strCategory);
                getMeals(item.strCategory);
              }}>
              <Animated.View
                style={[
                  tailwind`rounded-full p-2`,
                  {
                    backgroundColor:
                      selectedCategory === item.strCategory
                        ? 'rgb(251 191 36)'
                        : 'rgb(212 212 216)',
                  },
                ]}
                entering={FadeInUp}
                exiting={FadeInDown}>
                <Animated.Image
                  entering={FadeInUp}
                  exiting={FadeInDown}
                  source={{uri: item?.strCategoryThumb}}
                  style={[
                    tailwind`rounded-full`,
                    {width: responsiveWidth(12), height: responsiveWidth(12)},
                  ]}
                />
              </Animated.View>
              <Animated.Text
                entering={FadeInDown}
                exiting={FadeInUp}
                style={[tailwind`text-center mx-2 mt-2`]}>
                {item.strCategory}
              </Animated.Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <Text style={[tailwind`text-xl m-2`]}>Meals</Text>
      {isLoading ? (
        <Loader />
      ) : (
        <MasonryLayout meals={meals} navigation={navigation} />
      )}
    </>
  );
}

export default Categories;
