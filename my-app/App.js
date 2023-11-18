import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from './src/components/Menu/Menu';
import Login from "./src/screens/Login/Login";
import Register from "./src/screens/Register/Register";
import FormPostear from './src/screens/FormPostear/FormPostear';
import MiPerfil from "./src/screens/MiPerfil/MiPerfil";
import Buscador from "./src/screens/Buscador/Buscador";
import ProfileUsers from './src/screens/ProfileUsers/ProfileUsers';
import Home from './src/screens/Home/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component ={Home}
        options = {{headerShown: true}}
        />
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
        options = {{headerShown:false}}
        />
        <Stack.Screen
        name="Postear"
        component ={FormPostear}
        options = {{headerShown:true}}
        /> 
        <Stack.Screen
        name="Mi perfil"
        component ={MiPerfil}
        options = {{headerShown:true}}
        /> 
        <Stack.Screen
        name="Buscador"
        component ={Buscador}
        options = {{headerShown:true}}
        />
        <Stack.Screen
        name="ProfileUsers"
        component ={ProfileUsers}
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
