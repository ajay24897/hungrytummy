import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoodDetails from '../screens/foodDetails';
import HomeScreen from '../screens/home';

function homeRoute() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default homeRoute;
