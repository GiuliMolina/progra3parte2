import react, { Component } from "react";
import { auth } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";

class BusquedaUsuarios extends Component{
    constructor(){
        super();
        this.state = {
            campoBusqueda: "",
            resultados: []
        }
    }

    componentDidMount(){
        db.collection("users").onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(doc => {
                    usuarios.push({
                        userName: doc.owner
                    })
                })
                this.setState({resultados:usuarios})
            }
        )
    }

    render(){
        return(
            <Text> usuarios </Text>
        )
    }
}

export default BusquedaUsuarios;