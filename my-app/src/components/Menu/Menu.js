import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';

import Home from "../../screens/Home/Home";
import User from "../../screens/MiPerfil/MiPerfil";
import FormPostear from "../../screens/FormPostear/FormPostear";

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
             <Tab.Screen name="Postear" component={ FormPostear } />
             <Tab.screen name="Perfil" component ={User}/>
          </Tab.Navigator>
     );
     
}
}

export default Menu
