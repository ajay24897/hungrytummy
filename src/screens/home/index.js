import {View, Text, Button} from 'react-native';

function HomeScreen(props) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Screen</Text>
      <Button
        onPress={() => props.navigation.navigate('FoodDetails')}
        title="View Details"></Button>
      <Button title="Menu" onPress={() => props.navigation.openDrawer()} />
    </View>
  );
}

export default HomeScreen;
