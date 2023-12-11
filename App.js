import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import homeRoute from './src/routes/home.route';
import {View} from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <DrawerNavigation />
    </NavigationContainer>
  );
}

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={props => (
        <View style={{backgroundColor: 'red', flex: 1}}></View>
      )}>
      <Drawer.Screen
        name="homeRoute"
        component={homeRoute}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default App;
