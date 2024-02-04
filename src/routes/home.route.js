import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FoodDetails from '../screens/foodDetails';
import HomeScreen from '../screens/home';
import Cart from '../screens/cart';
import OrderInProcess from '../screens/orderInProcess';

function HomeRoute() {
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
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderInProcess"
        component={OrderInProcess}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeRoute;
