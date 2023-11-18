import React, { Component } from "react";
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
            usuarios: []

        }
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
            if (elm.data.owner.toLowerCase().includes(this.state.campoBusqueda.toLowerCase())) {
                return elm
            } else if (elm.data.userName.toLowerCase().includes(this.state.campoBusqueda.toLowerCase())) {
                return elm

            }
        })
        this.setState({ filtrado: filtradoUsuarios })
    }

    usuarioSeleccionado(userId) {
        this.props.navigation.navigate("ProfileUsers", userId)
    }

    render() {
        console.log(this.state.filtrado.length)
        return (
            <View style={styles.formContainer}>
                <View style={styles.container}>
                    <View style={styles.containerBusqueda}>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => this.setState({ campoBusqueda: text })}
                            placeholder="Nombre de usuario o mail"
                            keyboardType="default"
                            value={this.state.campoBusqueda}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => this.busqueda()}>
                            <Text style={styles.textoBoton}>Buscar</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.campoBusqueda == "" ?
                            <Text> No hay busquedas todavia </Text> :
                            <Text> Resultados de busqueda para: {this.state.campoBusqueda}</Text>
                    }
<View style={styles.containerUsuario}>
                    {
                        this.state.filtrado.length > 0 ?
                            <FlatList
                                data={this.state.filtrado}
                                keyExtractor={unUsuario => unUsuario.id}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={styles.botonUsuario} onPress={() => this.usuarioSeleccionado(item.data.owner)}>
                                        <Text style={styles.usuario} >{item.data.userName}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            : <Text> No exise el email/usuario que busca</Text>
                    }
</View>
                </View>




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
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        margin: 10,
        padding: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
        flex: 1,
        alignItems: "flex-start",
        justifyContent: "center",
    },
    containerBusqueda: {
        flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "center"
    },
    containerUsuario:{
        backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
    padding: 10,
   
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        width: "80%",
    },
    image: {
        width: 50,
        height: 50,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 10,
    },
    button: {
        backgroundColor: "rgb(99 71 239)",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "purple",
        width: "20%",
        height: "20px",
        paddingBottom: "15px",
        paddingTop: " 15px",
        flex: 1,
        justifyContent:" center"
    },
    textoBoton: {
        textAlign: "center",
        color: "#fff",
        width: "100%"
    },
    botonUsuario:{
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: "20%",
        height: "20px",
        paddingBottom: "15px",
        paddingTop: " 15px",
        flex: 1,
        justifyContent:" center"
    }
})

export default Buscador;