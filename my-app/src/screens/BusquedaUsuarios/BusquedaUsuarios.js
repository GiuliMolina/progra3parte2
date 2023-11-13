import react, { Component } from "react";
import { auth, db } from "../../firebase/config";
import {
    TextInput,
    TouchableOpacity,
    View,
    Text,
    StyleSheet
} from "react-native";

class BusquedaUsuarios extends Component {
    constructor() {
        super();
        this.state = {
            campoBusqueda: "",
            resultados: [],
            foto: "",
            email: "",
            nombreDeUsuario: "",
            miniBio: ""
        }
    }


    busqueda() {
        db.collection("users").onSnapshot(
            docs => {
                let usuarios = [];
                docs.forEach(doc => {

                    if (doc.userName.includes(this.state.campoBusqueda)) {
                        usuarios.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    }
                })
                this.setState({ resultados: usuarios })
            }
        )
    }

    render() {
        return (
            <View>
                <TextInput
                    style={Styles.input}
                    onChangeText={(text) => this.setState({ campoBusqueda: text })}
                    placeholder="userName"
                    keyboardType="default"
                    value={this.state.campoBusqueda}
                />
                <TouchableOpacity style={Styles.button} onPress={() => this.busqueda()}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                <Text> Resultados de busqueda para: {this.state.campoBusqueda}</Text>

                {
                    this.state.resultados.length === 0 ?
                        <Text>Cargando...</Text>
                        :

                        <FlatList
                            data={this.state.resultados}
                            keyExtractor={unUsuario => unUsuario.id}
                            renderItem={({ item }) => {
                                this.setState({
                                    foto: item.data.urlImagen,
                                    nombreDeUsuario: item.data.userName,
                                    email: item.data.owner,
                                    miniBio: item.data.miniBio
                                }
                                )
                            }}
                        />

                }
                {this.state.resultados.length !== 0 ?
                    <View>

                        <Text>Email:{this.state.email}</Text>
                        <Text>Nombre de usuario:{this.state.nombreDeUsuario}</Text>
                        {/* <Image style={Styles.image} source={{uri: this.state.foto,}}/> */}
                        <Text>Bio:{this.state.miniBio}</Text>
                    </View>
                    : <Text> El nombre de usuario ingresado no existe </Text>
                }

                <TouchableOpacity onPress={() => this.logout()}>
                    <Text> Cerrar sesión</Text>
                </TouchableOpacity>
            </View>

        )
    }
}

const Styles = StyleSheet.create({
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

export default BusquedaUsuarios;