import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React, {Component} from "react";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";
import Home from "../../screens/Home/Home";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";
import FormPostear from "../../screens/FormPostear/FormPostear";
import Buscador from "../../screens/Buscador/Buscador";
import { IoSearch } from "react-icons/io5";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";


const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={};
    }

render(){
    return (
          <Tab.Navigator>
             <Tab.Screen name="Home" component={ Home } options={{tabBarIcon: () => <GoHomeFill name='home' size={22} color='black'/>}}/>
             <Tab.Screen name="Buscador" component={Buscador} options={{tabBarIcon: () => <IoSearch name='search' size={22} color='black'/>}}/>
             <Tab.Screen name="Postear" component={ FormPostear } options={{tabBarIcon: () => <FaRegPlusSquare name='post' size={22} color='black'/>}}/>
             <Tab.Screen name="Mi perfil" component ={MiPerfil} options={{tabBarIcon: () => <IoPersonSharp name='profile' size={22} color='black'/>}}/>
             
          </Tab.Navigator>
     );
     
}
}

export default Menu;
