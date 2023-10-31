import { StyleSheet, Text, View } from 'react-native';
<<<<<<< HEAD
import Home from './src/screens/Home/Home';

export default function App() {
  return (
   <View style={styles.container}>
    <Home/>
   </View>
=======
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import Login from "./src/screens/Login/Login"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
        name="Login"
        component ={Login}
        options = {{headerShown:false}}
        >
          
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> 1720bb00989dc3bfb0ac350bbb911109edccee00
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
