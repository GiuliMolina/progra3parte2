import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/screens/Home/Home"
import Login from "./src/screens/Login/Login"
import Register from "./src/screens/Register/Register"
import FromPostear from "./src/screens/FormPostear/FormPostear"
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: true }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="Login" component={Login} options={{ headerShown: false }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        >
        </Stack.Screen>

        <Stack.Screen
          name="FromPostear"
          component={FromPostear}
          options={{ headerShown: false }}
        >
        </Stack.Screen>
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
