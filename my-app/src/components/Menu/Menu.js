import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../../screens/Home/Home";
import Login from "../../screens/Login/Login";
import Register from "../../screens/Register/Register";

import react,{Component} from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";

const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={};
    }

render(){
    return (
          <Tab.Navigator>
             <Tab.Screen name="Home" component={ Home } />
             <Tab.Screen name="Profile" component={ Login } />
             <Tab.Screen name="NewPost" component={ Register } />
          </Tab.Navigator>
     );
     
}
}

export default Menu
