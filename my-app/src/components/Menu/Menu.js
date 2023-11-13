import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import React,{Component} from "react";
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
import BusquedaUsuarios from "../../screens/BusquedaUsuarios/BusquedaUsuarios";

const Tab = createBottomTabNavigator();

class Menu extends Component{
    constructor(){
        super();
        this.state={};
    }

render(){
    return (
          <Tab.Navigator>
             <Tab.Screen name="Home" component={ Home } options = {{headerShown:true}}/>
             <Tab.Screen name="Postear" component={ FormPostear } />
             <Tab.Screen name="Mi perfil" component ={MiPerfil}/>
             <Tab.Screen name ="Busqueda de usuarios" component={BusquedaUsuarios}/>
          </Tab.Navigator>
     );
     
}
}

export default Menu;
