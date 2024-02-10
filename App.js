import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeRoute from './src/routes/home.route';
import DrawerLayout from './src/components/drawerLayout';
import SplashScreen from 'react-native-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

function App() {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ToastProvider
      offsetBottom={100}
      placement="bottom"
      animationType="slide-in"
      textStyle={{fontSize: responsiveFontSize(2)}}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </ToastProvider>
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
