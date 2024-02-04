import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeRoute from './src/routes/home.route';
import DrawerLayout from './src/components/drawerLayout';
import SplashScreen from 'react-native-splash-screen';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

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
      screenOptions={{drawerPosition: 'right'}}
      drawerContent={props => DrawerLayout(props)}>
      <Drawer.Screen
        name="homeRoute"
        component={HomeRoute}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

export default App;
