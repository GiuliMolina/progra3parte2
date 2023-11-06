import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from './src/components/Menu/Menu';
import Home from "./src/screens/Home/Home";
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import FromPostear from "./src/screens/FormPostear/FormPostear";
import MiPerfil from "./src/screens/MiPerfil/MiPerfil";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component ={Login}
        options = {{headerShown:false}}
        />
        <Stack.Screen
        name="Register"
        component ={Register}
        options = {{headerShown:false}}
        />
      <Stack.Screen
        name="Menu"
        component ={Menu}
        />
      <Stack.Screen
        name="Home"
        component ={Home}
        options = {{headerShown:true}}
        />
        <Stack.Screen
        name="FromPostear"
        component ={FromPostear}
        options = {{headerShown:true}}
        />
        <Stack.Screen
        name="MiPerfil"
        component ={User}
        options = {{headerShown:true}}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
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
