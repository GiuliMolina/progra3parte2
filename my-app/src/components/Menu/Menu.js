import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import User from "../../screens/MiPerfil/MiPerfil";
import FormPostear from "../../screens/FormPostear/FormPostear";
import React,{Component} from "react";
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
             <Tab.Screen name="Perfil" component ={User}/>
          </Tab.Navigator>
     );
     
}
}

export default Menu
