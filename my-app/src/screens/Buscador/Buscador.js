import react, { Component } from "react";
import { auth, db } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    FlatList,
    Image
} from "react-native";


class Buscador extends Component {
    constructor() {
        super();
        this.state = {
            backup: [],
            campoBusqueda: "",
            filtrado: [],
            userId: "",
            infoUsuario: null,
            usuarios: [],

            // todos los usuarios que me trajo firebase con el component did mount
            // filtrado basado en este array, le das este array a tu flatlist 
            // a traves de buscador form actualizo el text input, cada vez que actualizo ese estado,
            // estoy ejecutando el metodo que actualiza el estado y que me filtra
            // on press, va al perfil de cada uno toucahnle opcaity, onPress this.state.userId: id del elemento que me esta recorriendo la flatlist
        }   // cuando toca un perfil, se lo pasas por props al user profile el id de ese usuario
    }


    componentDidMount() {
        db.collection("users").onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(doc => {

                    usuarios.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({ backup: usuarios })
            }
        )
    }

    busqueda() {
        let filtradoUsuarios = this.state.backup.filter(elm => {
            if(elm.data.owner.toLowerCase().includes(this.state.campoBusqueda.toLowerCase())) {
                return elm
            }
        })
        this.setState({ filtrado: filtradoUsuarios }, () => console.log(this.state.filtrado))
    }

    usuarioSeleccionado(userId){
        this.props.navigation.navigate("ProfileUsers", userId)
    }


    render() {
        return (
            <View>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({ campoBusqueda: text })}
                    placeholder="userName"
                    keyboardType="default"
                    value={this.state.campoBusqueda}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.busqueda()}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                <Text> Resultados de busqueda para: {this.state.campoBusqueda}</Text>
                {
                    this.state.filtrado.length > 0 ?
                        <FlatList
                            data={this.state.filtrado}
                            keyExtractor={unUsuario => unUsuario.id}
                            renderItem={({ item }) => 
                                 <TouchableOpacity style={styles.button} onPress={() => this.usuarioSeleccionado(item.data.owner)}>
                                    <Text>{item.data.userName}</Text>
                                    {console.log(item.data.userName)}
                                </TouchableOpacity>

                            }
                        />
                        :

                        <Text> Cargando... </Text>

                }
            

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>

                {/* { this.state.userId !== "" ? 
                <FlatList 
                data= {this.state.usuarios}
                keyExtractor={ pepe => pepe.id }
                renderItem={ ({item}) =>  <OtherProfile dataUsuario={item}> </OtherProfile>}
             
                
            />
                     : false */}

                
            </View>

        )
    }
}

const styles = StyleSheet.create({
    itemUsuario: {

        color: "black",
        padding: 20,
        borderColor: "red",
        borderWidth: 2
    },
    formContainer: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
})

export default Buscador;